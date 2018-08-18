import { NohmModel, TTypedDefinitions } from 'nohm';

import { Pump } from '../generated/interfaces/BarState';
export default class PumpModel extends NohmModel<Pump> {
    public static modelName: string = 'Pump';
    protected static definitions: TTypedDefinitions<Pump> = {
        label: {
            type: 'string'
        },
        gpioPin: {
            type: 'number'
        },
        isBusy: {
            type: 'boolean'
        },
        flowRate: {
            type: 'number'
        }
    };
}
