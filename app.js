const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const router = require("./src/modules/routes");
const errorMiddleware = require("./src/modules/middleware/error-middleware");
const config = require("./config");

const app = express();
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);
app.use(errorMiddleware);

const start = () => {
  try {
    mongoose.connect(config.adress, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(config.port, () => {
      console.log(`Server started on port = ${config.port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  };
};

start();