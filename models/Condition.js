const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
    personID: Number,
    conditionList: Array
})

const Condition = mongoose.model('condition', ConditionSchema);

module.exports = { Condition }