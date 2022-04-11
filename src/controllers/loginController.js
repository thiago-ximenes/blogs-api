function loginController(req, res) {
  const {
    token,
  } = req.body;
  
  return res.status(200).json({ token });
}

module.exports = loginController;
