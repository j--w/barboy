import { friendlyRecipes } from '../config';
export async function getRecipes(ctx: any, next: () => void) {
    ctx.response.body = friendlyRecipes;
    next();
}
