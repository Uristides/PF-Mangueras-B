const { Router } = require("express");
const getProductsHandler = require("../handlers/handlersProducts/getProductsHandler");
const postCreateProduct = require("../handlers/handlersProducts/postProductHandler");
const getByNameHandler = require("../handlers/handlersProducts/getByNameHandler");
const getInfoHandler = require("../handlers/handlersProducts/getIdHandler");

const productsRoutes = Router();

productsRoutes.get("/", getProductsHandler);
productsRoutes.get("/search", getByNameHandler);
productsRoutes.get("/:id", getInfoHandler);

productsRoutes.post("/", postCreateProduct);

module.exports = productsRoutes;
