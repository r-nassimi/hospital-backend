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
      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { accesstoken } = req.headers;
      const token = await UserService.logout(accesstoken);
      return res.send(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshtoken } = req.headers;
      const userData = await UserService.refresh(refreshtoken);
      return res.send(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();