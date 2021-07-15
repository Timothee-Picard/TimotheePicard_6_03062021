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
        let div = document.createElement("div")
            div.classList.add("feed")
        medias.forEach(media => {
            let article = document.createElement("article")
            let figure = document.createElement("figure")
            let figcaption = document.createElement("figcaption")
                figcaption
            let p = document.createElement("p")
                p.textContent = media.title
            let span = document.createElement("span")
                span.textContent = media.likes
            let i = document.createElement("i")
                i.classList.add("fas", "fa-heart")
                i.setAttribute("aria-hidden", true)
            if(media.video){
                let video = document.createElement("video")
                    video.controls = "controls"
                    video.textContent = "Sorry, your browser doesn't support embedded videos."
                let source = document.createElement("source")
                    source.setAttribute("src", "../assets/" + this.name.substring(0, this.name.indexOf(' ')) + "/" + media.video)
                    source.setAttribute("type", "video/mp4")
                video.insertBefore(source, video.firstChild)
                figure.appendChild(video)
            }
            else {
                let img = document.createElement("img")
                    img.setAttribute("src", "../assets/" + this.name.substring(0, this.name.indexOf(' ')) + "/" + media.image)
                figure.appendChild(img)
            }
            span.appendChild(i)
            p.appendChild(span)
            figcaption.appendChild(p)
            figure.appendChild(figcaption)
            article.appendChild(figure)
            div.appendChild(article)
        })
        console.log(div)
        return div
    }
}

export default Photograph
