import * as koa from 'koa'
import * as AV from 'leanengine'

AV.init({
  appId: process.env.LEANCLOUD_APP_ID!,
  appKey: process.env.LEANCLOUD_APP_KEY!,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY!
})
var app = new koa()
app.use(AV.koa() as koa.Middleware)
app.use((ctx: koa.Context) => {
  ctx.body = 'Hello, Word!'
})
app.listen(process.env.LEANCLOUD_APP_PORT || 3000)