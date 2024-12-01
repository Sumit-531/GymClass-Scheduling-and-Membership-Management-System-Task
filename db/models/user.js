'use strict';
const {
  Model, Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');
const classschedule = require('./classschedule');

const user = sequelize.define("user", {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      // DataTypes class gives auto suggestion
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.ENUM("0","1","2"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "userType cannot be null",
        },
        notEmpty: {
          msg: "userType cannot be empty.",
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstName cannot be null",
        },
        notEmpty: {
          msg: "firstName cannot be empty.",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastName cannot be null",
        },
        notEmpty: {
          msg: "lastName cannot be empty.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null",
        },
        notEmpty: {
          msg: "email cannot be empty.",
        },
        isEmail: {
          msg: "Invalid email id.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty.",
        },
      },
    },
    confirmedPassword: {
      // Using virtual to store in the program only, not in the database
      type: DataTypes.VIRTUAL,
      // Checking password
      set(value){
        if(this.password.length < 7){
          throw new AppError("Password length must be greater than 7.", 400);
        }

        if(value === this.password){
          // password hashing with bcrypt
          const hashPassword = bcrypt.hashSync(value, 10);
          // password value will updated to the hashPassword
          this.setDataValue("password", hashPassword);       
        } else {
            throw new AppError("Password and confirmed password must be same.", 400);
        }
      }
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

user.hasMany(classschedule, { foreignKey: 'createdBy' });
classschedule.belongsTo(user, {
    foreignKey: 'createdBy',
});

module.exports = user;