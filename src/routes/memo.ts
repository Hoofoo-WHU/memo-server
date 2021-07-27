import Router = require('koa-router')
import AV = require('leanengine')
const router = new Router()

router.prefix('/memo')
const Memo = AV.Object.extend('Memo')

router.options('/:id', async (ctx) => {
  ctx.status = 200
})

router.all('*', async (ctx, next) => {
  console.log('session', ctx.session)
  if (!ctx.session.isLogin) {
    console.error('not login')
    ctx.status = 403
    ctx.message = 'not login'
    return
  }
  await next()
})
router.get('/', async (ctx) => {
  const query = new AV.Query('Memo')
  query.equalTo('id', ctx.session.id)
  const data = await query.find()
  ctx.body = data
})

router.get('/:id', async (ctx) => {
  try {
    const query = new AV.Query('Memo')
    const data = await query.get(ctx.params.id)
    if (data.get('id') === ctx.session.id) {
      ctx.body = data
    } else {
      ctx.status = 403
    }
  } catch (e) {
    ctx.status = 404
  }
})

router.post('/', async (ctx) => {
  const memo = new Memo()
  memo.set('id', ctx.session.id)
  const data = await memo.save()
  ctx.body = data
})

router.patch('/:id', async (ctx) => {
  try {
    const query = new AV.Query('Memo')
    const memo = await query.get(ctx.params.id)
    if (memo.get('id') !== ctx.session.id) {
      ctx.status = 403
      return
    }
    Reflect.ownKeys(ctx.request.body).forEach((val) => {
      memo.set(val as string, ctx.request.body[val])
    })
    const data = await memo.save()
    ctx.body = data
  } catch (e) {
    ctx.status = 400
  }
})

router.delete('/:id', async (ctx) => {
  try {
    const query = new AV.Query('Memo')
    const memo = await query.get(ctx.params.id)
    if (memo.get('id') !== ctx.session.id) {
      ctx.status = 403
      return
    }
    const data = await memo.destroy()
    ctx.body = data
  } catch (e) {
    ctx.status = 400
  }
})

export default router
