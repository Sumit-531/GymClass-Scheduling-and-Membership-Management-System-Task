'use strict';
const {
  Model, Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define("user", {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      // DataTypes class gives auto suggestion
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.ENUM("0","1","2"),
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    confirmedPassword: {
      // Using virtual to store in the program only, not in the database
      type: DataTypes.VIRTUAL
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
    }, 
    {
      paranoid: true,
      freezeTableName: true,
      modelName: "user",
    });