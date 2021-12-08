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
}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM "User" ORDER BY id ASC',
    (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM "User" WHERE id = $1', [id],
    (error, results) => {
        if (error) throw error
        delete results.rows[0].password
        res.status(200).json(results.rows)
    })
}

const updateUser = (req, res) => {
    const user = new User({id: parseInt(req.params.id), ...req.body})

    //validation

    user.update()
    res.status(200).send('user modified')
}

const createUser = (req, res) => {
    const user = new User(req.body);
    
    //validation

    user.insert();
    res.status(201).send('user created')
}

const deleteUser = (req, res) => {
    const user = new User({id: parseInt(req.params.id), ...req.body})

    user.delete()
    res.status(200).send('user deleted')
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}