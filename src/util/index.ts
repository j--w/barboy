import { EventEmitter } from 'events';

export const has = (obj, prop) => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const eventBus = new EventEmitter();

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve.bind(null), ms));
}
