const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/messenger", {
  logging: false,
  username: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD
});

module.exports = db;
