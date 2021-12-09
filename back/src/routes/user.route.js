const express = require('express')();
const cors = require('cors');

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

    /**
     * GET
     */
    app.get("/users", (req, res) => {
        pool.query('SELECT * FROM "User" ORDER BY id ASC',
        (error, results) => {
            if (error) throw error
            results.rows.forEach(element => {
                delete element.password
            });
            res.status(200).json(results.rows)
        })
    });

    app.get("/users/:id", (req, res) => {
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM "User" WHERE id = $1', [id],
        (error, results) => {
            if (error) throw error
            delete results.rows[0].password
            res.status(200).json(results.rows)
        })
    });


    /**
     * POST
     */
    app.post("/users", (req, res) => {
        const user = new User(req.body);
        
        //validation

        user.insert();
        res.status(201).send('user created')
    });

    //TODO
    app.post("/users/:id/blocked", (req, res) => {
        const blocker_id = req.params.id;
        const blocked_id = req.params.blocked_id;

        if (blocker_id == blocked_id)
        {
            res.send('you can\'t block yourself')
        }

        pool.query('INSERT INTO "Blocked_user" (blocker_id, blocked_id) VALUES ($1, $2)',
        [blocker_id, blocked_id],
        (error) => {
            if (error) throw error;
            res.status(201).send('user blocked');
        })
    });
    

    /**
     * PUT
     */
    app.put("/users/:id", (req, res) => {
        const user = new User({id: parseInt(req.params.id), ...req.body})

        //validation

        user.update()
        res.status(200).send('user modified')
    });


    /**
     * DELETE
     */
    app.delete("/users/:id", (req, res) => {
        const user = new User({id: parseInt(req.params.id), ...req.body})

        user.delete()
        res.status(200).send('user deleted')
    });
}