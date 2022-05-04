const tokenService = require('../../Service/token-service');
const ApiError = require('../Exceptions/api-error')

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split('')[1];
        if(!acessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAcessToken(acessToken);
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    };
}