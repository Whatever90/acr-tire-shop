var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Tire = mongoose.model("Tire");
var Rim = mongoose.model('Rim');

var Request = mongoose.model('Request');
module.exports = {
   all: function(req, res){
    // console.log("all requests")
    Request.find({})
              .then(data => {
                res.json(data);
                
              })
              .catch(err => {
                console.log(err);
              });
              
    },
    new: async function (req, res) {
      var request = new Request({
        name: req.body.name,
        message: req.body.message,
        phone: req.body.phone,
        category: req.body.category,
        product_id: req.body.product_id
      });
      console.log(req.body.category);
      if (request.category !== "Contact me") {
        if (req.body.category === "rims") {
          await Rim.find({
              _id: req.body.product_id
            }).then(res => {
              request.product_id = res;
            })
        } else if (req.body.category === "tires") {
          await Tire.find({
              _id: req.body.product_id
            })
            .then(res => {
              request.product_id = res;
            })
        }
      }
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
