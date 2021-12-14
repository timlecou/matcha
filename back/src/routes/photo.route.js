const express = require('express')();
const cors = require('cors');

const { Pool, Client } = require('pg')
const pool = new Pool()

const Photo = require('../models/photo.model.js');

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

module.exports = function(app){

    /**
     * GET
     */
    app.get("/users/:id/photos", (req, res) => {
        const id = parseInt(req.params.id);

        pool.query('SELECT * FROM "Photo" WHERE user_id = $1',
        [id],
        (error, results) => {
          if (error) throw error;

          res.status(200).download(results.rows[0].path);
        })
    });

    /**
     * POST
     */                 //TODO mettre une limite de 5 photos par personne
    app.post("/users/:id/photos", authMiddleware.getUserParams, multerMiddleware, (req, res) => {

        const photo = new Photo.Photo( {
          user_id: req.params.id,
          path: `src/uploads/users/${req.file.filename}`
          //path: `${req.protocol}://${req.get('host')}/users/${req.params.id}/photos/${req.file.filename}`
        });

        console.log(photo.path);

        photo.insert();

        res.status(201).json({ message: 'photo uploaded' })
    });
}
