const { Brands } = require("../../../db");

const getBrands = async () => {
  return await Brands.findAll();
};
module.exports = getBrands;
