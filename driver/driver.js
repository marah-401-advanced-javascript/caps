'use strict';

require('dotenv').config();
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const faker = require('faker');
const STORE_NAME = process.env.STORE_NAME || 'myStore';


// Connect to the CAPS server
client.connect(PORT, HOST, () => {
  console.log('Driver Connected');
  const messages = [];
  // CLIENT is listening for the data event coming in from the CAPS server
  client.on('data', (data) => {
    const parsedData = JSON.parse(data);
    if( parsedData.event === 'pickup'){
      messages.push(`pickedup ${parsedData.payload.orderID}`);
      console.clear();
      messages.forEach((message) => {
        console.log('\x1b[34m', message);
      });
      console.log('');
    }
    else if( parsedData.event === 'in-transit'){
      messages.push(`delivered ${parsedData.payload.orderID}`);
      console.clear();
      messages.forEach((message) => {
        console.log('\x1b[34m',message);
      });
      console.log('');
    }
  });


  function sendMessage() {
    setInterval(() => {
      let fakeOrder = {
        store: STORE_NAME,
        orderID: faker.random.uuid(),
        customer: faker.name.firstName(),
        address: faker.address.streetAddress(),
      };
      pickUp(fakeOrder);
    }, 5000);
  }


  function pickUp(payload){
    setTimeout(() => {
      let pickEvent = JSON.stringify({ event: 'pickup', time: new Date() ,  payload: payload });
      client.write(pickEvent);
    }, 1000);
    setTimeout(() => {
      let transitEvent = JSON.stringify({ event: 'in-transit', time: new Date() ,  payload: payload });
      client.write(transitEvent);
    }, 3000);
    let deliverEvent = JSON.stringify({ event: 'delivered', time: new Date() ,  payload: payload });
    client.write(deliverEvent);
  }

  sendMessage();

  client.on('close', () => console.log('Driver Connection Closed'));
});

client.on('error', (err) => console.log('Driver Error ', err.message));
