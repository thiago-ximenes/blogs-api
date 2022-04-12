const { User } = require('../models');

async function getUser(req, res) {
  const { id } = req.params;

  try {
    const userInfo = await User.findOne({
      where: {
        id,
    },
  });

  const { password, ...user } = userInfo.dataValues;

      return res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
  }
}

module.exports = getUser;
