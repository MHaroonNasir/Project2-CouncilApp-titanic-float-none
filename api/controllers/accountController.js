const bcrypt = require("bcrypt");

const Token = require("../models/tokenModel");
const accountModel = require("../models/accountModel");

async function index(req, res) {
  try {
    const account = await accountModel.getAll();
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const userId = req.params.id;
    const account = await accountModel.getOneById(userId);
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const account = await accountModel.create(data);
    res.status(201).json(account);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const data = req.body;
    const account = await accountModel.getOneById(userId);
    const result = await account.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const account = await accountModel.getOneById(userId);
    const result = await account.destroy();
    res.status(204).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    data["password"] = await bcrypt.hash(data["password"], salt);

    const result = await accountModel.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
async function login(req, res) {
  const data = req.body;
  try {
    const user = await accountModel.getOneByUsername(data.username);
    const authenticated = await bcrypt.compare(data.password, user["password"]);

    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      const token = await Token.create(user.user_id);
      res.status(200).json({ authenticated: true, token: token.token });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}
async function logout(req, res) {
  const data = req.body;
  try {
    const token = await Token.getOneByToken(data.token);
    if (!token) throw new Error("Invalid token.");
    const result = await token.destroy();
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = {
  index,
  show,
  update,
  destroy,
  register,
  login,
  logout,
};
