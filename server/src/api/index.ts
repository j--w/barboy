import * as KoaRouter from 'koa-router';
import { createHandyClient } from 'handy-redis';
import PumpModel from './Pump';
import IngredientModel from './Ingredient';
import { Pump, Ingredient } from '../generated/interfaces/BarState';
import { Nohm } from 'nohm';

const db = createHandyClient();
const api = new KoaRouter();
// db.once('connect', async () => {

// });
// const init = async () => {
//   await db.connect();

db.redis.once('connect', async () => {
  Nohm.setPrefix('barbot');
  Nohm.setClient(db.redis);
  // pumps
  api.post('/pumps', async (ctx, next) => {
    try {
      const pumpData = ctx.request.body as Pump;
      const pumpModel = Nohm.register(PumpModel);
      const pump = new pumpModel();
      pump.property('label', pumpData.label);
      pump.property('isBusy', false);
      pump.property('flowRate', pumpData.flowRate);
      pump.property('gpioPin', pumpData.gpioPin);

      await pump.save();
      ctx.status = 201;
      next();
    } catch (err) {
      ctx.response.body = err.message;
      ctx.status = 400;
      next();
    }
  });

  api.get('/pumps', async (ctx, next) => {
    try {
      const pumpModel = Nohm.register(PumpModel);
      const pump = new pumpModel();

      const ids = await pumpModel.find(undefined);
      const pumps = await pumpModel.loadMany(ids);
      console.log(pumps);
      ctx.status = 200;
      ctx.response.body = pumps.map((item) => {
        const res: Pump = {
          label: item.property('label'),
          flowRate: item.property('flowRate'),
          gpioPin: item.property('gpioPin'),
        };
        return res;
      });
      next();
    } catch (err) {
      console.log(err);
      ctx.response.body = err.message;
      ctx.status = 404;
      next();
    }
  });

  // ingredients
  api.post('/ingredients', async (ctx, next) => {
    try {
      const ingredientData = ctx.request.body as Ingredient;
      const ingredientModel = Nohm.register(IngredientModel);
      const ingredient = new ingredientModel();
      ingredient.property('label', ingredientData.label);
      ingredient.property('alcoholByVolume', ingredientData.alcoholByVolume);
      await ingredient.save();
      ctx.status = 201;
      next();
    } catch (err) {
      ctx.response.body = err.message;
      ctx.status = 400;
      next();
    }
  });
});

export default api;
