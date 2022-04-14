const jwtHelper = require('../util/jwt');
const userService = require('../services/userService');
const blogPostService = require('../services/blogPostService');

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
    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
  }
} 

module.exports = {
  createPost,
};