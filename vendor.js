'use strict';

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker');
const STORE_NAME = process.env.STORE_NAME || 'myStore';


events.on('myOrder',event);
events.on('thankyou',thankLogger );

function event() {
  setInterval(() => {
    let fakeOrder = {
      store : STORE_NAME,
      orderID : faker.random.uuid(),
      customer : faker.name.firstName(),
      address : faker.address.streetAddress(),
    };
    events.emit('pickup', fakeOrder); 
  }, 5000); 
}

function thankLogger(){
  console.log('Thank you!');
}

module.exports = thankLogger;