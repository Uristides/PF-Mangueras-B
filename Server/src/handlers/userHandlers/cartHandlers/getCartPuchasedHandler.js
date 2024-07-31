const {
  getCartPurchased,
} = require("../../../controllers/userControllers/cartControllers/getCartPurchased");

const getCartPurchasedHandler = async (req, res) => {
  try {
    const { userId, totalPrice } = req.query;

    const order = await getCartPurchased(userId, totalPrice);

    res.json({
      message: "Compra realizada exitosamente",
      order,
    });
  } catch (error) {
    console.error("Error en feedback:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCartPurchasedHandler;
