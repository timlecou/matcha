const express = require('express')();
const cors = require('cors');
const bcrypt = require('bcrypt')
const geoip = require('geoip-lite');

const { Pool, Client } = require('pg')
const pool = new Pool()

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
app.use(cors())

module.exports = function(app) {

    app.post("/login", (req, res) => {
      var user;
      var latitude = parseFloat(req.body.lat);
      var longitude = parseFloat(req.body.long);

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

                  //locate the user
                  if (latitude == 0 || longitude == 0) {
                    var geo = geoip.lookup(req.ip);
      
                    latitude = geo.ll[0];
                    longitude = geo.ll[1];
                  }

                  var now = new Date();
                  now.toUTCString();

                  pool.query('UPDATE "User" SET location = point($1, $2), last_sign_in = $3',
                  [latitude, longitude, now],
                  (error) => {
                      if (error) throw error;
                  });

                  res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                      { userId: user.id },
                      process.env.ACCESS_TOKEN_SECRET,
                      { expiresIn: '24h' }
                    )
                  });
                })
            } else {
              res.status(200).json({ message: "user not activated" });
            }
        })
      }
      catch (err) {
          console.log(err);
      }
    });


}