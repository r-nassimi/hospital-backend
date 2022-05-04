const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
});

module.exports = Users = mongoose.model('users', userSchema);