const { User } = require("../../db");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(409).send("email no registrado");
    } else {
      const claveValida = await compare(password, user.password);
      if (claveValida) {
        const token = sign(
          { name: user.name, email: user.email, rol: user.rol },
          SECRET,
          { expiresIn: "1h" }
        );
        return res
          .cookie("lacookie", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
          })
          .send(user);
      } else {
        return res.status(409).send("contrseña invalida");
      }
    }
  } catch (error) {}
};

module.exports = loginUserHandler;
