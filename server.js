const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};

io.on('connection', (socket) => {
    console.log('A player connected:', socket.id);

    // Initialize new player
    players[socket.id] = { x: 0, y: 0 };

    // Send the current players to the newly connected player
    socket.emit('currentPlayers', players);

    // Notify other players of the new player
    socket.broadcast.emit('newPlayer', { id: socket.id, ...players[socket.id] });

    // Handle player movement
    socket.on('playerMovement', (movementData) => {
        players[socket.id] = movementData;
        socket.broadcast.emit('playerMoved', { id: socket.id, ...movementData });
    });

    // Handle player disconnect
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
