const { Router } = require("express");
const getProductsHandler = require("../handlers/handlersProducts/getProductsHandler");
const postCreateProduct = require("../handlers/handlersProducts/postProductHandler");
// const getDogByIdHandler = require("../handlers/getDogByIdHandler")
// const createDogHandler = require("../handlers/createDogHandler")

const productsRoutes = Router();

productsRoutes.get("/", getProductsHandler);

// productRoutes.get("/:id", )

productRoutes.post("/", postCreateProduct);

module.exports = productsRoutes;
