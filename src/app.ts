import Koa = require('koa')
import bodyParser = require('koa-bodyparser')
import convert = require('koa-convert')
import logger = require('koa-logger')
import Router = require('koa-router')
import AV = require('leanengine')

import memo from '@/routes/memo'

const app = new Koa()
app.use(convert(AV.koa() as Koa.Middleware))
app.use(logger())
app.use(bodyParser())
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

const api = new Router({ prefix: '/api' })
api.use(memo.routes())

app.use(api.routes())

export default app
