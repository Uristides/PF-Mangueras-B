const { Manguera, Brands, Types, Longitudes } = require("../../db");

const getProducts = async () => {
  const products = await Manguera.findAll({
    include: [
      {
        model: Brands,
        attributes: ["brand"],
        as: "brand", // Especifica un alias para la marca
      },
      {
        model: Types,
        attributes: ["type"],
        as: "type", // Especifica un alias para el tipo
      },
      {
        model: Longitudes,
        attributes: ["longitude"],
        through: { attributes: [] }, // Relación muchos a muchos
        as: "longitudes", // Especifica un alias para las longitudes
      },
    ],
  });

  // Mapea los resultados para transformar las longitudes en un array simple
  const transformedProducts = products.map((product) => {
    const transformedProduct = product.toJSON();
    // Renombra la propiedad longitudes a longitude
    transformedProduct.longitude = transformedProduct.longitudes
      ? transformedProduct.longitudes.map((l) => l.longitude)
      : [];
    delete transformedProduct.longitudes; // Elimina la propiedad longitudes
    transformedProduct.brand = transformedProduct.brand
      ? transformedProduct.brand.brand
      : null; // Asegura que la propiedad brand tenga solo el nombre
    transformedProduct.type = transformedProduct.type
      ? transformedProduct.type.type
      : null; // Asegura que la propiedad type tenga solo el nombre
    delete transformedProduct.brandId; // Elimina la clave foránea brandId del objeto resultante
    delete transformedProduct.typeId; // Elimina la clave foránea typeId del objeto resultante
    return transformedProduct;
  });

  return transformedProducts;
};

module.exports = getProducts;
