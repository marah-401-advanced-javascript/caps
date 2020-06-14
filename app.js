'use strict';

const events = require('./events.js');
require('./caps');
require('./vendor');
require('./driver');

events.emit('myOrder');
