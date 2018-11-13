var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Tire = mongoose.model("Tire");
var Rim = mongoose.model('Rim');
var Deal = mongoose.model('Deal');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var Request = mongoose.model('Request');
module.exports = {
   all: function (req, res) {
    Request.find({}).lean()
      .then(async response => {
        for (let idx in response) {
          if (response[idx].category === 'rims') {
            await Rim.findOne({
                _id: response[idx].product_id
              })
              .then(res => {
                response[idx].product = res
              })
              .catch(err => console.log(err));
          } else if (response[idx].category === 'tires') {
            await Tire.findOne({
                _id: response[idx].product_id
              })
              .then(res => {
                response[idx].product = res
              })
              .catch(err => console.log(err));
          } else if (response[idx].category === 'deals') {
            Deal.aggregate([{
                  $match: {
                    _id: mongoose.Types.ObjectId(response[idx].product_id)
                  }
                },
                {
                  $lookup: {
                    from: "tires",
                    localField: "tire_id",
                    foreignField: "_id",
                    as: "tire"
                  }
                }, {
                  $lookup: {
                    from: "rims",
                    localField: "rim_id",
                    foreignField: "_id",
                    as: "rim"
                  },
                }
              ])
              .then(res => {
                response[idx].product = res
              })
          }
        }
        res.json(response)});
   },
    new: async function (req, res) {
      var request = new Request({
        name: req.body.name,
        message: req.body.message,
        phone: req.body.phone,
        category: req.body.category,
        product_id: req.body.product_id
      });
        request.save()
          .then(saved => {
            console.log('saved!')
            res.json(saved)
          })
          .catch(err => {
            console.log(err)
            console.log('saving failed')
            res.json(false)
          })
      
      
    },
  delete: function(req, res){
    Request.remove({_id: req.body.i})
      .then(data=>{
        res.json(true);
      })
      .catch(err=>{
        res.json(false)
      })
  }

}
