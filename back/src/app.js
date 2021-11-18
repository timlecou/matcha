/**
 * Requires
 */
const express = require('express')()
const cors = require('cors')
const db = require('./queries.js')
const bodyParser = require('body-parser')

let app = express
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

app.get('/users', db.getUsers)

app.get('/users/:id', db.getUserById)

app.put('/users/:id', db.updateUser)

app.post('/users', db.createUser)

app.delete('/users/:id', db.deleteUser)

app.get('/', async (request, response) => {
    console.log('request recieved')
    response.send('salut gros')
})

app.listen(4000, () => console.log('Server started on http://localhost:4000'))