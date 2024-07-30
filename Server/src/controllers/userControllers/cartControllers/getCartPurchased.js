const mercadopago = require("mercadopago");
const { User, Manguera, Order } = require("../../models"); // Ajusta las rutas a tus modelos

const client = new mercadopago.MercadoPagoConfig({
  accessToken:
    "TEST-8914053964380499-072819-0e25f688909c7429f596f12992b0c3f3-1921011382",
});

const preference = new mercadopago.Preference(client);

const getCartPurchased = async (merchantOrderId, totalPrice) => {
  try {
    const response = await preference.merchant_orders.findById(merchantOrderId);

    const userId = response.body.payer.id;
    const usuario = await User.findByPk(userId);

    if (!usuario) {
      throw new Error(`Usuario con ID ${userId} no encontrado.`);
    }

    const cart = usuario.cart;

    if (!usuario.purchases) {
      usuario.purchases = [];
    }

    for (let item of cart) {
      const [idProducto, cantidad] = item.split(":").map(Number);
      const manguera = await Manguera.findByPk(idProducto);

      manguera.stock -= cantidad;

      if (manguera.stock === 0) {
        manguera.available = false;
      }

      await manguera.save();

      if (!usuario.purchases.includes(idProducto)) {
        usuario.purchases.push(idProducto);
      }
    }

    const order = await Order.create({
      userId: usuario.id,
      cart,
      status: true,
      amount: totalPrice,
    });

    usuario.cart = [];
    await usuario.save();

    return order;
  } catch (error) {
    console.error("Error en handleSuccessfulPayment:", error.message);
    throw new Error("Error al manejar el pago exitoso: " + error.message);
  }
};

module.exports = {
  getCartPurchased,
};
