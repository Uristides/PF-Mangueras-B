const { Router } = require("express");
const getProductsHandler = require("../handlers/handlersProducts/getProductsHandler");
const postCreateProduct = require("../handlers/handlersProducts/postProductHandler");
const getByNameHandler = require("../handlers/handlersProducts/getByNameHandler");
const getInfoHandler = require("../handlers/handlersProducts/getIdHandler");
const getBrandsHandler = require("../handlers/handlersProducts/categories/getBradsHandler");
const getLongitudesHandler = require("../handlers/handlersProducts/categories/getLongitudesHandler");
const getTypesHandler = require("../handlers/handlersProducts/categories/getTypesHandler");
const postEditHandler = require("../handlers/handlersProducts/postEditHandler");
const getReviewsHandler = require("../handlers/handlersProducts/reviews/getReviewsHandler");
const postReviewHandler = require("../handlers/handlersProducts/reviews/postReviewHandler");

const productsRoutes = Router();

//Categories

productsRoutes.get("/brands", getBrandsHandler);
productsRoutes.get("/longitudes", getLongitudesHandler);
productsRoutes.get("/types", getTypesHandler);

//Products

productsRoutes.get("/", getProductsHandler);
productsRoutes.get("/search", getByNameHandler);
productsRoutes.get("/:id", getInfoHandler);
//Reviews

productsRoutes.get("/reviews/:id", getReviewsHandler);
productsRoutes.post("/reviews/", postReviewHandler);

//admin
productsRoutes.post("/", postCreateProduct);
productsRoutes.post("/edit", postEditHandler);

module.exports = productsRoutes;
