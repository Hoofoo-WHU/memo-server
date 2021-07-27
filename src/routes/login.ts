import Axios from 'axios'
import Router = require('koa-router')
import jwt = require('jsonwebtoken')
const router = new Router({ prefix: '/login' })

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

router.post('/github/:code', async (ctx) => {
  if (ctx.state.user) {
    ctx.body = {
      avatar: ctx.state.user.avatar,
      name: ctx.state.user.name,
      token: jwt.sign(
        {
          avatar: ctx.state.user.avatar,
          name: ctx.state.user.name,
          id: ctx.state.user.id
        },
        process.env.LEANCLOUD_APP_KEY!
      )
    }
    return
  }
  if (ctx.params.code === 'undefined') {
    ctx.status = 403
    return
  }
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
    ctx.body = {
      avatar: res2.data.avatar_url,
      name: res2.data.name,
      token: jwt.sign(
        {
          data: {
            avatar: res2.data.avatar_url,
            name: res2.data.name,
            id: res2.data.id
          }
        },
        process.env.LEANCLOUD_APP_KEY!
      )
    }
  }
})

export default router
