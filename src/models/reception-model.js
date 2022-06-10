const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReceptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  },
});

module.exports = Receptions = mongoose.model(
  "Receptions",
  ReceptionSchema
);
