const express = require('express')();
const cors = require('cors');

const { Pool, Client } = require('pg')
const pool = new Pool()

const Interest = require('../models/interest.model.js');

const bodyParser = require('body-parser');

const exp = require('constants');
const path = require('path/posix');

/**
 * Middlewares
 */
const multerMiddleware = require('../middlewares/multer.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

module.exports = function(app) {

    /**
     *
     * GET
     *
     */

     app.get("/interests", (req, res) => {

         try {
             pool.query('SELECT * FROM "Interest"',
             (error, results) => {
                 if (error) throw error;
                 res.status(200).send(results.rows);
             })
         }
         catch (error) {
             console.error(error);
         }
     });


     /**
      *
      * POST
      *
      */

      app.post("/interests", (req, res) => {

          const interest = new Interest.Interest({
              name: req.body.name
          });

          try {
              pool.query('SELECT * FROM "Interest" WHERE name = $1',
              [interest.name],
              (error, results) => {
                  if (error) throw error;
                  if (results.rowCount == 0) {
                      interest.insert();
                      res.status(201).json({ message: 'interest created' });
                  } else {
                      res.status(400).json({ message: 'interest already existing' });
                  }
              })
          }
          catch (error) {
            console.log("ERROR POST INTEREST")
          }

      });


      /**
       *
       * DELETE
       *
       */

        app.delete("/interests/:interest_id", (req, res) => {
            const interest = new Interest.Interest({
                id: parseInt(req.params.interest_id)
            });

            try {
                pool.query('SELECT * FROM "Interest" WHERE id = $1',
                [interest.id],
                (error, results) => {
                    if (error) throw error;
                    if (results.rowCount > 0) {
                        interest.delete();
                        res.status(200).json({ message: 'interest deleted' });
                    } else {
                        res.status(404).json({ message: 'interest not found' });
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        });
}