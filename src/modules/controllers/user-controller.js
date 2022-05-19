const { validationResult } = require("express-validator");
const UserService = require("../../service/user-service");
const ApiError = require("../errors/api-error");

const rule = {

  //maxAge = 30 days
  maxAge: 30 * 24 * 60 * 1000,
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации', errors})
      };
      const { login, password } = req.body;
      const userData = await UserService.registration(
        login,
        password
      );
      res.cookie("accessToken", userData.accessToken, rule);
      res.json(userData);
    } catch (e) {
      next(e);
    };
  };

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie("accessToken", userData.accessToken, rule);
      res.json(userData);
    } catch (e) {
      next(e);
    };
  };

  async logout(req, res, next) {
    try {
      const { accessToken } = req.cookies;
      const token = await UserService.logout(accessToken);
      res.clearCookie("accessToken");
      res.json(token);
    } catch (e) {
      next(e);
    };
  };

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.json.cookie("refreshToken", userData.refreshToken, rule);
    } catch (e) {
      next(e);
    };
  };
};

module.exports = new UserController();