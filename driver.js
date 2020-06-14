'use strict';

const events = require('./events');
require('./vendor');

events.on('pickup', pickFunction);

function pickFunction(myOrder) {
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${myOrder.orderID}`);
    events.emit('in-transit',myOrder);
  },1000);
  setTimeout(()=>{ 
    console.log(`DRIVER: delivered up ${myOrder.orderID}`);
    console.log(`VENDOR: Thank you for delivering ${myOrder.orderID}`);
    events.emit('delivered',myOrder);
    events.emit('thankyou');
  },3000);
}

module.exports = pickFunction;
