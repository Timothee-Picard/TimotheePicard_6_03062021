import Photograph from './Photograph.js'

var nav = document.querySelector("nav")
var main = document.querySelector("main")

const PhotographList = class {
    constructor(datas) {
        this.photographs = []
        this.sortPhotographs = []
        this.medias = datas.media
        datas.photographers.forEach(data => {
            this.photographs.push(new Photograph(data.id, data.name, data.tagline, data.country, data.city, data.portrait, data.price, data.tags))
        })
    }

    sortList(sort) {
        this.sortPhotographs = []
        if(sort === undefined){
            this.sortPhotographs = this.photographs
        }
        else {
            this.photographs.forEach(photograph => {
                photograph.tags.forEach(tag => {
                    if(sort == tag) {
                        this.sortPhotographs.push(photograph)
                    }
                })
            })
        }
    }

    displayById(id) {
        let medias = []
        let photographe = {}
        this.photographs.forEach(photograph => {
            (photograph.id == id)? photographe = photograph : null;
        });
        this.medias.forEach(media => {
            (media.photographerId == id)? medias.push(media) : null;
        });
        
        var filterHTML = `
        <label for="sort">Trier par</label>
        <select name="sort" id="sort">
            <option value="popularity">Popularité</option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
        </select>`

        main.innerHTML = photographe.displayProfil() + filterHTML + photographe.displayMedias(medias)
    }

    displayList() {
        let content = ""
        this.sortPhotographs.forEach(sortPhotograph => {
            content += sortPhotograph.displayPhotograph()
        })
        main.innerHTML = content
    }

    displayFilters() {
        let sorts = []
        this.photographs.forEach(photographer => {
            photographer.tags.forEach(tag => {
                sorts.push(tag)
            })
        })
        let filters = [...new Set(sorts)]
        filters.forEach(filter => {
            let span = document.createElement("span")
            span.textContent = `#${filter}`
            nav.appendChild(span)
            span.addEventListener("click", achanger =>{
                this.sortList(filter)
                this.displayList()
            })
        })
    }
}

export default PhotographList
