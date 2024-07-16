const { Router } = require("express");
const registerUserHandler = require("../handlers/userHandlers/postRegisterHandler");
const getUsersHandler = require("../handlers/userHandlers/getUsersHandlers");
const loginUserHandler = require("../handlers/userHandlers/postLoginHandler");
const protectedHandler = require("../handlers/userHandlers/getProtectHandler");
const logoutHandler = require("../handlers/userHandlers/getLogoutHandler");
const removeCartHandler = require("../handlers/userHandlers/postRemoveCartHandler");
const addCartHandler = require("../handlers/userHandlers/postAddCartHandler");

const UserRoutes = Router();

UserRoutes.post("/register", registerUserHandler);
UserRoutes.post("/login", loginUserHandler);
UserRoutes.post("/addCart", addCartHandler);
UserRoutes.post("/removeCart", removeCartHandler);
UserRoutes.get("/", getUsersHandler);
UserRoutes.get("/protected", protectedHandler);
UserRoutes.post("/logout", logoutHandler);

module.exports = UserRoutes;
