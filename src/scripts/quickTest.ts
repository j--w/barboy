import { Gpio } from '../pigpio-wrapper';
import { attachCleanupHandler } from '..';

const pins = process.argv[2].split(',').map((pin) => parseInt(pin, 10));
const dutyCycle = parseInt(process.argv[3], 10) || 100;
const duration = parseInt(process.argv[4], 10) || 5000;
const pumps = pins.map((pin) => new Gpio(pin, { mode: Gpio.OUTPUT }));
attachCleanupHandler(pins);

pumps.forEach((pump) => pump.pwmWrite(dutyCycle));

setTimeout(() => {
  pumps.forEach((pump) => pump.pwmWrite(0));
}, duration);
