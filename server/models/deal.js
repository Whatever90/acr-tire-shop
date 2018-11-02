var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// 

var dealSchema = new mongoose.Schema({
    rim_id:  { type:  ObjectId, required: [true, 'rim id is required']},
    tire_id:  { type:  ObjectId, required: [true, 'tire id is required']},
    price: {type: Number},
    old_price: {type: Number},
    description:  { type: String},

}, {timestamps: true });

var Deal = mongoose.model('Deal', dealSchema) 
