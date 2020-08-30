# yas 房源展示项目的后台代码
# 说明<br>
如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^<br>
# 技术栈<br>
egg + redis + jwt
## 初始化
    npm install
## 连接数据库
    config.default.js
    const mysql = {	
      // 单数据库信息配置	
      client: {	
        // host	
        host: '127.0.0.1',	
        // 端口号	
        port: '3306',	
        // 用户名	
        user: 'root',	
        // 密码	
        password: '123456',	
        // 数据库名	
        database: 'Test_User',	
      },	
      // 是否加载到 app 上，默认开启	
      app: true,	
      // 是否加载到 agent 上，默认关闭	
      agent: false,	
    };
## 连接redis服务
    config.default.js
     config.redis = {
        client: {
          port: 6379, // Redis port
          host: '127.0.0.1', // Redis host
          password: '',
          db: 0,
        }
      };
## 运行
    npm run dev
    open http://localhost:7001/

# example

第一个eggdemo

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
