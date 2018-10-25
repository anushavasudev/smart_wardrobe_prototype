var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/main_app/index.html');
})

app.get('/controller', function (req, res) {
    res.sendFile(__dirname + '/woz_controller/index.html');
})

app.get('/controller/:page', function (req, res) {
    var page = req.params.page || 'index'
    res.sendFile(__dirname + '/woz_controller/' + page + '.html');
})

app.get('/:page', function (req, res) {
    var page = req.params.page || 'index'
    console.log(req.params.page)
    res.sendFile(__dirname + '/main_app/' + page + '.html');
})

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('*', function (msg) {
        console.log("!")
    })

    socket.on('woz_controller_connected', function (msg) {
        console.log('woz_controller_connected');
    });
    
    socket.on('woz_action', function (msg) {
        console.log('woz_action:', msg);
        io.emit('woz_action', msg);
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});