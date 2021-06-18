const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

var photographe = {}
var medias = []

fetch('../assets/FishEyeData.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.photographers.forEach(photographer => {
            (photographer.id == id)? photographe = photographer : null;
        });
        data.media.forEach(media => {
            (media.photographerId == id)? medias.push(media) : null;
        });
        var main = document.querySelector("main")
        var header = document.createElement("header")
        var sectionDesc = document.createElement("div")
        var sectionButton = document.createElement("div")
        var button = document.createElement("button")
        var sectionImg = document.createElement("div")
        var img = document.createElement("img")
        var h1 = document.createElement("h1")
        var address = document.createElement("address")
        var p = document.createElement("p")
        var filters = document.createElement("div")
        
        console.log(photographe)

        h1.textContent = photographe.name
        sectionDesc.appendChild(h1)

        address.textContent = photographe.city + ", " + photographe.country
        sectionDesc.appendChild(address)

        
        sectionDesc.appendChild(p)

        photographe.tags.forEach(tag => {
            var span = document.createElement("span")
            span.textContent = "#" + tag
            filters.appendChild(span)
        })
        filters.classList.add("filters")
        sectionDesc.appendChild(filters)

        button.textContent = "Contactez-moi"
        sectionButton.appendChild(button)

        img.setAttribute("src", "../assets/Photographers ID Photos/" + photographe.portrait)
        img.classList.add("presentationImg");
        sectionImg.appendChild(img)

        header.appendChild(sectionDesc)
        header.appendChild(sectionButton)
        header.appendChild(sectionImg)
        main.insertBefore(header, main.childNodes[0])

        medias.forEach(media => {
            var article = document.createElement("article")
            var figure = document.createElement("figure")
            var img = document.createElement("img")
            var figcaption = document.createElement("figcaption")
            var p = document.createElement("p")
            var i = document.createElement("i")
            var span = document.createElement("span")

            console.log(media)
            i.classList.add("fas", "fa-heart")

            span.textContent = media.likes
            span.appendChild(i)

            p.textContent = media.title
            p.appendChild(span)

            figcaption.appendChild(p)

            img.setAttribute("src", "../assets/" + photographe.name.substring(0, photographe.name.indexOf(' ')) + "/" + media.image)

            figure.appendChild(img)
            figure.appendChild(figcaption)
            article.appendChild(figure)

            document.querySelector(".feed").appendChild(article)
        });
    })
    .catch(err => {
        console.log(err)
    });