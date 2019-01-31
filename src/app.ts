import AV = require('leanengine')
import Koa = require('koa')
import Router = require('koa-router')
import logger = require('koa-logger')
import convert = require('koa-convert')

import memo from '@/routes/memo'

let app = new Koa()
app.use(convert(AV.koa() as Koa.Middleware))
app.use(logger())

let api = new Router({ prefix: '/api' })
api.use(memo.routes())

app.use(api.routes())

export default app