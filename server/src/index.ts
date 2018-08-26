import * as Koa from 'koa';
import api from './api';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
// import * as serve from 'koa-static';
// import * as mount from 'koa-mount';
export * from './exitHandler';

const app = new Koa();

app.use(cors());

app.use(bodyParser());
app.use(api.routes());
app.use(api.allowedMethods());
// app.use(mount('/schema', serve('schema')));

app.listen(3000);
