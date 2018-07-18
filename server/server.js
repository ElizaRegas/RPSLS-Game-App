// NODE JS
const http = require("http");
const express = require("express");
const socketio = require('socket.io');
const rpslsGame = require('./rpslsGameLogic');

const app = express();

const clientPath = `${__dirname}/../client/`;
 console.log('Serving static from ' + clientPath);
app.use(express.static(clientPath));

// CREATING SERVER
const server = http.createServer(app);
const io = socketio(server);

let initialPlayer = null;

io.on('connection', (secondPlayer) => {
  if (initialPlayer) {
    new rpslsGame(initialPlayer, secondPlayer);
    initialPlayer = null;
  } else {
    initialPlayer = secondPlayer;
    initialPlayer.emit('message', 'Waiting for an opponent...');
  }

  secondPlayer.on('message', (text) => {
    io.emit('message', text);
  })
});

server.on("error", (err) => {
 console.error('Server error:', err);
});

server.listen(8080, () => {
 console.log('RPSLS started on 8080');
});
