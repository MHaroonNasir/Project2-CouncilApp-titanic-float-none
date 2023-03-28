
const Token = require('../models/tokenModel');


async function show(req, res) {
    try {
      const token = req.params.token;
      const userToken = await Token.getUserIdByToken(token);
      
      res.status(200).json({userToken});
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
  module.exports = show