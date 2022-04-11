const { User } = require('../models');

async function createUser(req, res) {
  const {
    token,
    displayName,
    password,
    email,
    image,
  } = req.body;

  try {
    await User.create({
        displayName,
        password,
        email,
        image,
      });

      return res.status(201).json({ token });
  } catch (e) {
    console.error(e.message);
  }
}

module.exports = createUser;
