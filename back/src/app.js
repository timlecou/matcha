/**
 * arr[socket_id] = user OU
 * arr[user.id] = socket
 * 
 * function getUserBySocket()
 * function getSocketByUser()
 */


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


/**
 * Socket.io setup
 */
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});


io.on('connection', (socket) =>
{
  // Emit dans une room
  // io.to("some room").emit("some event", {qdd: 333});

  // Get jwt
  console.log("token =>", socket.handshake.query.access_token);

  console.log('a user connected');
  socket.on('message', (message) =>
  {
    console.log(message);
  });
});

io.on('disconnection', (socket) => {
  console.log('a user diconected');
});

/**
 * routes
 */
 const  photoRoute = require('./routes/photo.route')(app);
 const  userRoute = require('./routes/user.route')(app, io);
 const  loginRoute = require('./routes/login.route')(app, io);
 const  registerRoute = require('./routes/register.route')(app, io);
 const  interestRoute = require('./routes/interest.route')(app);
 const  resetPasswordRoute = require('./routes/reset_password.route')(app);
 const  messageRoute = require('./routes/message.route')(app, io);

server.listen(4000, () => console.log('Server started on http://localhost:4000'))