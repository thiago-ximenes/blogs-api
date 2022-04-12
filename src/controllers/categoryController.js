const categoryService = require('../services/categoryService');

async function create(req, res) {
  const { name } = req.body;

  try {
    const category = await categoryService.create(name);
    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  create,
};