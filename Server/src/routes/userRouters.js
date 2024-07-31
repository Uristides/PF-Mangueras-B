const { Router } = require("express");
const registerUserHandler = require("../handlers/userHandlers/postRegisterHandler");
const getUsersHandler = require("../handlers/userHandlers/getUsersHandlers");
const loginUserHandler = require("../handlers/userHandlers/postLoginHandler");
const protectedHandler = require("../handlers/userHandlers/getProtectHandler");
const logoutHandler = require("../handlers/userHandlers/getLogoutHandler");
const removeCartHandler = require("../handlers/userHandlers/cartHandlers/postRemoveCartHandler");
const addCartHandler = require("../handlers/userHandlers/cartHandlers/postAddCartHandler");
const editCartHandler = require("../handlers/userHandlers/cartHandlers/postEditCartHandler");
const getUserHandler = require("../handlers/userHandlers/getUserHandler");
const postEditUserHandler = require("../handlers/userHandlers/postEditUserHandler");
const buyCartHandler = require("../handlers/userHandlers/cartHandlers/postBuyHandler");
const getUserOrdersHandler = require("../handlers/userHandlers/getUserOrderHandler");
const getOrdersHandler = require("../handlers/userHandlers/getOrdersHandler");
const {
  getCartPurchased,
} = require("../controllers/userControllers/cartControllers/getCartPurchased");
const getReviewsUserHandler = require("../handlers/handlersProducts/reviews/getUserReviewsHandler");

const UserRoutes = Router();

///
UserRoutes.post("/register", registerUserHandler);
UserRoutes.post("/login", loginUserHandler);

/// Cart Rutes
UserRoutes.post("/editUser", postEditUserHandler);
UserRoutes.post("/addCart", addCartHandler);
UserRoutes.post("/removeCart", removeCartHandler);
UserRoutes.post("/editCart", editCartHandler);
UserRoutes.post("/buyCart", buyCartHandler);
UserRoutes.get("/feedBack", getCartPurchased);
UserRoutes.get("/orders", getOrdersHandler);
UserRoutes.get("/orders/:id", getUserOrdersHandler);
///

UserRoutes.get("/myReviews", getReviewsUserHandler);
UserRoutes.get("/", getUsersHandler);
UserRoutes.get("/protected", protectedHandler);
UserRoutes.post("/logout", logoutHandler);

UserRoutes.get("/id/:id", getUserHandler);
module.exports = UserRoutes;
