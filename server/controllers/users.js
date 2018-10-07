const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRound = 12;

const User = mongoose.model("User");
module.exports = {
  register: (req, res) => {
    // console.log("++++++++++++++++++++++++++++++++++++")
    // console.log('req.body ---->', req.body)
    // console.log('+++++++++++++++++++')
    const { username, password } = req.body;
    bcrypt.hash(password, saltRound)
    .then(hashedPassword => {
      const user = new User({
        username: username,
        password: hashedPassword
      });
      req.session.user = { username };
      user
        .save()
        .then(saved => {
          console.log("saved!");
          res.status(200).json({ user: req.session.user });
        })
        .catch(err => {
          console.log("saving failed");
          console.log(err);
          res.status(500).json(false);
        });


    })
    .catch( () => res.status(500).send() )
  },
  login: (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    User.findOne({ username: req.body.username })
      .then(response => {
        // console.log('response -> ', response);
        // console.log('response.username -> ', response.username);
        // console.log('response.password -> ', response.password);
        if (response) {
          bcrypt.compare(password, response.password)
            .then( passwordMatch => {
              if (passwordMatch) {
                req.session.user = { username: response.username };
                res.status(200).json( req.session.user );
              } else {
                res.status(401).json({ message: 'Something is wrong with password' })
              }
            })
            .catch(error => console.log(error))
        } else {
          res.status(401).json({ message: 'Something is wrong with username' })
        }
      })
      .catch(err => {
        res.status(500).json(false);
      });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send();
  },
  getUserData: (req, res, next) => {
    // console.log('req.session ->', req.session)
    res.json({ user: req.session.user })
  },
  all: (req, res) => {
    // console.log("all tires")
    User.find({})
      .then(data => {
        // console.log(data);
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(false);
      });
  }
};
