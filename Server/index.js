const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;

console.log("Intentando conectar a la base de datos...");

conn
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos conectada");
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
