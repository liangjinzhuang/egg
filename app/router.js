'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  //前端用户检验中间件
  const userInterceptor = app.middleware.login();

  //后台用户检验中间件
  const adminInterceptor = app.middleware.adminlogin();

  const { router, controller, middleware } = app;
  //移动端前端接口
  router.get('/', controller.home.index);
  router.post('/user/find', userInterceptor, controller.user.find);
  router.get('/banner', controller.banner.banner);// 轮播图
  router.get('/house/list', controller.house.list);// 房源列表
  router.get('/search/house/list', controller.house.searchHouse);// 搜索房源
  router.get('/house/detail', controller.house.detail);// 房源详情
  router.get('/cate/houselsit', controller.house.houseLsit);// 获取分类下的房源
  router.get('/notice', controller.community.notice); // 获取公告
  router.get('/cate/list', controller.community.cateList); // 获取社区分类列表
  router.post('/community/list', controller.community.list); // 获取社区列表
  router.get('/community/detail', controller.community.detail); // 获取社区列表
  router.post('/community/add', userInterceptor, controller.community.add); // 添加社区信息
  router.post('/register', controller.register.registerUpdata); // 用户注册
  router.post('/login', controller.login.loginSearch); // 用户登录
  router.post('/user/myrelease', userInterceptor, controller.user.myrelease); // 获取当前用户发布社区列表
  router.get('/likes', userInterceptor, controller.likes.likeAdd); // 收藏接口
  router.get('/remove/likes', userInterceptor, controller.likes.remove); // 取消接口
  router.get('/mylikes', userInterceptor, controller.likes.likeList); // 取消接口

  //后台前端接口
  router.get('/admin/banner', adminInterceptor, controller.banner.adminBanner);// 轮播图管理列表
  router.get('/admin/houselist', adminInterceptor, controller.adminhouse.adminhouseList);// 获取房源列表
  router.post('/admin/addhouse', adminInterceptor, controller.adminhouse.addHouse);// 新增房源
  router.post('/admin/houseDelete', adminInterceptor, controller.adminhouse.adminHoueDelete);// 删除房源
  router.post('/admin/houseCate', adminInterceptor, controller.adminhouse.adminHouecate);// 获取房源分类
  router.post('/admin/houseCateUpdate', adminInterceptor, controller.adminhouse.adminHoueCateUpdate);// 获取房源分类
  router.post('/admin/houseCateDelete', adminInterceptor, controller.adminhouse.adminHoueCateDelete);// 删除房源分类
  router.post('/admin/houseCateAdd',  adminInterceptor, controller.adminhouse.adminHoueCateAdd);// 获取房源分类

  router.get('/admin/communitylist', adminInterceptor, controller.admincommunity.adminCommunityList);// 获取社区列表
  router.post('/admin/communityDelete', adminInterceptor, controller.admincommunity.adminCommunityCateDelete);// 获取社区列表

  router.get('/admin/userlist', adminInterceptor, controller.adminuserlist.adminUserList);// 获取用户列表
  router.post('/admin/userDelete', adminInterceptor, controller.adminuserlist.adminUserDelete);// 删除房源

  router.post('/bannerImage',  adminInterceptor, controller.banner.bannerImage);// 轮播图图片上传接口
  router.post('/upload/banner', adminInterceptor, controller.banner.uploadBanner);// 修改轮播图
  router.post('/add/banner', adminInterceptor, controller.banner.addBanner);// 修改轮播图
  router.post('/delete/banner', adminInterceptor, controller.banner.deleteBanner);// 删除轮播图

  router.post('/admin/login', controller.login.adminLogin); // 用户登录
};
