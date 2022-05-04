const jwt = require('jsonwebtoken');
const tokenModel = require('../Models/token-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, procerss.env.JWT_ACCESS_SECRET, {
            expiresIn: '60m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    validateAcessToken(token) {
        try {
            const userData = jwt.verify (token, process.env.JWT_ACESS_SECRET);
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify (token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userID, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userID});
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();