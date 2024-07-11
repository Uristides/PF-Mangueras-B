const { Op } = require("sequelize");
const { Manguera } = require("../../db");

const getProductByName = async (name) => {
  try {
    const products = await Manguera.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar Producto");
  }
};

module.exports = getProductByName;
