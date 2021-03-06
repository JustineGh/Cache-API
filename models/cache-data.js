const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const cacheDataSchema = new Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true }
});


module.exports = mongoose.model('CacheData', cacheDataSchema);