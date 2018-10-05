import { PassThrough } from 'stream';
import { eventBus } from '../util';

export async function sseState(ctx: any, next: any) {
    const stream = new PassThrough();
    ctx.req.setTimeout(Number.MAX_VALUE, () => undefined);
    ctx.response.type = 'text/event-stream; charset=utf-8';
    ctx.response.set('Cache-Control', 'no-cache');
    ctx.response.set('Connection', 'keep-alive');

    eventBus.on('state', (busy) => {
        stream.write(`data: ${JSON.stringify({ busy })}\n\n`);
    });
    ctx.response.body = stream;
    ctx.response.status = 200;
    stream.write(`data: ${JSON.stringify({ busy: false })}\n\n`);
  }
