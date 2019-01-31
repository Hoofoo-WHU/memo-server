import AV = require('leanengine')

import app from '@/app'

AV.init({
  appId: process.env.LEANCLOUD_APP_ID!,
  appKey: process.env.LEANCLOUD_APP_KEY!,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY!
});

(AV.Cloud as any).useMasterKey()

const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || '3000')

app.listen(PORT, () => {
  console.log('Memo app is running on port:', PORT)

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', (err) => {
    console.error('Caught exception:', err.stack)
  })

  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack)
  })
})
