/**
 * Created by mac on 2018/2/2.
 */
window.var={
  //  开发环境
  // export const baseUrl = 'http://10.37.148.36:8889';
  //  生产环境
  baseUrl : '',
  //  预生产
  // export const baseUrl = 'http://eapp.icome.enn.cn:8075/'
  //  本地环境
  // export const baseUrl = '10.2.98.21::8080'

  develop : 'dev',//pro 生产 dev 测试 //icome上线改成pro
  fromLinkKg : false,//接收控股传递的参数alert提示 true 开启 false 关闭 //icome上线改成false
  themeQxFlag : false,//true 开启主题权限控制 false 关闭 icome上线改成true

  /*------------------对接icome参数------------------*/
  icomeUrl : "http://10.39.35.11:8071",//icome服务器地址--测试 //icome上线关闭
  // icomeUrl : "https://eappicome.enn.cn:8075",//icome服务器地址--预生产 //icome上线关闭
  // icomeUrl : "http://app.icome.enn.cn:8073"//icome服务器地址--生产 //icome上线打开
};
window.icomep={
  DJIcome : {
    imGid : "",//群组id
    pageCode : "APP_029",//页面编码id
    elementCode : "APP_029_001",//页面对应沟通元素编码从查询结果里找，如果有才行
    addTemeCode : "APP_029_003",//页面是否可以添加主题的编码从查询结果里找，如果有才行
    bizStatus : 100,//事业状态
    bizBtnUrl : window.var.icomeUrl+"/common/user/query/menucodebyuserandbiz",//判断是否有沟通权限按钮
    bizUrl : window.var.icomeUrl+"/career/biz/gid/query/bizGidByBizIdSingle"//事业沟通群组请求获取沟通id的地址
  }
};
