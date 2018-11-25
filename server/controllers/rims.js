var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Tire = mongoose.model("Tire");

var Rim = mongoose.model('Rim');
module.exports = {
  all: function (req, res) {
    // console.log("all Rims")
    Rim.find({})
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.json(data);
      });

  },
  new: function (req, res) {
    var rim = new Rim({
      diameter: req.body.diameter,
      brand: req.body.brand,
      condition: req.body.condition,
      description: req.body.description,
      photos: req.body.photos,
      price: req.body.price,
      count: req.body.count
    });
    rim.save()
      .then(saved => {
        console.log('saved!')
        res.json(saved);
      })
      .catch(err => {
        console.log('saving failed')
        console.log(err)
        res.json(false)
      })

  },
  find: function (req, res) {
    //searching a rim by id and find matching tires by diameter
    Rim.findOne({ _id: req.body._id }).lean().exec(function(err, data){
      if(err){
        res.status(500).json(false);
      } else {
        Tire.find({diameter: data.diameter})
          .then(tires => { 
            data.matches = tires;
            res.json(data)
          })
      }
    });
  },
  delete: function (req, res) {
    // console.log('req.body ---->', req.body);
    // console.log('req.body.id ---->', req.body.id);
    Rim.remove({ _id: req.body.id })
      .then(data => {
        Deal.remove({
          "rim_id": req.body.id
        }).then(rim => {
          console.log("DELETED!!")
          res.status(200).json(true);
        })
      })
      .catch(err => {
        res.json(false)
      })
  },
  edit: function (req, res) {
    Rim.findByIdAndUpdate({ _id: req.body.temp_id }, {
      diameter: req.body.diameter,
      brand: req.body.brand,
      condition: req.body.condition,
      description: req.body.description,
      photos: req.body.photos,
      price: req.body.price,
      count: req.body.count
    }, function (err, data) {
      if (err) {
        console.log("can't delete")
        console.log(err);
        res.json(false)
      } else {
        console.log("the Rim was deleted")
        console.log(data);
        res.status(200).json(true)
      }
    })
  },
  addPhoto: function (params) {
    console.log(params);
    Rim.findByIdAndUpdate({ _id: params.id }, {
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

}
