import PhotographList from './PhotographList.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
const path = window.location.pathname;

const router = {
    home: "/index.html",
    photographerPage: "/views/photographer-page.html"
}

if(path == "/"){window.location.replace(queryString + router.home);}

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
    }
}

export default App
