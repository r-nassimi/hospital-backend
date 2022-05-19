require("dotenv").config();

const config = module.exports = {};
  config.port = process.env.APP_PORT;
  config.adress = process.env.APP_URL;
  config.corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};
config.jwtAccess = process.env.JWT_ACCESS_SECRET;
config.jwtRefresh = process.env.JWT_REFRESH_SECRET;