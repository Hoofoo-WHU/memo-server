var koa = require('koa');
var AV = require('leanengine');
AV.init({
    appId: process.env.LEANCLOUD_APP_ID || 'vj4CvrCv9g4kIbsv8C5Jtc4x-gzGzoHsz',
    appKey: process.env.LEANCLOUD_APP_KEY || 'H1DlD4IGxglb63xLRCH8k3vg',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'Lggj01tqdD7tSpNgTnLqCCSC'
});
var app = new koa();
app.use(AV.koa());
app.use((ctx) => {
    ctx.body = 'Hello, Word!!!';
});
app.listen(process.env.LEANCLOUD_APP_PORT || 3000);
