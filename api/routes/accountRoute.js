const { Router } = require('express');

const accountController = require('../controllers/accountController');

const accountRoute = Router();

accountRoute.get("/", accountController.index);
accountRoute.get("/:id", accountController.show);
accountRoute.post("/", accountController.create);
accountRoute.patch("/:id", accountController.update);
accountRoute.delete("/:id", accountController.destroy);

module.exports = accountRoute;
