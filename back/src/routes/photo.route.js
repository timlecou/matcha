const express = require('express')();
const cors = require('cors');

const user = require('../models/photo.model.js');

const bodyParser = require('body-parser');

const multer = require('multer');
const exp = require('constants');
const path = require('path/posix');

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

//storage engine

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, callBack) => {
    callBack(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000       //limit (in bytes)
  },
  fileFilter: (req, file, callBack) => {              //file filter (extensions)
    const authorizedExtensions = /jpg|jpeg|png/;
    const checkExtension = authorizedExtensions.test(path.extname(file.originalname));
    const checkMime = authorizedExtensions.test(file.mimetype);

    if (checkExtension && checkMime)
    {
      callBack(null, 'photo format is fine');
    }
    else
    {
      callBack('image format is not fine');
    }
  }
}).single('userPhoto')

module.exports = function(app){

    /**
     * GET
     */
    app.get("/users/:id/photos", (req, res) => {
        res.download('app/src/uploads/userPhoto_1639050197075.jpg')
    });

    /**
     * POST
     */
    app.post("/users/:id/photos", (req, res) => {
        upload(req, res, err => {
          if (err)
          {
            throw err;
          }
          else
          {
            const file = req.file;
            console.log(file);
          }
        })
    });
}
