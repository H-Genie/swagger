const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    personID: Number,
    visitList: Array
})

const Visit = mongoose.model('visit', VisitSchema);

module.exports = { Visit }