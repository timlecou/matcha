const express = require('express')();
const cors = require('cors');

const user = require('../models/user.model.js');


const bodyParser = require('body-parser');

const multer = require('multer');
const exp = require('constants');
const upload = multer({dest: 'uploads/'});

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

module.exports = function(app){
    app.post("/users/:id/photos", upload.single('userPhoto'), (req, res) => {
        console.log(req.file);
    
        res.status(200).send("photo uploaded")
    });
}
