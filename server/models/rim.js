var mongoose = require('mongoose');
// 

var rimSchema = new mongoose.Schema({
    title:  { type: String, required: [true, 'Title is required']},
    brand:  { type: String, required: [true, 'Brand is required']},
    model:  { type: String, required: [true, 'Model is required']},
    price:  { type: Number },
    year:  { type: Number},
    condition:  { type: String},
    description: {type: String},
    photos: { type: Array, "default" : []}
}, {timestamps: true });

var Rim = mongoose.model('Rim', rimSchema) 
