import { Gpio } from './pigpio-wrapper';

function pinsDown(pins: number[]): void {
  pins.map((pin) => new Gpio(pin, { mode: Gpio.OUTPUT })).forEach((gpio: Gpio) => {
    gpio.pwmWrite(0);
  });
}

export function attachCleanupHandler(pins: number[]): void {
  function exitHandler(options: { exit?: boolean}, err: Error) {
    pinsDown(pins);
    if (err) {
      // tslint:disable-next-line:no-console
      console.error(err.message);
      // tslint:disable-next-line:no-console
      console.error(err.stack);
    }
    if (options && options.exit) {
      process.exit(err ? 1 : 0);
    }
  }
  process.on('exit', exitHandler.bind(null));
  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
  // catches "kill pid"
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
}
