const Service = require('egg').Service;

class UserService extends Service {
    async findUser (uid) {
        let result = {
            errorCode: 1,
            msg: '',
            data: ''
        }
        try {
            let userInfo = await this.app.mysql.query('select * from user where id = ?', uid);
            result.data = userInfo[0]
        } catch (e) {
            result.errorCode = 0
            result.msg = e.message || '查询失败'
        } finally {
            return result
        }
    }

    async findMyRelease (start, pageSize, uid) {
        let result = {
            errorCode: 1,
            msg: "获取成功",
            data: []
        }
        try {
            let page = (start - 1) * pageSize
            let VOTE_LIST_SELECT = `select * from community  where uid = ${uid} limit ${page},${pageSize}`
            let list = await this.app.mysql.query(VOTE_LIST_SELECT);
            for (let i = 0; i < list.length; i++) {
                list[i].imgs = JSON.parse(list[i].imgs)
            }
            result.data = list
        } catch (e) {
            result.errorCode = 0,
                result.msg = e || '查询表失败'
        } finally {
            return result
        }
    }

}
module.exports = UserService;
