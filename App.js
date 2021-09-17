var express = require('express')
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http);
var PORT = 8000;

users = [];

app.get('/', function(req, res){

    res.sendFile(__dirname + '/' + 'index.html');
});

io.on('connection', function(socket){

    console.log('User Connected');
    socket.on('setUsername', function(data){
        if(users.indexOf(data) > -1){
            socket.emit('userExists', data + ' username taken!');
        } else {
            users.push(data);
            socket.emit('userSet', {username : data});
        }
    });

    socket.on('msg', function(data){
        io.sockets.emit('newmsg', data);
    });
});

http.listen(PORT, function(){
    
    console.log('Server running on PORT ' + PORT);
});