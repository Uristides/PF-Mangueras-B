const { User, Manguera, Order } = require("../../../db"); // Ajusta las rutas a tus modelos

const getCartPurchased = async (userId, totalPrice) => {
  try {
    const usuario = await User.findByPk(userId);

    if (!usuario) {
      throw new Error(`Usuario con ID ${userId} no encontrado.`);
    }

    const cart = usuario.cart;
    const purchases = new Set(usuario.purchases);

    console.log("Usuario encontrado:", usuario);
    console.log("Carrito:", cart);

    const updatePromises = cart.map(async (item) => {
      const [idProducto, cantidad] = item.split(":").map(Number);
      const manguera = await Manguera.findByPk(idProducto);

      if (!manguera) {
        throw new Error(`Producto con ID ${idProducto} no encontrado.`);
      }

      manguera.stock -= cantidad;

      if (manguera.stock === 0) {
        manguera.available = false;
      }

      await manguera.save();

      purchases.add(idProducto);
    });

    await Promise.all(updatePromises);

    usuario.purchases = Array.from(purchases);
    await usuario.save();

    console.log("Actualización de stock y compras completada:", usuario);

    const order = await Order.create({
      userId: usuario.id,
      cart,
      status: true,
      amount: totalPrice,
    });

    usuario.cart = [];
    await usuario.save();

    console.log("Orden creada:", order);

    return order;
  } catch (error) {
    console.error("Error en handleSuccessfulPayment:", error.message);
    throw new Error("Error al manejar el pago exitoso: " + error.message);
  }
};

module.exports = {
  getCartPurchased,
};
