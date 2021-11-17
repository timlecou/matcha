let app = require('express')()

var cors = require('cors')

app.use(cors())

app.get('/', async (request, response) => {
    console.log('request recieved', request)
    response.send('salut gros ca va ?')
})

app.listen(4000)