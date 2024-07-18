require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
//comentar :19082 si se ejeca en local
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:19082/${DB_NAME}`,
  {
    logging: false,
    native: false,
    dialectOptions: {
      connectTimeout: 60000, // 60 segundos
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000, // 60 segundos
      idle: 10000,
    },
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Función para agregar modelos desde una carpeta específica
const addModelsFromFolder = (folderPath) => {
  fs.readdirSync(folderPath)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(folderPath, file)));
    });
};

// Agregar modelos desde la carpeta "models"
addModelsFromFolder(path.join(__dirname, "/models"));

// Agregar modelos desde la carpeta "categories"
addModelsFromFolder(path.join(__dirname, "/models/categories"));

// Definir los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizar nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Aca los modelos de la base de datos
const { Manguera, Order, Review, Stock, User, Brands, Longitudes, Types } =
  sequelize.models;

// Aca vendrian las relaciones

// Relación uno a muchos (1:N) entre Manguera y Brands
Manguera.belongsTo(Brands, { foreignKey: "brandId" });
Brands.hasMany(Manguera, { foreignKey: "brandId" });
// Relación uno a muchos (1:N) entre Manguera y Types
Manguera.belongsTo(Types, { foreignKey: "typeId" });
Types.hasMany(Manguera, { foreignKey: "typeId" });

//User.hasMany(Order, { foreignKey: "userId" });
//Cart.belongsTo(User, { foreignKey: "userId" });
//Manguera.hasMany(Review);
//Review.belongsTo(Manguera);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js')
};
