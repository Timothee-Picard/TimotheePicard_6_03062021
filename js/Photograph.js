const Photograph = class {

    constructor(id, name, tagline, country, city, portrait, price, tags, alt) {
        this.id = id
        this.name = name
        this.tagline = tagline
        this.country = country
        this.city = city
        this.portrait = portrait
        this.price = price
        this.tags = tags
        this.alt = alt
    }

    displayPhotograph() {
        let tagsHTML = ""
        this.tags.forEach(tag => {
            tagsHTML += '<span>#' + tag + '</span>'
        })
        let article = `
            <article>
                <header>
                    <img src="./assets/Photographers ID Photos/${this.portrait}" alt="${this.alt}" class="presentationImg">
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
            img.setAttribute("alt", this.alt)
        div3.appendChild(img)
        header.appendChild(div1)
        header.appendChild(div2)
        header.appendChild(div3)

        button.addEventListener("click", () => {
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
                    video.textContent = "Votre navigateur ne permet pas de lire les vidéos."
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
                    img.setAttribute("alt", media.alt)
                figure.appendChild(img)
                img.addEventListener("click", () =>{
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
            modal.setAttribute("aria-hidden", "false")
            modal.setAttribute("role", "dialog")
        if(document.querySelector(".modal")){
            document.querySelector(".modal").remove()
        }
        document.body.appendChild(modal)
        let main = document.querySelector("main")
        main.setAttribute("aria-hidden", "true")
        let header = document.querySelector("header")
        header.setAttribute("aria-hidden", "true")
        if(media){
            let lightbox = document.createElement("div")
                lightbox.classList.add("lightbox")
            let iClose = document.createElement("i")
                iClose.classList.add("fas", "fa-times")
            let iLeft = document.createElement("i")
                iLeft.classList.add("fas", "fa-chevron-left")
            
            iLeft.addEventListener("click", back =>{
                for (var i = 0; i < medias.length; i++) {
                    if (medias[i] == media) {
                        if(medias[i-1]){
                            this.openModal(medias, medias[i-1])
                        }
                        else{
                            this.openModal(medias, medias[medias.length-1])
                        }
                    }
                }
            })

            let iRight = document.createElement("i")
                iRight.classList.add("fas", "fa-chevron-right")

            iRight.addEventListener("click", next =>{
                for (var i = 0; i < medias.length; i++) {
                    if (medias[i] == media ){
                        if(medias[i+1]){
                            this.openModal(medias, medias[i+1])
                        }
                        else{
                            this.openModal(medias, medias[0])
                        }
                    }
                }
            })
            let img = document.createElement("img")
                img.setAttribute("src", "../assets/" + this.name.substring(0, this.name.indexOf(' ')) + "/" + media.image)
                img.setAttribute("alt", media.alt)
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
            let legend1 = document.createElement("legend")
                legend1.textContent = "Vos coordonnées"
            let fieldset1 = document.createElement("fieldset")
                fieldset1.setAttribute("aria-labelledb", "coordonnees")
            let legend2 = document.createElement("legend")
                legend2.textContent = "Votre message"
            let fieldset2 = document.createElement("fieldset")
                fieldset2.setAttribute("aria-labelledb", "message")
            let h2 = document.createElement("h2")
                h2.textContent = `Contactez-Moi ${this.name}`
            let labelFirstname = document.createElement("label")
                labelFirstname.textContent = "Prénom"
                labelFirstname.setAttribute("for", "first_name")
            let Firstname = document.createElement("input")
                Firstname.setAttribute("type", "text")
                Firstname.setAttribute("name", "first_name")
                Firstname.setAttribute("aria-label", "first_name")
                
            let labelName = document.createElement("label")
                labelName.textContent = "Nom"
                labelName.setAttribute("for", "last_name")
            let Name = document.createElement("input")
                Name.setAttribute("type", "text")
                Name.setAttribute("name", "last_name")
                Name.setAttribute("aria-label", "last_name")

            let labelEmail = document.createElement("label")
                labelEmail.textContent = "Email"
                labelEmail.setAttribute("for", "email")
            let Email = document.createElement("input")
                Email.setAttribute("type", "email")
                Email.setAttribute("name", "email")
                Email.setAttribute("aria-label", "email")
                Email.setAttribute("required", "true")
                Email.setAttribute("aria-required", "true")
                

            let labelMessage = document.createElement("label")
                labelMessage.textContent = "Votre message"
                labelMessage.setAttribute("for", "message")
            let Message = document.createElement("textarea")
                Message.setAttribute("name", "message")
                Message.setAttribute("aria-label", "message")
                Message.setAttribute("required", "true")
                Message.setAttribute("aria-required", "true")

            let Send = document.createElement("input")
                Send.setAttribute("type", "submit")

            let i = document.createElement("i")
                i.classList.add("fas", "fa-times")
                i.setAttribute("data-dismiss", "modal")
            i.addEventListener("click", this.closeModal)
            form.appendChild(i)
            form.appendChild(h2)
            fieldset1.appendChild(legend1)
            fieldset1.appendChild(labelFirstname)
            fieldset1.appendChild(Firstname)
            fieldset1.appendChild(labelName)
            fieldset1.appendChild(Name)
            fieldset1.appendChild(labelEmail)
            fieldset1.appendChild(Email)
            fieldset1.appendChild(legend2)
            fieldset2.appendChild(labelMessage)
            fieldset2.appendChild(Message)

            form.appendChild(fieldset1)
            form.appendChild(fieldset2)
            form.appendChild(Send)
            modal.appendChild(form)
            Firstname.focus()
        }
    }

    closeModal(){
        if(document.querySelector(".modal")){
            document.querySelector(".modal").remove()
        }
    }
}

export default Photograph
