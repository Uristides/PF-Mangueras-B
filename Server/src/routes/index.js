const { Router } = require("express");

const productsRoutes = require("./productsRoutes");
const userRoutes = require("./userRouters");
const mainRouter = Router();

mainRouter.use("/products", productsRoutes);
mainRouter.use("/user", userRoutes);
module.exports = mainRouter;
