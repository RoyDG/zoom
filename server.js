const express = require('express');
const app = express(); // initialize express
// create server
const server = require('http').Server(app);



app.set('view engine', 'ejs');
// let's create our first url that we are going to hit it's slash url which is the root url
app.get('/', (req, res) => {
    res.render("room");
})



// listen under the server and run it
//server is gonna be local host and port is 3030 
server.listen(3030);
