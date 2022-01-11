const express = require('express')();
const cors = require('cors');

const { Pool, Client } = require('pg')
const pool = new Pool()

const User = require('../models/user.model.js');


const bodyParser = require('body-parser');
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
     * GET
     */
    app.get("/users", (req, res) => {
        try {
            pool.query('SELECT * FROM "User" WHERE id != $1 ORDER BY id ASC',
            [req.user_id],
            (error, results) => {
                if (error) throw error
                if (results.rowCount == 0) {
                    res.status(404).json({ message: "no user found" });
                } else {
                    results.rows.forEach(element => {
                        delete element.password
                    });
                    res.status(200).json(results.rows);
                }
            })
        }
        catch (err) {
            console.err(err);
        }
    });

    /**
     * gets a user by its id
     */
    app.get("/users/:id", authMiddleware.getUserParams, (req, res) => {
        const   id = parseInt(req.params.id);

        try {
            pool.query('SELECT * FROM "User" WHERE id = $1', [id],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {        //check if the user exists
                    delete results.rows[0].password;
                    res.status(200).json(results.rows);
                } else {
                    res.status(404).send('user doesn\'t exist');
                }
            })
        }
        catch (err) {
            console.err(err);
        }
    });

    /**
     * gets a user's matches
     */
    app.get("/users/:id/matches", authMiddleware.getUserParams, (req, res) => {
        const   id = parseInt(req.params.id);

        try {
            pool.query('SELECT FROM "User" WHERE id = $1',
            [id],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {        //check if the user exists
                    pool.query('SELECT u.* FROM "User" u INNER JOIN "Matched_user" m ON (u.id = m.user1_id OR u.id = user2_id) AND u.id != $1 WHERE m.user1_id = $1 OR user2_id = $1',
                    [id],
                    (error, results) => {
                        if (error) throw error;
                        if (results.rowCount > 0) {
                            res.status(200).json(results.rows);
                        } else {
                            res.status(404).send('user has no matches');
                        }
                    })
                } else {
                    res.status(404).send('user doesn\'t exist');
                }
            })
        }
        catch (err) {
            console.err(err);
        }
    });

    /**
     * 
     * POST
     * 
     */

    /**
     * Block an other user
     */
    app.post("/users/:blocker_id/blocked/:blocked_id", authMiddleware.block, (req, res) => {
        const blocker_id = parseInt(req.params.blocker_id);
        const blocked_id = parseInt(req.params.blocked_id);

        if (blocker_id == blocked_id) {
            res.status(400).send('you can\'t block yourself');
        } else {
            try {
                pool.query('SELECT FROM "Blocked_user" WHERE blocker_id = $1 AND blocked_id = $2',
                [blocker_id, blocked_id],
                (error, results) => {
                    if (error) throw error;
                    if (results.rowCount == 0) {
                        pool.query('INSERT INTO "Blocked_user" (blocker_id, blocked_id) VALUES ($1, $2)',
                        [blocker_id, blocked_id],
                        (error) => {
                            if (error) throw error;
                            res.status(201).send('user blocked');
                        })
                    } else {
                        res.send('user already blocked');
                    }
                })
            }
            catch (err) {
                console.err(err);
            }
        }
    });
    
    /**
     * Like an other user           //TODO verifier que le match n'existe pas deja
     */
    app.post("/users/:liker_id/liked/:liked_id", authMiddleware.like, (req, res) => {
        const liker_id = parseInt(req.params.liker_id);
        const liked_id = parseInt(req.params.liked_id);

        if (liker_id == liked_id) {
            res.status(400).send('you can\'t like yourself');
        } else {
            try {
                pool.query('SELECT FROM "Liked_user" WHERE liker_id = $1 AND liked_id = $2',
                [liker_id, liked_id],
                (error, results) => {
                    if (error) throw error;
                    if (results.rowCount == 0) {
                        pool.query('INSERT INTO "Liked_user" (liker_id, liked_id) VALUES ($1, $2)',
                        [liker_id, liked_id],
                        (error) => {
                            if (error) throw error;

                            //check if both users have matched
                            pool.query('SELECT * FROM "Liked_user" WHERE (liked_id = $1 AND liker_id = $2) OR (liker_id = $1 AND liked_id = $2)',
                            [liker_id, liked_id],
                            (error, results) => {
                                if (error) throw error;
                                if (results.rowCount == 2) {    //if both users have liked each other
                                    pool.query('INSERT INTO "Matched_user" (user1_id, user2_id) VALUES ($1, $2)',
                                    [liker_id, liked_id],
                                    (error) => {
                                        if (error) throw error;
                                        res.status(200).send('users just matched !');
                                    })
                                } else {
                                    res.status(201).send('user liked');
                                }
                            })

                        })
                    } else {
                        res.send('user already liked');
                    }
                })
            }
            catch (err) {
                console.err(err);
            }
        }
    });

    /**
     * 
     * PUT
     * 
     */

    /**
    * Set an interest to a user                 //TODO check si les interest existent
    */
    app.put("/users/:user_id/interests", authMiddleware.getUserParams, (req, res) => {

        const user_id = parseInt(req.params.user_id);
        const interests = req.body.names;

        try {


            pool.query('SELECT * FROM "User" WHERE id = $1',
            [user_id],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {
                     //delete all interests owned by the user
                pool.query('DELETE FROM "Interest_User" WHERE user_id = $1',
                [user_id],
                (error) => {
                    if (error) throw error;

                    //add all the new interests
                    for (let index = 0; index < interests.length; index++) {
                        const element = interests[index];
                        pool.query('INSERT INTO "Interest_User" (user_id, interest_id) VALUES ($1, $2)',
                        [user_id, element],
                        (error) => {
                            if (error) throw error;
                        });
                    }
                    res.status(200).json({ message: 'interests updated' });
                
                });
                } else {
                    res.status(404).json({ message: 'user not found' });
                }
            });



           
        }
        catch (error) {
            console.error(error);
        }

    });


    /**
     * Update a user
     */
    app.put("/users/:id", authMiddleware.getUserParams, (req, res) => {
        const user = new User({id: parseInt(req.params.id), ...req.body})

        //validation

        user.update();
        res.status(200).send('user modified');
    });


    /**
     * 
     * DELETE
     * 
     */

    /**
     * Unblock an other user
     */
    app.delete("/users/:blocker_id/blocked/:blocked_id", authMiddleware.block, (req, res) => {
        const blocker_id = parseInt(req.params.blocker_id);
        const blocked_id = parseInt(req.params.blocked_id);

        try {
            pool.query('DELETE FROM "Blocked_user" WHERE blocker_id = $1 AND blocked_id = $2',
            [blocker_id, blocked_id],
            (error) => {
                if (error) throw error;
            })
        }
        catch (err) {
            console.err(err);
        }
        res.status(200).send('user unblocked');
    });

    /**
     * Unlike an other user
     */
    app.delete("/users/:liker_id/liked/:liked_id", authMiddleware.like, (req, res) => {
        const   liker_id = parseInt(req.params.liker_id);
        const   liked_id = parseInt(req.params.liked_id);

        try {
            pool.query('SELECT * FROM "Liked_user" WHERE liker_id = $1 AND liked_id = $2'),
            [liker_id, liked_id],
            (error, results) => {
                if (error) throw error;

                if (results.rowCount > 0) {
                    try {
                        pool.query('DELETE FROM "Liked_user" WHERE liker_id = $1 AND liked_id = $2',
                        [liker_id, liked_id],
                        (error) => {
                            if (error) throw error;
                            res.status(204).send('user unliked');
                        })
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            };
        }
        catch (err) {
            console.error(err);
        }
    });

    /**
     * Delete a match
     */
    app.delete("/users/:id/matches/:user_id", authMiddleware.match, (req, res) => {
        const   id = parseInt(req.params.id);
        const   user_id = parseInt(req.params.user_id);

        try {
            pool.query('SELECT * FROM "Matched_user" WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)'),
            [id, user_id],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount > 0) {
                    try {
                        pool.query('DELETE FROM "Matched_user" WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)',
                        [id, user_id],
                        (error) => {
                            if (error) throw error;
                            res.status(204).json({ message: "match deleted" });
                        });
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            };
        }
        catch (err) {
            console.error(err);
        }
    });

    /**
     * Delete a user
     */
    app.delete("/users/:id", authMiddleware.getUserParams, (req, res) => {
        const id = parseInt(req.params.id);

        try {
            pool.query('DELETE FROM "User" WHERE id = $1'),
            [id],
            (error) => {
                if (error) throw error;
                res.status(204).json({ message: "user deleted" });
            };
        }
        catch (err) {
            console.error(err);
        }
    });
}