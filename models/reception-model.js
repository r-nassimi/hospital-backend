const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReceptionSchema = new Schema({
  user_id: String,
  NamedNodeMap: String,
  doctor: String,
  date: Date,
  complaint: String 
});

module.exports = Reception = mongoose.model('appoints', appointSchema);