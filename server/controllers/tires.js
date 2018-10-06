var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Tire = mongoose.model("Tire");
module.exports = {
  all: function(req, res) {
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
  find: function(req, res) {
    // console.log("all Tires")
    Tire.findOne({ _id: req.body._id })
      .then(data => {
        // console.log(data);
        res.json(data);
      })
      .catch(err => {
        res.status(500).json(false);
      });
  },

  new: function(req, res) {
    // console.log("++++++++++++++++++++++++++++++++++++")
    // console.log(req.body)
    // console.log('+++++++++++++++++++')
    var tire = new Tire({
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
      color: req.body.color,
      year: req.body.year,
      mileage: req.body.mileage,
      description: req.body.description,
      photos: req.body.photos
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
  delete: function(req, res) {
    Tire.remove({ _id: req.body.id })
      .then(data => {
        res.status(200).json(true);
      })
      .catch(err => {
        res.status(500).json(false);
      });
  },
  edit: function(req, res){
    // console.log(req.body);
    Tire.findByIdAndUpdate({ _id: req.body.temp_id }, {
                brand: req.body.brand,
                model: req.body.model,
                price: req.body.price,
                year: req.body.year,
                description: req.body.description,
                mileage: req.body.mileage,
                photos: req.body.photos
    }, function(err, data){
      if(err){
        console.log("can't edit")
        console.log(err);
        res.json(false)
      }else{
        console.log("the tire was edited")
        console.log(data);
        res.status(200).json(true)
      }
    }) 
  },
  addPhoto: function(params){
    console.log(params);
    Tire.findByIdAndUpdate({ _id: params.id }, {
                $push: {photos: params.imageUrl}
    }, function(err, data){
      if(err){
        console.log("can't edit")
        console.log(err);
        res.json(false)
      }else{
        console.log("Photos are uploaded!")
        console.log(data);
      }
    }) 
  }
};
