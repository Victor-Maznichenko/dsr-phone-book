'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      fields: ['workPhone'],
      type: 'unique',
      name: 'unique_workPhone_constraint'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('users', 'unique_workPhone_constraint');
  }
};
