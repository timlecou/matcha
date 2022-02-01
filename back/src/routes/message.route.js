const express = require('express')();
const cors = require('cors');
const { Pool, Client } = require('pg')
const pool = new Pool()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth.middleware');
let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

module.exports = function(app, io) {

    /**
     * 
     * GET
     * 
     */

    /**
     * get all the messages fron a user to an other
     */
    app.get('/matches/:match_id/messages', (req, res) => {
        const   match_id = req.params.match_id;

        try {
            pool.query('SELECT * FROM "Message" WHERE id = $1',
            [match_id],
            (err, results) => {
                if (err) throw err;
                res.status(200).json(results.rows);
            });   
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    });


    /**
     * 
     * POST
     * 
     */


    /**
     * Input messages in the DB
     */
    app.post('/matches/:match_id/messages', (req, res) => {
        
        const   match_id = req.params.match_id;
        const   message = req.body.content;
        const   date = new Date();
        date.toUTCString();

        if (req.headers.authorization === undefined) {
            res.status(401).json({ message: "no authorization token found" });
          } else {
            try {
                const   token = req.headers.authorization.split(' ')[1];
                const   decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const   from_id = decodedToken.userId;
                pool.query('SELECT * FROM "Matched_user" WHERE id = $1',
                [match_id],
                (err, results) => {
                    if (err) throw err;
                    if (results.rowCount == 1) {
                        const   user1_id = results.rows[0].user1_id;
                        const   user2_id = results.rows[0].user2_id;
                        var     to_id = 0;
                        if (user1_id == from_id) {
                            to_id = user2_id;
                        } else if (user2_id == from_id) {
                            to_id = user1_id;
                        }
                        pool.query('INSERT INTO "Message" (match_id, from_id, to_id, "date", message) VALUES ($1, $2, $3, $4, $5)',
                        [match_id, from_id, to_id, date, message],
                        (err) => {
                            if (err) throw err;
                            io.on('connection', (socket) => {
                                //socket
                                console.log('message connection');
                            });
                            res.status(201).json({ message: 'message uploaded' });
                        });
                    } else {
                        res.status(400).json({ message: 'error when tring to find match' });
                    }
                });
                    
            }
            catch (err) {
                console.error(err);
                res.status(400).json({ message: err.message });
            }
        }
    });


};