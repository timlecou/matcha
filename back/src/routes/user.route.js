const express = require('express')();
const cors = require('cors');
const validator = require('../validator/validator');
const jwt = require('jsonwebtoken');

const { Pool } = require('pg')
const pool = new Pool()

const User = require('../models/user.model.js');


const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/auth.middleware.js');
const { resourceLimits } = require('worker_threads');

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
     * GET
     */
    app.get("/api/users", (req, res) => {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decodedToken.userId;

        try {
            pool.query('SELECT * FROM "User" WHERE id != $1 ORDER BY id ASC',
            [user_id],
            async (error, results) => {
                if (error) throw error
                if (results.rowCount == 0) {
                    res.status(404).json({ message: "no users found" });
                } else {
                    for (let element of results.rows)
                    {
                        //check if the user has already liked
                        pool.query('SELECT * FROM "Liked_user" WHERE liker_id = $1 AND liked_id = $2',
                        [element.id, user_id],
                        (error, results) => {
                            if (error) throw error;
                            if (results.rowCount > 0) {
                                element.has_already_liked = true;
                            }
                        });
                        let tmp_user = new User.User();
                        tmp_user.id = element.id;
                        try {
                            element["photos"] = await tmp_user.getPhotos();
                        }
                        catch (err) {
                            console.error(err);
                            res.status(500).json("Error while loading photos of user " + tmp_user.id);
                        }
                        delete element.password;
                        delete element.email;
                        delete element.reset_password_token;
                        delete element.activation_token;
                    }
                    res.status(200).json(results.rows);
                }
            })
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    });

    /**
     * gets a user by its id
     */
    app.get("/api/users/:id", authMiddleware.getUserParams, (req, res) => {
        const   id = parseInt(req.params.id);

        try {
            pool.query('SELECT * FROM "User" WHERE id = $1', [id],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {        //check if the user exists
                    delete results.rows[0].password;
                    res.status(200).json(results.rows);
                } else {
                    res.status(404).json({ message: 'user doesn\'t exist'});
                }
            })
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    });

    /**
     * gets a user's matches
     */
    app.get("/api/users/:id/matches", authMiddleware.getUserParams, (req, res) => {
        const   id = parseInt(req.params.id);
        try {
            pool.query('SELECT FROM "User" WHERE id = $1',
            [id],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {
                    pool.query('SELECT u.*, m.id AS match_id FROM "User" u LEFT JOIN "Matched_user" m ON (u.id = m.user1_id OR u.id = user2_id) AND u.id != $1 WHERE m.user1_id = $1 OR user2_id = $1',
                    [id],
                    async (error, results) => {
                        if (error) throw error;
                        if (results.rowCount > 0) {
                            let matchs = [...results.rows];
                            for (var i = 0; i < matchs.length; i++) {
                                delete matchs[i].password;
                                delete matchs[i].email;
                                delete matchs[i].activation_token;
                                delete matchs[i].reset_password_token;
                                delete matchs[i].location;
                                let resu = await pool.query('SELECT * FROM "Photo" WHERE user_id = $1', [matchs[i].id]);
                                let messages = await pool.query('SELECT * FROM "Message" WHERE from_id = $1 OR to_id = $1', [matchs[i].id]);
                                var photos = {};
                                var paths = [];
                                
                                photos.paths = paths;
                                resu.rows.forEach(ele => {
                                    photos.paths.push(ele.path);
                                });
                                matchs[i]['messages'] = messages.rows;
                                matchs[i]['photos'] = photos;
                            }
                            res.status(200).json(results.rows);
                        } else {
                            res.status(200).json([]);
                        }
                    })
                } else {
                    res.status(404).json({ message: 'user doesn\'t exist'});
                }
            })
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
     * Block an other user
     */
    app.post("/api/users/:blocker_id/blocked/:blocked_id", authMiddleware.block, (req, res) => {
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
                            io.emit('block_user', {blocker_id: blocker_id, blocked_id: blocked_id});
                            res.status(201).json({ message: 'user blocked'});
                        })
                    } else {
                        res.json({ message: 'user already blocked'});
                    }
                })
            }
            catch (err) {
                console.error(err);
                res.status(400).json({ message: err.message });
            }
        }
    });
    
    /**
     * Like an other user           //TODO verifier que le match n'existe pas deja
     */
    app.post("/api/users/:liker_id/liked/:liked_id", authMiddleware.like, (req, res) => {
        const liker_id = parseInt(req.params.liker_id);
        const liked_id = parseInt(req.params.liked_id);

        if (liker_id == liked_id) {
            res.status(400).json({ message: 'you can\'t like yourself'});
        } else {
            try {
                //check si le liked user existe
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
                                        io.emit('match_user', {user1: liker_id, user2: liked_id});
                                        res.status(200).json({ message: 'users just matched !'});
                                    })
                                } else {
                                    io.emit('like_user', {liker_id: liker_id, liked_id: liked_id});
                                    res.status(201).json({ message: 'user liked'});
                                }
                            })

                        })
                    } else {
                        res.json({ message: 'user already liked'});
                    }
                })
            }
            catch (err) {
                console.error(err);
                res.status(400).json({ message: err.message });
            }
        }
    });

    /**
     * See an other user's profil
     */
    app.post("/api/users/:viewer_id/viewed/:viewed_id", authMiddleware.view, (req, res) => {
        
        const   viewer_id = parseInt(req.params.viewer_id);
        const   viewed_id = parseInt(req.params.viewed_id);
        var now = new Date();
        now.toUTCString();

        try {
            pool.query('SELECT FROM "Viewed_user" WHERE viewer_id = $1 AND viewed_id = $2',
                [viewer_id, viewed_id],
                (error, results) => {
                    if (error) throw error;
                    if (results.rowCount == 0) {
                        pool.query('INSERT INTO "Viewed_user" (viewer_id, viewed_id, date) VALUES ($1, $2, $3)',
                        [viewer_id, viewed_id, now],
                        (error) => {
                            if (error) throw error;
                            res.status(201).json({ message: "user viewed" });
                        })
                    } else {
                        pool.query('UPDATE "Viewed_user" SET date = $1 WHERE viewer_id = $2 AND viewed_id = $3'),
                        [now, viewer_id, viewed_id],
                        (error) => {
                            if (error) throw error;
                            io.emit('view_user', {viewer_id: viewer_id, viewed_id: viewed_id});
                            res.status(201).json({ message: "user viewed" });
                        };
                    }
                })
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    });


    /**
     * 
     * PUT
     * 
     */

    /**
     * Update the location of an user
     */
    app.put("/api/users/:id/location", authMiddleware.getUserParams, (req, res) => {

        const   user_id = parseInt(req.params.id);
        const   lat = parseFloat(req.body.lat);
        const   long = parseFloat(req.body.long);

        try {
            pool.query('UPDATE "User" SET location = point($1, $2) WHERE id = $3',
            [lat, long, user_id],
            (error) => {
                if (error) throw error;
                res.status(204).json({ message: 'location successfully updated' });
            });
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ message: err.message });
        }
    });

    /**
    * Set an interest to a user                 //TODO check si les interest existent
    */
    app.put("/api/users/:user_id/interests", authMiddleware.getUserParams, (req, res) => {

        const user_id = parseInt(req.params.user_id);
        const interests = req.body.name;

        try {
            for (let index = 0; index < interests.length; index++) {            //insere les interets qui n'existent pas encore dans la bdd
                pool.query('SELECT * FROM "Interest" WHERE name = $1',
                [interests[index]],
                (error, results) => {
                    if (error) throw error;
                    if (results.rowCount == 0) {
                        pool.query('INSERT INTO "Interest" (name) VALUES ($1)',
                        [interests[index]],
                        (error) => {
                            if (error) throw error;
                            // pool.query('INSERT INTO "Interest_User" (user_id, interest_id) VALUES ($1, $2)',
                            // [user_id, results.rows[0].id],
                            // (error) => {
                            //     if (error) throw error;
                            // });
                        });
                    }
                });
            }

            //delete all interests owned by the user
            pool.query('DELETE FROM "Interest_User" WHERE user_id = $1',
            [user_id],
            (error) => {
                if (error) throw error;

                //add all the new interests
                for (let index = 0; index < interests.length; index++) {
                    const element = interests[index];
                    pool.query('SELECT id FROM "Interest" WHERE name = $1',
                    [element],
                    (error, results) => {
                        if (error) throw error;
                        const interest_id = results.rows[0].id;
                        // console.log('PUTE');
                        pool.query('INSERT INTO "Interest_User" (user_id, interest_id) VALUES ($1, $2)',
                        [user_id, interest_id],
                        (error) => {
                            if (error) throw error;
                        });
                    });
                }
                res.status(200).json({ message: 'interests updated' });
            });
           
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ message: err.message });
        }

    });


    /**
     * Update a user
     */
    app.put("/api/users/:id", authMiddleware.getUserParams, (req, res) => {
        const user_id = parseInt(req.params.id);
        const user = new User.User({id: user_id, ...req.body});
        
        user.validate();
        user.update(res);
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
            console.error(err);
            res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'user unblocked'});
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
                    pool.query('DELETE FROM "Liked_user" WHERE liker_id = $1 AND liked_id = $2',
                    [liker_id, liked_id],
                    (error) => {
                        if (error) throw error;
                        res.status(204).json({ message: 'user unliked'});
                    });
                }
            };
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
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
                    pool.query('DELETE FROM "Matched_user" WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)',
                    [id, user_id],
                    (error) => {
                        if (error) throw error;
                        res.status(204).json({ message: "match deleted" });
                    });
                }
            };
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
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
            res.status(400).json({ message: err.message });
        }
    });
}