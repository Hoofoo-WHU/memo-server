import * as AV from 'leanengine'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as logger from 'koa-logger'
import memo from '@/routes/memo'

let app = new Koa()
app.use(AV.koa() as Koa.Middleware)
app.use(logger())

let api = new Router({ prefix: '/api' })
api.use(memo.routes())

app.use(api.routes())

export default app