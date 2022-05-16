const { validationResult } = require("express-validator");
const UserService = require("../../service/user-service");
const ApiError = require("../errors/api-error");

const rule = {
  maxAge: 30 * 24 * 60 * 1000,
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Ошибка при распознании пароля",
            errors.array()
          )
        );
      }
      const { login, password } = req.body;
      const userData = await UserService.registration(
        login,
        password
      );
      res.cookie("refreshToken", userData.refreshToken, rule);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, rule);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, rule);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();