const getCartPuchased = async (merchantOrderId, paymentId) => {
  try {
    // Obtener la preferencia de pago para identificar al usuario y el carrito
    const response = await preference.findById(merchantOrderId);

    // Suponiendo que tienes la información del usuario en la preferencia
    const userId = response.body.payer.id; // Ajusta según tu estructura de datos
    const usuario = await User.findByPk(userId);

    if (!usuario) {
      throw new Error(`Usuario con ID ${userId} no encontrado.`);
    }

    const cart = usuario.cart;

    // Actualizar stock y crear la orden
    for (let item of cart) {
      const [idProducto, cantidad] = item.split(":").map(Number);
      const manguera = await Manguera.findByPk(idProducto);

      // Resta la cantidad del stock actual
      console.log(
        `Actualizando stock del producto ID ${idProducto}: ${manguera.stock} - ${cantidad}`
      );
      manguera.stock -= cantidad;

      // Si el stock llega a 0, cambia available a false
      if (manguera.stock === 0) {
        manguera.available = false;
      }

      // Guarda los cambios en la base de datos
      await manguera.save();
      console.log(
        `Stock actualizado para el producto ID ${idProducto}: ${manguera.stock}`
      );
    }

    // Crear la orden
    const order = await usuario.createOrder({
      cart,
      status: true,
      amount: response.body.total_amount, // Ajusta según tu estructura de datos
    });

    console.log(`Orden creada con éxito: ${order.id}`);

    // Vacía el carrito del usuario si la orden se creó correctamente
    usuario.cart = [];

    // Guarda los cambios en el usuario
    await usuario.save();
    console.log(`Carrito del usuario ID ${userId} vaciado.`);
  } catch (error) {
    console.error("Error en handleSuccessfulPayment:", error.message);
    throw new Error("Error al manejar el pago exitoso: " + error.message);
  }
};

module.exports = {
  getCartPuchased,
};
