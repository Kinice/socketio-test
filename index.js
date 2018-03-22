var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

/*
app.get('/', function(req, res){
      res.send('<h1>Hello world</h1>');
});
*/

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('socket message', function(msg) {
    console.log(msg);
    io.emit('socket message', msg);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
      console.log('listening on *:3000');
});
