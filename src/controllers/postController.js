const jwtHelper = require('../util/jwt');
const userService = require('../services/userService');
const blogPostService = require('../services/blogPostService');
const { BlogPost, User, Category } = require('../models');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  const tokenData = jwtHelper.jwtVerify(authorization);
  
  try {
    const user = await userService.getUserInfoByEmail(tokenData.data.email);
    const post = await blogPostService.createPost({
      userId: user.dataValues.id,
      title,
      content,
      categoryIds,
    });
    console.log(post);

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
  }
}

async function getAllPosts(_req, res) {
  try {
    const posts = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user',
        // attribute: { exclude: ['password', 'userId'] },
      }, {
        model: Category,
        as: 'categories',
      }],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createPost,
  getAllPosts,
};