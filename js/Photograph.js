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
                    <img src="./assets/Photographers ID Photos/${this.portrait}" class="presentationImg">
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

    displayProfil() {
        let tagsHTML = ""
        this.tags.forEach(tag => {
            tagsHTML += '<span>#' + tag + '</span>'
        })
        let profil = `
        <header>
            <div>
                <h1>${this.name}</h1>
                <address>${this.city + ", " + this.country}</address>
                <p>${this.tagline}</p>
                <div class="filters">
                    ${tagsHTML}
                </div>
            </div>
            <div>
                <button>Contactez-moi</button>
            </div>
            <div>
                <img src="../assets/Photographers ID Photos/${this.portrait}" class="presentationImg">
            </div>
        </header>`

        return profil
    }

    displayMedias(medias){
        let photographeMediasHTML = ""

        medias.forEach(media => {
            photographeMediasHTML += `
            <article>
                <figure>
                    <img src="${"../assets/" + this.name.substring(0, this.name.indexOf(' ')) + "/" + media.image}">
                    <figcaption>
                        <p>${media.title}<span>${media.likes}<i class="fas fa-heart" aria-hidden="true"></i></span></p>
                    </figcaption>
                </figure>
            </article>
            `
        })
        
        return "<div class='feed'>" + photographeMediasHTML + "</div>"
    }
}

export default Photograph
