let app = require('express')()


app.get('/', (request, response) => {
    response.send('Yo les potes')
})

app.listen(4000)