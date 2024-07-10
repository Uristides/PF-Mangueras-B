const getProducts = require("../controllers/getProducts")

const getProductsHandler = (req, res) => {
    try {
        const products = getProducts()

        if (products) {
            res.status(200).json(products)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getProductsHandler