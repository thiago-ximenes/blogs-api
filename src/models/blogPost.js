module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPost', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
  }, {
      timestamps: false,
      tableName: 'BlogPosts',
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'id', as: 'user',
    });
    Post.hasMany(models.Category, {
      foreignKey: 'id', as: 'categories',
    });
  };

  return Post;
};
