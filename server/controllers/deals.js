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
    Deal.aggregate([{
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
      }])
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  find: function (req, res) {
    Deal.aggregate([ { $match : { _id : mongoose.Types.ObjectId(req.body._id) } },
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
      .then(data => {
        console.log(req.body._id)
        console.log("========")
        console.log(data)
        console.log("========")
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  new: function (req, res) {
    var deal = new Deal({
      tire_id: req.body.tire,
      rim_id: req.body.rim,
      price: req.body.price,
      old_price: req.body.old_price,
      description: req.body.description
    });
    deal.save()
      .then(saved => {
        res.json(saved)
      })
      .catch(err => {
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
