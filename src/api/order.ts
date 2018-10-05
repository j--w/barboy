import { getInstructions } from '../config';
import { eventBus } from '../util';

export async function postOrder(ctx: any, next: () => void) {
    try {
        const recipe = ctx.request.body.recipe;
        const instructions = getInstructions(recipe);
        eventBus.emit('order', instructions);
        ctx.response.status = 200;

    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = error.message;
    }
    next();
}
