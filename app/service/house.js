const Service = require('egg').Service;

class HouseService extends Service {
    async searchHouse () {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            house: [],
        }
        let VOTE_LIST_SELECT = 'select house.id,house.cateid,house.title,house.tags,house.price,house.imgs,cate.name,cate.desc from house,cate where house.cateid = cate.id'
        try {
            // result.house = await this.app.mysql.select('house');
            result.house = await this.app.mysql.query(VOTE_LIST_SELECT);
            let map = {};//创建一个map对象
            let newArray = [];
            for (var i = 0; i < result.house.length; i++) {
                let rs = result.house[i];
                rs.imgs = JSON.parse(rs.imgs)
                if (!map[rs.cateid]) {
                    newArray.push({
                        cateid: rs.cateid,
                        name: rs.name,
                        desc: rs.desc,
                        list: [rs]
                    });
                    map[rs.cateid] = rs;
                } else {
                    for (let j = 0; j < newArray.length; j++) {
                        let na = newArray[j];
                        if (na.cateid == rs.cateid) {
                            na.list.push(rs);
                            break;
                        }
                    }
                }
            }
            result.house = newArray
        } catch (e) {
            result.errorCode = 0
            result.msg = e || '查询表失败'
        } finally {
            return result
        }

    }

    async houseDetail (house_id, _id) {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            data: {},
        }
        try {
            //查询文章
            let VOTE_LIST_SELECT_1 = 'select * from house where id = ' + house_id
            let detail = await this.app.mysql.query(VOTE_LIST_SELECT_1);
            console.log('detail',house_id)
            //查询文章是否被该用户收藏
            if (_id) {
                let VOTE_LIST_SELECT_2 = `select id from likes where house_id =${detail[0].id} and u_id = ${_id}`
                let likes = await this.app.mysql.query(VOTE_LIST_SELECT_2);
                likes.length ? detail[0].likes = 1 : detail[0].likes = 0
            } else {
                detail[0].likes = 0
            }
            detail[0].imgs = JSON.parse(detail[0].imgs)
            detail[0].tags = JSON.parse(detail[0].tags)
            result.data = detail[0]
        } catch (e) {
            result.error = e.msg || '查询失败'
        } finally {
            return result
        }
    }

    async cateHouseLsit (start, pageSize, cate_id) {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            data: [],
        }
        try {
            let page = (start - 1) * pageSize
            let VOTE_LIST_SELECT = `select * from house  where cateid = ${cate_id} limit ${page},${pageSize}`
            let list = await this.app.mysql.query(VOTE_LIST_SELECT);
            list.forEach(item => {
                item.imgs = JSON.parse(item.imgs)
                item.tags = JSON.parse(item.tags)
            })
            result.data = list
            console.log('result=>', result)
        } catch (e) {
            result.error = e.msg || '查询失败'
        } finally {
            return result
        }
    }

    async searchHouseLsit (start, pageSize, keyword) {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            data: [],
        }
        try {
            let page = (start - 1) * pageSize
            let VOTE_LIST_SELECT = `select * from house  where title like '%${keyword}%' limit ${page},${pageSize}`
            let list = await this.app.mysql.query(VOTE_LIST_SELECT);
            list.forEach(item => {
                item.imgs = JSON.parse(item.imgs)
                item.tags = JSON.parse(item.tags)
            })
            result.data = list
            console.log('result=>', result)
        } catch (e) {
            result.error = e.msg || '查询失败'
        } finally {
            return result
        }
    }
}
module.exports = HouseService;
