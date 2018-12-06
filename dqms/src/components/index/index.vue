<template>
  <div id="Index">
    <!--<MyScroll ref="myScroll" :page="page" :on-refresh="onRefresh" :on-pull="onPull"  :get-scroll-top="getTop">
    <div slot="scrollList">-->
    <div class='scroll'>
        <div class="com_data" @click='abmina'>
          <router-link to="/Enterpriserankings" class="rankHead">
          <div class="left">
            <p>
              <span>{{data[0]?data[0].quality_score:"-"}}</span>
              <span>分</span>
            </p>
          </div>
          <div class="center right">
              <span class="value">{{data[0]?data[0].rank:"-"}}<b>
                  <img src="../../image/icon-arr-g@2x.png" v-if='data[0]&&data[0].rank<data[0].pre_rank?true:false' alt="">
                  <img src="../../image/icon-arr-r@2x.png" v-if='data[0]&&data[0].rank>data[0].pre_rank?true:false' class='xia' alt="">
              </b>
              </span>
              <span class="text">企业排名</span>
          </div>
          <div class="right">
              <span class="value">{{data[0]?data[0].avg_score:"-"}} 分</span>
              <span class="text">企业平均</span>
          </div>
          </router-link>
        </div>
        <div class="chartDisplay">
          <div class="nav">
            <span><router-link
              :to="{path:'/piechart',query:{zqid:this.$store.state.zqid,userId:this.$store.state.userId,itcode:'',date:this.$store.state.jhNowDate}}"
              router-link-active
              >问题分布</router-link></span>
            <span><router-link
              :to="{path:'/columnargraph',query:{zqid:this.$store.state.zqid,userId:this.$store.state.userId,itcode:'',date:this.$store.state.jhNowDate}}"
              router-link-active
            >处理进度</router-link></span>
            <span><router-link
              :to="{path:'/Foldlinediagram',query:{zqid:this.$store.state.zqid,userId:this.$store.state.userId,itcode:'',date:this.$store.state.jhNowDate}}"
              router-link-active
            >处理时长</router-link></span>
          </div>
          <div class="chart">
            <router-view></router-view>
          </div>
          <div class="thesum">
            <p @click='abmina'>
              <router-link :to="{path:'/Allproblems',query:{zqid:this.$store.state.zqid,userId:this.$store.state.userId,itcode:'',date:this.$store.state.jhNowDate}}">
              问题总数
              <span>{{theSum}}</span>
              个 <b></b>
              </router-link>
            </p>
          </div>
        </div>
        <div class="list">
          <div class="nav">
            <span><a href="javascript:void(0);"
              @click="toggleTabs(1);"
              :class="{'active':1===nowIndex}"
             >所有问题</a></span>
            <span><a href="javascript:void(0);"
              @click="toggleTabs(2);"
              :class="{'active':2===nowIndex}"
             >我关注的问题</a></span>
            <span><a href="javascript:void(0);"
               @click="toggleTabs(3);"
               :class="{'active':3===nowIndex}"
              >严重异常问题</a></span>
            <b ref='administration' @click='administration' v-if='!this.$store.state.administration'>管理</b>
            <b ref='administration' @click='administration'  v-if='this.$store.state.administration'>完成</b>
          </div>
          <div class="list_dis">
              <keep-alive :include='nowIndex+""' >
                <Allprob v-if='nowIndex===1' ></Allprob>
                <Taboneuser v-if='nowIndex===2'  ></Taboneuser>
                <Tabtwoserious v-if='nowIndex===3'  ></Tabtwoserious>
              </keep-alive>
          </div>
        </div>
    </div>
    <div class="footer_administration" id='footer_administration' ref='footer_administration' v-if='(this.$store.state.administration)'>
          <p @click='quanxuan'>
            <em></em>
            <input type="checkbox" id='checkbox'>
            <span>√</span>
            <label for="checkbox" >全选</label>
          </p>
          <p>
            <button v-if='!flag' @click='moveInFollow'>移入关注</button>
            <button v-if='flag' @click='cancelFollow'>取消关注</button>
          </p>
        </div>
       <!-- </div>
      </MyScroll>-->
      <van-popup
        v-model="show"
        position="top"
        :overlay="false"
      >
        {{contentText}}
      </van-popup>
  </div>
</template>

