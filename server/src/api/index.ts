import * as KoaRouter from 'koa-router';
import {getRepository} from 'typeorm';
import {Pump} from '../models/Pump';
import {Ingredient} from '../models/Ingredient';
import * as BarState from '../generated/interfaces/BarState';
import { PassThrough } from 'stream';
import eventBus from '../eventBus';

const api = new KoaRouter();
api.post('/pumps', async (ctx, next) => {
  try {
    const pumpRepo = getRepository(Pump);
    const pump = new Pump();
    const pumpData = ctx.request.body as BarState.Pump;
    pump.label = pumpData.label;
    pump.flowRate = pumpData.flowRate;
    pump.gpioPin = pumpData.gpioPin;
    pump.bottleVolume = pumpData.bottleVolume;
    await pumpRepo.save(pump);
    ctx.status = 201;
    next();
  } catch (err) {
    ctx.response.body = err.message;
    ctx.status = 400;
    next();
  }
});

api.put('/pumps/:id', async (ctx, next) => {
  try {
    const pumpData = ctx.request.body as BarState.Pump;
    const pumpRepo = getRepository(Pump);
    const pump = await pumpRepo.findOne({id: ctx.params.id});
    pump.label = pumpData.label;
    pump.flowRate = pumpData.flowRate;
    pump.gpioPin = pumpData.gpioPin;
    pump.bottleVolume = pumpData.bottleVolume;
    await pumpRepo.save(pump);
    ctx.status = 200;
    next();
  } catch (err) {
    ctx.response.body = err.message;
    ctx.status = 404;
    next();
  }
});

api.delete('/pumps/:id', async (ctx, next) => {
  try {
    const pumpRepo = getRepository(Pump);
    await pumpRepo.delete(ctx.params.id);
    ctx.status = 200;
    next();
  } catch (err) {
    ctx.response.body = err.message;
    ctx.status = 404;
    next();
  }
});

api.get('/pumps', async (ctx, next) => {
  try {
    const pumpRepo = getRepository(Pump);
    const pumps = await pumpRepo.find();
    ctx.status = 200;
    ctx.response.body = pumps;
    next();
  } catch (err) {
    ctx.response.body = err.message;
    ctx.status = 404;
    next();
  }
});

  // ingredients
api.post('/ingredients', async (ctx, next) => {
  try {
    const ingredientRepo = getRepository(Ingredient);
    const ingredient = new Ingredient();
    const ingredientData = ctx.request.body as BarState.Ingredient;
    ingredient.label = ingredientData.label;
    ingredient.alcoholByVolume = ingredientData.alcoholByVolume;
    await ingredientRepo.save(ingredient);
    ctx.status = 201;
    next();
  } catch (err) {
    ctx.response.body = err.message;
    ctx.status = 400;
    next();
  }
});

api.get('/ingredients', async (ctx, next) => {
  try {
    const ingredientRepo = getRepository(Ingredient);
    const ingredients = await ingredientRepo.find();
    ctx.status = 200;
    ctx.response.body = ingredients;
    next();
  } catch (err) {
    ctx.response.body = err.message;
    ctx.status = 404;
    next();
  }
});

async function writeFullState(stream: PassThrough) {
  const pumpRepo = getRepository(Pump);
  const pumps = await pumpRepo.find() as BarState.Pump[];
  const state: BarState.BarState = {
      pumps,
      isBusy: false
    };
  stream.write(`data: ${JSON.stringify(state)}\n\n`);
}

// state
api.get('/state', async (ctx, next) => {
  const stream = new PassThrough();
  ctx.req.setTimeout(Number.MAX_VALUE, () => undefined);
  ctx.response.type = 'text/event-stream; charset=utf-8';
  ctx.response.set('Cache-Control', 'no-cache');
  ctx.response.set('Connection', 'keep-alive');

  function stateListener() {
    writeFullState(stream);
  }

  eventBus.addListener('stateChange', stateListener);

  const finish = () => {
    eventBus.removeListener('stateChange', stateListener);
    next();
  };
  ctx.response.body = stream;
  ctx.response.status = 200;
  ctx.req.on('close', finish);
  ctx.req.on('finish', finish);
  ctx.req.on('error', finish);
  writeFullState(stream);
});

export default api;
