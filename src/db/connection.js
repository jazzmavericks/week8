require("dotenv").config();
const {Sequelize} = require("sequelize");

const SQLConnection = new Sequelize(process.env.MYSQL_URI);

SQLConnection.authenticate();

console.log("connected to database");

module.exports = SQLConnection;