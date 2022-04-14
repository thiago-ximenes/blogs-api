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

  return Post;
};
