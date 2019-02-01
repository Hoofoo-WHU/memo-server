# memo-server
一个基于node.js的在线便签服务端

## 客户端项目
[Memo](/Hoofoo-WHU/memo)

## 本地运行

首先确认本机已经安装 Node.js 运行环境

安装依赖
```shell
yarn install
```

启动项目
```shell
yarn dev
```

构建项目
```shell
yarn build
```

代码检查
```shell
yarn lint
```

使用leancloud启动项目，确保环境变量设置正确
```shell
yarn add lean-cli -g
lean login
lean switch
lean up
```

Debug
```shell
chrome://inspect
```

## 相关文档
[开发文档](docs)

[API文档](docs/api.md)