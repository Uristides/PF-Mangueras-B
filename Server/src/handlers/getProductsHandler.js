const getProducts = require("../controllers/getProducts");

const getProductsHandler = async (req, res) => {
  try {
    res.status(200).send(await getProducts());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getProductsHandler;
