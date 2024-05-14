const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const cors = require("koa2-cors");

// 1.创建app
const app = new Koa()
app.use(cors());

// 2.对app使用中间件
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


// 3.将app导出
module.exports = app
