(() => {
    try {
        return require('pigpio');
    }
    catch (err) {
        return require('pigpio-mock');
    }
})();
//# sourceMappingURL=pigpio.js.map