const postRemoveCart = require("../../../controllers/userControllers/cartControllers/postRemoveCart");

const removeCartHandler = async (req, res) => {
  const { id, item } = req.body;
  try {
    const response = await postRemoveCart(id, item);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = removeCartHandler;
