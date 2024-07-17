const editCart = require("../../../controllers/userControllers/cartControllers/postEditCart");

const editCartHandler = async (req, res) => {
  const { id, item } = req.body;
  try {
    const response = await editCart(id, item);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = editCartHandler;
