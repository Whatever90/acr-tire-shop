var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 

var requestSchema = new mongoose.Schema({
    name:  { type: String, required: [true, 'name is required'], minlength: [2, 'TOO SHORT']},
    message:  { type: String, required: [true, 'message is required'], minlength: [2, 'TOO SHORT']},
    phone:  { type: String, required: [true, 'phone is required'], minlength: [2, 'TOO SHORT']},
    category: {type: String},
    product_id: {type: ObjectId}
}, {timestamps: true });

var Request = mongoose.model('Request', requestSchema) 
