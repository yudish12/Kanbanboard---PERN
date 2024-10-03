const { Sequelize } = require("sequelize");

const isProd = process.env.ENV === "production";
// Determine the host based on the environment
module.exports = db = new Sequelize(
  isProd ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME,
  isProd ? process.env.PROD_DB_USERNAME : process.env.DEV_DB_USERNAME,
  isProd ? process.env.PROD_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
  {
    host: isProd ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
    port: isProd ? process.env.PROD_DB_PORT : process.env.DEV_DB_PORT,
    dialectOptions: isProd ? { ssl: { rejectUnauthorized: false } } : {},
    dialect: "postgres",
  }
);
