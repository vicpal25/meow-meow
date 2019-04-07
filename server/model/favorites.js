const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const favoriteSchema = new Schema({
    image_url: { type: String },
    user_id:  { type: Schema.Types.ObjectId }
})

const ModelClass = mongoose.model('favorites', favoriteSchema);

module.exports = ModelClass;