const express = require('express')();
const cors = require('cors');
const bcrypt = require('bcrypt')

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

    //look to https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466506-creez-des-utilisateurs

    app.post("/login", (req, res) => {
      const user = new User({
        username: req.body.username
      });
      if (!user.find()) {
        res.status(401).send('user not found');
      }
      console.log(user.username);
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: user._id,
          token: 'TOKEN'
        });
      })
      //.catch(error => res.status(500).json({ error }));
    });


}