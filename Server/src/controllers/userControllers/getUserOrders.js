const { Order } = require("../../db");

const getUserOrder = async (id) => {
  const orders = Order.findAll({ where: { userId: id } });

  return orders;
};

module.exports = getUserOrder;
