import Router = require('koa-router')
import AV = require('leanengine')
const router = new Router()

router.prefix('/memo')
const Memo = AV.Object.extend('Memo')

router.get('/', async (ctx) => {
  const query = new AV.Query('Memo')
  const data = await query.find()
  ctx.body = data
})

router.get('/:id', async (ctx) => {
  try {
    const query = new AV.Query('Memo')
    const data = await query.get(ctx.params.id)
    ctx.body = data
  } catch (e) {
    ctx.status = 404
  }
})

router.post('/', async (ctx) => {
  const memo = new Memo()
  const data = await memo.save()
  ctx.body = data
})

router.patch('/:id', async (ctx) => {
  try {
    const memo = AV.Object.createWithoutData('Memo', ctx.params.id)
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
    const memo = AV.Object.createWithoutData('Memo', ctx.params.id)
    const data = await memo.destroy()
    ctx.body = data
  } catch (e) {
    ctx.status = 400
  }
})

router.options('/:id', async (ctx) => {
  ctx.status = 200
})

export default router
