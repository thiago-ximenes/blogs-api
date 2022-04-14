module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
      name: DataTypes.STRING,
  }, {
      timestamps: false,
  });

  // Category.associate = (models) => {
  //     Category.belongsToMany(models.Post, {
  //         through: 'PostCategory',
  //         foreignKey: 'categoryId',
  //         as: 'posts',
  //     });
  // };

  return Category;
};