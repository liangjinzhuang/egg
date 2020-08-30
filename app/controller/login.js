// 引用
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const verify = require('../common/common')//引入公共方法

const Controller = require('egg').Controller;
class LoginController extends Controller {
	async loginSearch () {
		const { ctx } = this;
		let username = this.ctx.request.body.username,
			password = this.ctx.request.body.password,
			userInfo = '';
		try {
			userInfo = await ctx.service.login.loginFind(username, password);
			if (userInfo.errorCode == 0) {
				ctx.body = {
					msg: '该用户未注册！',
					data: {
						errorCode:0,
						msg: '该用户未注册！',
						data: userInfo.data
					}
				};
			} else {
				//使用
				let token = verify.generateToken({ _id: userInfo.data.id, username: userInfo.data.username }, 1000 * 3600 * 24)//生成cookie
				//保存到客户端浏览器的cookie中
				ctx.cookies.set('token', token, {
					maxAge: 1000 * 3600 * 24,
					path: '/',
					domain: '127.0.0.1',
					httpOnly: false,
				});
				// 保存到redis
				await ctx.app.redis.set(userInfo.data.username, token)
				ctx.body = {
					msg: '登录成功！',
					data: userInfo
				};
			}
		} catch (error) {
			ctx.body = {
				success: false,
				error
			};
		} finally {

		}
	}
	async adminLogin () {
		const { ctx } = this;
		let username = this.ctx.request.body.username,
			password = this.ctx.request.body.password,
			userInfo = '';
		try {
			userInfo = await ctx.service.login.adminFind(username, password);
			console.log('userInfo=>', userInfo)
			if (userInfo.errorCode === 0) {
				ctx.body = {
					msg: '该用户未注册,请使用默认账号密码登录！',
					data: userInfo
				};
			} else {
				//使用
				let token = verify.generateToken({ admin_id: userInfo.data.id, username: userInfo.data.username }, 1000 * 3600 * 24)//生成cookie
				//保存到客户端浏览器的cookie中
				ctx.cookies.set('admintoken', token, {
					maxAge: 1000 * 3600 * 24,
					path: '/',
					domain: '127.0.0.1',
					httpOnly: false,
				});
				// 保存到redis
				await ctx.app.redis.set(userInfo.data.username, token)
				ctx.body = {
					msg: '登录成功！',
					data: userInfo
				};
			}
		} catch (error) {
			ctx.body = {
				success: false,
				error
			};
		} finally {

		}
	}
}
module.exports = LoginController;