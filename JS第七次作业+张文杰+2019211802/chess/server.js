const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = new require('socket.io')(server);

app.get('/client1', (req, res) => {
    res.sendFile(__dirname + '/client1.html');
})

app.get('/client2', (req, res) => {
    res.sendFile(__dirname + '/client2.html');
})

let game = {
    ready: [false, false],
    chess: [],
    user: 2,
    id: -1
}

function gameOver() {
    for (let i = 0; i < 3; i++) {
        if (typeof game.chess[i * 3] != "undefined" && game.chess[i * 3] == game.chess[i * 3 + 1] && game.chess[i * 3] == game.chess[i * 3 + 2])
            return game.chess[i * 3];
    }
    for (let i = 0; i < 3; i++) {
        if (typeof game.chess[i] != "undefined" && game.chess[i] == game.chess[i + 3] && game.chess[i + 3] == game.chess[i + 6])
            return game.chess[i];
    }
    if (typeof game.chess[0] != "undefined" && game.chess[0] == game.chess[4] && game.chess[0] == game[8]) return game[0];
    if (typeof game.chess[2] != "undefined" && game.chess[2] == game.chess[4] == game.chess[6]) return game[2];
    return -1;
}

io.on('connection', Socket => {
    console.log('a user connected');

    Socket.broadcast.emit('receiveMsg', game);
    Socket.emit('receiveMsg', game);


    Socket.on('sendMsg', function (data) {
        if (!game.ready[0] || !game.ready[1]) {
            game.ready[data.user] = data.ready;
        }
        if (game.ready[0] && game.ready[1]) {
            if (data.id < 0) {
                game.user = Math.round(Math.random());
                Socket.broadcast.emit('receiveMsg', game);
                Socket.emit('receiveMsg', game);
            }
            else {
                game.user = (game.user + 1) % 2
                game.chess[data.id] = data.user;
                if (gameOver() != -1) {
                    game.end = true;
                    Socket.emit('receiveMsg', game);
                    Socket.broadcast.emit('receiveMsg', game);
                    game.end = false;
                    game.chess = [];
                    game.ready = [false, false];
                    game.user = 2;
                    game.id = -1;
                }
                else Socket.broadcast.emit('receiveMsg', game);
            }
        }
    })

    Socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

const port = process.env.port || 5000;

server.listen(port, () => {
    console.log('Server running on port ' + port);
})