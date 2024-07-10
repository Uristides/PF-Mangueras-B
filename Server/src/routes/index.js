const { Router } = require("express");

const productsRoutes = require("./productsRoutes")

const mainRouter = Router();

mainRouter.use("/products", productsRoutes);

module.exports = mainRouter;
