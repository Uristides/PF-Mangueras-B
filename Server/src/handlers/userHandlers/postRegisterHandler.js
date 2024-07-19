const { User } = require("../../db");
const { hashSync } = require("bcrypt");

const registerUserHandler = async (req, res) => {
  const { name, password, email, rol } = req.body;

  try {
    const UserExist = await User.findOne({ where: { email: email } });
    if (UserExist) {
      return res.status(409).send("email ya registrado");
    } else {
      const hashedPW = hashSync(password, 3);
      const response = await User.create({
        name,
        password: hashedPW,
        email,
        rol,
      });
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = registerUserHandler;
