const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

const Usuarios = require("../models/Usuarios")(sequelize);
const Publicacoes = require("../models/Publicacoes")(sequelize);
const Comentarios = require("../models/Comentarios")(sequelize);

//Declaração de relacionamento entre usuários e publicações
Usuarios.hasMany(Publicacoes, { foreignKey: "usuario_id" });

//Declaração de relacionamento entre publicações e usuários
Publicacoes.belongsTo(Usuarios, { foreignKey: "usuario_id" });

//Declaração de relacionamento entre publicações e comentários
Comentarios.belongsTo(Usuarios, { foreignKey: "usuario_id" });
Comentarios.belongsTo(Publicacoes, { foreignKey: "publicacao_id" });

sequelize.sync();

module.exports = { sequelize, Usuarios, Publicacoes, Comentarios };
