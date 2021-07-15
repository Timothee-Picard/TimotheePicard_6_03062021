class Photograph {
    constructor(data) {
        this._id = data.id
        this._name = data.name
        this._city = data.city
        this._country = data.country
    }

    get name() {
        return this._name
    }

    get address() {
        return `${this._city}, ${this._country}`
    }

    set country(newCountry) {
        this._country = newCountry
    }

    set city(newCity) {
        this._city = newCity.toLowerCase()
    }

    get city() {
        return this._city.toUpperCase()
    }
}


const toto = new Photograph({
    id: 1,
    name: 'toto',
    city: 'tata',
    country: 'toutou'
})


console.log("===")
console.log(toto._city)
console.log("===")


toto.city = 'PrOUT'

console.log("===")
console.log(toto.city)
console.log("===")