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

const UserRoutes = Router();

UserRoutes.post("/register", registerUserHandler);
UserRoutes.post("/login", loginUserHandler);
UserRoutes.post("/editUser", postEditUserHandler);
UserRoutes.post("/addCart", addCartHandler);
UserRoutes.post("/removeCart", removeCartHandler);
UserRoutes.post("/editCart", editCartHandler);
UserRoutes.get("/", getUsersHandler);
UserRoutes.get("/protected", protectedHandler);
UserRoutes.post("/logout", logoutHandler);

UserRoutes.get("/id/:id", getUserHandler);
module.exports = UserRoutes;
