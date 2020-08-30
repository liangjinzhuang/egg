const Service = require('egg').Service;

class CommunityService extends Service {
    async noticeList () {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            notice: []
        }
        try {
            result.natice = await this.app.mysql.select('notice');
        } catch (e) {
            result.errorCode = 0,
                result.msg = e || '查询表失败'
        } finally {
            return result
        }
    }

    async communityCate () {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            data: []
        }
        try {
            result.data = await this.app.mysql.select('community_cate');
        } catch (e) {
            result.errorCode = 0,
                result.msg = e || '查询表失败'
        } finally {
            return result
        }
    }

    async communityList (start, pageSize) {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            data: []
        }
        try {
            let page = (start - 1) * pageSize
            let VOTE_LIST_SELECT = `select * from community  limit ${page},${pageSize}`
            let communityData = await this.app.mysql.query(VOTE_LIST_SELECT);
            for (let i = 0; i < communityData.length; i++) {
                communityData[i].imgs = JSON.parse(communityData[i].imgs)
            }
            result.data = communityData
        } catch (e) {
            result.errorCode = 0,
                result.msg = e || '查询表失败'
        } finally {
            return result
        }
    }

    async communityDetail (c_id) {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            data: []
        }
        try {
            let VOTE_LIST_SELECT = 'select * from community where id = ' + c_id
            let detailData = await this.app.mysql.query(VOTE_LIST_SELECT);
            for (let i = 0; i < detailData.length; i++) {
                detailData[i].imgs = JSON.parse(detailData[i].imgs)
            }
            result.data = detailData[0]
        } catch (e) {
            result.errorCode = 0,
                result.msg = e || '查询表失败'
        } finally {
            return result
        }
    }

    async communityAdd (params) {
        let result = {
            errorCode: 1,
            msg: "添加成功！",
            data: []
        }
        try {
            let imgsJosn = JSON.stringify(params.imgs)
            let userInfo = await this.app.mysql.query('select * from user where id = ?', params.uid);
            result.data = userInfo
            if (userInfo) {
                let userInsert = await this.app.mysql.insert('community', {
                    uid: params.uid,
                    title: params.parts.title,
                    desc: params.parts.desc,
                    price: params.parts.price,
                    value: params.parts.value,
                    cateid: params.parts.cateid,
                    imgs: imgsJosn,
                    username: userInfo[0].username,
                    avatar: userInfo[0].avatar
                });
            }

            result.errorCode = 1,
                result.msg = '添加成功！'
        } catch (e) {
            result.errorCode = 0,
                result.msg = e || '添加失败！'
        } finally {
            return result
        }
    }
}
module.exports = CommunityService;
