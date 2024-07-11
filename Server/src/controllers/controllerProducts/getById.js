const getProducts = require("./getProducts");

const getInfoById = async (id) => {
  const allProducts = await getProducts();
  const product = allProducts.find((d) => d.id == id);
  return product;
};

module.exports = getInfoById;
