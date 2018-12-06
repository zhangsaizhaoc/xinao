<template>
     <div class="list_ele" ref='list_ele'>
            <div class="check" ref='check'>
                 <!--`checked` 为 true 或 false-->
               <!--<el-checkbox v-model="checked" :size='size' :border='border'></el-checkbox>-->
                <em></em>
                <input type="checkbox" :checked="data.flag=='true'" :compCode='data.compCode' :businessId='isflag||data.businessId' :methodId='data.methodId' :checkDate='data.checkDate' >
                <span>√</span>
                
            </div>
           <van-swipe-cell :right-width="65" :left-width="0" :disabled='this.$store.state.isflag||this.$store.state.administration' >
              <van-cell>
              <h3><span>
                <img src="../../image/icon-al-r@2x.png" alt="" v-if='data.level==4'>
                <img src="../../image/icon-al-o@2x.png" alt="" v-if='data.level==3'>
                <img src="../../image/icon-al-y@2x.png" alt="" v-if='data.level==2'>
                <img src="../../image/icon-al-b@2x.png" alt="" v-if='data.level==1'>
              </span>{{data?data.desc:'-'}} <b>{{data?data.questionState:'-'}}</b></h3>
              <ul>
                <li>
                  <span>问题数量及占比:</span>
                  <span>{{data?data.count:'-'}}/{{data?data.countRate:'-'}}</span>
                </li>
                <li>
                  <span>影响业务指标:</span>
                  <span>{{data?data.businessQuota:'-'}}</span>
                </li>
                <li>
                  <span @click="">业务负责人:</span>
                  <span>{{data?data.businessOwner:'-'}}<!-- <b></b>--></span>
                </li>
                <li>
                  <span>要求处理时长:</span>
                  <span>{{data?data.checkCycle:'-'}} 天</span>
                  <!--<b><router-link to="/taskTracking">任务跟踪</router-link> </b>-->
                </li>
              </ul>
            </van-cell>
              <span slot="right" class="remove" ref='remove' v-if='data.flag' index='1' @click='stateCode(data.flag,data)'>取消关注</span>
              <span slot="right" class="remove" ref='remove' v-if='data.flag=="false"' index='2' @click='stateCode(data.flag,data)'>关注</span>
            </van-swipe-cell>
    </div>
</template>
<script>
export default {
  name: 'Index',
  props:{
      data:{
          type:Object
      }
  },
  data(){
    return {
        deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
        checked:true,
        flag:null,
        statusCode:1,
        isflag:false,
    }
  },
  mounted() {
      this.flag=this.$store.state.show;
      this.judge();
  },
  computed: {
      admin () {
          return this.$store.state.administration
      },
    eventChange(){
        return this.$store.state.eventChange
    },
    quanChange(){
        return this.$store.state.quanChange
    },
    isflag2(){
        return this.$store.state.isflag2
    }
  },
  watch:{//监听改变
    admin(oldz,newz){
        this.judge(newz);
        return newz;
    },
    eventChange(val){
        this.methodA()
    },
    quanChange(val){
        this.methodB()
    },
    isflag2(val){
        this.methodC()
    },
  },
  methods:{
    methodC(){
      if(this.$store.state.isflag){
        
      }
    },
    /*----全选||全不选----*/
    methodB(){
      var inp=$('input[type="checkbox"]');//获取input复选框
      if(this.$store.state.quanXuan == '全选'){//判断状态
        // console.log('全选：----------------');
        for(var i=0;i<inp.length;i++){//遍历全选
          inp[i].checked=true;
        }
      }else if(this.$store.state.quanXuan == '全不选'){
        // console.log('全不选：----------------')
        for(var i=0;i<inp.length;i++){//遍历全不选
          inp[i].checked=false;
        }
      }else{
        console.log('有误')
      }
    },
    /*----用于监听是否点击（移入||取消）关注，且批量操作----*/
    methodA(){
      var arr=[];//用于出入请求，从而批量操作
      var inp=$('input[type="checkbox"]:checked');//获取所有已经选择的数据
      for(var i=0;i<inp.length;i++){//遍历获取自定义属性
        arr.push({
              checkDate:inp[i].getAttribute('checkDate'),
              compCode:inp[i].getAttribute('compCode'),
              methodId:inp[i].getAttribute('methodId'),
              businessId:inp[i].getAttribute('businessId')
        })
      }
      if(this.$store.state.WhetherFollow == '移入关注'){//判断类型
        // console.log('移入关注：----------------')
        // console.log(arr)
        this.request(arr,'insert');//请求方法
      }else if(this.$store.state.WhetherFollow == '取消关注'){
        // console.log('取消关注：----------------')
        // console.log(arr)
        this.request(arr,'delete');//请求方法
      }else{
        console.log('有误')
      }
    },
    /*----请求方法----*/
    request(questuionData,type){//questuionData拼接后的对象，用于批量（添加||取消）关注，//type用于判断类型（添加||取消）关注
      var str=JSON.stringify(questuionData)
      this.$axios({
          method:'get',
          url:'/edata-icome/dqms/questionManager',
          params:{
              // dataTable:'datagovern_detailinfo_h',
              checkDate:this.$store.state.jhNowDate,
              userId:this.$store.state.userId,
              questuionData:str,
              compCode:this.$store.state.zqid,
              type:type
          }
      }).then((data)=>{
          console.log(data.data.data)
      },(err)=>{
          console.log(err)
      });
    },
    /*----点击关注与取消关注----*/
    stateCode(sta,data){//sta内部状态，data当前数据
      console.log(sta)
      console.log()
      if(sta=='false'){
        // console.log('关注')
        this.$axios({
            method:'get',
            url:'/edata-icome/dqms/saveQuestion',
            params:{
                // dataTable:'datagovern_detailinfo_h',
                
               checkDate:this.$store.state.jhNowDate,
                userId:this.$store.state.userId,
                // limitLower: 0,
                // limitUpper: 2,
                // orders:'-check_date'
                compCode:data.compCode,
                businessId:data.businessId,
                methodId:data.methodId

            }
        }).then((data)=>{
            console.log(data.data.data)
            
        },(err)=>{
            console.log(err)
        });
        data.flag='true'
      }else{
        // console.log('取消关注')
        data.flag='false'
        this.$axios({
            method:'get',
            url:'/edata-icome/dqms/deleteQuestion',
            params:{
                // dataTable:'datagovern_detailinfo_h',
                checkDate:this.$store.state.jhNowDate,
                userId:this.$store.state.userId,
                compCode:data.compCode,
                methodId:data.methodId,
                businessId:data.businessId
            }
        }).then((data)=>{
            console.log(data.data.data)
            
        },(err)=>{
            console.log(err)
        });
      }
      
    },
    /*----判断多选框是否显示----*/
      judge(){
        if( this.$store.state.administration){//判断index页面是否点击了（管理||完成）控制多选按钮显示隐藏
            this.$refs.check.style.width='50px';
        }else{
            this.$refs.check.style.width='0px'
        }
      },
    //打开双人沟通会话
    openHuihua(userId){
      alert(userId);
      try {
        icome.myIm("",userId,"");
      }catch (e) {
        alert("打开双人会话失败，请联系管理员！");
      }
    }
  
  }
}
</script>

<style scoped>
    @import "../index/index.style.css";

.remove{
    position: absolute;
    width:260px;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    background:#70b6fe;
    right:-264px;
    top: 0;
    color:#fff;
    text-align: center;
    font-size: 20px;
    line-height: 200px;
}
    .van-cell{
      padding: 20px 0px;
      line-height: 80px;
      font-size: 60px;
    }
</style>
