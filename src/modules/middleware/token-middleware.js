const jwt = require("jsonwebtoken");
const config = require("../../../config");

module.exports = (req, res, next) => {
  try {
    const { accesstoken } = req.headers;
    const userData = jwt.verify(accesstoken, config.jwtAccess);
    req.userId = userData.id;
    next();
    return;
  } catch (error) {
    res.status(404).json({ message: "Пользователь не найден!" });
  }
};
