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
        let header = document.createElement("header")
        let div1 = document.createElement("div")
        let h1 = document.createElement("h1")
            h1.textContent = this.name
        let address = document.createElement("address")
            address.textContent = this.city + ", " + this.country
        let p = document.createElement("p")
            p.textContent = this.tagline
        let filters = document.createElement("div")
            filters.classList.add("filters")
            filters.innerHTML = tagsHTML
        div1.appendChild(h1)
        div1.appendChild(address)
        div1.appendChild(p)
        div1.appendChild(filters)
        let div2 = document.createElement("div")
        let button = document.createElement("button")
            button.textContent = "Contactez-moi"
        div2.appendChild(button)
        let div3 = document.createElement("div")
        let img = document.createElement("img")
            img.classList.add("presentationImg")
            img.setAttribute("src", `../assets/Photographers ID Photos/${this.portrait}`)
        div3.appendChild(img)
        header.appendChild(div1)
        header.appendChild(div2)
        header.appendChild(div3)

        button.addEventListener("click", openModal => {
            this.openModal()
        })

        return header
    }

    displayMedias(medias){
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
                video.addEventListener("click", openModal=>{
                    this.openModal(medias, media)
                })
            }
            else {
                let img = document.createElement("img")
                    img.setAttribute("src", "../assets/" + this.name.substring(0, this.name.indexOf(' ')) + "/" + media.image)
                figure.appendChild(img)
                img.addEventListener("click", openModal=>{
                    this.openModal(medias, media)
                })
            }

            i.addEventListener("click", function(){
                if(i.classList.contains("like")){
                    i.classList.remove("like")
                    span.textContent = parseInt(span.textContent)-1
                    span.appendChild(i)
                }
                else {
                    i.classList.add("like")
                    span.textContent = parseInt(span.textContent)+1
                    span.appendChild(i)
                }
            })

            span.appendChild(i)
            p.appendChild(span)
            figcaption.appendChild(p)
            figure.appendChild(figcaption)
            article.appendChild(figure)

            div.appendChild(article)
        })
        return div
    }

    openModal(medias , media){
        let modal = document.createElement("div")
            modal.classList.add("modal")
        if(document.querySelector(".modal")){
            document.querySelector(".modal").remove()
        }
        document.body.appendChild(modal)
        if(media){
            let lightbox = document.createElement("div")
                lightbox.classList.add("lightbox")
            let iClose = document.createElement("i")
                iClose.classList.add("fas", "fa-times")
            let iLeft = document.createElement("i")
                iLeft.classList.add("fas", "fa-chevron-left")
            
            iLeft.addEventListener("click", back =>{
                for (var i = 0; i < medias.length; i++) {
                    medias[i] == media ? this.openModal(medias, medias[i-1]) : null
                }
            })

            let iRight = document.createElement("i")
                iRight.classList.add("fas", "fa-chevron-right")

            iRight.addEventListener("click", next =>{
                for (var i = 0; i < medias.length; i++) {
                    medias[i] == media ? this.openModal(medias, medias[i+1]) : null
                }
            })
            console.log(media)
            let img = document.createElement("img")
                img.setAttribute("src", "../assets/" + this.name.substring(0, this.name.indexOf(' ')) + "/" + media.image)
            let title = document.createElement("h3")
                title.textContent = media.title
            iClose.addEventListener("click", this.closeModal)
            lightbox.appendChild(iClose)
            lightbox.appendChild(iLeft)
            lightbox.appendChild(img)
            lightbox.appendChild(iRight)
            lightbox.appendChild(title)
            modal.appendChild(lightbox)
        }
        else{
            let form = document.createElement("form")
            let h2 = document.createElement("h2")
                h2.textContent = `Contactez-Moi ${this.name}`
            let labelFirstname = document.createElement("label")
                labelFirstname.textContent = "Prénom"
            let Firstname = document.createElement("input")
                Firstname.setAttribute("type", "text")

            let labelName = document.createElement("label")
                labelName.textContent = "Nom"
            let Name = document.createElement("input")
                Name.setAttribute("type", "text")

            let labelEmail = document.createElement("label")
                labelEmail.textContent = "Email"
            let Email = document.createElement("input")
                Email.setAttribute("type", "email")

            let labelMessage = document.createElement("label")
                labelMessage.textContent = "Votre message"
            let Message = document.createElement("textarea")

            let Send = document.createElement("input")
                Send.setAttribute("type", "submit")

            let i = document.createElement("i")
                i.classList.add("fas", "fa-times")
            i.addEventListener("click", this.closeModal)
            form.appendChild(i)
            form.appendChild(h2)
            form.appendChild(labelFirstname)
            form.appendChild(Firstname)
            form.appendChild(labelName)
            form.appendChild(Name)
            form.appendChild(labelEmail)
            form.appendChild(Email)
            form.appendChild(labelMessage)
            form.appendChild(Message)
            form.appendChild(Send)
            modal.appendChild(form)
        }
    }

    closeModal(){
        if(document.querySelector(".modal")){
            document.querySelector(".modal").remove()
        }
    }
}

export default Photograph
