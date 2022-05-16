require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const router = require("./src/modules/routes/complaints-routes");
const errorMiddleware = require("./src/modules/middleware/error-middleware");

const PORT = 5000;
const app = express();
const url = process.env.APP_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.set("Access-Control-Allow-Origin", "*");
app.use(router);
app.use(errorMiddleware);

app.use("/", router);

const start = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port = ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();