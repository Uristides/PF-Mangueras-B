const { User } = require("../../db");

const postRemoveCart = async (id, item) => {
  try {
    const usuario = await User.findByPk(id);
    if (usuario) {
      // Filtrar el array para eliminar solo la primera instancia del item
      const updatedCart = usuario.cart.filter((cartItem, index) => {
        return index !== usuario.cart.indexOf(item);
      });

      // Actualizar el usuario con el nuevo array
      await usuario.update({ cart: updatedCart });

      return { message: "Se removió el item", cart: updatedCart };
    } else {
      console.log("No se encontró el usuario");
      return { message: "Usuario no encontrado" };
    }
  } catch (error) {
    console.log(error.message);
    return { message: "Error al remover el item" };
  }
};

module.exports = postRemoveCart;
