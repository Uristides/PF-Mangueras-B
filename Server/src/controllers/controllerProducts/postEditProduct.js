const { Manguera, Brands, Types } = require("../../db");

const postEditProduct = async (id, edit, brand, type) => {
  const {
    name,
    image,
    price,
    diameter,
    longitude,
    description,
    stock,
    available,
    show,
  } = edit;

  try {
    const marca = await Brands.findOne({
      where: { brand: brand },
    });
    if (!marca) {
      throw new Error(`Brand not found: ${brand}`);
    }

    const tipo = await Types.findOne({
      where: { type: type },
    });
    if (!tipo) {
      throw new Error(`Type not found: ${type}`);
    }

    await Manguera.update(
      {
        name,
        image,
        price,
        diameter,
        longitude,
        description,
        stock,
        available,
        show,
        brandId: marca.id,
        typeId: tipo.id,
      },
      { where: { id } }
    );

    return { message: "Producto actualizado correctamente" };
  } catch (error) {
    console.error("Error en postEditProduct:", error.message);
    throw new Error("Error en postEditProduct: " + error.message);
  }
};

module.exports = postEditProduct;
