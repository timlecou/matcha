/**
 * Requires
 */
const express = require('express')();
const cors = require('cors');

const user = require('./models/user.model.js');
const photo = require('./models/photo.model.js');


const bodyParser = require('body-parser');

const multer = require('multer');
const exp = require('constants');
const upload = multer({dest: 'uploads/'});

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

/**
 * routes
 */
 const  photoRoute = require('./routes/photo.route')(app);
 const  userRoute = require('./routes/user.route')(app);
 const  loginRoute = require('./routes/login.route')(app);
 const  registerRoute = require('./routes/register.route')(app);

 
app.get('/', async (request, response) => {
    console.log('request recieved')
    response.send('salut gros')
})


app.listen(4000, () => console.log('Server started on http://localhost:4000'))