const Controller = require('egg').Controller;
const verify = require('../common/common')
class UserController extends Controller {
  async find () {
    const { ctx } = this;
    let token = ctx.cookies.get('token')
    let result = verify.verifyToken(token) //解密token
    let { _id } = result //检查是否有用户_id
    try {
      let userList = await ctx.service.user.findUser(_id);
      ctx.body = {
        data: userList
      };
    } catch (error) {
      ctx.body = {
        error
      };
    }
  }
  async myrelease () {
    const { ctx } = this;
    const start = ctx.request.body.start
    const pageSize = ctx.request.body.pageSize
    let token = ctx.cookies.get('token')
    let result = verify.verifyToken(token) //解密token
    let { _id } = result //检查是否有用户_id
    try {
      let releaseList = await ctx.service.user.findMyRelease(start, pageSize, _id);
      ctx.body = {
        data: releaseList
      };
    } catch (error) {
      ctx.body = {
        error
      };
    }
  }

};

module.exports = UserController;