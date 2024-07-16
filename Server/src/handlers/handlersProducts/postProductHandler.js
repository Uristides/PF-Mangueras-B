const createProductDB = require("../../controllers/controllerProducts/postProduct");

const postCreateProduct = async (req, res) => {
  const {
    name,
    image,
    price,
    diameter,
    longitude,
    brand,
    type,
    description,
    stock,
    available,
    show,
  } = req.body;
  try {
    const info = {
      name: name,
      image: image,
      price: price,
      diameter: diameter,
      longitude: longitude,
      description: description,
      stock: stock,
      available: available,
      show: show,
    };
    const response = await createProductDB(info, brand, type);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postCreateProduct;
