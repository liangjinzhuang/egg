/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596788365784_9440';

  // add your middleware config here
  config.middleware = ['origin'];
  config.origin = {
    enable:true,
    whiteList: ['http://127.0.0.1:8081','http://127.0.0.1:8080']
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

/*   const cors = {
    origin: 'http://127.0.0.1:8080',//匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials:true //设置跨域cookie
  }; */

  config.security = { //关闭csrf
    csrf: {
      enable:false
    }
  };

  config.redis = { //redis临时空间，存放生成的token
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    }
  };

  config.multipart = {
    whitelist: [   // 允许上传图片格式
     '.png',
     '.svg',
     '.jpg',
   ],
   fileSize: '10mb',  // 最大5mb 
 };
  
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


  return {
    mysql,
    ...config,
    ...userConfig,
  };
};
