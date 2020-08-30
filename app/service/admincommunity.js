const Service = require('egg').Service;

class adminCommunityService extends Service {
  async adminCommunityLsit (start, pageSize) {
    let result = {
      errorCode: 1,
      msg: "获取成功",
      data: {
        data: [],
        total: 0
      },
    }
    try {
      let page = (start - 1) * pageSize
      let total = await this.app.mysql.query(`select  COUNT(*) as total from community `)
      result.data.total = total[0].total
      let VOTE_LIST_SELECT = `select  * from community,community_cate where community.cateid = community_cate.cateid limit ${page},${pageSize}`
      let list = await this.app.mysql.query(VOTE_LIST_SELECT)
      list.forEach(item => {
        item.imgs = JSON.parse(item.imgs)
      })
      result.data.data = list
    } catch (e) {
      result.errorCode = 0,
        result.msg = "获取失败",
        result.error = e.msg || '查询失败'
    } finally {
      return result
    }
  }

  async communityDelete (params) {
    let result = {
      errorCode: 1,
      msg: "删除成功！",
      data: []
    }
    try {
      result.data = await this.app.mysql.delete('community', { id: params.id });
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '删除失败！'
    } finally {
      return result
    }
  }

}
module.exports = adminCommunityService;
