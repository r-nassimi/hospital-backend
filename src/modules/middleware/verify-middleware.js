const jwt = require('jsonwebtoken')
const config = require("../../../config");

module.exports = (req, res, next) => {
    //??
    const findUser = jwt.verify(token, config.jwtAccess);
    if(findUser) {
        return next();
    }
    res.status(404).json({error: {message: 'Пользователь не найден!'}})
}