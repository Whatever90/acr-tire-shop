const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
app.use(bodyParser.json()); 
const mongoose = require('mongoose');

require('dotenv').config();

require('./config/mongoose.js');

// Middlewares
const checkForSession = require('./middlewares/checkForSession');

const session = require('express-session');
app.use( session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 200 * 1000
  }
}) );
// app.use( checkForSession );
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
// app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.static(`${__dirname}/../build`));
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
const routes_setter = require('./config/routes.js');
routes_setter(app);
mongoose.connect('mongodb://localhost/garage');

app.listen(8000, function() {
	console.log("listening on port 8000");
})
