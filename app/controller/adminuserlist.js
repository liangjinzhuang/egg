const Controller = require('egg').Controller;
const fs = require('fs') // 引入fs模块，fs是nodejs的文件模块 可以对项目中的文件进行增删改查操作
const path = require('path') // 引入path模块
//故名思意 异步二进制 写入流
const awaitStreamReady = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole')

class AdminUserController extends Controller {
  async adminUserList () {
    const { ctx } = this;
    try {
      const start = ctx.query.start
      const pageSize = ctx.query.pageSize
      const houseInfo = await ctx.service.adminuserlist.adminUserLsit(start, pageSize);
      ctx.body = {
        success: true,
        data: houseInfo
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error
      };
    }
  }

  async adminUserDelete () {
    const { ctx } = this;
    const params = ctx.request.body
    try {
      const cate = await ctx.service.adminuserlist.userDelete(params);
      ctx.body = {
        success: true,
        data: cate
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error
      };
    }
  }


}

module.exports = AdminUserController;