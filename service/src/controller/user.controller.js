const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    const info = ctx.request.body
    const result = await userService.create(info)
    ctx.body = {
      message: '创建成功~',
      data: result
    }
  }

  async queryTask(ctx, next) {
    const result = await userService.queryTask()
    ctx.body = {
      message: '查询成功~',
      data: result
    }
  }

  async changeTaskState(ctx, next) {
    const info = ctx.request.body
    const result = await userService.changeTaskState(info)
    ctx.body = {
      message: '切换成功~',
      data: result
    }
  }

  async deleteTask(ctx, next) {
    const info = ctx.request.body
    const result = await userService.deleteTask(info)
    ctx.body = {
      message: '删除成功~',
      data: result
    }
  }
}

module.exports = new UserController()
