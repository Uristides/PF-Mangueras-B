const { Router } = require("express");

const productsRoutes = require("./productsRoutes")
const UserRoutes = require("./userRoutes")

const mainRouter = Router();

mainRouter.use("/products", productsRoutes);
mainRouter.use("/users", UserRoutes);
module.exports = mainRouter;
