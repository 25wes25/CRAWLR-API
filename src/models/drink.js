const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    userId: String,
    beverage: String,
    date: String,
    amount: Number,
});


module.exports = mongoose.model('drink', drinkSchema);
