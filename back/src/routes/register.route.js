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
app.use(cors());

module.exports = function(app, io) {

    /**
     * Register a new user and send a confirmation email with a link
     */
    app.post("/api/register", (req, res) => {

      try {
        pool.query('SELECT * FROM "User" WHERE username = $1 OR email = $2',
        [req.body.username, req.body.email],
        (error, results) => {

          if (error) throw error;

          if (results.rowCount != 0) {

            res.status(409).json({ message: 'email or username already taken'});

          } else {

            if (req.body.password === undefined) {
              res.status(500).json({ message: "no password specified" });
            }
            bcrypt.hash(req.body.password, 10).then(hash => {

              var lat = req.body.location.lat;
              var long = req.body.location.long;

              if (lat == -1 || long == -1) {
                var geo;
                if (req.headers.host == 'localhost') {
                  //have to get the external ip here
                  var external_ip = '66.249.70.37';
                  geo = geoip.lookup(external_ip);
                } else {
                  geo = geoip.lookup(req.ip);
                }

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
                var link = 'http://localhost/active/' + user.activation_token;

                  let mailDetails = {
                    from: 'noreply42matcha@gmail.com',
                    to: user.email,
                    subject: 'Account confirmation',
                    text: `Hi ${user.first_name} ! You can confirm your subscription by clicking the following link : ${link}`
                  };
                  
                  mailTransporter.sendMail(mailDetails, function(err, data) {
                    if(err) {
                      console.error(err);
                        console.log('Error Occurs');
                    } else {
                        io.emit('registration', 'user registered successfully');
                        console.log('Email sent successfully');
                    }
                  });

                user.register();
                res.status(201).json({ message: 'you re registered, you will receive an email with a link to activate your account' });
              });
          }
        });
      }
      catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
      }
      
    });

    /**
     * Activate the user using its unique token
     */
    app.post("/api/active", (req, res) => {
      const token = req.body.token;

      try {
        pool.query('SELECT * FROM "User" WHERE activation_token = $1',
        [token],
        (err, results) => {
          if (err) throw err;
          if (results.rowCount == 1) {
            pool.query('UPDATE "User" SET activated = true, activation_token = $1 WHERE activation_token = $2',
            [null, token],
            (err) => {
              if (err) throw err;
              res.status(200).json({ message: `${results.rows[0].username} has confirmed its subscription` });
            });
          } else {
            res.status(404).json({ message: 'user not found' });
          }
        });
      }
      catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
      }
    });
}