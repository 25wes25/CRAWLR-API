const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function toLower (v) {
    return v.toLowerCase();
}

const beverageSchema = new Schema({
    name: { type: String, set: toLower },
    category: { type: String, set: toLower },
    abv: Number,
});


module.exports = mongoose.model('beverage', beverageSchema);
