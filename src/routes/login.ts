import Axios from 'axios'
import Router = require('koa-router')
const router = new Router({ prefix: '/login' })

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

router.post('/github/:code', async (ctx) => {
  if (!ctx.session.isLogin) {
    const res = await Axios({
      data: {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: ctx.params.code
      },
      headers: {
        Accept: 'application/json'
      },
      method: 'post',
      url: 'https://github.com/login/oauth/access_token'
    })
    if (res.data.error) {
      ctx.status = 403
      ctx.body = {
        error: res.data.error,
        error_description: res.data.error_description
      }
      return
    } else {
      const res2 = await Axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${res.data.access_token}`
        }
      })
      ctx.session = {
        avatar: res2.data.avatar_url,
        id: res2.data.id,
        isLogin: true,
        name: res2.data.name
      }
    }
  }
  ctx.body = {
    avatar: ctx.session.avatar,
    name: ctx.session.name
  }
})

export default router
