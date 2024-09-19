const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Usuarios", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
