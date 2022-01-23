/**
 * Requires
 */
const express = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express;
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(cors())

const user = require('./models/user.model.js');
const photo = require('./models/photo.model.js');



const multer = require('multer');
const exp = require('constants');
const upload = multer({dest: 'uploads/'});
const server = require('http').createServer(app);
const ws = require('ws');
const { WebSocketServer } = require('ws');
const wss = new ws.Server({ server:server });



/**
 * routes
 */
 const  photoRoute = require('./routes/photo.route')(app);
 const  userRoute = require('./routes/user.route')(app);
 const  loginRoute = require('./routes/login.route')(app);
 const  registerRoute = require('./routes/register.route')(app);
 const  interestRoute = require('./routes/interest.route')(app);
 const  resetPasswordRoute = require('./routes/reset_password.route')(app);

 
app.get('/', async (request, response) => {
    console.log('request recieved')
    response.send('salut gros')
});

wss.on('connection', function connection(ws) {
  console.log('WS: new client connected');
  ws.send('welcome');
  ws.on('message', function incoming(message) {
    console.log(`message recieved: ${message}`);
    ws.send('something');
  });
});


server.listen(4000, () => console.log('Server started on http://localhost:4000'))