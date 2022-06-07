const UserService = require("../../service/user-service");

const rule = {
  maxAge: 30 * 24 * 60 * 1000, //30 days
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await UserService.registration(
        login,
        password
      );
      res.cookie("accessToken", userData.accessToken, rule);
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
      res.cookie("accessToken", userData.accessToken, rule);
      res.cookie("refreshToken", userData.refreshToken, rule);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { accessToken } = req.cookies;
      const token = await UserService.logout(accessToken);
      res.clearCookie("accessToken");
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
      res.clearCookie("accessToken");
      res.cookie("accessToken", userData.accessToken, rule);
      res.cookie("refreshToken", userData.refreshToken, rule);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();