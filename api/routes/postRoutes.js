const { Router } = require("express");


const postController = require('../controllers/postController');
const authenticator = require('../middleware/authenticator');


const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.get("/top", postController.getTop);
postRouter.get("/:id", postController.show);
postRouter.get("/user/:id", postController.getByUserId);
postRouter.post("/",authenticator, postController.create);
postRouter.delete("/:id", postController.destroy);
postRouter.patch("/:id", postController.update);

module.exports = postRouter;
