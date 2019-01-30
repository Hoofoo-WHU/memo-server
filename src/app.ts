import * as AV from 'leanengine'
import * as Koa from 'koa'
import * as router from 'koa-router'

var app = new Koa()
app.use(AV.koa() as Koa.Middleware)
app.use((ctx: Koa.Context) => {
  ctx.body = 'Hello, Word!'
})
export default app