<script>
import Taboneuser from '../taboneuser/tabuser'
import Tabtwoserious from '../tabtwoserious/tabserious'
import Allprob from '../allprob/allprob'
import Header from '../header/header'
import MyScroll from '../myScroll/myScroll'
import { Dialog } from 'vant';
export default {
  name: 'Index',
  data(){
    return {
      num:669,
      show:false,//top弹出层
      contentText:'',//弹出层的内容
      title:"数据示险",
      enterpriseranking:45,//企业排名
      enterpriseaverage:550,//企业平均
      theSum:'',//问题总和
      isShow:false,
      slideEffect:'',//滑动时的效果,使用v-bind:style="deleteSlider"
      nowIndex:1,//tab默认显示
      data:[],//承接数据
      list:[],
      page:{
          counter:1,
          pageStart:1,
          pageEnd:1,
          total:10
      },
      flag:false,//控制显示（移入||取消）关注状态
    }
  },
  components:{
    Taboneuser,
    Tabtwoserious,
    Allprob,
    Header,
    MyScroll
  },
  mounted() {
    this.$store.commit('SET_ISFLAG', false);
    for(let i=0;i<1*50;i++){
        this.list.push({})
    }
    //日期改为近两次检核日期
    //首页头部分数数据请求
    this.$axios({
      method:'get',
      url:'/edata-icome/dqmsIot/getAll',
      params:{
        dataTable:'datagovern_qualitylevel_h',
        compCode:this.$store.state.zqid,
        checkDate:this.$store.state.jhNowDate,
        limitLower: 0,
        limitUpper: 2,
        orders:'-check_date'
      }
    }).then((data)=>{
      console.log("-------------------------")
      console.log(data.data.data)
      this.data=data.data.data;
    },(err)=>{
        console.log(err)
    });
    //首页问题分布数据请求

    /*----问题个数----*/
    this.$axios({
        method:'get',
        url:'/edata-icome/dqmsIot/getAll',
        params:{
            dataTable:'datagovern_distributed_h',
            compCode:this.$store.state.zqid,
            checkDate:this.$store.state.jhNowDate,
            limitLower: 0,
            limitUpper: 1,
            orders:'-check_date'
        }
    }).then((data)=>{
        console.log(data.data.data)
          this.theSum=data.data.data[0]?data.data.data[0].total_count:'--';
    },(err)=>{
        console.log(err)
    });
  },
  updata:{

  },
  computed:{
  },
  watch:{
    
    show(val) {
      if (val) {//top弹框2秒后自动消失
        setTimeout(() => {
          this.show = false;
        }, 2000);
      }
    }
  },
  methods:{
    
    /*---是否全选---*/
    quanxuan(){
        var inp=$('#footer_administration input[type="checkbox"]:checked')
        console.log(inp)
        if(inp.length>0){
          this.$store.commit('SET_QUANXUAN','全选')//状态更改
        }else{
          this.$store.commit('SET_QUANXUAN','全不选')
        }
        this.$store.commit('SET_QUANCHANGE')
    },
    
    /*-------移入关注-------*/
    moveInFollow(){
      console.log('------------------------------')
      console.log('移入关注')
      // this.$store.commit('SET_CHANGE')
      // this.$store.commit('SET_WHETHERFOLLOW','移入关注')
      Dialog.confirm({
        title: '是否移入关注',//弹框
        className:'vant-dialog'
      }).then(() => {
        // on confirm
        this.$store.commit('SET_CHANGE')//状态更改
        this.$store.commit('SET_WHETHERFOLLOW','移入关注')
        this.show=true;
        this.contentText='添加关注成功'//更改提示语
      }).catch(() => {
        // on cancel
         this.show=true;
        this.contentText='取消'
      });
    },
    /*-------取消关注-------*/
    cancelFollow(){
      console.log('------------------------------')
      console.log('取消关注')
      Dialog.confirm({
        title: '是否取消关注',
        className:'vant-dialog'
      }).then(() => {
        this.$store.commit('SET_CHANGE')
        this.$store.commit('SET_WHETHERFOLLOW','取消关注')
        this.show=true;
        this.contentText='取消关注成功'
      }).catch(() => {
        this.show=true;
        this.contentText='取消'
      });
    },
    /*-------管理操作-------*/
      administration(){
        if(this.nowIndex === 1 || this.nowIndex === 3){//判断状态，更换（移入||取消）关注文字
          this.flag=false;
        }else if(this.nowIndex ===2){
          this.flag=true;
        }

        if(this.$store.state.administration){//判断更改（管理||完成）
          this.$store.commit('SET_ABMIN',false);
        }else{
          this.$store.commit('SET_ABMIN',true)
        }
      },
      /*-------tab切换-------*/
      toggleTabs (tabText) {
          this.nowIndex = tabText;
          $(window).resize();

          if(this.nowIndex === 1 || this.nowIndex === 3){
            this.flag=false;
          }else if(this.nowIndex ===2){
            this.flag=true;
          }
      },
      abmina(){//状态改变
        if(this.$store.state.administration){
          this.administration();
        }

        this.$store.commit('SET_ISFLAG2');
        this.$store.commit('SET_ISFLAG', true);
        
      },
      
      onRefresh(mun){ //刷新回调
            setTimeout(()=>{
                this.$refs.myScroll.setState(3);
            },500)
    },
    onPull(mun){ //加载回调
        if(this.page.counter<=this.page.total){
            setTimeout(()=>{
                this.page.counter++
                this.$refs.myScroll.setState(5)
                for(let i=0;i<10;i++){
                    this.listdata.push({})
                }
            },500)
        }else{
            this.$refs.myScroll.setState(7)
        }
    },
    getTop(y) {//滚动条位置

    },
  },

}
</script>

<style scoped>
    @import "./index.style.css";
    .van-popup--top{
      width: 100%;
      height:2.75rem;
      border-radius: 0;
      text-align:center;
      line-height:2.75rem;
      color:#fff;
      background-color: rgba(0, 0, 0, 0.8);
    }
</style>
