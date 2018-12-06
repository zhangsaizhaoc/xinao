// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';
import axios from 'axios';
import '../config/axiosJs';
// import 'lib-flexible';
import store from './store';
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);
// 引入jquery
import jquery from 'jquery';

// 引入 ECharts 主模块
import echarts from 'echarts';
// 引入柱状图
/*import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';*/
// import 'echarts/map/js/world.js';//地图

// 引入ElementUI
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import { DatePicker} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(DatePicker);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Progress);
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

/*---------使用mint-ui---------*/
/*import { Popup,Picker } from 'mint-ui';
Vue.component(Popup.name,Popup);
Vue.component(Picker.name,Picker);*/
/*---------使用vant-ui---------*/
import { Icon, Popup, Picker, Collapse, CollapseItem, SwipeCell, Cell, CellGroup, Dialog  } from 'vant';
// import 'vant/lib/base/style';
import 'vant/lib/icon/local.less';
import 'vant/lib/icon/style';
import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
import 'vant/lib/collapse/style';
import 'vant/lib/collapse-item/style';
import 'vant/lib/collapse-item/style';
import 'vant/lib/swipe-cell/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/dialog/style/';

// import 'vant/lib/vant-css/base.css';
// import 'vant/lib/vant-css/picker.css';
// import 'vant/lib/vant-css/popup.css';
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(SwipeCell);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);

import './css/style.css';
import '../static/js/rem.js'

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$jquery = jquery;
Vue.config.productionTip = false;
Vue.prototype.isTicket = function () {
  return false;
};


//引用vuex
import Vuex from 'vuex'
Vue.use(Vuex)

new Vuex.Store({
  state:{
    recruitScrollY:0
  },
  getters:{
    recruitScrollY:state => state.recruitScrollY
  },
  mutations:{
    changeRecruitScrollY(state,recruitScrollY) {
      state.recruitScrollY = recruitScrollY
    }
  }
})



// import axios from 'axios'
// Vue.prototype.$http = axios

Vue.prototype.resetSetItem = function (key, newVal) {
   if (key === 'watchStorage') {

       // 创建一个StorageEvent事件
       var newStorageEvent = document.createEvent('StorageEvent');
       const storage = {
           setItem: function (k, val) {
               sessionStorage.setItem(k, val);

               // 初始化创建的事件
               newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

               // 派发对象
               window.dispatchEvent(newStorageEvent)
           }
       }
       return storage.setItem(key, newVal);
   }
}


/*
 然后就可以全局使用了
 let myChart = this.$echarts.init(document.getElementById('myChart'))
 */
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // inject store to all children
  components: { App },
  template: '<App/>'
});
