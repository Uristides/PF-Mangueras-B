const { Manguera, Brands, Types, Longitudes } = require("../../db");

const createProductDB = async (data, longitude, brand, type) => {
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
  const longitudeRelacion = await Longitudes.findAll({
    where: { longitude: longitude },
  });
  await manguera.addLongitudes(longitudeRelacion); // se hace la relacion de las tablas

  return manguera;
};
module.exports = createProductDB;
