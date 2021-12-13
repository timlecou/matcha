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
      var user;

      try {
        pool.query('SELECT * FROM "User" WHERE username = $1 OR email = $2',
        [req.body.username, req.body.email],
        (error, results) => {
            if (error) throw error;
            if (results.rowCount == 0) {
                res.status(404).json({ error: 'user not found' });
            } else {
                user = results.rows[0];

                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                  if (!valid) {
                    return res.status(401).json({ error: 'incorrect password' });
                  }
                  res.status(200).json({
                    userId: user._id,
                    token: 'TOKEN'
                  });
                })
            }
        })
      }
      catch (err) {
          console.log(err);
      }
    });


}