const { User } = require("../../db");

const getUsersHandler = async (req, res) => {
  try {
    const data = await User.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getUsersHandler;
