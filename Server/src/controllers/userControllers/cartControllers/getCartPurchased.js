const mercadopago = require("mercadopago");
const { User, Manguera, Order } = require("../../models"); // Ajusta las rutas a tus modelos

const getCartPurchased = async (userId, totalPrice) => {
  try {
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
