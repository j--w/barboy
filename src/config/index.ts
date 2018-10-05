import { has } from '../util';

const pumps = {
    gin: {
        pin: 24,
        rate: 390
    },
    bourbon: {
        pin: 27,
        rate: 390
    },
    campari: {
        pin: 17,
        rate: 390
    },
    vermouth: {
        pin: 22,
        rate: 390
    },
    bitters: {
        pin: 23,
        rate: 95
    }
};
const recipes = {
    negroni: {
        label: 'Negroni',
        ingredients: [
            {
                ingredient: 'gin',
                amount: 25
            },
            {
                ingredient: 'campari',
                amount: 25
            },
            {
                ingredient: 'vermouth',
                amount: 25
            }
        ]
    },
    boulevardier: {
        label: 'Boulevardier',
        ingredients: [
            {
                ingredient: 'bourbon',
                amount: 25
            },
            {
                ingredient: 'campari',
                amount: 25
            },
            {
                ingredient: 'vermouth',
                amount: 25
            }
        ]
    },
    ginTonic: {
        label: 'Gin & Tonic',
        ingredients: [
            {
                ingredient: 'gin',
                amount: 25
            }
        ]
    },
    oldFashioned: {
        label: 'Old Fashioned',
        ingredients: [
            {
                ingredient: 'bourbon',
                amount: 50
            },
            {
                ingredient: 'bitters',
                amount: 3
            }
        ]
    },
    manhattan: {
        label: 'Manhattan',
        ingredients: [
            {
                ingredient: 'bourbon',
                amount: 50
            },
            {
                ingredient: 'vermouth',
                amount: 25
            },
            {
                ingredient: 'bitters',
                amount: 3
            }
        ]
    }
};

function sortRecipe(a: any, b: any) {
    if (a.label < b.label) {
        return -1;
    }
    if (a.label > b.label) {
        return 1;
    }
    return 0;
}

function pumpTimeInMS(amount: number, rate: number) {
    return Math.round(amount / (rate / 60) * 1000);
}

export const friendlyRecipes = Object.keys(recipes)
    .map((id) => ({ id, ...recipes[id] }))
    .sort(sortRecipe);

export function getInstructions(recipeId: string) {
    if (!has(recipes, recipeId)) {
        throw new Error(`Unable to locate recipe: ${recipeId}`);
    }
    const recipe = recipes[recipeId];
    return recipe.ingredients.reduce((instructions, ingredient) => {
        if (!has(pumps, ingredient.ingredient)) {
            throw new Error(`Unable to locate ingredient: ${ingredient.ingredient}`);
        }
        const pump = pumps[ingredient.ingredient];
        return [...instructions, {...pump, timeInMS: pumpTimeInMS(ingredient.amount, pump.rate) }];
    }, [])
    .sort((a, b) => b.timeInMS - a.timeInMS);
}
