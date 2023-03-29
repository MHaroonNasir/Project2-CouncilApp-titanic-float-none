const { Router } = require('express');

const volunteerController = require('../controllers/volunteerController');

const volunteerRoute = Router();

//volunteerRoute.get("/get", volunteerController.index);
volunteerRoute.get("/", volunteerController.show);
volunteerRoute.post("/", volunteerController.create);
volunteerRoute.patch("/:id", volunteerController.update);
volunteerRoute.delete("/:id", volunteerController.destroy);

module.exports = volunteerRoute;
