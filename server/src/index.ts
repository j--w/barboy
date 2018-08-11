import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as mount from 'koa-mount';

export * from './exitHandler';

const app = new Koa();
app.use(mount('/schema', serve('schema')));

app.listen(3000);
