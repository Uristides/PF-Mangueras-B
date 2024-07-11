const { Manguera } = require("./db")
const db = require("./db.json");

const checkIfEmpty = async () => {
    try {
        const count = await Manguera.count();
        const empty = count === 0 ? true : false
        return empty;
    } catch (error) {
        console.error('Error al verificar si la tabla está vacía:', error)
        throw error
    }
};

const parceoDB = async () => {
    try {
      // Mapeo
      const manguerasToInsert = db.map((mang) => {
        return {
          name: mang.name,
          image: mang.image,
          price: mang.price, // Si "continents" es un array, elige el primer elemento, o ajusta según la estructura real
          diameter: mang.diameter,
          longitude: mang.longitude,
          brand: mang.brand,
          type: mang.type,
          description: mang.description,
          available: mang.available,
        };
      });
  
      // Utiliza bulkCreate para insertar los datos en la base de datos
      await Manguera.bulkCreate(manguerasToInsert);
  
      console.log(
        "Los datos se han insertado correctamente en la base de datos."
      );
    } catch (error) {
      console.error(
        "Error al obtener datos de mangueras o al insertar datos en la base de datos:",
        error
      );
    }
  };

module.exports = { checkIfEmpty, parceoDB }