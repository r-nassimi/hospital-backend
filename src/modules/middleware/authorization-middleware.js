const path = "/home/user/Documents/Work/hospital-backend-node/";
const TokenService = require(path + "src/service/token-service");
const ApiError = require(path + "src/modules/errors/api-error");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split("")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};