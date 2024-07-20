const getOrders = require("../../controllers/userControllers/getOrders");

const getOrdersHandler = async (req, res) => {
  try {
    res.status(200).send(await getOrders());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getOrdersHandler;
