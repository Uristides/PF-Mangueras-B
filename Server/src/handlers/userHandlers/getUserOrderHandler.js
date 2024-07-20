const getUserOrders = require("../../controllers/userControllers/getUserOrders");

const getUserOrdersHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getUserOrders(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getUserOrdersHandler;
