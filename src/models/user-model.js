const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("User", UserSchema);