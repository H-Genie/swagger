const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
    count: Number,
    ethnicity: String,
    gender: String,
    race: String
})

const Stat = mongoose.model('stats', StatSchema);

module.exports = { Stat }