const { Manguera, Brands, Types } = require("../../db");

const createProductDB = async (data, brand, type) => {
  const marca = await Brands.findOne({
    where: { brand: brand },
  });
  const tipo = await Types.findOne({
    where: { type: type },
  });

  const manguera = await Manguera.create({
    ...data,
    brandId: marca.id,
    typeId: tipo.id,
  });
  return manguera;
};
module.exports = createProductDB;
