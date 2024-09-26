const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Comentarios", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    publicacao_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qtd_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
