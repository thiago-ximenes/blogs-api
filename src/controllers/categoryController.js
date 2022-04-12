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

async function getCategories(_req, res) {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  create,
  getCategories,
};