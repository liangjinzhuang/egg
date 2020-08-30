const Controller = require('egg').Controller;
const fs = require('fs') // 引入fs模块，fs是nodejs的文件模块 可以对项目中的文件进行增删改查操作
const path = require('path') // 引入path模块
//故名思意 异步二进制 写入流
const awaitStreamReady = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole')


class UserController extends Controller {
  async banner () {
    const { ctx } = this;
    try {
      const bannerList = await ctx.service.banner.searchAll();
      ctx.body = {
        success: true,
        data: bannerList
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error
      };
    }
  }
  async adminBanner () {
    const { ctx } = this;
    try {
      const bannerList = await ctx.service.banner.adminBanner();
      ctx.body = {
        success: true,
        data: bannerList
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error
      };
    }
  }
  async bannerImage () {
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
      const avatar = 'http://127.0.0.1:7001/' + 'public/upload/imgs/' + filename
      imgsFile.push(avatar);
      // 写入流
      const writeStream = fs.createWriteStream(target);
      // 写入文件
      await part.pipe(writeStream)
    }
    //传入参数进入service 进行数据库保存
    let params = {
      imgs: imgsFile
    }
    //let result = await ctx.service.banner.bannerInsert(params)
    ctx.body = {
      success: true,
      data: imgsFile
    };
  }
  async uploadBanner () {
    const { ctx } = this;
    const params = ctx.request.body
    try {
      const banner = await ctx.service.banner.bannerUpdate(params);
      ctx.body = {
        success: true,
        data: banner
      };
    } catch (error) {
      console.log('error=>', error)
      ctx.body = {
        success: false,
        error
      };
    }
  }

  async addBanner () {
    const { ctx } = this;
    const params = ctx.request.body
    try {
      const banner = await ctx.service.banner.addBanner(params);
      ctx.body = {
        success: true,
        data: banner
      };
    } catch (error) {
      console.log('error=>', error)
      ctx.body = {
        success: false,
        error
      };
    }
  }

  async deleteBanner () {
    const { ctx } = this;
    const params = ctx.request.body
    try {
      const banner = await ctx.service.banner.deleteBanner(params);
      ctx.body = {
        success: true,
        data: banner
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

module.exports = UserController;