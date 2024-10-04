try {
  require("dotenv").config();
} catch (err) {}

module.exports = {
  dialect: "sqlite",
  storage: "./database/database.sqlite",
  modules: ["src/models"],
};

//  module.exports = {
//    dialect: 'postgres',
//    host: process.env.POSTGRES_HOST || 'db',
//    port: parseInt(process.env.POSTGRES_PORT || '5432'),
//    username: process.env.POSTGRES_USER,
//    password: process.env.POSTGRES_PASSWORD,
//    database: process.env.POSTGRES_DB,
//  };
