const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const Users = require("../models/users")

const Images = sequelize.define('Images', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
})




module.exports = Images