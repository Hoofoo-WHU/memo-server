import Koa = require('koa')
import convert = require('koa-convert')
import logger = require('koa-logger')
import Router = require('koa-router')
import AV = require('leanengine')

import memo from '@/routes/memo'

const app = new Koa()
app.use(convert(AV.koa() as Koa.Middleware))
app.use(logger())

const api = new Router({ prefix: '/api' })
api.use(memo.routes())

app.use(api.routes())

export default app
