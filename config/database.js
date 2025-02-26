require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Yay, the database is connected successfully!");
  } catch (error) {
    console.error(":( connection failure", error);

  }
 }
module.exports = { sequelize, connectDB };