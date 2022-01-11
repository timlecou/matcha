const express = require('express')();
const cors = require('cors');
const fs = require('fs');

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
          var photos = {};
          var paths = [];

          photos.paths = paths;
          results.rows.forEach(element => {
            photos.paths.push(element.path);
          });
          res.status(200).send(photos.paths);
        })
    });

    /**
     * POST
     */                 

    app.post("/users/:id/photos", authMiddleware.getUserParams, multerMiddleware, (req, res) => {
      const id = parseInt(req.params.id);
      const files = req.files;

      try {
        pool.query('SELECT * FROM "Photo" WHERE user_id = $1',
        [id],
        (error, results) => {
          if (error) throw error;

          if (results.rowCount + files.length < 5) {
            files.forEach(element => {
              const photo = new Photo.Photo( {
              user_id: id,
              path: `uploads/users/${element.filename}`
              });    
              photo.insert();
            });
            
            res.status(201).json({ message: 'photo uploaded' })
          } else {
            res.status(400).send('user can\'t have more than 5 photos');
          }
        })
      }
      catch (err) {
        console.error(err);
      }  
    });


    /**
     * 
     * DELETE
     * 
     */


    /**
     * Deletes a photo owned by the user(id)
     */
    app.delete("/users/:id/photos/:photo_id", authMiddleware.getUserParams, (req, res) => {

      const user_id = parseInt(req.params.id);
      const photo_id = parseInt(req.params.photo_id);

      try {
        pool.query('SELECT * FROM "Photo" WHERE user_id = $1 AND id = $2',
        [user_id, photo_id],
        (error, results) => {
          const photo = new Photo.Photo(results.rows[0]);
          if (error) throw error;
          if (results.rowCount == 1) {

            fs.unlink('/usr/src/app/src/' + photo.path, (err) => {    //deletes the file
              if (err) throw err;
              pool.query('DELETE FROM "Photo" WHERE user_id = $1 AND id = $2',
              [user_id, photo_id],
              (error) => {
                if (error) throw error;
              
              });

              res.status(200).send('photo deleted');
            });
            
          } else {
            res.status(404).send('photo not found');
          }
        });
      }
      catch (err) {
        console.error(err);
      }
    });
}
