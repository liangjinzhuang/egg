const Service = require('egg').Service;

class LoginService extends Service {
  async loginFind (username, password) {
    let result = {
      errorCode: 1,
      msg: "登录成功",
      data: ''
    }
    try {
      let user = await this.app.mysql.get('user', { username: username, password: password });
      if (user == null) {
        result.errorCode = 0,
          result.msg = '该用户未注册'
        result.data = ''
      } else {
        result.data = user
      }
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '查询失败'
    } finally {
      return result
    }
  }
  async adminFind (username, password) {
    let result = {
      errorCode: 1,
      msg: "登录成功",
      data: ''
    }
    try {
      let user = await this.app.mysql.get('admin', { username: username, password: password });
      if (user == null) {
        result.errorCode = 0,
          result.msg = '该用户未注册,请使用默认账号密码登录！'
          result.data = ''
      } else {
        result.data = user
      }
    } catch (e) {
      result.errorCode = 0,
        result.msg = e || '登录失败'
    } finally {
      return result
    }
  }
}
module.exports = LoginService;