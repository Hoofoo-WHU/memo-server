# 开发文档

## 项目目录
```
config
├── nodemon.config.json
├── webpack.config.js
src
├── app.ts
├── routes
│   ├── login.ts
│   └── memo.ts
├── server.ts
├── tslint.json
tsconfig.json
```

## 技术要点
### 使用nodemon自动重载
nodemon可以像node一样使用还可以监听项目内文件更新自动重载，但是使用typescript的就不那么方便了，需要将ts-node注册并监听*.ts文件
```shell
nodemon --inspect -r ts-node/register -r tsconfig-paths/register --config config/nodemon.config.json src/server.ts
```
由于tsc的编译bug会导致paths配置的相对路径不会被编译，从而使node找不到模块，注册tsconfig-path即可解决

### 打包
使用tsc构建会使node找不到模块，而且tsconfig-path在node无效，也没有提供命令行工具，又不想在服务端使用ts-node，所以产品打包改用webpack，其resolve路径的功能可以解决模块丢失问题。

### lint
使用ts-lint来检查代码风格，配合vscode的ts-lint插件可以维持代码的可维护性

### 自动化流程
使用precommit-hook在commit前进行lint和build，使用GitHub-Hook使master更新后自动部署到leanengine