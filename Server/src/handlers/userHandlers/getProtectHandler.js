const { SECRET } = process.env;
const { verify } = require("jsonwebtoken");
const protectedHandler = async (req, res) => {
  const token = req.cookies.lacookie;
  try {
    console.log(token);
    if (!token) return res.status(409).send("acceso denegado");
    const data = verify(token, SECRET);
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = protectedHandler;
