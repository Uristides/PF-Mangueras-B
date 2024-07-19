const { Router } = require("express");
const getProductsHandler = require("../handlers/handlersProducts/getProductsHandler");
const postCreateProduct = require("../handlers/handlersProducts/postProductHandler");
const getByNameHandler = require("../handlers/handlersProducts/getByNameHandler");
const getInfoHandler = require("../handlers/handlersProducts/getIdHandler");
const getBrandsHandler = require("../handlers/handlersProducts/categories/getBradsHandler");
const getLongitudesHandler = require("../handlers/handlersProducts/categories/getLongitudesHandler");
const getTypesHandler = require("../handlers/handlersProducts/categories/getTypesHandler");
const postEditHandler = require("../handlers/handlersProducts/postEditHandler");

const productsRoutes = Router();

//Categories

productsRoutes.get("/brands", getBrandsHandler);
productsRoutes.get("/longitudes", getLongitudesHandler);
productsRoutes.get("/types", getTypesHandler);

//Products

productsRoutes.get("/", getProductsHandler);
productsRoutes.get("/search", getByNameHandler);
productsRoutes.get("/:id", getInfoHandler);

productsRoutes.post("/", postCreateProduct);
productsRoutes.post("/edit", postEditHandler);

module.exports = productsRoutes;
