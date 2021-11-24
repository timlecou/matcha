const Pool = require('pg').Pool
const pool = new Pool({
  user: 'db_user',
  host: 'website-db',
  database: 'matcha_db',
  password: 'db_password',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "user" ORDER BY id ASC', (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query('UPDATE user SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error) => {
        if (error) throw error
    })
    response.status(200).send(`User modified with ID: ${id}`)
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "user" WHERE id = $1', [id],
    (error, results) => {
    if (error) throw error
    response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email, password } = request.body
    pool.query('INSERT INTO "user" (name, email, password) VALUES ($1, $2)',
    [name, email],
    (error) => {
    if (error) throw error
    response.status(200).send(`user ${name} created`)
    })
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM "user" WHERE id = $1', [id],
    (error) => {
        if (error) throw error
        response.status(200).send(`user ${id} deleted`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser
}