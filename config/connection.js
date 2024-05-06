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
  }
);

module.exports = sequelize;