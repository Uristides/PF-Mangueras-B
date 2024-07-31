const { User } = require("../../db");

const editUser = async (id, edit) => {
  const { name, password, email, tercero, status, rol } = edit;
  try {
    await User.update(
      {
        name,
        password,
        email,
        tercero,
        status,
        rol,
      },
      { where: { id } }
    );
    const usuario = await User.findByPk(id);
    return { message: "Usuario actualizado correctamente", usuario };
  } catch (error) {
    console.error("Error en editUser:", error.message);
    throw new Error("Error en editUser: " + error.message);
  }
};

module.exports = editUser;
