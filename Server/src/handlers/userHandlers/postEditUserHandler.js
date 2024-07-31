const editUser = require("../../controllers/userControllers/postEditUser");

const postEditUserHandler = async (req, res) => {
  const { id, name, password, email, tercero, status, rol } = req.body;
  try {
    const edit = {
      name: name,
      password: password,
      email: email,
      tercero: tercero,
      status: status,
      rol: rol,
    };
    const response = await editUser(id, edit);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postEditUserHandler;
