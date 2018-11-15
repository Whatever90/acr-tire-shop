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
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  new: function (req, res) {
    Deal.find({ $and: [{rim_id: req.body.rim}, {tire_id: req.body.tire}] })
    .then(response => {
      if(response.length>0){
        res.status(404).json(response)
      }else{
        console.log("NO DUPES!")
        var deal = new Deal({
          tire_id: req.body.tire,
          rim_id: req.body.rim,
          price: req.body.price,
          old_price: req.body.old_price,
          description: req.body.description
        });
        deal.save()
          .then(saved => {
            res.status(200).json(saved)
          })
          .catch(err => {
            res.status(404).json(err)
          })
      }
    })
    
  },
  sold: async function (req, res) {
    Deal.remove({
        _id: req.body.id
      }).lean()
      .then(response => {
        var obj = {}
        console.log(req.body)
        Rim.remove({
          _id: req.body.rim_id
        }).then(r => console.log("rim sold as well"));
        Tire.deleteOne({_id: req.body.tire_id}).then(r => console.log("tire is deleted"));
        res.json(response)        
      })
      .catch(err => {
        res.json(false)
      })
  },
  cancel: function (req, res) {
    Deal.remove({
        _id: req.body.id
      })
      .then(data => {

        res.json(true);
      })
      .catch(err => {
        res.json(false)
      })
  }

}
