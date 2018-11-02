var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Tire = mongoose.model("Tire");
var Rim = mongoose.model('Rim');
var Deal = mongoose.model('Deal');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
module.exports = {
  all: function (req, res) {
    // console.log("all deals")
    Deal.aggregate([
      
       {
      $lookup: {
        from: "tires" ,
        localField: "tire_id",
        foreignField: "_id",
        as: "tire"
      }},{
      $lookup: {
        from: "rims",
        localField: "rim_id",
        foreignField: "_id",
        as: "rim"
      },
    }])
      .then(data => {
        console.log(data)
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });

  },
  new: function (req, res) {
    console.log("===================");
    console.log(ObjectId(req.body.tire));
     console.log(typeof(ObjectId(req.body.tire)));
    console.log("=========")
    var deal = new Deal({
      tire_id: req.body.tire,
      rim_id: req.body.rim,
      price: req.body.price,
      old_price: req.body.old_price,
      description: req.body.description
    });
    deal.save()
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
  delete: function (req, res) {
    Deal.remove({
        _id: req.body.i
      })
      .then(data => {
        res.json(true);
      })
      .catch(err => {
        res.json(false)
      })
  }

}
