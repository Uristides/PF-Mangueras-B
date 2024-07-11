const { Manguera } = require("../../db");

const createProductDB = async (data /*brands*/) => {
  const manguera = await Manguera.create(data);
  //futuras relaciones ej
  //const brandRelacion = await brandDB.findAll({
  //  where: { Nombre: brands },
  // });
  //await manguera.addBrandDB(brandRelacion);  // se hace la relacion de las tablas

  return manguera;
};
module.exports = createProductDB;
