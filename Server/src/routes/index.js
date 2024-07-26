const { Router } = require("express");
const productsRoutes = require("./productsRoutes");
const userRoutes = require("./userRouters");
const manguerasRoutes = require("./manguerasRoutes");

const mainRouter = Router();

mainRouter.use("/products", productsRoutes); 

mainRouter.use("/user", userRoutes);

mainRouter.use("/mangueras", manguerasRoutes);

module.exports = mainRouter;
