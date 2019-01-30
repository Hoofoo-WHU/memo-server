import * as AV from 'leanengine'
import app from '@/app'
AV.init({
  appId: process.env.LEANCLOUD_APP_ID!,
  appKey: process.env.LEANCLOUD_APP_KEY!,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY!
})
!(AV.Cloud as any).useMasterKey()

app.listen(process.env.LEANCLOUD_APP_PORT || 3000)