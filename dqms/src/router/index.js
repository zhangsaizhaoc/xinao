import Vue from 'vue'

import Router from 'vue-router'
import Index from '@/components/index/index'   //首页
import pieChart from '@/components/childcomp/piechart/pieChart' //圆形
import columnarGraph from '@/components/childcomp/columnargraph/columnargraph' //条形统计
import foldLineDiagram from '@/components/childcomp/Foldlinediagram/Foldlinediagram'//折线
import taskTracking from '@/components/taskTracking/taskTracking'//任务管理
import store from '../store/index'
import '../../config/axiosJs';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      beforeEnter: (to, from, next) => {
        console.log("zqid:"+to.query.zqid+"---zqname:"+to.query.zqname+"---userId:"+to.query.userId+"---date:"+to.query.date);
        store.state.zqid = to.query.zqid;
        store.state.zqname = to.query.zqname;
        store.state.userId = to.query.userId;
        store.state.date = to.query.date;
        console.log(store.state);

        axios({
          method:'get',
          url:'/edata-icome/dqmsIot/getAll',
          params:{
            dataTable:"datagovern_qualitylevel_h",
            comp_code:to.query.zqid,
            check_date:"--"+to.query.date,
            orders:"-check_date",
            limitLower: 0,
            limitUpper: 2
          }
        }).then((data)=>{
          console.log(data.data.data)
          if(data.data.data.length==2){
            store.state.jhNowDate = data.data.data[0].check_date;
            store.state.jhLastDate = data.data.data[0].check_date;
          }else if(data.data.data.length==1){
            store.state.jhNowDate = data.data.data[0].check_date;
          }
          next();
        },(err)=>{
          console.log(err)
        });
        // next();

        /*if (to.query.t != null) {
          store.state.team = to.query.t;
          store.state.ticket = to.query.ticket;
          store.state.syid = to.query.syid;
          store.state.token = to.query.token; //icome上线关闭 连接测试临时打开
          next();
        } else {
          next({
            path: '/error'
          });
        }*/
      },
      meta: {
            title: '数据示险',
            flag: false,
            show:false
      },
      redirect: '/piechart',
      children: [
        {
          path: '/piechart',
          name: 'pieChart',
          component: pieChart
        },
        {
          path: '/columnargraph',
          name: 'columnarGraph',
          component: columnarGraph
        },
        {
          path: '/Foldlinediagram',
          name: 'foldLineDiagram',
          component: foldLineDiagram
        },

      ]
    },
    {
      path: '/taskTracking',
      name: 'taskTracking',
      component: resolve => require([`@/components/taskTracking/taskTracking.vue`], resolve),
      meta: {
        title: '任务详情',
        flag:false
      }
    },
    {
      path: '/Allproblems',
      name: 'Allproblems',
      component: resolve => require([`@/components/Allproblems/Allproblems.vue`], resolve),
      meta: {
        title: '问题处理',
        flag:false
      }
    },
    {
      path: '/Enterpriserankings',
      name: 'Enterpriserankings',
      component: resolve => require([`@/components/Enterpriserankings/Enterpriserankings.vue`], resolve),
      meta: {
        title: '企业排名', 
        flag:false
      }
    },
  ]
})
