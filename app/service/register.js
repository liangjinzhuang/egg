const Service = require('egg').Service;

class RegisterService extends Service {
    async registerInsert (params) {
        let result = {
            errorCode: 1,
            msg: "注册成功！",
            data: []
        }
        try {
            let user = await this.app.mysql.get('user', { username: params.username });
            if (user) {
                result.errorCode = 0,
                    result.msg = '该用户名已被注册！'
            } else {
                let userInsert = await this.app.mysql.insert('user',{ username: params.username, password: params.password, avatar: params.imgs[0] });
                console.log('userInsert===>',userInsert)
                result.errorCode = 1,
                result.msg = '注册成功！'
            }
        } catch (e) {
            result.errorCode = 0,
                result.msg = e || '注册失败！'
        } finally {
            return result
        }
    }
}
module.exports = RegisterService;