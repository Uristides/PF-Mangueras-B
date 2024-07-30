const postBuyCart = require("../../../controllers/userControllers/cartControllers/postBuyCart");

const buyCartHandler = async (req, res) => {
  console.log("Request body:", req.body); // Añadir registro para verificar la solicitud

  const { id, totalAmount } = req.body;

  try {
    const response = await postBuyCart(id, totalAmount);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in buyCartHandler:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = buyCartHandler;
