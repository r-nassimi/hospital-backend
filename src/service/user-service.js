const bcrypt = require("bcrypt");
const Users = require("../models/user-model");
const TokenService = require("./token-service");
const UserDto = require("../modules/dto/user-dto");
const ApiError = require("../modules/errors/api-error");

class UserService {
  async registration(login, password) {
    const customer = await Users.findOne({ login });
    if (customer) {
      throw ApiError.BadRequest(
        "Пользователь с таким логином уже существует!"
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await Users.create({
      login,
      password: hashPassword,
    });
    if (!login || !password) {
      throw ApiError.BadRequest("Одно из полей не имеет данных!");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveTokenz(userDto.id, tokens.accessToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(login, password) {
    const user = await Users.findOne({ login });
    if (!user) {
      throw new Error("Пользователь с таким логином не найден!");
    }
    const passwordEqual = await bcrypt.compare(
      password,
      user.password
    );
    if (!passwordEqual) {
      throw new Error("Введенный пароль неверный!");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.accessToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(accessToken) {
    const token = await TokenService.removeToken(accessToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new ApiError.UnauthorizedError("Вы не авторизованы!");
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw new ApiError.UnauthorizedError("Вы не авторизованы!");
    }
    const user = await Users.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();