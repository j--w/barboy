import { PassThrough } from 'stream';
import { eventBus } from '../util';

export async function sseState(ctx: any, next: any) {
    const stream = new PassThrough();
    ctx.req.setTimeout(Number.MAX_VALUE, () => undefined);
    ctx.response.type = 'text/event-stream; charset=utf-8';
    ctx.response.set('Cache-Control', 'no-cache');
    ctx.response.set('Connection', 'keep-alive');
    const listener = (busy) => {
        stream.write(`data: ${JSON.stringify({ busy })}\n\n`);
    };

    eventBus.on('state', listener);

    const finish = () => {
        eventBus.removeListener('state', listener);
        next();
    };

    ctx.response.body = stream;
    ctx.response.status = 200;
    ctx.req.on('close', finish);
    ctx.req.on('finish', finish);
    ctx.req.on('error', (err) => {
        console.log('error--');
        console.log(err);
        finish();
    });
    stream.write(`data: ${JSON.stringify({ busy: false })}\n\n`);
  }
