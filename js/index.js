fetch('./assets/FishEyeData.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        data.photographers.forEach(photographer => {
            // Create elements
            var article = document.createElement("article")
            var header = document.createElement("header")
            var footer = document.createElement("footer")
            var address = document.createElement("address")
            var p = document.createElement("p")
            var price = document.createElement("p")
            var img = document.createElement("img")
            var h2 = document.createElement("h2")
            var a = document.createElement("a")

            // Add text, class and attr
            a.textContent = photographer.name;
            a.setAttribute("href", "./views/photographer-page.html?id=" + photographer.id)
            img.setAttribute("src", "./assets/Photographers ID Photos/" + photographer.portrait)
            img.classList.add("presentationImg")
            address.textContent = photographer.city + ", " + photographer.country
            p.textContent = photographer.tagline
            price.textContent = photographer.price + '€/jour'
            price.classList.add("price")

            // Add elements on ohter elements
            h2.appendChild(a)

            header.appendChild(img)
            header.appendChild(h2)

            photographer.tags.forEach(tag => {
                var span = document.createElement("span")
                span.textContent = "#" + tag
                footer.appendChild(span)    
            });

            article.appendChild(header)
            article.appendChild(address)
            article.appendChild(p)
            article.appendChild(price)
            article.appendChild(footer)

            // add elements to html
            document.querySelector("main").appendChild(article)
        });
    })
    .catch(err => {
        console.log(err)
    });