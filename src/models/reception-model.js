const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReceptionSchema = new Schema({

    //Not sure about this
  user_id: {
    type: String,
    required: true,
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

module.exports = Reception = mongoose.model(
  "Reception",
  ReceptionSchema
);
