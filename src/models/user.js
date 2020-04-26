const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    firstName: String,
    lastName: String,
    phone: String,
    age: Number,
    gender: String,
    weight: Number,
    height: String,
    settingsId: String,
    bac: Number,
});

module.exports = mongoose.model('user', userSchema);
