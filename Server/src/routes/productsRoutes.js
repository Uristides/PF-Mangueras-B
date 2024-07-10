const { Router } = require("express")
const getProductsHandler = require('../handlers/getProductsHandler')
// const getDogByIdHandler = require("../handlers/getDogByIdHandler")
// const createDogHandler = require("../handlers/createDogHandler")

const productsRoutes = Router()

productsRoutes.get("/", getProductsHandler)

// productRoutes.get("/:id", )

// productRoutes.post("/", )

module.exports = productsRoutes;