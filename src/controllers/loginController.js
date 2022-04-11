function createUser(req, res) {
  const {
    token,
  } = req.body;
  
  return res.status(201).json({ token });
}

module.exports = createUser;
