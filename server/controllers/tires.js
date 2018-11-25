var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Rim = mongoose.model('Rim');
var Deal = mongoose.model('Deal');

var Tire = mongoose.model("Tire");
module.exports = {
  all: function (req, res) {
    // console.log("all Tires")
    Tire.find({})
      .then(data => {
        // console.log(data);
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(false);
      });
  },
  find: function (req, res) {
    Tire.findOne({ _id: req.body._id }).lean().exec(function(err, data){
      if(err){
        res.status(500).json(false);
      } else {
        Rim.find({diameter: data.diameter})
          .then(tires => { 
            data.matches = tires;
            res.json(data)
          })
      }
    });
  },

  new: function (req, res) {
    // console.log("++++++++++++++++++++++++++++++++++++")
    // console.log(req.body)
    // console.log('+++++++++++++++++++')
    var tire = new Tire({
      brand: req.body.brand,
      ratio: req.body.ratio,
      width: req.body.width,
      diameter: req.body.diameter,
      condition: req.body.condition,
      description: req.body.description,
      photos: req.body.photos,
      price: req.body.price,
      count: req.body.count,
      type: req.body.type
    });
    tire
      .save()
      .then(saved => {
        console.log("saved!");
        res.json(saved);
      })
      .catch(err => {
        console.log("saving failed");
        console.log(err);
        res.status(500).json(false);
      });
  },
  delete: function (req, res) {
    Tire.remove({ _id: req.body.id })
      .then(data => {
        console.log("removeing =--------------------")
        Deal.find({
          tire_id: ObjectId(req.body.id)
        }).then(tire => {
          console.log("TIRE!!!")
          console.log(tire);
        })
        Deal.delete({tire_id: mongoose.Types.ObjectId(req.body.id)}).then(d => {console.log(d);res.json(data)})
      })
      .catch(err => {
        res.status(500).json(false);
      });
  },
  edit: function (req, res) {
    // console.log(req.body);
    Tire.findByIdAndUpdate({ _id: req.body.temp_id }, {
      brand: req.body.brand,
      ratio: req.body.ratio,
      width: req.body.width,
      diameter: req.body.diameter,
      condition: req.body.condition,
      description: req.body.description,
      photos: req.body.photos,
      price: req.body.price,
      count: req.body.count,
      type: req.body.type
    }, function (err, data) {
      if (err) {
        console.log("can't edit")
        console.log(err);
        res.json(false)
      } else {
        console.log("the tire was edited")
        console.log(data);
        res.status(200).json(true)
      }
    })
  },
  addPhoto: function (params) {
    console.log(params);
    Tire.findByIdAndUpdate({ _id: params.id }, {
      $push: { photos: params.imageUrl }
    }, function (err, data) {
      if (err) {
        console.log("can't edit")
        console.log(err);
        res.json(false)
      } else {
        console.log("Photos are uploaded!")
        console.log(data);
      }
    })
  }
};
