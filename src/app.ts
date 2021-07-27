import login from '@/routes/login'
import memo from '@/routes/memo'
import Koa = require('koa')
import bodyParser = require('koa-bodyparser')
import convert = require('koa-convert')
import logger = require('koa-logger')
import Router = require('koa-router')
import session = require('koa-session')
import AV = require('leanengine')

const app = new Koa()
app.keys = ['memo']
app.use(convert(AV.koa() as Koa.Middleware))
app.use(logger())
app.use(bodyParser())
app.use(session({}, app))

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
  ctx.set('Access-Control-Allow-Methods', 'PATCH,OPTION,POST,GET,DELETE')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  await next()
})

const api = new Router({ prefix: '/api' })
api.use(memo.routes())
api.use(login.routes())
app.use(api.routes())

export default app
