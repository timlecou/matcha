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

    app.get('/api/suggestions', authMiddleware.getUserBody, (req, res) => {
        const age_min = parseInt(req.body.age_min);
        const age_max = parseInt(req.body.age_max);
        const score_min = parseInt(req.body.score_min);
        const score_max = parseInt(req.body.score_max);
        const lat = parseFloat(req.body.location.lat);
        const long = parseFloat(req.body.location.long);
        const sort = req.body.sort;
        const max_distance = parseInt(req.body.max_distance);

        //calcul de la distance avec les coordonnes

        try {
          pool.query('SELECT u.* FROM "User" u WHERE age > $1 AND age < $2 AND score > $3 AND score < $4 AND ABS((u.location.lat - $5 ) * 110.574) < $6 AND ABS((u.location.long - $7 ) * 110.574) < $6'),
          [age_min, age_max, score_min, score_max, lat, max_distance, long],
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