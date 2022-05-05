const mongoose = require("mongoose");

const { Schema } = mongoose;

const TokenSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  refreshToken: { 
    type: String, 
    required: true 
  },
});

module.exports = Token = mongoose.model("Tokens", TokenSchema);