const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
});
const Usuarios = require('../models/Usuarios')(sequelize);

sequelize.sync();

module.exports = { sequelize, Usuarios };
