import * as Router from 'koa-router'

let memo = new Router()

memo.prefix('/memo')

memo.get('/', (ctx) => {
  ctx.body = 'hello' + ctx.path
})

export default memo