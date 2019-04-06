const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Cat = new Schema({
    email: String
})

const ModelClass = mongoose.model('cat', Cat);

module.exports = ModelClass;