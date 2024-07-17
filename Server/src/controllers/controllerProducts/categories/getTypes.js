const { Types } = require("../../../db");

const getTypes = async () => {
  return await Types.findAll();
};
module.exports = getTypes;
