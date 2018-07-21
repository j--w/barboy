"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pigpio_wrapper_1 = require("./pigpio-wrapper");
function pinsDown(pins) {
    pins.map((pin) => new pigpio_wrapper_1.Gpio(pin, { mode: pigpio_wrapper_1.Gpio.OUTPUT })).forEach((gpio) => {
        gpio.pwmWrite(0);
    });
}
function attachCleanupHandler(pins) {
    function exitHandler(options, err) {
        pinsDown(pins);
        if (err) {
            console.error(err.message);
            console.error(err.stack);
        }
        if (options && options.exit) {
            process.exit(err ? 1 : 0);
        }
    }
    process.on('exit', exitHandler.bind(null));
    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
    // catches "kill pid" 
    process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
    //catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
}
module.exports = attachCleanupHandler;
//# sourceMappingURL=exitHandler.js.map