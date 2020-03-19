var mongoose = require('mongoose');
var session = require('express-session');
var express = require('express');
var path = require('path');
const app = express();
const multer = require('multer');
const AWS = require('aws-sdk');
require('dotenv').config();

// AWS uploader
AWS.config.update({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	region: process.env.REGION
});
const s3 = new AWS.S3();
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 52428800
	}
})

// Controllers
var tire = require('./../controllers/tires.js');
var rim = require('./../controllers/rims.js');
var request = require('./../controllers/requests.js');
var user = require('./../controllers/users.js');
var deal = require('./../controllers/deals.js')

module.exports = function (app) {
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		next();
	});

	// tires functions
	app.get("/tires/all", (req, res) => {
		tire.all(req, res)
	});
	app.post("/tires/new", (req, res, next) => {
		tire.new(req, res)
	});
	app.post("/tires/find", (req, res, next) => {
		tire.find(req, res)
	});
	app.post("/tires/delete", (req, res, next) => {
		tire.delete(req, res)
	});
	app.post("/tires/edit", (req, res, next) => {
		tire.edit(req, res)
	});
	app.post("/tires/edit/photo", (req, res, next) => {
		tire.editPhoto(req, res)
	});


	// rims functions
	app.get("/rims/all", (req, res, next) => {
		console.log("asdsadasdasd-=-=-==-=-=-")
		rim.all(req, res)
	});
	app.post("/rims/new", (req, res, next) => {
		rim.new(req, res)
	})
	app.post("/rims/delete", (req, res, next) => {
		rim.delete(req, res)
	})
	app.post("/rims/edit", (req, res, next) => {
		rim.edit(req, res)
	})
	app.post("/rims/find", (req, res, next) => {
		rim.find(req, res)
	});
	// Requests functions
	app.get("/requests/all", (req, res, next) => {
		request.all(req, res)
	});
	app.post("/requests/new", (req, res, next) => {
		// console.log("ROUTES REQUEST")
		request.new(req, res);
	});
	app.post("/requests/delete", (req, res, next) => {
		request.delete(req, res);
	})
	app.post("/requests/edit", (req, res, next) => {
		request.edit(req, res);
	})
	// Deals functions
	app.get("/deals/all", (req, res, next) => {
		deal.all(req, res)
	});
	app.post("/deals/new", (req, res, next) => {
		deal.new(req, res);
	});
	app.post("/deals/sold", (req, res, next) => {
		deal.sold(req, res);
	})
	app.post("/deals/cancel", (req, res, next) => {
		deal.cancel(req, res);
	})
	app.post("/deals/edit", (req, res, next) => {
		deal.edit(req, res);
	});
	app.post("/deals/find", (req, res, next) => {
		deal.find(req, res)
	});


	// Users functions
	app.post('/register', (req, res, next) => {
		user.register(req, res)
	});
	app.post('/login', (req, res, next) => {
		user.login(req, res)
	});
	app.post("/user/logout", (req, res, next) => {
		user.logout(req, res)
	});
	app.get("/user/data", (req, res, next) => {
		user.getUserData(req, res)
	});
	app.get("/user/all", (req, res, next) => {
		user.all(req, res)
	});

	app.post('/api/upload/:x/:id', upload.single('item'), (req, res) => {
		// console.log(req.file);
		var params = {
			Bucket: process.env.BUCKET,
			Key: req.file.originalname,
			Body: req.file.buffer,
			ContentType: "image/png",
			ACL: 'public-read'
		}
		// s3.putObject() puts the image to the AWS bucket. If the file is already there
		// it won't give any error, just make view that file is uploaded again though
		// it just checked if it's in there
		s3.putObject(params, (err) => {
			// console.log(err);
			if (err) return res.status(400).send(err);
		})
		var imageUrl = 'https://s3.amazonaws.com/' + params.Bucket + '/' + params.Key
		var send = {
			id: req.params.id,
			imageUrl: imageUrl
		}
		//console.log("+++++++++++++++++++++++++");
		// console.log(req.params);
		if (req.params.x == "tires") {
			tire.addPhoto(send);
		} else if (req.params.x == "rims") {
			rim.addPhoto(send);
		}
		res.status(200).send(imageUrl);
	});

	app.delete('/api/delete/:key', (req, res, next) => {
		// Parameters for the S3 delete method. The bucket and file name is needed.
		const params = {
			Bucket: process.env.BUCKET,
			Key: req.params.key
		};

		// Deletes object from S3
		s3.deleteObject(params, (error, data) => {
			// If there's an error return the error
			if (error) return res.json({ error });

			if (data) return res.json({ data })
		});
	});

	
}

