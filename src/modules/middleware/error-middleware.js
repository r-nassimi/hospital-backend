const ApiError = require("/home/user/Documents/Work/hospital-backend-node/src/exceptions/api-error");

module.exports = (err, req, res, next) => {
    if(err instanceof ApiError) {
        return res
        .status(err.status)
        .json({message: err.mesage, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка!'});
};