import axios from 'axios'

// // 配置默认的host,假如你的API host是：http://api.htmlx.club
// axios.defaults.baseURL = 'https://api.douban.com/v2/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
　　// 在发送请求之前做些什么
      // console.log("config-axiosJs.js:添加请求拦截器");
　　　　return config;
}, function (error) {
　　// 对请求错误做些什么
return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
　　// 对响应数据做点什么
  // console.log("config-axiosJs.js:添加响应拦截器");
　　　　return response
}, function (error) {
　　// 对响应错误做点什么
　　return Promise.reject(error)
});

// 添加错误二次请求
//axios请求超时处理
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject

  console.log("---------------------------重复请求--------------------------");
  console.log(config);
  console.log(config.__retryCount);
  console.log(config.retryDelay);
  // alert("---------------------------重复请求--------------------------"+JSON.stringify(config));

  if(!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if(config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay*config.__retryCount*0.75 || 1000);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
});
