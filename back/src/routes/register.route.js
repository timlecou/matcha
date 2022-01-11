const express = require('express')();
const cors = require('cors');
const bcrypt = require('bcrypt');
const geoip = require('geoip-lite');

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
            user.register();
              res.status(201).json({ message: 'user registered' });
          });
        }
      });
    });
}