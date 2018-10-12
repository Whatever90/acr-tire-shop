var mongoose = require('mongoose');
// 

var rimSchema = new mongoose.Schema({
    diameter: { type: Number },
    brand: { type: String },
    condition: { type: String },
    description: { type: String },
    photos: { type: Array, "default": [] },
    price: { type: Number },
    count: { type: String }
}, { timestamps: true });

var Rim = mongoose.model('Rim', rimSchema) 
