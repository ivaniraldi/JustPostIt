const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
  }, {
    timestamps: false,
  });
};
