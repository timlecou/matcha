const express = require('express')();
const cors = require('cors');
const bcrypt = require('bcrypt');
const geoip = require('geoip-lite');
const TokenGenerator = require('uuid-token-generator');

//-------------------MAILER---------------

const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'noreply42matcha@gmail.com',
      pass: 'Mot.2paSse'
  }
});

//---------------------------------------

const { Pool, Client } = require('pg')
const pool = new Pool()

const User = require('../models/user.model.js');

const bodyParser = require('body-parser');

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

//TODO faire en sorte de pas pouvoir avoir le meme mail ou le meme username qu'un autre utilisateur
module.exports = function(app) {

    app.post("/register", (req, res) => {

      pool.query('SELECT * FROM "User" WHERE username = $1 OR email = $2',
      [req.body.username, req.body.email],
      (error, results) => {

        if (error) throw error;

        if (results.rowCount != 0) {

          res.status(400).send('email or username already taken');

        } else {

          if (req.body.password === undefined) {
            res.status(500).json({ message: "no password" });
          }
          bcrypt.hash(req.body.password, 10).then(hash => {

            var lat = req.body.lat;
            var long = req.body.long;

            if (lat == null || long == null) {
              var geo = geoip.lookup(req.ip);

              lat = geo.ll[0];
              long = geo.ll[1];
            }

            const user = new User.User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              activated: false,
              score: 0,
              latitude: lat,
              longitude: long

            });

              let token = new TokenGenerator(256, TokenGenerator.BASE62);
              user.activation_token = token.generate();
              
              // Set expiration time is 24 hours.
              // user.activeExpires = Date.now() + 24 * 3600 * 1000;
              var link = 'http://localhost:3000/active/' + user.activation_token;


                let mailDetails = {
                  from: 'noreply42matcha@gmail.com',
                  to: user.email,
                  subject: 'Account confirmation',
                  text: `Hello ${user.first_name} ! You can confirm your subscription by clicking the following link : ${link}`
                };
                
                mailTransporter.sendMail(mailDetails, function(err, data) {
                  if(err) {
                    console.error(err);
                      console.log('Error Occurs');
                  } else {
                      console.log('Email sent successfully');
                  }
                });

            user.register();
              res.status(201).json({ message: 'user registered' });
            });
        }
      });
    });

    app.get("/active/:token", (req, res) => {
      const token = req.params.token;

      console.log(`user token = ${token}`);
      try {
        pool.query('SELECT * FROM "User" WHERE activation_token = $1',
        [token],
        (err, results) => {
          if (err) throw err;
          if (results.rowCount > 0) {
            pool.query('UPDATE "User" SET activated = true WHERE activation_token = $1',
            [token],
            (err) => {
              if (err) throw err;
              res.status(200).json({ message: `${results.rows[0].username} has confirmed its subscription` });
            });
          }
        });
      }
      catch (err) {
        console.error(err);
      }
    });
}