const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;

const tryConnect = async (retries = 5, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Intento ${i + 1} de conexión a la base de datos...`);
      await conn.authenticate();
      console.log("✅ Conectado a la base de datos");
      return true;
    } catch (err) {
      console.warn("❌ Fallo de conexión:", err.message);
      if (i < retries - 1) {
        console.log(`Reintentando en ${delay / 1000} segundos...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error("💥 No se pudo conectar a la base de datos después de varios intentos.");
        throw err;
      }
    }
  }
};

tryConnect()
  .then(() => {
    // Sincronizar modelos y levantar servidor
    return conn.sync({ force: false });
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error fatal al iniciar el servidor:", err);
    process.exit(1);
  });
