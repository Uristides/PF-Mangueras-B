const { Manguera, Brands, Types, Longitudes } = require("./db");
const db = require("./db.json");

const checkIfEmpty = async () => {
  try {
    const count = await Manguera.count();
    const empty = count === 0;
    return empty;
  } catch (error) {
    console.error("Error al verificar si la tabla está vacía:", error);
    throw error;
  }
};

const parceoDB = async () => {
  try {
    // Mapeo de datos a insertar
    const manguerasToInsert = db.map((mang) => ({
      name: mang.name,
      image: mang.image,
      price: mang.price,
      diameter: mang.diameter,
      brand: mang.brand,
      type: mang.type,
      description: mang.description,
      stock: mang.stock,
      available: mang.available,
      show: mang.show,
      longitude: mang.longitude, // Incluimos la longitud para luego hacer la relación
    }));

    // Inserción de datos estáticos
    await Brands.bulkCreate([
      { brand: "HydroPro" },
      { brand: "AquaMaster" },
      { brand: "EcoHose" },
      { brand: "AquaFlow" },
      { brand: "GreenWave" },
    ]);
    await Types.bulkCreate([
      { type: "Domestico" },
      { type: "Jardineria" },
      { type: "Agricultura" },
    ]);

    // Inserción de mangueras con relaciones
    for (const mang of manguerasToInsert) {
      const marca = await Brands.findOne({ where: { brand: mang.brand } });
      const tipo = await Types.findOne({ where: { type: mang.type } });

      const manguera = await Manguera.create({
        name: mang.name,
        image: mang.image,
        price: mang.price,
        diameter: mang.diameter,
        longitude: mang.longitude,
        description: mang.description,
        stock: mang.stock,
        available: mang.available,
        show: mang.show,
        brandId: marca.id,
        typeId: tipo.id,
      });
    }
  } catch (error) {
    console.error(
      "Error al obtener datos de mangueras o al insertar datos en la base de datos:",
      error
    );
  }
};

module.exports = { checkIfEmpty, parceoDB };
