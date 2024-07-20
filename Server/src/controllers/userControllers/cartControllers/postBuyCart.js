const { User, Manguera, Order } = require("../../../db");

const postBuyCart = async (id, totalAmount) => {
  try {
    // Obtén el usuario por su ID
    const usuario = await User.findByPk(id);

    if (!usuario) {
      throw new Error(`Usuario con ID ${id} no encontrado.`);
    }

    // Obtén el carrito del usuario y verifica que sea un array
    const cart = usuario.cart;
    if (!Array.isArray(cart)) {
      throw new Error("El carrito del usuario no está en el formato esperado.");
    }

    console.log("Carrito del usuario:", cart);

    // Recopilar información sobre productos con stock insuficiente
    let stockIssues = [];

    // Primera iteración: verificar stock
    for (let item of cart) {
      const [idProducto, cantidad] = item.split(":").map(Number);
      const manguera = await Manguera.findByPk(idProducto);

      if (manguera) {
        if (manguera.stock < cantidad) {
          stockIssues.push({
            idProducto,
            stock: manguera.stock,
            cantidadRequerida: cantidad,
          });
        }
      } else {
        stockIssues.push({ idProducto, stock: 0, cantidadRequerida: cantidad });
      }
    }

    // Si hubo problemas de stock, lanzar un error con la información recopilada
    if (stockIssues.length > 0) {
      throw new Error(
        `Stock insuficiente para algunos productos: ${JSON.stringify(
          stockIssues
        )}`
      );
    }

    // Segunda iteración: actualizar stock y crear la orden
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

    // Crear la orden antes de vaciar el carrito
    const order = await usuario.createOrder({
      cart, // No es necesario convertir a JSON, ya que cart ya es un array de strings
      status: true,
      amount: totalAmount,
    });

    console.log(`Orden creada con éxito: ${order.id}`);

    // Vacía el carrito del usuario si la orden se creó correctamente
    usuario.cart = [];

    // Guarda los cambios en el usuario
    await usuario.save();
    console.log(`Carrito del usuario ID ${id} vaciado.`);

    return { message: "Compra realizada exitosamente", orderId: order.id };
  } catch (error) {
    console.error("No se efectuó la compra:", error.message);
    throw new Error("No se efectuó la compra: " + error.message);
  }
};

module.exports = postBuyCart;
