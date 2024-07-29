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
const getUserReviewsHandler = require("../handlers/handlersProducts/reviews/getUserReviewsHandler")
const postReviewHandler = require("../handlers/handlersProducts/reviews/postReviewHandler");


const productsRoutes = Router();

//Categories
productsRoutes.get("/", getProductsHandler);

productsRoutes.get("/brands", getBrandsHandler);
//productsRoutes.get("/longitudes", getLongitudesHandler);
productsRoutes.get("/types", getTypesHandler);

//Products
productsRoutes.get("/search", getByNameHandler);

//Reviews
productsRoutes.post("/reviews", postReviewHandler); 
productsRoutes.get("/reviews/byUserId/:id", getUserReviewsHandler)

//admin
productsRoutes.post("/edit", postEditHandler);
productsRoutes.post("/", postCreateProduct);

//por params
productsRoutes.get("/reviews/id/:id", getReviewsHandler);
productsRoutes.get("/:id", getInfoHandler);
module.exports = productsRoutes;
