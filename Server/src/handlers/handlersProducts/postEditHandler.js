const postEditProduct = require("../../controllers/controllerProducts/postEditProduct");

const postEditHandler = async (req, res) => {
  const {
    id,
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
    const edit = {
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
    const response = await postEditProduct(id, edit, brand, type);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postEditHandler;
