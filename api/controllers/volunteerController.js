//const { use } = require('../api');
const volunteerModel = require('../models/volunteerModel');

async function index(req, res) {
    try {
        const volunteer = await volunteerModel.getAll();
        res.status(200).json(volunteer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  
async function show(req, res) {
    try {
      //req.query is object
      const queryArr = Object.keys(req.query);
      const userId = req.query[queryArr[0]];
      const volunteer = await volunteerModel.getOneById(userId, queryArr[0]);
      res.status(200).json(volunteer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
}; 
  
async function create(req, res) {
    try {
      const data = req.body;
      const volunteer = await volunteerModel.create(data);
      res.status(201).json(volunteer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
};
  
async function update(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const data = req.body;
        const volunteer = await volunteerModel.getOneById(userId, "volunteer_id");
        const result = await volunteer.update(data);
        res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
};
  
async function destroy(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const volunteer = await volunteerModel.getOneById(userId, "volunteer_id");
      const result = await volunteer.destroy();
      res.status(204).json(result);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
 };

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
