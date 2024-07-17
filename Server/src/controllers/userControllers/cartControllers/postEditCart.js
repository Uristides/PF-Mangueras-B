const { User } = require("../../../db");

const editCart = async (id, item) => {
  try {
    const usuario = await User.findByPk(id);

    if (usuario) {
      const [itemId, itemQuantity] = item.split(":").map(Number);
      const itemIndex = usuario.cart.findIndex((cartItem) => {
        const [cartItemId] = cartItem.split(":").map(Number);
        return cartItemId === itemId;
      });

      if (itemIndex !== -1) {
        usuario.cart[itemIndex] = item;
      } else {
        usuario.cart.push(item);
      }
      await usuario.save();

      return { message: "Item updated in cart", cart: usuario.cart };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error in editCart:", error.message);
    throw new Error("Error in editCart: " + error.message);
  }
};

module.exports = editCart;
