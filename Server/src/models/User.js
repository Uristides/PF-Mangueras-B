const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        isUrl: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tercero: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
        defaultValue: "User",
        allowNull: false,
      },
      cart: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
