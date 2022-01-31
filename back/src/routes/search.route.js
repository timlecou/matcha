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

    app.get('/search', authMiddleware.getUserBody, (req, res) => {
        
    });

};