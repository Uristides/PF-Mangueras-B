const { User } = require("../../../db");

const postRemoveCart = async (id, item) => {
  try {
    const usuario = await User.findByPk(id);

    if (usuario) {
      const [itemId] = item.split(":").map(Number);

      const cartMap = new Map(
        usuario.cart.map((cartItem) => {
          const [cartItemId, cartItemQuantity] = cartItem
            .split(":")
            .map(Number);
          return [cartItemId, cartItemQuantity];
        })
      );
      if (cartMap.has(itemId)) {
        cartMap.delete(itemId);
      } else {
        return { message: "Item not found in cart" };
      }
      usuario.cart = Array.from(cartMap.entries()).map(
        ([id, quantity]) => `${id}:${quantity}`
      );

      await usuario.save();

      return { message: "Item borrado", cart: usuario.cart };
    } else {
      throw new Error("No se encontro usuario");
    }
  } catch (error) {
    console.error("Error en postRemoveCart:", error.message);
    throw new Error("Error in postRemoveCart: " + error.message);
  }
};

module.exports = postRemoveCart;
