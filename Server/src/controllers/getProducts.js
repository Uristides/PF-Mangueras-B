const db = require("../db.json")


const getProducts = () => {
    const products = db.map( pro => {
        return pro
    })

    return products
}

module.exports = getProducts