const express = require('express')();
const cors = require('cors');
const bcrypt = require('bcrypt')
const geoip = require('geoip-lite');

const { Pool, Client } = require('pg');
const pool = new Pool();

const User = require('../models/user.model.js');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors());

module.exports = function(app, io) {

    app.post("/login", (req, res) => {
      var user;
      var lat = parseFloat(req.body.lat);
      var long = parseFloat(req.body.long);

      try {
        pool.query('SELECT * FROM "User" WHERE username = $1 OR email = $2',
        [req.body.username, req.body.email],
        (error, results) => {
            if (error) throw error;
            if (results.rowCount == 0) {
                res.status(404).json({ error: 'user not found' });
            } else if (results.rows[0].activated == true) {
                user = results.rows[0];

                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                  if (!valid) {
                    return res.status(401).json({ error: 'incorrect password' });
                  }

                  if (lat == -1 || long == -1) {
                    var geo;
                    if (req.headers.host == 'localhost:4000') {
                      //have to get the external ip here
                      var external_ip = '66.249.70.37';
                      geo = geoip.lookup(external_ip);
                    } else {
                      geo = geoip.lookup(req.ip);
                    }
    
                    lat = geo.ll[0];
                    long = geo.ll[1];
                  }

                  var now = new Date();
                  now.toUTCString();

                  pool.query('UPDATE "User" SET location = point($1, $2), last_sign_in = $3 WHERE id = $4',
                  [lat, long, now, user.id],
                  (error) => {
                      if (error) throw error;
                  });

                  io.emit('new_connection', {user_id: user.id});

                  delete user.password;
                  delete user.reset_password_token;
                  delete user.activation_token;

                  res.status(200).json({
                    user: user,
                    token: jwt.sign(
                      { userId: user.id },
                      process.env.ACCESS_TOKEN_SECRET,
                      { expiresIn: '24h' }
                    )
                  });
                })
            } else {
              res.status(401).json({ message: "user not activated" });
            }
        })
      }
      catch (err) {
          console.error(err);
          res.status(400).json({ message: err.message });
      }
    });
};