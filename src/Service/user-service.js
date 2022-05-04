const userModel = require('../Models/user-model');
const bcrypt = require('bcryptjs')
const tokenService = require('./token-service');
const UserDto = require('../Modules/Dto/user-dto');

class UserService {
    async registration(login, password) {
        const customer = await userModel.findOne({login});
        if(customer) {
            throw ApiError.BadRequest('Пользователь с таким логином уже существует!');
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await userModel.create({login, password: hashPassword});
        const userDto = new userDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto,
        };
    }

    async actionLogin(login, password) {
        const user = await userModel.findOne({login});
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким логином не найден!');
        }
        const passwordConfirm = await bcrypt.compare(password, userPassword);
        if(!passwordConfirm){
            throw ApiError.BadRequest('Введенный пароль неверный!');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.BadRequest('Вы не авторизованы!');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB) {
            throw ApiError.BadRequest('Вы не авторизованы!');
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return{...tokens, user: userDto};
    }
}

module.exports = new UserService();