import * as Koa from 'koa';
import routes from './routes';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';

export default function init() {
        const app = new Koa();

        app.use(cors());

        app.use(bodyParser());
        app.use(routes.routes());
        app.use(routes.allowedMethods());

        app.listen(3000);

}
