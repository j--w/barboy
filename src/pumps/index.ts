
import { eventBus, sleep } from '../util';
import { Gpio } from '../pigpio-wrapper';
import * as queue from 'queue';
const pins = [];

const dutyCycle = 255;
let isBusy = false;
const order = queue({
    concurrency: 3,
    timeout: 30000
});

function updateState() {
    eventBus.emit('state', isBusy);
}

function emptyOrders() {
    order.stop();
    while (order.length > 0) {
        order.pop();
    }
    while (pins.length > 0) {
        pins[pins.length - 1].pwmWrite(0);
        pins.pop();
    }
}

async function instructPump(pump: any) {
    try {
        const pin = new Gpio(pump.pin, { mode: Gpio.OUTPUT }));
        pin.pwmWrite(dutyCycle);
        await sleep(pump.timeInMS);
        pin.pwmWrite(0);
        return true;
    } catch (error) {
        emptyOrders();
        throw new Error(`Error writing pump: ${pump.pin}`);
    }
}

function handleOrder(instructions: []) {
    if (!isBusy) {
        emptyOrders();
        instructions.forEach((pump) => {
            order.push(() => {
                return instructPump(pump);
            });
        });
        isBusy = true;
        updateState();
        order.start();
    }
}
export default function initPump() {
    eventBus.on('order', handleOrder);
    order.on('success', (result, job) => {
        if (order.length === 0) {
            isBusy = false;
            updateState();
        }
    });
}
