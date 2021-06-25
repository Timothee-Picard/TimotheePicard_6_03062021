const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
const path = window.location.pathname;

var main = document.querySelector("main")

const router = {
    home: "/index.html",
    photographerPage: "/views/photographer-page.html"
}

fetch('/assets/FishEyeData.json').then(response => { return response.json() })
.then(data => {
    switch (path) {
        case router.home:
            console.log("home")
            let homeListHTML = ""
            data.photographers.forEach(photographer => {

                let photographerTagsHTML = ""

                photographer.tags.forEach(tag => {
                    photographerTagsHTML += '<span>#' + tag + '</span>'
                })

                homeListHTML += `
                <article>
                    <header>
                        <img src="${"./assets/Photographers ID Photos/" + photographer.portrait}" class="presentationImg">
                        <h2>
                            <a href="${"./views/photographer-page.html?id=" + photographer.id}">${photographer.name}</a>
                        </h2>
                    </header>
                    <address>${photographer.city + ", " + photographer.country}</address>
                    <p>${photographer.tagline}</p>
                    <p class="price">${photographer.price + '€/jour'}/jour</p>
                    <footer>
                        ${photographerTagsHTML}
                    </footer>
                </article>`
            })

            main.innerHTML = main.innerHTML + homeListHTML

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