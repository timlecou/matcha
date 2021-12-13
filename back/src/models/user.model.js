const { Pool, Client } = require('pg')

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
            pool.query('INSERT INTO "User" (username, email, password, score, activated) VALUES ($1, $2, $3, $4, $5)',
            [this.username, this.email, this.password, this.score, this.activated],
            (err) => {
                if (err) throw err;
            })
        }
        catch (err) {
            console.err(err);
        }
    }


    insert () {
        try {
            pool.query('INSERT INTO "User" (username, email, password, birth_date, last_sign_in, latitude, longitude, gender, sexual_orientation, online, biography, score, first_name, last_name, activated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
            [this.username, this.email, this.password, this.birth_date, this.last_sign_in, this.latitude, this.longitude, this.gender, this.sexual_orientation, this.online, this.biography, this.score, this.first_name, this.last_name, this.activated],
            (error) => {
                if (error) throw error
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    update () {
        try {
            pool.query('UPDATE "User" SET username = $1, email = $2, password = $3, birth_date = $4, last_sign_in = $5, latitude = $6, longitude = $7, gender = $8, sexual_orientation = $9, online = $10, biography = $11, score = $12, first_name = $13, last_name = $14, activated = $15 WHERE id = $16',
            [this.username, this.email, this.password, this.birth_date, this.last_sign_in, this.latitude, this.longitude, this.gender, this.sexual_orientation, this.online, this.biography, this.score, this.first_name, this.last_name, this.activated, this.id],
            (error) => {
                if (error) throw error
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    delete () {
        try {
            pool.query('DELETE FROM "User" WHERE id = $1',
            [this.id],
            (error) => {
                if (error) throw error
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    find () {
        try {
            pool.query('SELECT * FROM "User" WHERE username = $1',
            [this.username],
            (error, results) => {
                if (error) throw error;
                if (results.rowCount != 1) {
                    return 0;
                } else {
                    Object.assign(this, results);
                }
            })
        }
        catch (err) {
            console.err(err);
            return 0;
        }
    }
}

module.exports = User