const Service = require('egg').Service;

class BannerService extends Service {
    async searchAll() {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            banner: []
        }
        try {
            result.banner = await this.app.mysql.select('banner');
        } catch (e) {
            result.errorCode = 0
            result.msg = e || '查询表失败'
        } finally {
            return result
        }
    }
    async adminBanner() {
      let result = {
          errorCode: 1,
          msg: "获取成功",
          banner: []
      }
      try {
          result.banner = await this.app.mysql.select('banner');
      } catch (e) {
          result.errorCode = 0
          result.msg = e || '查询表失败'
      } finally {
          return result
      }
  }
    async bannerUpdate (params) {
        let result = {
          errorCode: 1,
          msg: "修改成功！",
          data: []
        }
        try {
          result.data = await this.app.mysql.update('banner', { name: params.name, path: params.imgUrl, id: params.id });
        } catch (e) {
          result.errorCode = 0,
            result.msg = e || '修改失败！'
        } finally {
          return result
        }
    }
    async addBanner (params) {
        let result = {
          errorCode: 1,
          msg: "新增成功！",
          data: []
        }
        try {
          result.data = await this.app.mysql.insert('banner', { name: params.name, path: params.imgUrl});
        } catch (e) {
          result.errorCode = 0,
            result.msg = e || '新增失败！'
        } finally {
          return result
        }
    }
    async deleteBanner (params) {
        let result = {
          errorCode: 1,
          msg: "删除成功！",
          data: []
        }
        try {
          result.data = await this.app.mysql.delete('banner', { id: params.id});
        } catch (e) {
          result.errorCode = 0,
            result.msg = e || '删除失败！'
        } finally {
          return result
        }
    }
}
module.exports = BannerService;
