"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const serve = require("koa-static");
const mount = require("koa-mount");
__export(require("./exitHandler"));
const app = new Koa();
app.use(mount('/schema', serve('schema')));
app.listen(3000);
//# sourceMappingURL=index.js.map