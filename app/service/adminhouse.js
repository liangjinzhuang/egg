const Service = require('egg').Service;

class adminHouseService extends Service {
  async adminHouseLsit (start, pageSize) {
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
      let total = await this.app.mysql.query(`select  COUNT(*) as total from house `)
      result.data.total = total[0].total
      let VOTE_LIST_SELECT = `select  *,house.id,cate.name from house,cate where house.cateid = cate.id  limit ${page},${pageSize}`
      let list = await this.app.mysql.query(VOTE_LIST_SELECT)
      list.forEach(item => {
        item.imgs = JSON.parse(item.imgs)
        item.tags = JSON.parse(item.tags)
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
  async adminAddHouse (params) {
    let result = {
      errorCode: 1,
      msg: "添加成功！",
      data: []
    }
    console.log('params=>', params)
    try {
      let imgsJosn = JSON.stringify(params.imgs)
      let insert = await this.app.mysql.insert('house', {
        title: params.parts.title,
        price: params.parts.price,
        cateid: params.parts.cateid,
        tags: params.parts.tags,
        value: params.parts.value,
        imgs: imgsJosn
      });
      result.errorCode = 1,
        result.msg = '添加成功！'
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '添加失败！'
    } finally {
      return result
    }
  }

  async houseCate () {
    let result = {
      errorCode: 1,
      msg: "获取成功",
      data: []
    }
    try {
      result.data = await this.app.mysql.select('cate');
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '查询表失败'
    } finally {
      return result
    }
  }

  async houseCateUpdate (params) {
    let result = {
      errorCode: 1,
      msg: "修改成功！",
      data: []
    }
    try {
      result.data = await this.app.mysql.update('cate', { name: params.name, desc: params.desc, id: params.id });
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '修改失败！'
    } finally {
      return result
    }
  }

  async houseDelete (params) {
    let result = {
      errorCode: 1,
      msg: "删除成功！",
      data: []
    }
    try {
      result.data = await this.app.mysql.delete('house', { id: params.id });
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '删除失败！'
    } finally {
      return result
    }
  }

  async houseCateDelete (params) {
    let result = {
      errorCode: 1,
      msg: "删除成功！",
      data: []
    }
    try {
      let list = await this.app.mysql.select('house', { where: { cateid: params.id } });
      if (list.length > 0) {
        result.errorCode = 1,
          result.msg = '该分类下存在房源，不能删除！'
      } else {
        result.data = await this.app.mysql.delete('cate', { id: params.id });
      }
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '删除失败！'
    } finally {
      return result
    }
  }

  async houseCateAdd (params) {
    let result = {
      errorCode: 1,
      msg: "新增成功！",
      data: []
    }
    try {
      let list = await this.app.mysql.insert('cate', { name: params.name, desc: params.desc });
      result.data = list
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '新增失败！'
    } finally {
      return result
    }
  }

}
module.exports = adminHouseService;
