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

    constructor (param) {
        Object.assign(this, param)
    }

    //methods

    register () {
        try {
            pool.query('INSERT INTO "User" (username, email, first_name, last_name, password, score, activated, location) VALUES ($1, $2, $3, $4, $5, $6, $7, point($8, $9))',
            [this.username, this.email, this.first_name, this.last_name, this.password, this.score, this.activated, this.latitude, this.longitude],
            (err) => {
                if (err) throw err;
            })
        }
        catch (err) {
            console.err(err);
        }
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

        val.setConstraints('username', Constraints.IsNotEmpty, Constraints.IsAlphanumeric, Constraints.IsNotOnlyNumeric, Constraints.HasGoodPseudoSize);
        // val.setConstraints('password', Constraints.IsString, Constraints.IsNotOnlyNumeric, Constraints.HasGoodPasswordSize);
        val.setConstraints('first_name', Constraints.IsOnlyAlpha);
        val.validate();
    }

    update () {
        try {
            pool.query('UPDATE "User" SET username = $1, email = $2, birth_date = $3, last_sign_in = $4, location = point($5, $6), gender = $7, sexual_orientation = $8, online = $9, biography = $10, score = $11, first_name = $12, last_name = $13, activated = $14 WHERE id = $15',
            [this.username, this.email, this.birth_date, this.last_sign_in, this.latitude, this.longitude, this.gender, this.sexual_orientation, this.online, this.biography, this.score, this.first_name, this.last_name, this.activated, this.id],
            (error) => {
                if (error) throw error
            })
        }
        catch (err) {
            console.error(err)
        }
    }
}


module.exports = {
    User,
}