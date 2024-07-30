const {
  getCartPurchased,
} = require("../../../controllers/userControllers/cartControllers/getCartPurchased");

const getCartPurchasedHandler = async (req, res) => {
  try {
    const { payment_id, status, merchant_order_id, totalPrice } = req.query;

    if (status !== "approved") {
      return res.json({
        message: "El pago no fue aprobado",
        status,
      });
    }

    const order = await getCartPurchased(merchant_order_id, totalPrice);

    res.json({
      message: "Compra realizada exitosamente",
      paymentId: payment_id,
      status,
      order,
    });
  } catch (error) {
    console.error("Error en feedback:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCartPurchasedHandler;
