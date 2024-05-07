// import sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

// establishing database connection with provided creds
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;