const { Router } = require('express');
const getManguerasHandler = require("../handlers/getManguerasHandler")

const manguerasRoutes = Router()

manguerasRoutes.get("/", getManguerasHandler)

module.exports = manguerasRoutes