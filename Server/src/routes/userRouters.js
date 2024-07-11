const { Router } = require("express");
const getProductsHandler = require("../handlers/handlersProducts/getProductsHandler");
const postCreateProduct = require("../handlers/handlersProducts/postProductHandler");
// const getDogByIdHandler = require("../handlers/getDogByIdHandler")
// const createDogHandler = require("../handlers/createDogHandler")

const userRoutes = Router();

userRoutes.get("/", getUsersHandler);

// productRoutes.get("/:id", )

userRoutes.post("/", postCreateUser);

module.exports = userRoutes;
