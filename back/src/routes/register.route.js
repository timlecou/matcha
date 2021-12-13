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

module.exports = function(app) {

    app.post("/register", (req, res) => {
        console.log(req.body);
        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              activated: false,
              score: 0
            });
            user.register();
              res.status(201).json({ message: 'user registered' });
          }).catch(error => res.status(500).send(error));

    });


}