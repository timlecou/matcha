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
                    return res.status(403).json({ error: 'incorrect password' });
                  }

                  if (latitude == 0 || longitude == 0) {
                    var geo = geoip.lookup(req.ip);
      
                    latitude = geo.ll[0];
                    longitude = geo.ll[1];
                  }

                  var now = new Date();
                  now.toUTCString();

                  pool.query('UPDATE "User" SET location = point($1, $2), last_sign_in = $3 WHERE id = $4',
                  [latitude, longitude, now, user.id],
                  (error) => {
                      if (error) throw error;
                  });

                  io.emit('new_connection', {user_id: user.id});

                  /**
                   * Tout est ok, recuperer les match, 
                   * Recuperer tous les matches
                   * Pour chaque match, creer la room `match_${id}`
                   * socket.join(`match_${id}`)
                   */

                  pool.query('SELECT * FROM "Matched_user" WHERE user1_id = $1 OR user2_id = $1',
                  [user.id],
                  (error, results) => {
                    if (error) throw error;
                    io.on("connection", (socket) => {
                      if (results.rowCount > 0) {
                        const matchs = results.rows;
                        matchs.forEach(element => {
                          socket.join(`match_${element.id}`);
                          console.log(`socket has joined room match_${element.id}`);
                        });
                      }
                    });
                  });

                  delete user.password;

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
              res.status(403).json({ message: "user not activated" });
            }
        })
      }
      catch (err) {
          console.error(err);
          res.status(400).json({ message: err.message });
      }
    });
};