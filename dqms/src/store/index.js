import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 开发环境状态
const myDevelop = window.var.develop;

const store = new Vuex.Store({
  state: {
      show:false,
      administration:false,
      zqid:null,
      zqname:null,
      userId:null,
      date:null,
      myChartData:null,
      lineBarData:null,
      jhNowDate:'',//检索时间
      jhLastDate:'',
      questionId:null,
      eventChange: false,//改变状态
      quanChange: false,//改变状态
      WhetherFollow:'',//移入取消关注
      quanXuan:'',
      isflag:false,
      isflag2:false
  },
  mutations: {
    "SET_SHOW": function (state, show) {
      state.show = show
      console.log('保存', state.show)
    },
    "SET_ISFLAG": function (state, isflag) {
      state.isflag = isflag
      console.log('保存', state.isflag)
    },
    "SET_ISFLAG2": function (state ) {
      state.isflag2 = !state.isflag2
      console.log('保存')
    },
    "SET_ABMIN": function (state, administration) {
      state.administration = administration
      console.log('保存', state.administration)
    },
    "SET_CHARDATA": function (state, myChartData) {
      state.myChartData = myChartData
      console.log('保存', state.myChartData)
    },
    "SET_LINEBAR": function (state, lineBarData) {
      state.lineBarData = lineBarData
      console.log('保存', state.lineBarData)
    },
    "SET_QUESTIONID": function (state, questionId) {
      state.questionId = questionId
      console.log('保存', state.questionId)
    },
    'SET_CHANGE':function(state, eventChange) {
      state.eventChange = !state.eventChange
      console.log('保存', state.eventChange)
    },
    'SET_QUANCHANGE': function (state, quanChange) {
      state.quanChange = !state.quanChange
      console.log('保存', state.quanChange)
    },
    'SET_WHETHERFOLLOW': function (state, WhetherFollow) {
      state.WhetherFollow = WhetherFollow
      console.log('保存', state.WhetherFollow)
    },
    'SET_QUANXUAN': function (state, quanXuan) {
      state.quanXuan = quanXuan
      console.log('保存', state.quanXuan)
    }
  },
  getters: {
    
  },
  actions: {

  }
  
})
export default store
