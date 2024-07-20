const postBuyCart = require("../../../controllers/userControllers/cartControllers/postBuyCart");

const buyCartHandler = async (req, res) => {
  const { id, totalAmount } = req.body;
  try {
    const response = await postBuyCart(id, totalAmount);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = buyCartHandler;
