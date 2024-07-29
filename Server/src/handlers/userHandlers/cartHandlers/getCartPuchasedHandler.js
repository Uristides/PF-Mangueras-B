const {
  getCartPuchased,
} = require("../../../controllers/userControllers/cartControllers/getCartPurchased");

const getCartPuchasedHandler = async (req, res) => {
  try {
    const paymentId = req.query.payment_id;
    const status = req.query.status;
    const merchantOrderId = req.query.merchant_order_id;

    if (status !== "approved") {
      return res.json({
        message: "El pago no fue aprobado",
        status,
      });
    }

    // Llamar al controlador para manejar el pago exitoso
    await getCartPuchased(merchantOrderId, paymentId);

    res.json({
      message: "Compra realizada exitosamente",
      paymentId,
      status,
    });
  } catch (error) {
    console.error("Error en feedback:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCartPuchasedHandler;
