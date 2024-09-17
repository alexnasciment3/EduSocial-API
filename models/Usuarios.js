const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuarios', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    nome: {
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
    nasciemento:{
        type: DataTypes.DATE,
        allowNull: false,
        },
    imagen:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    creado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    atualizado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
  });
};
