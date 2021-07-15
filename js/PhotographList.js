import Photograph from './Photograph.js'

var nav = document.querySelector("nav")
// var main = document.querySelector("main")

const PhotographList = class {
    constructor(datas) {
        this.photographs = []
        this.sortPhotographs = []
        this.sort = []
        this.medias = datas.media
        datas.photographers.forEach(data => {
            this.photographs.push(new Photograph(data.id, data.name, data.tagline, data.country, data.city, data.portrait, data.price, data.tags))
        })

        this.$main = document.querySelector('main')
    }

    sortList(sort) {
        this.sortPhotographs = []
        if(sort === undefined){
            this.sortPhotographs = this.photographs
        }
        else {
            if(this.sort.indexOf(sort) === -1 ){
                this.sort.push(sort) 
            }
            else {
                const index = this.sort.indexOf(sort)
                if (index > -1) {
                    this.sort.splice(index, 1)
                }
            }
            if(this.sort.length > 0){
                this.photographs.forEach(photograph => {
                    photograph.tags.forEach(tag => {
                        if(this.sort.includes(tag)) {
                            this.sortPhotographs.indexOf(photograph) === -1 ? this.sortPhotographs.push(photograph) : null
                        }
                    })
                })
            }
            else {
                this.sortPhotographs = this.photographs
            }
        }
    }

    displayById(id) {
        let medias = []
        let photographe = {}
        this.photographs.forEach(photograph => {
            (photograph.id == id)? photographe = photograph : null
        })
        this.medias.forEach(media => {
            (media.photographerId == id)? medias.push(media) : null
        })
        let label = document.createElement("label")
            label.setAttribute('for','sort')
        let select = document.createElement("select")
            select.setAttribute('id','sort')
            select.setAttribute('name','sort')
        let option1 = document.createElement("option")
            option1.textContent = "Popularité"
            option1.setAttribute('value','popularity')
        let option2 = document.createElement("option")
            option2.textContent = "Date"
            option2.setAttribute('value','date')
        let option3 = document.createElement("option")
            option3.textContent =  "Titre"
            option3.setAttribute('value','title')
        select.appendChild(option1)
        select.appendChild(option2)
        select.appendChild(option3)
        this.$main.insertBefore(photographe.displayProfil(), this.$main.firstChild)
        this.$main.appendChild(label)
        this.$main.appendChild(select)
        this.$main.appendChild(photographe.displayMedias(medias))
    }

    displayList() {
        let content = ""
        this.sortPhotographs.forEach(sortPhotograph => {
            content += sortPhotograph.displayPhotograph()
        })
        this.$main.innerHTML = content

        this.handlePriceOnClick()
    }

    handlePriceOnClick() {
        this.$main
            .querySelectorAll('.price')[0]
            .addEventListener('click', () => (
                console.log("====")
            ))
    }

    displayFilters() {
        let sorts = []
        this.photographs.forEach(photographer => {
            photographer.tags.forEach(tag => {
                sorts.push(tag)
            })
        })
        let filters = [...new Set(sorts)]
        let span = ''
        filters.forEach(filter => {
            // let span = document.createElement("span")

            span += `
                <span>#${filter}</span>
            `
        })
        nav.innerHTML = span

        nav.querySelectorAll('span').forEach(elt => {
            elt.addEventListener('click', (e) => {
                const spanElt = e.target

                spanElt.classList.contains("selected")
                    ? spanElt.classList.remove("selected")
                    : spanElt.classList.add("selected")
                // this.sortList(filter)
                this.displayList()
            })
        })
    }
}

export default PhotographList
