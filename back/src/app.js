/**
 * Requires
 */
const express = require('express')()
const cors = require('cors')
const user = require('./models/user.model.js')
const bodyParser = require('body-parser')

let app = express
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

/**
 * users routes
 */
app.get('/users', user.getUsers)
app.get('/users/:id', user.getUserById)
app.put('/users/:id', user.updateUser)
app.post('/users', user.createUser)
app.delete('/users/:id', user.deleteUser)



app.get('/', async (request, response) => {
    console.log('request recieved')
    response.send('salut gros')
})


app.listen(4000, () => console.log('Server started on http://localhost:4000'))