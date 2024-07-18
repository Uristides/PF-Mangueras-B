const { User } = require("../../db");

const getUser = async (id) => {
  try {
    const usuario = await User.findByPk(id);
    return usuario;
  } catch (error) {}
};

module.exports = getUser;
