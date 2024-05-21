const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
