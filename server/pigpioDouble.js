class Gpio {
	constructor(pin) {
		this._pin = pin;
	}
	digitalWrite(val){
		console.log(`writing pin ${this._pin}: ${val}`);
	}
	
}

Gpio.prototype.OUTPUT = 'output';

module.exports = {
	Gpio: Gpio
};
