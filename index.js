var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var toggles = {}

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/main_app/index.html');
    res.redirect('/home');
})

app.get('/controller', function (req, res) {
    res.sendFile(__dirname + '/woz_controller/index.html');
})

app.get('/controller/:page', function (req, res) {
    var page = req.params.page || 'index'
    res.sendFile(__dirname + '/woz_controller/' + page + '.html');
})

app.get('/:page', function (req, res) {
    var page = req.params.page || '0_index'
    console.log(req.params.page)
    // res.sendFile(__dirname + '/main_app/' + page + '.html');
    res.render('main_app/' + page);
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

    socket.on('woz_toggle', function (msg) {
        console.log('woz_toggle:', msg);
        toggles[msg.key] = msg.value
    });

    socket.on('woz_toggle_query', function (msg) {
        console.log('woz_toggle_query:', msg);
        io.emit('woz_toggle_query_answer', toggles);
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});