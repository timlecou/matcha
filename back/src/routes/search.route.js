const express = require('express')();
const cors = require('cors');

const { Pool, Client } = require('pg');
const pool = new Pool();
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/auth.middleware');
let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors());

module.exports = function(app) {

    app.get('/api/search', authMiddleware.getUserBody, (req, res) => {
        const age_min = parseInt(req.body.age_min);
        const age_max = parseInt(req.body.age_max);
        const score_min = parseInt(req.body.score_min);
        const score_max = parseInt(req.body.score_max);
        // const lat = parseFloat(req.body.location.lat);
        // const long = parseFloat(req.body.location.long);
        const lat = parseFloat(req.body.lat);   //to remove after test with postman
        const long = parseFloat(req.body.long);
        const tabs = req.body.tags;
        const sort = req.body.sort;

        try {
          pool.query('SELECT * FROM "User" WHERE age > $1 AND age < $2 AND score > $3 AND score < $4'),
          [age_min, age_max, score_min, score_max],
          (error, results) => {
            if (error) throw error;
            if (results.rowCount > 0) {
              res.status(200).send(results.rows);
            } else {
              res.status(404).json({ message: 'no user found for these parameters' });
            }
          };
        }
        catch (err) {
          console.error(err);
          res.status(400).json({ message: err });
        }
    });

};