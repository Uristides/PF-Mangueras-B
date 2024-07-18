const getUser = require("../../controllers/userControllers/getUser");

const getUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getUser(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getUserHandler;
