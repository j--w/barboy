import { has } from '../util';

export const pumps = {
    gin: {
        pin: 24,
        rate: 390
    },
    bourbon: {
        pin: 23,
        rate: 390
    },
    campari: {
        pin: 22,
        rate: 390
    },
    vermouth: {
        pin: 27,
        rate: 390
    },
    // simpleSyrup: {
    //     pin: 25,
    //     rate: 95
    // }
};
const recipes = {
    negroni: {
        label: 'Negroni',
        postSteps: [
            'Garnish with orange'
        ],
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
        postSteps: [
            'Garnish with orange'
        ],
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
    gin: {
        label: 'Gin',
        variations: 'Gin & Tonic, Gin & Soda',
        preSteps: [
            'Add ice to glass'
        ],
        postSteps: [
            'Top up with soda or tonic',
            'Add Lime'
        ],
        ingredients: [
            {
                ingredient: 'gin',
                amount: 25
            }
        ]
    },
    doubleGin: {
        label: 'Double Gin',
        variations: 'Double Gin & Tonic, Double Gin & Soda',
        preSteps: [
            'Add ice to glass'
        ],
        postSteps: [
            'Top up with soda or tonic',
            'Add Lime'
        ],
        ingredients: [
            {
                ingredient: 'gin',
                amount: 50
            }
        ]
    },
    bourbon: {
        label: 'Bourbon',
        ingredients: [
            {
                ingredient: 'bourbon',
                amount: 25
            },
        ]
    },
    doubleBourbon: {
        label: 'Double Bourbon',
        variations: 'Old Fashioned',
        preSteps: [
            'For Old Fashioned add 3 dashes of bitters and splash of simple syrup'
        ],
        postSteps: [
            'For Old Fashioned, garnish with orange and/or cherry'
        ],
        ingredients: [
            {
                ingredient: 'bourbon',
                amount: 50
            },
        ]
    },
    campari: {
        label: 'Campari',
        ingredients: [
            {
                ingredient: 'campari',
                amount: 25
            },
        ]
    },
    manhattan: {
        label: 'Manhattan',
        preSteps: [
            'Add 2 dashes bitters to glass'
        ],
        postSteps: [
            'Garnish with orange or cherry'
        ],
        ingredients: [
            {
                ingredient: 'bourbon',
                amount: 50
            },
            {
                ingredient: 'vermouth',
                amount: 25
            }
        ]
    },
    americano: {
        label: 'Americano',
        postSteps: [
            'Add splash of soda',
            'Garnish with orange'
        ],
        ingredients: [
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
    negroniSbagliato: {
        label: 'Negroni Sbagliato',
        postSteps: [
            'Top up with prosecco',
            'Garnish with orange'
        ],
        ingredients: [
            {
                ingredient: 'campari',
                amount: 25
            },
            {
                ingredient: 'vermouth',
                amount: 25
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
    .sort(sortRecipe).concat([{
        id: 'random',
        label: 'A mystery drink of my choosing',
        postSteps:[],
        ingredients:[],
      }])

export function getInstructions(recipeId: string) {
    if (recipeId === 'random') {
        const ids = Object.keys(recipes);
        recipeId = ids[Math.floor(Math.random()*ids.length)]
    }
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
