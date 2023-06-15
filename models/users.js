const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const Images = require("../models/images")

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },

}, {
    timestamps: false,
    freezeTableName: true
})
Users.hasMany(Images, { foreignKey: 'UserId' });
module.exports = Users