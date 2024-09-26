const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

const Usuarios = require("../models/Usuarios")(sequelize);
const Publicacoes = require("../models/Publicacoes")(sequelize);

Usuarios.hasMany(Publicacoes, { foreignKey: "usuario_id" });
Publicacoes.belongsTo(Usuarios, { foreignKey: "usuario_id" });

sequelize.sync();

module.exports = { sequelize, Usuarios, Publicacoes };
