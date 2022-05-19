const nonAuthorized = (401, 'Пользователь не авторизован!');
const badRequest = ([]);

module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  };
  
  static UnauthorizedError() {
    return new ApiError(nonAuthorized);
  };
  static BadRequest(message, error = []) {
    return new ApiError(badRequest(message, error));
  }
};