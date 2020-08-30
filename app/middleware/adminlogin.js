const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken');
const verify = require('../common/common')
module.exports = (options, app) => {
  return async function adminInterceptor (ctx, next) {
    //获取token
    let token = ctx.cookies.get('admintoken')
    // 获取前端或以其他方式设置的cookie需要设置signed: false属性，避免对它做验签导致获取不到 cookie 的值。
    // let username = ctx.cookies.get('username', { signed: false })
    //验证token是否为空
    if (token) {
      let result = verify.verifyToken(token) //解密token
      let { admin_id, username } = result //检查是否有用户_id
      //验证客户端token是否合法
      if (admin_id) {
        let redis_token = await ctx.app.redis.get(username) // 获取redis中的token
        //验证是否为最新的token
        ctx.body = {
          data: {
            errorCode: 0,
            msg: redis_token,
          }
        }
        if (token === redis_token) {
          await next();
        } else {
          // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
          ctx.body = {
            data: {
              errorCode: 0,
              msg: '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态',
            }
          }
          ctx.status = 401
        }
      } else {
        // 如果token不合法，则代表客户端token已经过期或者不合法（伪造token）
        ctx.body = {
          data: {
            errorCode: 0,
            msg: '您的登录状态已过期，请重新登录'
          }
        }
        ctx.status = 401
      }
    } else {
      // 如果token为空，则代表客户没有登录
      ctx.body = {
        data: {
          errorCode: 0,
          msg: '您还没有登录，请登陆后再进行操作'
        }
      }
      ctx.status = 401
    }
  };
}