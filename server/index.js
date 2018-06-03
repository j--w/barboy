require('dotenv').config();
let Gpio;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'PRODUCTION') {
	Gpio = require('pigpio').Gpio;
} else {
	Gpio = require('./pigpioDouble').Gpio;
}

const pinMap = {
	standBy: 25,
	pwma: 18,
	ain2: 23,
	ain1: 24
};

const pins = Object.keys(pinMap).reduce((acc, key) => {
	acc[key] = new Gpio(pinMap[key], {mode: Gpio.OUTPUT});
	return acc;
}, {});

function reset() {
	Object.keys(pins).forEach(key => pins[key].digitalWrite(0));
}

function pour() {
	pins.pwma.digitalWrite(1);
	pins.ain1.digitalWrite(0);
	pins.ain2.digitalWrite(1);
	pins.standBy.digitalWrite(1);
	setTimeout(reset, 10000);
}

reset();
pour();
