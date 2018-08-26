import * as Koa from 'koa';
import api from './api';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
// import * as serve from 'koa-static';
// import * as mount from 'koa-mount';

import 'reflect-metadata';
import {createConnection} from 'typeorm';
import { Pump } from './models/Pump';
import {StateSubscriber} from './subscribers/StateSubscriber';
import { Ingredient } from './models/Ingredient';
export * from './exitHandler';

async function init() {
    try {
        await createConnection({
            type: 'sqlite',
            database: './db.sqlite',
            entities: [
                Pump,
                Ingredient
            ],
            subscribers: [
                StateSubscriber
            ],
            synchronize: true
        });
        const app = new Koa();

        app.use(cors());

        app.use(bodyParser());
        app.use(api.routes());
        app.use(api.allowedMethods());
        // app.use(mount('/schema', serve('schema')));

        app.listen(3000);

    } catch (error) {
        console.log(error);
    }

}

init();
