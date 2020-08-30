const Controller = require('egg').Controller;
const fs = require('fs') // 引入fs模块，fs是nodejs的文件模块 可以对项目中的文件进行增删改查操作
const path = require('path') // 引入path模块
//故名思意 异步二进制 写入流
const awaitStreamReady = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole')
const verify = require('../common/common')

class CommunityController extends Controller {
	async notice () {
		const { ctx } = this;
		try {
			const notice = await ctx.service.community.noticeList();
			ctx.body = {
				success: true,
				data: notice
			};
		} catch (error) {
			ctx.body = {
				success: false,
				error
			};
		}
	}

	async cateList () {
		const { ctx } = this;
		try {
			const cate = await ctx.service.community.communityCate();
			ctx.body = {
				success: true,
				data: cate
			};
		} catch (error) {
			ctx.body = {
				success: false,
				error
			};
		}
	}

	async list () {
		const { ctx } = this;
		try {
			const start = ctx.request.body.start
			const pageSize = ctx.request.body.pageSize
			const notice = await ctx.service.community.communityList(start, pageSize);
			ctx.body = {
				success: true,
				data: notice
			};
		} catch (error) {
			ctx.body = {
				success: false,
				error
			};
		}
	}

	async detail () {
		const { ctx } = this;
		try {
			const detailData = await ctx.service.community.communityDetail(ctx.query.id);
			ctx.body = {
				success: true,
				data: detailData
			};
		} catch (error) {
			console.log('error=>', error)
			ctx.body = {
				success: false,
				error
			};
		}
	}

	async add () {
		const { ctx } = this;
		const parts = this.ctx.multipart({
			autoFields: true
		});
		let part;
		let imgsFile = [];
		while ((part = await parts()) != null) {
			if (!part.filename) {
				continue;
			}
			const uplaodBasePath = 'app/public/upload/'
			const dirName = 'imgs'
			// 判断文件夹是否存在，不存在就创建
			if (fs.existsSync(dirName)) {
				fs.mkdirSync(path.join(this.config.baseDir, uplaodBasePath, dirName))
			}
			// 生成随机图片路径
			let filename = (new Date().getTime() + Math.random().toString(36).substr(2) + path.extname(part.filename).toLocaleLowerCase())
			// 生成写入路径 
			const target = path.join(this.config.baseDir, uplaodBasePath, dirName, filename)
			//把图片地址存入参数中，传给后台
			const img = 'http://127.0.0.1:7001/' + 'public/upload/imgs/' + filename
			imgsFile.push(img);
			// 写入流
			const writeStream = fs.createWriteStream(target);
			// 写入文件
			await part.pipe(writeStream)
		}
		let token = ctx.cookies.get('token')
		let result = verify.verifyToken(token) //解密token
		let { _id } = result //检查是否有用户_id
		//传入参数进入service 进行数据库保存
		let params = {
			imgs: imgsFile,
			uid: _id,
			parts: parts.field
		}
		let addData = await ctx.service.community.communityAdd(params)
		ctx.body = {
			success: true,
			data: addData
		};
	}

}
module.exports = CommunityController;