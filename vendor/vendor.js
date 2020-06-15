'use strict';

require('dotenv').config();
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Connect to the CAPS server
client.connect(PORT, HOST, ()=> {
  console.log('vendor connected');
  // CLIENT is listening for the data event coming in from the CAPS server
  client.on('data', (data) => {
    const event = JSON.parse(data);
    if(event.event === 'delivered'){
      console.log('\x1b[31m',`Thank you for delivering ${event.payload.orderID}`);
    }
  });

  client.on('close', () => console.log('Vendor Connection Closed'));
});


client.on('error', (err) => console.log(`vendor error ${err.message}`));

// module.exports = sendMessage;
