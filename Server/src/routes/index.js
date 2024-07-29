const { Router } = require("express");
const productsRoutes = require("./productsRoutes");
const userRoutes = require("./userRouters");
const manguerasRoutes = require("./manguerasRoutes");
const paymentRoutes = require("./paymentRoutes"); 

const mainRouter = Router();

mainRouter.use("/products", productsRoutes);
mainRouter.use("/user", userRoutes);
mainRouter.use("/mangueras", manguerasRoutes);
mainRouter.use("/payment", paymentRoutes); 

module.exports = mainRouter;
