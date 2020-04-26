const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    locationSharing: Boolean,
});


module.exports = mongoose.model('setting', settingsSchema);
