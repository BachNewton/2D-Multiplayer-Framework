// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, () => {
    console.log('Starting server on port 5000');
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Player disconnected with ID:', socket.id);
    });

    socket.on('new player', () => {
        console.log('New player connected with ID:', socket.id);
    });
});
