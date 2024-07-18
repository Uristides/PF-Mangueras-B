const { User } = require("../../../db");

const editCart = async (id, item) => {
  try {
    const usuario = await User.findByPk(id);

    if (!usuario) {
      throw new Error("User not found");
    }

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

    await User.update({ cart: usuario.cart }, { where: { id: id } });

    return { message: "Item updated in cart", cart: usuario.cart };
  } catch (error) {
    console.error("Error in editCart:", error.message);
    throw new Error("Error in editCart: " + error.message);
  }
};

module.exports = editCart;
