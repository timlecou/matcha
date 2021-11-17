/**
 * Requires
 */
const express = require('express')()
const cors = require('cors')

/**
 * connection to the database
 */
require('./models/dbConfig.js')

let app = express
app.use(cors())

app.get('/', async (request, response) => {
    console.log('request recieved')
    response.send('salut gros')
})

app.listen(4000, () => console.log('Server started on http://localhost:4000'))