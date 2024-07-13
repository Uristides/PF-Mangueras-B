const getBrands = require("../../../controllers/controllerProducts/categories/getBrands");

const getBrandsHandler = async (req, res) => {
  try {
    res.status(200).send(await getBrands());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getBrandsHandler;
