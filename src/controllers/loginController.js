function loginController(req, res) {
  const {
    authorization,
  } = req.headers;
  
  return res.status(200).json({ token: authorization });
}

module.exports = loginController;
