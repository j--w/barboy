import { NohmModel, TTypedDefinitions } from 'nohm';

import { Ingredient } from '../generated/interfaces/BarState';
export default class IngredientModel extends NohmModel<Ingredient> {
    public static modelName: string = 'Ingredient';
    protected static definitions: TTypedDefinitions<Ingredient> = {
        label: {
            type: 'string'
        },
        alcoholByVolume: {
            type: 'number'
        },
    };
}
