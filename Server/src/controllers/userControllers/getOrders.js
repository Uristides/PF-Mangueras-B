const { Order } = require("../../db");

const getOrders = async () => {
  return await Order.findAll();
};
module.exports = getOrders;
