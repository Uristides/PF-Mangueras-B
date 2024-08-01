const { Op } = require("sequelize");
const { Manguera, Brands, Types } = require("../../db");

const getProductByName = async (name) => {
  try {
    const products = await Manguera.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Brands,
          attributes: ["brand"],
          as: "brand",
        },
        {
          model: Types,
          attributes: ["type"],
          as: "type",
        },
      ],
    });

    const transformedProducts = products.map((product) => {
      const transformedProduct = product.toJSON();
      transformedProduct.brand = transformedProduct.brand
        ? transformedProduct.brand.brand
        : null;
      transformedProduct.type = transformedProduct.type
        ? transformedProduct.type.type
        : null;
      delete transformedProduct.brandId;
      delete transformedProduct.typeId;
      return transformedProduct;
    });

    return transformedProducts;
  } catch (error) {
    console.log(error);
    throw new Error("Error al buscar Producto");
  }
};

module.exports = getProductByName;
