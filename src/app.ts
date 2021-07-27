import login from '@/routes/login'
import memo from '@/routes/memo'
import Koa = require('koa')
import bodyParser = require('koa-bodyparser')
import convert = require('koa-convert')
import logger = require('koa-logger')
import Router = require('koa-router')
import AV = require('leanengine')
import jwt = require('koa-jwt')

const app = new Koa()
app.keys = ['memo']
app.use(convert(AV.koa() as any))
app.use(logger())
app.use(bodyParser())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.header.origin as any)
  ctx.set('Access-Control-Allow-Methods', 'PATCH,OPTIONS,POST,GET,DELETE')
  ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
  ctx.set('Access-Control-Allow-Credentials', 'true')
  await next()
})

app.use(jwt({ secret: process.env.LEANCLOUD_APP_KEY!}).unless({ path: [/\/api\/login/, /\/api\/memo/] }))

const api = new Router({ prefix: '/api' })
api.use(memo.routes())
api.use(login.routes())
app.use(api.routes())

export default app
