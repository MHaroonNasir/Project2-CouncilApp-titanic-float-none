const { Router } = require('express');

const tokenController = require('../controllers/tokenController');


const tokenRoute = Router();

tokenRoute.get("/:token", tokenController);


module.exports = tokenRoute;