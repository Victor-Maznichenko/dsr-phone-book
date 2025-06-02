'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hideBirthYear: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      workPhone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      position: Sequelize.STRING,
      department: Sequelize.STRING,
      workAddress: Sequelize.STRING,
      about: Sequelize.TEXT,
      photo: Sequelize.STRING,
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE
    });
    
    // Индекс для поиска по имени
    await queryInterface.addIndex('users', ['fullName']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
