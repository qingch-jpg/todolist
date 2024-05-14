const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/createTask' })

userRouter.post('/',userController.create)

userRouter.post('/changeTaskState',userController.changeTaskState)

userRouter.post('/deleteTask',userController.deleteTask)

userRouter.get('/queryTask',userController.queryTask)


// 3.导出路由
module.exports = userRouter
