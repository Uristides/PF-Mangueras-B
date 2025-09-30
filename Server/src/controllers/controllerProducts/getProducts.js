const { Manguera, Brands, Types, Longitudes } = require("../../db");

const getProducts = async () => {
  const products = await Manguera.findAll({
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
};

module.exports = getProducts;
