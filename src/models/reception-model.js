const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReceptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
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
});

module.exports = Receptions = mongoose.model(
  "Receptions",
  ReceptionSchema
);
