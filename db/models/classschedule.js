const sequelize = require("../../config/database");
const { DataTypes } = require('sequelize');

module.exports = sequelize.define(
  'classSchedule',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Class date cannot be null',
        },
        isDate: {
          msg: 'Class date must be a valid date',
        },
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Start time cannot be null',
        },
      },
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'End time cannot be null',
        },
      },
    },
    trainerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      validate: {
        notNull: {
          msg: 'Trainer ID cannot be null',
        },
      },
    },
    maxTrainees: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      validate: {
        min: {
          args: 1,
          msg: 'Min trainees must be at least 1',
        },
        max: {
          args: 10,
          msg: 'Max trainees cannot exceed 10',
        },
      },
    },
    currentTrainees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: 0,
          msg: 'Current trainees cannot be negative',
        },
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      validate: {
        notNull: {
          msg: 'Created by admin ID cannot be null',
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  { // enables soft deletion
    paranoid: true, 
    freezeTableName: true,
    modelName: 'classSchedule',
  }
);