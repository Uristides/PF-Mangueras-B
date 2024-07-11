const { Router } = require("express");
const productsRoutes = require("./productsRoutes");
const userRoutes = require("./userRouters");
const manguerasRoutes = require("./manguerasRoutes")
// const UserRoutes = require("./userRoutes")

const mainRouter = Router();

mainRouter.use("/products", productsRoutes);

mainRouter.use("/user", userRoutes);

mainRouter.use("/mangueras", manguerasRoutes)

// mainRouter.use("/users", UserRoutes);

module.exports = mainRouter;
