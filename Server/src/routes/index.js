const { Router } = require("express");
const productsRoutes = require("./productsRoutes");
const manguerasRoutes = require("./manguerasRoutes")


const mainRouter = Router();

mainRouter.use("/products", productsRoutes);

mainRouter.use("/mangueras", manguerasRoutes)

module.exports = mainRouter;
