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
    //added the db_port for the ones who use a different port number
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;