var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var requestSchema = new mongoose.Schema({
    name:  { type: String },
    message:  { type: String },
    phone:  { type: String },
    category: {type: String},
    product_id: {type: ObjectId}
}, {timestamps: true });

var Request = mongoose.model('Request', requestSchema)
