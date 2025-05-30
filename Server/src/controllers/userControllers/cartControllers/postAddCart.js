const { User } = require("../../../db");

const postaddCart = async (id, item) => {
  try {
    const usuario = await User.findByPk(id);

    if (usuario) {
      console.log("Usuario encontrado:", usuario);

      const [itemId, itemQuantity] = item.split(":").map(Number);

      const cartMap = new Map(
        usuario.cart.map((cartItem) => {
          const [cartItemId, cartItemQuantity] = cartItem
            .split(":")
            .map(Number);
          return [cartItemId, cartItemQuantity];
        })
      );

      if (cartMap.has(itemId)) {
        const existingQuantity = cartMap.get(itemId);
        cartMap.set(itemId, existingQuantity + itemQuantity);
      } else {
        cartMap.set(itemId, itemQuantity);
      }

      usuario.cart = Array.from(cartMap.entries()).map(
        ([id, quantity]) => `${id}:${quantity}`
      );

      console.log(
        "Carrito después de añadir/actualizar el item:",
        usuario.cart
      );

      await usuario.save();
      console.log("Usuario guardado con el carrito actualizado:", usuario);

      return { message: "Item added/updated in cart", cart: usuario.cart };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error en postaddCart:", error);
    throw new Error("Error in postaddCart: " + error.message);
  }
};

module.exports = postaddCart;
