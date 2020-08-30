const Service = require('egg').Service;

class LikesService extends Service {

  async likes (house_id, _id) {
    let result = {
      errorCode: 1,
      msg: '收藏成功！',
      data: ''
    }
    try {
      let likesInsert = await this.app.mysql.insert('likes',{ house_id: house_id, u_id: _id});
      result.data = ''
    } catch (e) {
      result.errorCode = 0
      result.msg = e.message || '查询失败'
    } finally {
      return result
    }
  }

  async removeLike (house_id, _id) {
    let result = {
      errorCode: 1,
      msg: '取消收藏成功！',
      data: ''
    }
    try {
      let likesInsert = await this.app.mysql.delete('likes',{ house_id: house_id, u_id: _id});
      result.data = ''
    } catch (e) {
      result.errorCode = 0
      result.msg = e.message || '查询失败'
    } finally {
      return result
    }
  }

  async likesList (_id) {
    let result = {
      errorCode: 1,
      msg: '获取成功!',
      data: ''
    }
    console.log('_id=>',_id)
    try {
      let VOTE_LIST_SELECT = `select house.id,house.cateid,house.title,house.tags,house.price,house.imgs from house,likes where likes.u_id = ${_id} and likes.house_id = house.id  limit 10`
      let list = await this.app.mysql.query(VOTE_LIST_SELECT);
      list.forEach(item => {
        item.imgs = JSON.parse(item.imgs)
        item.tags = JSON.parse(item.tags)
    })
      result.data = list
    } catch (e) {
      result.errorCode = 0
      result.msg = e.message || '查询失败'
    } finally {
      return result
    }
  }

}
module.exports = LikesService;
