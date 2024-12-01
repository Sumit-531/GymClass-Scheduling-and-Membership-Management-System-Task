'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classSchedule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      // foreign key
      trainerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user', // Links to the `user` table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      maxTrainees: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      currentTrainees: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      // Foregin key
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user', // Admin who created the schedule
          key: 'id',
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classSchedule');
  }
};