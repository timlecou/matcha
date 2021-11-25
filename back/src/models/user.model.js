const { Pool, Client } = require('pg')

const pool = new Pool()

class user {
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

    //methods
    insert () {

    }

    update () {

    }

    delete () {

    }
}


const getUsers = (req, res) => {
    pool.query('SELECT * FROM "user" ORDER BY id ASC',
    (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM "user" WHERE id = $1', [id],
    (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {username, email, password} = req.body
    pool.query('INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3)',
    [username, email, password],
    (error) => {
        if (error) throw error
        res.status(200).send('user created')
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM "user" WHERE id = $1',
    [id],
    (error) => {
        if (error) throw error
        res.status(200).send('user deleted')
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser
}