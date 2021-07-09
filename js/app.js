import PhotographList from './PhotographList.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
const path = window.location.pathname;

var main = document.querySelector("main")
var nav = document.querySelector("nav")

const router = {
    home: "/",
    photographerPage: "/views/photographer-page.html"
}

class App {
    async init() {
        return fetch('/assets/FishEyeData.json')
            .then(response => { return response.json() })
            .then(data => {
                var TestPhotographList = new PhotographList(data)
                switch (path) {
                    case router.home:
                        TestPhotographList.displayFilters()
                        TestPhotographList.sortList()
                        TestPhotographList.displayList()
                        break
                    case router.photographerPage:
                        TestPhotographList.displayById(id)  
                        break
                    default:
                        console.log('Error 404')
                        break
                }
                })
            .catch(err => console.log('err', err))
        }
}

export default App

