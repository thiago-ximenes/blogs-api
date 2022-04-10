'use strict';

const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
