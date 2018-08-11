"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pigpio_wrapper_1 = require("../pigpio-wrapper");
const __1 = require("..");
const pins = process.argv[2].split(',').map((pin) => parseInt(pin, 10));
const dutyCycle = parseInt(process.argv[3], 10) || 100;
const duration = parseInt(process.argv[4], 10) || 5000;
const pumps = pins.map((pin) => new pigpio_wrapper_1.Gpio(pin, { mode: pigpio_wrapper_1.Gpio.OUTPUT }));
__1.attachCleanupHandler(pins);
pumps.forEach((pump) => pump.pwmWrite(dutyCycle));
setTimeout(() => {
    pumps.forEach((pump) => pump.pwmWrite(0));
}, duration);
//# sourceMappingURL=quickTest.js.map