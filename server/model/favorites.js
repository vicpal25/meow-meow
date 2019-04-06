const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const favoriteSchema = new Schema({
    image_id: { type: Number },
    user_id:  { type: Number }
})

const ModelClass = mongoose.model('favorites', favoriteSchema);

module.exports = ModelClass;