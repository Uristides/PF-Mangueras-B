const { User } = require("../../db");

const editUser = async (id, edit) => {
  const { name, password, email, tercero, rol } = edit;
  try {
    await User.update(
      {
        name,
        password,
        email,
        tercero,
        rol,
      },
      { where: { id } }
    );

    return { message: "Usuario actualizado correctamente" };
  } catch (error) {
    console.error("Error en editUser:", error.message);
    throw new Error("Error en editUser: " + error.message);
  }
};

module.exports = editUser;
