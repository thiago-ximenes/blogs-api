module.exports = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {}, {
      timestamps: false, tableName: 'PostCategory',
  });

  postCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categoriesBlogs',
      through: 'PostCategory',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  
  return postCategory;
};