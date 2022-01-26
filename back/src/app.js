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

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

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

io.on('connection', (socket) =>
{
  console.log('a user connected');
  socket.on('test_notif', data =>
  {
    console.log("I have received", data);
  })
});



server.listen(4000, () => console.log('Server started on http://localhost:4000'))