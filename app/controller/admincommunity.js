const Controller = require('egg').Controller;
class AdminCommunityController extends Controller {
  async adminCommunityList () {
    const { ctx } = this;
    try {
      const start = ctx.query.start
      const pageSize = ctx.query.pageSize
      const houseInfo = await ctx.service.admincommunity.adminCommunityLsit(start, pageSize);
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

  async adminCommunityCateDelete () {
    const { ctx } = this;
    const params = ctx.request.body
		try {
			const cate = await ctx.service.admincommunity.communityDelete(params);
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

module.exports = AdminCommunityController;