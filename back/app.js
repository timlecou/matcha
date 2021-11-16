let app = require('express')()

var cors = require('cors')

app.use(cors())

app.get('/', async (request, response) => {
    console.log('request recieved')
    response.send('salut gros')
})

app.listen(4000)