const { Router } = require('express');

const accountController = require('../controllers/accountController');

const accountRoute = Router();

accountRoute.get("/", accountController.index);
accountRoute.get("/:id", accountController.show);
accountRoute.patch("/:id", accountController.update);
accountRoute.delete("/:id", accountController.destroy);

accountRoute.post("/register", accountController.register);
accountRoute.post("/login", accountController.login);
accountRoute.post("/logout", accountController.logout);

module.exports = accountRoute;
