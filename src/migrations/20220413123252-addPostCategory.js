'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostCategory', {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('PostCategory');
  }
};
