const { Longitudes } = require("../../../db");

const getLongitude = async () => {
  return await Longitudes.findAll();
};
module.exports = getLongitude;
