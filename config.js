require("dotenv").config();

const config = {
  port: process.env.APP_PORT,
  adress: process.env.APP_URL,
  corsOptions:{
    optionSuccessStatus: 200,
  },
  jwtAccess: process.env.JWT_ACCESS_SECRET,
  jwtRefresh: process.env.JWT_REFRESH_SECRET,
};

module.exports = config;