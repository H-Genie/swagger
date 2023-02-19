const mongoose = require('mongoose');

const DrugSchema = new mongoose.Schema({
    personID: Number,
    drugList: Array
})

const Drug = mongoose.model('drug', DrugSchema);

module.exports = { Drug }