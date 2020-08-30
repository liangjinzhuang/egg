const Controller = require('egg').Controller;
const fs = require('fs') // 引入fs模块，fs是nodejs的文件模块 可以对项目中的文件进行增删改查操作
const path = require('path') // 引入path模块
//故名思意 异步二进制 写入流
const awaitStreamReady = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole')

class AdminHouseController extends Controller {
  async adminhouseList () {
    const { ctx } = this;
    try {
      const start = ctx.query.start
      const pageSize = ctx.query.pageSize
      const houseInfo = await ctx.service.adminhouse.adminHouseLsit(start, pageSize);
      ctx.body = {
        success: true,
        data: houseInfo
      };
    } catch (error) {
      console.log('error=>', error)
      ctx.body = {
        success: false,
        error
      };
    }
  }

  async addHouse () {
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
    let params = {
      imgs: imgsFile,
      parts: parts.field
    }
    let addData = await ctx.service.adminhouse.adminAddHouse(params)
    ctx.body = {
      success: true,
      data: addData
    };
  }

  async adminHouecate () {
		const { ctx } = this;
		try {
			const cate = await ctx.service.adminhouse.houseCate();
			ctx.body = {
				success: true,
				data: cate
			};
		} catch (error) {
			console.log('error=>', error)
			ctx.body = {
				success: false,
				error
			};
		}
  }

  async adminHoueCateUpdate () {
    const { ctx } = this;
    const params = ctx.request.body
		try {
			const cate = await ctx.service.adminhouse.houseCateUpdate(params);
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

  async adminHoueDelete () {
    const { ctx } = this;
    const params = ctx.request.body
		try {
			const cate = await ctx.service.adminhouse.houseDelete(params);
			ctx.body = {
				success: true,
				data: cate
			};
		} catch (error) {
			console.log('error=>', error)
			ctx.body = {
				success: false,
				error
			};
		}
  }

  
  async adminHoueCateDelete () {
    const { ctx } = this;
    const params = ctx.request.body
		try {
			const cate = await ctx.service.adminhouse.houseCateDelete(params);
			ctx.body = {
				success: true,
				data: cate
			};
		} catch (error) {
			console.log('error=>', error)
			ctx.body = {
				success: false,
				error
			};
		}
  }

  async adminHoueCateAdd () {
    const { ctx } = this;
    const params = ctx.request.body
		try {
			const cate = await ctx.service.adminhouse.houseCateAdd(params);
			ctx.body = {
				success: true,
				data: cate
			};
		} catch (error) {
			console.log('error=>', error)
			ctx.body = {
				success: false,
				error
			};
		}
  }

}

module.exports = AdminHouseController;