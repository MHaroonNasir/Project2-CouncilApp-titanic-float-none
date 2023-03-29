const { Router } = require('express');

const volunteerController = require('../controllers/volunteerController');

const volunteerRoute = Router();

volunteerRoute.get("/a", volunteerController.index);
volunteerRoute.get("/", volunteerController.show);
volunteerRoute.post("/", volunteerController.create);
volunteerRoute.patch("/:id", volunteerController.update);
volunteerRoute.delete("/:id", volunteerController.destroy);
// volunteerRoute.get("/:userId=id", volunteerController.getByUserId);

module.exports = volunteerRoute;
