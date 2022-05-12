const bcrypt = require("bcrypt");
const path = "/home/user/Documents/Work/hospital-backend-node/";
const User = require(path + "src/models/user-model");
const TokenService = require(path + "src/service/token-service");
const UserDto = require(path + "src/modules/dto/user-dto");
const ApiError = require(path + "src/modules/errors/api-error");

class UserService {
  async registration(login, password) {
    const customer = await User.findOne({ login });
    if (customer) {
      throw ApiError.BadRequest(
        "Пользователь с таким логином уже существует!"
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
      login,
      password: hashPassword,
    });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(login, password) {
    const user = await User.findOne({ login });
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
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Вы не авторизованы!");
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw new Error("Вы не авторизованы!");
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUsers() {
    const users = await User.find();
    return users;
  }
}

module.exports = new UserService();