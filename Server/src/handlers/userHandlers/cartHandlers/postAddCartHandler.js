const postaddCart = require("../../../controllers/userControllers/cartControllers/postAddCart");

const addCartHandler = async (req, res) => {
  const { id, item } = req.body;
  try {
    const response = await postaddCart(id, item);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = addCartHandler;
