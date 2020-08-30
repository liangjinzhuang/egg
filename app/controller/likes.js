const Controller = require('egg').Controller
const verify = require('../common/common')

class LikesController extends Controller {
  async likeAdd () {
    const { ctx } = this;
    let house_id = ctx.query.id
    let token = ctx.cookies.get('token')
    let result = verify.verifyToken(token) //解密token
    let { _id } = result //检查是否有用户_id
    let likesData = await ctx.service.likes.likes(house_id, _id)
    ctx.body = {
      success: true,
      data: likesData
    };
  }

  async remove () {
    const { ctx } = this;
    let house_id = ctx.query.id
    let token = ctx.cookies.get('token')
    let result = verify.verifyToken(token) //解密token
    let { _id } = result //检查是否有用户_id
    let likesData = await ctx.service.likes.removeLike(house_id, _id)
    ctx.body = {
      success: true,
      data: likesData
    };
  }

  async likeList () {
    const { ctx } = this;
    let house_id = ctx.query.id
    let token = ctx.cookies.get('token')
    let result = verify.verifyToken(token) //解密token
    let { _id } = result //检查是否有用户_id
    let likesData = await ctx.service.likes.likesList(_id)
    ctx.body = {
      success: true,
      data: likesData
    };
  }


}
module.exports = LikesController;