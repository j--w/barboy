"use strict";
let pigpio;
try {
    pigpio = require('pigpio');
}
catch (err) {
    pigpio = require('pigpio-mock');
}
module.exports = pigpio;
//# sourceMappingURL=pigpio-wrapper.js.map