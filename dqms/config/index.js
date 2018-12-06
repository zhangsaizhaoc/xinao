'use strict'
// Template version: 1.2.8
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {},
    // Various Dev Server settings
    host: '0.0.0.0', // localhostcan be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // 当请求 /api/get/data 时，会向xxx.server.com 发起请求 /get/data 。
    proxyTable:{
      //测试服务器T8
      // "/": 'http://10.37.148.36:8889/',
      //测试服务器T7
      "/": 'http://10.37.148.36:8080/'
      //胜波本地
      // "/": 'http://10.2.96.36:8889/'
      //卢司洋本地服务器
      // "/": 'http://localhost:6060/'
      //卢司洋本地项目地址
      // "/": 'http://localhost:8989/'
      //生产服务器地址
      // "/": 'http://datakanban.icome.enn.cn:8080'

    },
    // proxyTable: {  // 代理转发配置
    //   '/api': {  // 把所有api 前缀的请求转发到下面这个服务器
    //       target: 'http://10.37.148.36:8080/``````````````````````````````````',
    //       changeOrigin: true,
    //       pathRewrite: {  // 转发时把api前缀去除
    //           '^/api': ''
    //       }
    //   }
    // },

    /**
     *
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    // 当请求 /api/get/data 时，会向xxx.server.com 发起请求 /get/data 。--实现跨域
    /**
     * Source Maps
     */
    debuggerFlag:true,
    consoleFlag:true,
    /*-----lsy--网络建议优化productionSourceMap->false：https://www.cnblogs.com/winnieKing/p/8193883.html-----*/
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
