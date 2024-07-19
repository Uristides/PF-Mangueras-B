const { User, Manguera } = require("../../../db");

const postBuyCart = async (id) => {
  try {
    // Obtén el usuario por su ID
    const usuario = await User.findByPk(id);

    if (!usuario) {
      throw new Error(`Usuario con ID ${id} no encontrado.`);
    }

    // Obtén el carrito del usuario
    const cart = usuario.cart;
    console.log("Carrito del usuario:", cart);

    // Recopilar información sobre productos con stock insuficiente
    let stockIssues = [];

    // Itera sobre cada elemento del carrito
    for (let item of cart) {
      // Desestructura el item para obtener idProducto y cantidad
      const [idProducto, cantidad] = item.split(":").map(Number);

      // Encuentra la manguera (producto) por su ID
      const manguera = await Manguera.findByPk(idProducto);

      if (manguera) {
        if (manguera.stock >= cantidad) {
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
        } else {
          console.warn(
            `Stock insuficiente para el producto ID ${idProducto}. Stock actual: ${manguera.stock}, Cantidad requerida: ${cantidad}`
          );
          stockIssues.push({
            idProducto,
            stock: manguera.stock,
            cantidadRequerida: cantidad,
          });
        }
      } else {
        console.warn(`Producto con ID ${idProducto} no encontrado.`);
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

    // Vacía el carrito del usuario si no hubo problemas de stock
    usuario.cart = [];

    // Guarda los cambios en el usuario
    await usuario.save();
    console.log(`Carrito del usuario ID ${id} vaciado.`);

    return { message: "Compra realizada exitosamente" };
  } catch (error) {
    console.error("No se efectuó la compra:", error.message);
    throw new Error("No se efectuó la compra: " + error.message);
  }
};

module.exports = postBuyCart;
