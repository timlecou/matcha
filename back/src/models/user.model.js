const { Pool, Client } = require('pg');
const Validator = require('../validator/validator');
const Constraints = require('../constraints/constraints');

const pool = new Pool()

class User {
    id;
    username;
    email;
    password;
    birth_date;
    lastSignIn;
    latitude;
    longitude;
    gender;
    sexual_orientation;
    online;
    biography;
    score;
    first_name;
    last_name;
    activated;
    activation_token;

    constructor (param) {
        Object.assign(this, param)
    }

    //methods

    register ()
    {
        console.log(this.longitude, this.latitude);
        return new Promise((resolve, reject) =>
        {
            try
            {
                pool.query('INSERT INTO "User" (username, email, first_name, last_name, password, score, activated, location, activation_token) VALUES ($1, $2, $3, $4, $5, $6, $7, point($8, $9), $10) RETURNING id',
                [this.username, this.email, this.first_name, this.last_name, this.password, this.score, this.activated, this.latitude, this.longitude, this.activation_token],
                (err, result) =>
                {
                    if (err) throw err;
                    this.id = result.rows[0].id;
                    resolve();
                })
            }
            catch (err)
            {
                console.error(err);
                reject(err);
            }
        })
    }


    // insert () {
    //     try {
    //         pool.query('INSERT INTO "User" (username, email, password, birth_date, last_sign_in, latitude, longitude, gender, sexual_orientation, online, biography, score, first_name, last_name, activated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
    //         [this.username, this.email, this.password, this.birth_date, this.last_sign_in, this.latitude, this.longitude, this.gender, this.sexual_orientation, this.online, this.biography, this.score, this.first_name, this.last_name, this.activated],
    //         (error) => {
    //             if (error) throw error
    //         })
    //     }
    //     catch (err) {
    //         console.error(err)
    //     }
    // }

    validate () {
        const val = new Validator.Validator();

        val.setObject(this);

        //set the constraints to check


        val.setConstraints('username', Constraints.IsDefined, Constraints.IsNotEmpty, Constraints.IsAlphanumeric, Constraints.IsNotOnlyNumeric, Constraints.HasGoodUsernameSize);
        val.setConstraints('email', Constraints.IsDefined, Constraints.IsAValidEmail);
        // val.setConstraints('password', Constraints.IsString, Constraints.IsNotOnlyNumeric, Constraints.HasGoodPasswordSize);
        val.setConstraints('first_name', Constraints.IsDefined, Constraints.IsOnlyAlpha);
        val.setConstraints('last_name', Constraints.IsDefined, Constraints.IsOnlyAlpha);
        val.setConstraints('gender', Constraints.IsAGender);
        val.setConstraints('sexual_orientation', Constraints.IsASexualOrientation);
        // val.setConstraints('online', Constraints.IsBoolean);
        val.setConstraints('biography', Constraints.IsUnder400Characters);
        val.validate();
    }

    update (res) {
        try {
            pool.query('SELECT * FROM "User" WHERE username = $1 AND id != $2',
            [this.username, this.id],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount == 0) {
                    pool.query('SELECT * FROM "User" WHERE email = $1 AND id != $2',
                    [this.email, this.id],
                    (error, results) => {
                        if (error) throw error;
                        if (results.rowCount == 0)
                        {
                            pool.query('UPDATE "User" SET username = $1, email = $2, birth_date = $3, last_sign_in = $4, location = point($5, $6), gender = $7, sexual_orientation = $8, online = $9, biography = $10, score = $11, first_name = $12, last_name = $13, activated = $14 WHERE id = $15',
                            [this.username, this.email, this.birth_date, this.last_sign_in, this.latitude, this.longitude, this.gender, this.sexual_orientation, this.online, this.biography, this.score, this.first_name, this.last_name, this.activated, this.id],
                            (error) => {
                                if (error) throw error;
                                res.status(200).json({ message: "user updated" });
                            });
                        } else {
                            res.status(403).json({ message: "email already taken" });
                        }
                    });
                } else {
                    res.status(403).json({ message: "username already taken" });
                }
            });
        }
        catch (err) {
            console.error(err)
        }
    }

    getPhotos()
    {
        return new Promise((resolve, reject) =>
        {
            pool.query('SELECT * FROM "Photo" WHERE user_id = $1',
            [this.id],
            (error, results) =>
            {
                if (error)
                    reject(error);
                var photos = {};
                var paths = [];
    
                photos.paths = paths;
                for (let element of results.rows)
                    photos.paths.push(element.path);
                resolve(photos.paths);
            });
        });
    }
}


module.exports = {
    User,
}