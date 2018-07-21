import * as Pigpio from 'pigpio';
let pigpio: typeof Pigpio;

try {
  pigpio = require('pigpio');
} catch (err) {
  pigpio = require('pigpio-mock');
}

export = pigpio;
