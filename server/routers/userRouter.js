const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

module.exports = userRouter;
