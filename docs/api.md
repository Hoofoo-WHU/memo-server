# API文档
## 响应格式
所有的响应格式均为application/json
## 登录
### 请求
```
POST /api/login/github/:code
```
其中code为GitHub OAuth提供的code

### 响应
403：登录失败
```json
{
  "error": "错误",
  "error_description": "错误描述"
}
```

200：登陆成功
```json
{
  "avatar": "GitHub头像Url",
  "name": "GitHub用户名"
}
```
## 获取所有便签
### 请求
```
GET /api/memo/
```
### 响应
403: 未登录

200: OK
```json
[
  {
    "position": {
        "x": 429,
        "y": 51,
        "z": -2147483597
    },
    "color": "pink",
    "text": "这是第一个标签",
    "objectId": "5c52be4a17b54d0057295f66",
    "createdAt": "2019-01-31T09:22:18.633Z",
    "updatedAt": "2019-01-31T15:13:10.819Z"
  }
]
```
## 根据id获取便签
### 请求
```
GET /api/memo/:id
```
其中id为objectId
### 响应
403: 没有权限访问或未登录

200: OK
```json
{
  "position": {
      "x": 429,
      "y": 51,
      "z": -2147483597
  },
  "color": "pink",
  "text": "这是第一个标签",
  "objectId": "5c52be4a17b54d0057295f66",
  "createdAt": "2019-01-31T09:22:18.633Z",
  "updatedAt": "2019-01-31T15:13:10.819Z"
}
```
## 新建标签
### 请求
```
POST /api/memo
```
### 响应
403: 未登录，没有权限

200: OK
```json
{
  "objectId": "5c52be4a17b54d0057295f66",
  "createdAt": "2019-01-31T09:22:18.633Z",
  "updatedAt": "2019-01-31T15:13:10.819Z"
}
```

## 更新标签
### 请求
```
PATCH /api/memo/:id
```
```json
{
  "position": {
      "x": 429,
      "y": 51,
      "z": -2147483597
  },
  "color": "pink",
  "text": "这是第一个标签修改后"
}
```
id为ObjectId，请求体参数可以任意组合
### 响应
403：没有权限

400: 请求错误

200：更新成功
## 删除标签
### 请求
```
DELETE /api/memo/:id
```
id为ObjectId
### 响应
400: 请求错误

403: 未登录或没有权限

200: 删除成功