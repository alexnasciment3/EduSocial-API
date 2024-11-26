import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/database.js";

class Usuario extends Model {}

Usuario.init(
  {
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
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // criado_em: {
    //   type: DataTypes.DATE,
    //   defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    modelName: "Usuarios",
    timestamps: false,
  }
);

export default Usuario;
