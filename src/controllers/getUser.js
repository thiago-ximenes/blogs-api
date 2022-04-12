const { User } = require('../models');

async function getUser(_req, res) {
  try {
    const users = await User.findAll();

      return res.status(200).json(users);
  } catch (e) {
    console.error(e.message);
  }
}

module.exports = getUser;
