const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    category: String,
    value: String
})

const List = mongoose.model('list', ListSchema);

module.exports = { List }