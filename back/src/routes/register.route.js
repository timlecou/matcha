const express = require('express')();
const cors = require('cors');
const bcrypt = require('bcrypt');

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


      //check if the username or email is already taken
      pool.query('SELECT * FROM "User" WHERE username = $1 OR email = $2',
      [req.body.username, req.body.email],
      (error, results) => {

        if (error) throw error;

        if (results.rowCount != 0) {

          res.status(401).send('email or username already taken');

        } else {

          bcrypt.hash(req.body.password, 10).then(hash => {

            const user = new User.User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              activated: false,
              score: 0

            });
            user.register();
              res.status(201).json({ message: 'user registered' });
          });
        }
      });
    });
}