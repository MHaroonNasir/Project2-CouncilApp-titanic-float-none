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
    console.log(userId);
    const account = await accountModel.getOneById(userId);
    console.log(account);
    const result = await account.destroy();
    res.status(204).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
