const jwt = require("jsonwebtoken");
const Token = require("../models/token-model");
const config = require("../../config");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.jwtAccess, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(payload, config.jwtRefresh, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  };

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, config.jwtAccess);
      return userData;
    } catch (e) {
      return null;
    };
  };

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, config.jwtRefresh);
      return userData;
    } catch (e) {
      return null;
    };
  };

  async saveToken(userID, refreshToken) {
    const tokenData = await Token.findOne({ user: userID });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    };
    const token = await Token.create({ user: userID, refreshToken });
    return token;
  };

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  };

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  };
};

module.exports = new TokenService();