const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("stock", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey: true
    },
    available_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {timestamps: false});
};