import * as KoaRouter from 'koa-router';
import { getRecipes } from './recipes';
import { postOrder } from './order';
import { sseState } from './state';

const routes = new KoaRouter();

routes.get('/recipes', getRecipes);

routes.post('/order', postOrder);

routes.get('/state', sseState);

export default routes;
