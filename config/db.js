const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('salim', 'root', 'Karthick@1601', {
    host: "localhost",
    dialect: "mysql"
})

module.exports = sequelize