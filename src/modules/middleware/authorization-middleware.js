const ApiError = require("../errors/api-error");
const TokenService = require("../../service/token-service");

module.exports = (req, res, next) => {
  try {
    const { accesstoken } = req.headers;
    if (!accesstoken) {
      return next(ApiError.UnauthorizedError());
    }
    const findUser = TokenService.validateAccessToken(accesstoken);
    if (!findUser) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = findUser;
    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
};