const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
const path = window.location.pathname;

var main = document.querySelector("main")
var nav = document.querySelector("nav")

const router = {
    home: "/index.html",
    photographerPage: "/views/photographer-page.html"
}

const Photograph = class {
    
    constructor(id, name, tagline, country, city, portrait, price, tags) {
        this.id = id
        this.name = name
        this.tagline = tagline
        this.country = country
        this.city = city
        this.portrait = portrait
        this.price = price
        this.tags = tags
    }

    displayPhotograph() {
        let tagsHTML = ""
            this.tags.forEach(tag => {
                tagsHTML += '<span>#' + tag + '</span>'
            })
        let article = `
            <article>
                <header>
                    <img src="${"./assets/Photographers ID Photos/" + this.portrait}" class="presentationImg">
                    <h2>
                        <a href="${"./views/photographer-page.html?id=" + this.id}">${this.name}</a>
                    </h2>
                </header>
                <address>${this.city + ", " + this.country}</address>
                <p>${this.tagline}</p>
                <p class="price">${this.price + '€/jour'}/jour</p>
                <footer>
                    ${tagsHTML}
                </footer>
            </article>`

        return article
    }
}

const PhotographList = class {
    constructor(datas) {
        this.photographs = []
        this.sortPhotographs = []
        datas.forEach(data => {
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

fetch('/assets/FishEyeData.json').then(response => { return response.json() })
.then(data => {
    switch (path) {
        case router.home:
            var TestPhotographList = new PhotographList(data.photographers)
            TestPhotographList.displayFilters()
            TestPhotographList.sortList()
            TestPhotographList.displayList()
            break
        case router.photographerPage:
            var photographe = {}
            var medias = []

            data.photographers.forEach(photographer => {
                (photographer.id == id)? photographe = photographer : null;
            });
            data.media.forEach(media => {
                (media.photographerId == id)? medias.push(media) : null;
            });

            let photographeTagsHTML = ""

            photographe.tags.forEach(tag => {
                photographeTagsHTML += '<span>#' + tag + '</span>'
            })

            let photographeHTML = `
            <header>
                <div>
                    <h1>${photographe.name}</h1>
                    <address>${photographe.city + ", " + photographe.country}</address>
                    <p>${photographe.tagline}</p>
                    <div class="filters">
                        ${photographeTagsHTML}
                    </div>
                </div>
                <div>
                    <button>Contactez-moi</button>
                </div>
                <div>
                    <img src="../assets/Photographers ID Photos/MimiKeel.jpg" class="presentationImg">
                </div>
            </header>`

            let photographeMediasHTML = ""

            medias.forEach(media => {
                photographeMediasHTML += `
                <article>
                    <figure>
                        <img src="${"../assets/" + photographe.name.substring(0, photographe.name.indexOf(' ')) + "/" + media.image}">
                        <figcaption>
                            <p>${media.title}<span>${media.likes}<i class="fas fa-heart" aria-hidden="true"></i></span></p>
                        </figcaption>
                    </figure>
                </article>
                `
            })

            main.innerHTML = photographeHTML + main.innerHTML + "<div class='feed'>" + photographeMediasHTML + "</div>"
            
            break
        default:
            console.log('Error 404')
            break
    }
})