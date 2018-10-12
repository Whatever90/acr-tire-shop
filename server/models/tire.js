var mongoose = require('mongoose');
// 

var tireSchema = new mongoose.Schema({
    width: {type: Number},
    ratio: {type: Number},
    diameter: { type: Number },
    brand: { type: String },
    condition: { type: String },
    description: { type: String },
    photos: { type: Array, "default": [] },
    price: { type: Number },
    count: { type: String },
    type: { type: String}
}, {timestamps: true });

var Tire = mongoose.model('Tire', tireSchema) 
