const { Manguera } = require("../../db");

const getProducts = async () => {
  return await Manguera.findAll();
};
module.exports = getProducts;
