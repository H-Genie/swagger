const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    age: Number,
    birthDatetime: String,
    ethnicity: String,
    gender: String,
    isDeath: Boolean,
    personID: Number,
    race: String
})

const Patient = mongoose.model('patient', PatientSchema);

module.exports = { Patient }