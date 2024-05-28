const createHttpError = require("http-errors");
const { User } = require("../models");
const AuthService = require("../services/auth.service");

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const userWithToken = await AuthService.createSession(user);

    res.status(201).send({ data: userWithToken });

    console.log(userWithToken);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return next(createHttpError(404, "Invalid data for user'"));
    }

    if (user.password !== password) {
      return next(createHttpError(404, "Invalid data for user'"));
    }

    const userWithToken = await AuthService.createSession(user);

    res.send({ data: userWithToken });
    console.log(userWithToken);
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { tokenInstance } = req;

    const userWithToken = await AuthService.refreshSession(tokenInstance);

    res.send({ data: userWithToken });
  } catch (error) {
    next(error);
  }
};
