const express = require('express');
const app = express(); // initialize express
// create server
const server = require('http').Server(app);
const io = require('socket.io')(server) // import it after installing socket.io
const { v4: uuidv4 } = require('uuid'); //imported uuid
app.set('view engine', 'ejs');
app.use(express.static('public'));//set the public url for script file




//redirect our root to uuid
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);// using string literals
})

//render our room here with unique id by passing parameter
app.get('/:room', (req, res) => {
    res.render("room", { roomId: req.params.room });
});


io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
       socket.join(roomId)
       socket.to(roomId).broadcast.emit('user-connected')
    })
})



// listen under the server and run it
//server is gonna be local host and port is 3030 
server.listen(3030);
