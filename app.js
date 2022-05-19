const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const router = require("./src/modules/routes/complaints-routes");
const errorMiddleware = require("./src/modules/middleware/error-middleware");
const config = require('./config');

const PORT = config.port || 8000;
const app = express();
const url = config.adress;
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);
app.use(errorMiddleware);

const start = () => {
  try {
      mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port = ${PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  };
};

start();