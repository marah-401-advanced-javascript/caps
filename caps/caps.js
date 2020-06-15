'use strict';

const net = require('net');
const uuidv4 = require('uuid').v4;
const PORT = process.env.PORT || 3000;
const server = net.createServer();


server.listen(PORT, () => console.log(`Server is up on port ${PORT}`));

const socketPool = {}; // this will store all the connected clients

// SERVER listening on client connection //
server.on('connection', (socket) => {
  const id = `socket-${uuidv4()}`;
  socketPool[id] = socket;
  // CLIENT listen on data event // 
  socket.on('data', (buffer) => dispatchEvent(buffer));//get the buffer of the sent message
  // CLIENT listen on socket error //
  socket.on('error', (e) => console.log(`Socket error ${e.message}`));
  //CLIENT listen on connection end //
  socket.on('end', (e) => delete socketPool[id]);
});

// Parse the buffer and take the string message from it 
function dispatchEvent(buffer) {
  const message = JSON.parse(buffer.toString().trim()); //JSON.parse(buffer); will work as well
  broadcast(message);
}

// Sending the parsed message to all connected clients 
function broadcast(message) {
  console.log('EVENT ', message);// parsed message 
  const payload = JSON.stringify(message);// string message 
  for (let socket in socketPool) {
    // CLIENT emit the message to all the clients //
    socketPool[socket].write(payload);
  }
}


// SERVER listening to error //
server.on('error', (e) => console.log('SERVER ERROR', e.message));



