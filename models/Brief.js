const mongoose = require('mongoose');

const BriefSchema = new mongoose.Schema({
    personID: Number,
    conditionList: Array,
    visitCount: Number
})

const Brief = mongoose.model('brief', BriefSchema);

module.exports = { Brief }