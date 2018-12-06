
// import { process } from 'ipaddr.js';
// const history = require('connect-history-api-fallback');
// const path = require('path')

var express=require('express');
var config=require('./config/index');
var port=8089;
var app=express();

  //加载mysql模块
  var mysql      = require('mysql');
  //创建连接
  var connection = mysql.createConnection({
  host     : '10.38.64.57',
  user     : 'root',
  password : '2wsx1qaz',
  database : 'icome'
  });
//执行创建连接 
connection.connect();
// 查询语句
var  sql = 'SELECT * FROM kpi_to_table where '+'kpi_id'+'=?';
const appData = require('./data.json');  
const data_S = appData.data;  
const data_scene = appData.dataS;  
const data_seting = appData.data_seting;  
const data_setting_sel=appData.data_setting_sel;
const multiEM_data=appData.multiEM_data;
const apiRouter = express.Router();  
apiRouter.get('/api/multiEM_data',(req, res) => {    
    res.json({    
      errno: 0,    
      data: multiEM_data    
    })    
  }),  
  apiRouter.get('/api/scene',(req, res) => {    
    res.json({    
      errno: 0,    
      data: data_scene    
    })    
  }),  
  apiRouter.get('/api/theme',(req, res) => {    
    res.json({    
      errno: 0,    
      data: data_S    
    })    
  }),
  apiRouter.get('/api/setting',(req, res) => {    
    res.json({    
      errno: 0,    
      data: data_seting    
    })    
  }),
  apiRouter.get('/api/setting_sel',(req, res) => {    
    res.json({    
      errno: 0,    
      data: data_setting_sel    
    })    
  });
  // app.use(history());
  app.use(apiRouter); 
  app.get('/api/scene2',(req, res) => {    
    // res.json({    
    //   errno: 0,    
    //   data: data_S    
    // })  
    //查
    debugger
 connection.query(sql,'I_01000012',function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    return;
  }
  console.log(sql);
  
  //把搜索值输出
 res.send(result);
// res.json({    
//   errno: 0,    
//   data: result    
// })    
});  
  })   
  app.get('/',function(req,res,next){
    req.url='/index.html';
    next();
}); 
  app.use(express.static('./dist'));

  module.express=app.listen(port,function(err){
      if(err){
        console.log(err);
          return;
      } 
      console.log('Listening at http://localhost:'+port+'\n');
  })
