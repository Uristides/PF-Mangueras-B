const { User } = require("../../db");

const postaddCart = async (id, item) => {
  try {
    const usuario = await User.findByPk(id);

    if (usuario) {
      console.log("Usuario encontrado:", usuario);

      usuario.cart = [...usuario.cart, item];
      console.log("Carrito después de añadir el item:", usuario.cart);

      await usuario.save();
      console.log("Usuario guardado con el carrito actualizado:", usuario);

      return { message: "Item added to cart", cart: usuario.cart };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error en postaddCart:", error);
    throw new Error("Error in postaddCart: " + error.message);
  }
};

module.exports = postaddCart;
