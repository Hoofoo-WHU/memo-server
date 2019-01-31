import Router = require('koa-router')

let memo = new Router()

memo.prefix('/memo')

memo.get('/:id', (ctx) => {
  ctx.body = '请求id为:' + ctx.params.id
})

export default memo