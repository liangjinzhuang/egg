const Controller = require('egg').Controller;
const verify = require('../common/common')

class UserController extends Controller {
  async list () {
    const { ctx } = this;
    
    try {
      const houseList = await ctx.service.house.searchHouse();
      ctx.body = {
        success: true,
        data: houseList
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error
      };
    }
  }

  async detail () {
    const { ctx } = this;
    try {
      console.log('ctx.query.id=>',ctx.query.id)
      let token = ctx.cookies.get('token')
      let result = verify.verifyToken(token) //解密token
      let { _id } = result //检查是否有用户_id
      if (!ctx.query.id) throw new Error('缺少参数！');
      const houseInfo = await ctx.service.house.houseDetail(ctx.query.id, _id);
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

  async houseLsit () {
    const { ctx } = this;
    try {
      const id = ctx.query.id
      const start = ctx.query.start
      const pageSize = ctx.query.pageSize
      const houseInfo = await ctx.service.house.cateHouseLsit(start, pageSize, id);
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

  async searchHouse () {
    const { ctx } = this;
    try {
      const keyword = ctx.query.keyword
      const start = ctx.query.start
      const pageSize = ctx.query.pageSize
      const houseInfo = await ctx.service.house.searchHouseLsit(start, pageSize, keyword);
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
}

module.exports = UserController;