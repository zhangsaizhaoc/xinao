<template>
  <div id="Allproblems">
    <div class="Allproblems_screeningConditions">
        <!--<h5 >筛选条件</h5>-->
        <div class="ScreeningConditions">
           <div class="right_an" ref='reightan' id='right_an'>
              <div class="main" ref='main' @click='eventDelegation'>
                  <div class="main_mod" >
                      <h6 >严重等级</h6>
                      <p dataType='level'>
                          <span index='4'>严重异常</span>
                          <span index='3'>比较严重</span>
                          <span index='2'>一般</span>
                          <span index='1'>轻度</span>
                      </p>
                  </div>
                  <div class="main_mod">
                      <h6 >业务类型</h6>
                      <p dataType='businessId'>
                          <span :index='item.yw_id' v-for="(item,index) in ywlxArr" :key="index" >{{item.yw_name}}</span>
                          <!--<span index='1'>市场</span>
                          <span index='2'>客服</span>
                          <span index='3'>工程</span>
                          <span index='4'>物资</span>
                          <span index='5'>财务</span>
                          <span index='6'>运营</span>-->
                      </p>
                  </div>
                  <!--<div class="main_mod">
                      <h6 >问题占比</h6>
                      <p dataType='countRate'>
                          <label>超过</label>
                          <input type="text" placeholder="请填写整数">
                          <label>%</label>
                      </p>
                  </div>
                  <div class="main_mod">
                      <h6 >处理时长</h6>
                      <p dataType='checkCycle'>
                          <label>超过</label>
                          <input type="text" placeholder="请填写整数">
                          <label>天</label>
                      </p>
                  </div>-->
                  <div class="main_mod">
                      <h6>质量维度</h6>
                      <p dataType='qualityDim' >
                          <span  index='I'>完整性</span>
                          <span  index='P'>及时性</span>
                          <span  index='A'>准确性</span>
                          <span  index='C'>一致性</span>
                          <!--<span index='V'>有效性</span>
                          <span index='R'>合理性</span>-->
                      </p>
                  </div>
                  <div class="main_mod">
                      <h6 >处理进展</h6>
                      <p dataType='questionState'>
                          <span  index='已关闭'>已关闭</span>
                          <span  index='处理中'>处理中</span>
                      </p>
                  </div>

              </div>
              <h6 class='inpt' ref='inpt' style="-webkit-user-select:text !important;">
                <input class="probInput" type="text" v-model="params.desc" @focus='changeinp' @blur='changeinp'>
                <span>
                    
                    <b @click="showPicker">{{textNode}}<b></b></b>
                </span>
                <b></b>
              </h6>
              <div class="footer">
                  <p @click='Reset'>重置</p>
                  <p @click='querySearch'>查询</p>
              </div>
          </div>
        </div>
    </div>
    <div class="Allproblems_screeningResults">

        <Listall :data='questionArr'></Listall>

    </div>
    <!--<div class="mask" ref='mask' @click='maskshow'></div>

    <mt-popup
      v-model="popupVisible"
      pop-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" show-toolbar="true" ref="picker">
        <mt-button @click="handleCancel" class="cancel">取消</mt-button>
        <mt-button @click="handleConfirm" class="sure">确认</mt-button>
      </mt-picker>
    </mt-popup>-->

    <van-popup v-model="vantShow" position="bottom" :overlay="true">
      <van-picker :columns="vantColumns" @change="vantChange" show-toolbar @cancel="vantCancel" @confirm="vantConfirm" />
    </van-popup>
    <!--<van-popup v-model="vantShow2" position="right" :overlay="true" @click-overlay="maskshow">
      <div class="right_an" ref='reightan' id='right_an'>
        <div class="main" @click='eventDelegation'>
            <div class="main_mod" >
                <h6 >严重等级</h6>
                <p dataType='level'>
                    <span index='4' class='clicka'>严重异常</span>
                    <span index='3' class='clicka'>比较严重</span>
                    <span index='2' class='clicka'>一般</span>
                    <span index='1' class='clicka'>轻度</span>
                </p>
            </div>
            <div class="main_mod">
                <h6 >业务类型</h6>
                <p dataType='businessId'>
                    <span :index='item.yw_id' v-for="(item,index) in ywlxArr" :key="index" class='clicka'>{{item.yw_name}}</span>
                </p>
            </div>
            <div class="main_mod">
                <h6 >问题占比</h6>
                <p dataType='countRate'>
                    <label>超过</label>
                    <input type="text" placeholder="请填写整数">
                    <label>%</label>
                </p>
            </div>
            <div class="main_mod">
                <h6 >处理时长</h6>
                <p dataType='checkCycle'>
                    <label>超过</label>
                    <input type="text" placeholder="请填写整数">
                    <label>天</label>
                </p>
            </div>
            <div class="main_mod">
                <h6>质量维度</h6>
                <p dataType='qualityDim' >
                    <span class='clicka' index='I'>完整性</span>
                    <span class='clicka' index='P'>及时性</span>
                    <span class='clicka' index='A'>准确性</span>
                    <span class='clicka' index='C'>一致性</span>

                </p>
            </div>
            <div class="main_mod">
                <h6 >处理进展</h6>
                <p dataType='questionState'>
                    <span class='clicka' index='已关闭'>已关闭</span>
                    <span class='clicka' index='处理中'>处理中</span>
                </p>
            </div>
        </div>
        <div class="footer">
            <p @click='Reset'>重置</p>
            <p @click='querySearch'>查询</p>
        </div>
    </div>
    </van-popup>-->

  </div>
</template>

<script>
import Listall from '../listall/listall'
export default {
  name: 'Index',
  data(){
    return {
        activeName: '1',
        show:true,
        flag:false,
        num:0,
        textNode:'选择指标',
        stateCode:null,
        popupVisible:false,
        currentTags:'',
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            defaultIndex:3
            // className: 'slot1',
            // textAlign: 'center'
          }
        ],
        ywlxArr:[],//业务类型列表
        questionArr:[],//返回请求问题列表
        vantShow:false,
        vantShow2:false,
        vantColumns: [],//指标列表
        params:{
          compCode:this.$store.state.zqid,//this.$store.state.zqid,//企业编码
          level:"1,2,3,4",//'',//严重等级
          checkDate:this.$store.state.jhNowDate,//this.$store.state.jhNowDate,//检核时间
          businessId:"",//'',//业务类型
          countRate:0,//'',//问题占比
          checkCycle:0,//'',//处理时长
          businessQuota:"",//'',//指标
          qualityDim:"I,P,A,C",//'',//质量维度
          questionState:"处理中,已关闭",//'',//处理进展
          desc:"",//'',//问题描述
          userId:"10063842"//this.$store.state.userId//用户id
        },
        levelArr:[//严重等级列表
          {level:4,name:'严重异常'},
          {level:3,name:'比较严重'},
          {level:2,name:'一般'},
          {level:1,name:'轻度'}
        ],
        levelArr:[//质量维度列表
          {level:"I",name:'完整性'},
          {level:"P",name:'及时性'},
          {level:"A",name:'准确性'},
          {level:"C",name:'一致性'}
        ],
        obj:{
          level:'',       //严重等级
          business_id:'', //业务类型
          count_rate:'', //问题占比
          check_cycle:'',//处理时长
          quality_dim:'', //质量维度
          question_state:'',//处理进展
          likes:'desc'//手动搜索
        },
        str:''
    }
  },
  created(){
    this.getKpiList();//获取指标列表
    this.getYwlxList();//获取业务类型列表
    // this.getQuestionList();//获取问题列表
  },
  mounted() {

  },
  updated() {

  },
  computed: {
      author () {
        return this.$store.state.show
      }
    },
  methods:{
      //获取指标列表
      getKpiList(){
        let _this = this;
        this.$axios({
          method:'get',
          url:'/edata-icome/dqmsIot/getAll',
          params:{
            dataTable:"datagovern_method_h",
            index_status:"1"
          }
        }).then((data)=>{
          let arr = data.data.data;
          const res = new Map();
          _this.vantColumns = arr.filter((arr) => !res.has(arr.index) && res.set(arr.index, 1));
          _this.vantColumns.forEach((item,index)=>{
            item.text = item.index;
          })

        },(err)=>{
          console.log(err)
        });
      },
      //获取业务类型列表
      getYwlxList(){
        let _this = this;
        this.$axios({
          method:'get',
          url:'/edata-icome/dqmsIot/getAll',
          params:{
            dataTable:"datagovern_person_h",
            yw_status:"1"
          }
        }).then((data)=>{
          console.log(data.data.data)
          _this.ywlxArr = data.data.data;
          let busList = [];
          _this.ywlxArr.forEach((item,index)=>{
            busList.push(item.yw_id);
          })
          _this.params.businessId = busList.join(',');

          this.getQuestionList();//获取问题列表

        },(err)=>{
          console.log(err)
        });
      },
      //获取问题列表
      getQuestionList(){
        let _this = this;
        this.$axios({
          method:'post',
          url:'/edata-icome/dqms/selQuestionMwssage',
          transformRequest:function(obj) {
            var str = [];
            for ( var p in obj) {
              str.push(encodeURIComponent(p) + "="
                + encodeURIComponent(obj[p]));
            }
            console.log(_this.params)
            return str.join("&")

          },
          data:_this.params
        }).then((data)=>{
          console.log(data.data.data)
          _this.questionArr = _this.dataGroup(data.data.data,"businessId","businessType");

        },(err)=>{
          console.log(err)
        });
      },
      //更改判断
      judgement(condition,dom){//condition判断条件 dom结点
        var ele=dom;
        switch(condition){
          case 'level'://严重等级
                this.loop(condition,ele)
              break;
          case 'businessId'://业务类型
               this.loop(condition,ele)
              break;
          // case 'countRate'://问题占比
          //       this.obj[condition]=dom.querySelector('input').value
          //     break;
          // case 'checkCycle'://处理时长
          //       this.obj[condition]=dom.querySelector('input').value
          //     break;
          case 'qualityDim'://质量维度
               this.loop(condition,ele)
              break;
          case 'questionState'://处理进展
                 this.loop(condition,ele)
              break;
        }

      },
      //以键更改值
      loop(condition,dom){//类型---dom元素
        console.log(condition)
        // console.log(dom);
        var str='';
        var elem=dom.querySelectorAll('.clicka');
        for(var i=0;i<elem.length;i++){
         str+=elem[i].getAttribute('index')+',';
        }
         this.params[condition]=str.substring(0,str.length-1)

        console.log(this.params)
      },
      /*----查询----*/
      querySearch(){
        this.str='';
        console.log(this.params)
        console.log(this.$refs.inpt.querySelector('input').value)
        if(this.$refs.main.querySelectorAll('.clicka').length<=0){//判断是否有选中
          this.params={
            compCode:this.$store.state.zqid,//this.$store.state.zqid,//企业编码
            level:"1,2,3,4",//'',//严重等级
            checkDate:this.$store.state.jhNowDate,//this.$store.state.jhNowDate,//检核时间
            businessId:"1,2,3,4",//'',//业务类型
            countRate:0,//'',//问题占比
            checkCycle:0,//'',//处理时长
            businessQuota:"",//'',//指标
            qualityDim:"I,P,A,C",//'',//质量维度
            questionState:"处理中,已关闭",//'',//处理进展
            desc:"",//'',//问题描述
            userId:"10063842"//this.$store.state.userId//用户id
          }
          this.params.desc=this.$refs.inpt.querySelector('input').value;
          this.params.businessQuota=this.textNode=='选择指标'?'':this.textNode;
        }else{
          this.params.desc=this.$refs.inpt.querySelector('input').value;
          this.params.businessQuota=this.textNode=='选择指标'?'':this.textNode;
          
          for(var i=0;i<this.$refs.main.querySelectorAll('p').length;i++){//遍历获取类型&&dom
            // console.log($('#right_an p')[i].querySelectorAll('.clicka'))
              // for(var k=0;k<$('#right_an p')[i].querySelectorAll('.clicka').length;k++){
              //   var st=$('#right_an p').eq(i).children('.clicka').eq(k).html();
              //   this.str+=`<span data-v-73430dfb>${st}</span>`
              // }
              // console.log(this.str)
              // document.getElementsByClassName("ScreeningConditions")[0].innerHTML=this.str;
            var keyzhi=this.$refs.main.querySelectorAll('p')[i].getAttribute('dataType')
            var domp=this.$refs.main.querySelectorAll('p')[i];
            this.judgement(keyzhi,domp);//传入判断
          }
        }



        this.getQuestionList();//获取问题列表
        this.maskshow();
      },
      /*----重置----*/
      Reset(){
        this.$refs.inpt.querySelector('input').value;
          this.params.desc='';
        for(var i=0;i<$('#right_an p').length;i++){//遍历所有span元素，将其class赋空
          for(var k=0;k<$('#right_an p')[i].querySelectorAll('span').length;k++){
            $('#right_an p')[i].querySelectorAll('span')[k].className='';
          }
        }
        this.textNode='选择指标';
        // for(var i=0;i<$('#right_an p span input').length;i++){
        //   $('#right_an p span input')[i].value()
        // }

        if(this.$refs.main.querySelectorAll('.clicka').length<=0){//判断是否有选中
          this.params={
            compCode:this.$store.state.zqid,//this.$store.state.zqid,//企业编码
            level:"1,2,3,4",//'',//严重等级
            checkDate:this.$store.state.jhNowDate,//this.$store.state.jhNowDate,//检核时间
            businessId:"1,2,3,4",//'',//业务类型
            countRate:0,//'',//问题占比
            checkCycle:0,//'',//处理时长
            businessQuota:"",//'',//指标
            qualityDim:"I,P,A,C",//'',//质量维度
            questionState:"处理中,已关闭",//'',//处理进展
            desc:"",//'',//问题描述
            userId:"10063842"//this.$store.state.userId//用户id
          }
        }
        // this.getQuestionList();//获取问题列表
      },
      /*----事件委托----*/
      eventDelegation(ele){
        var e = e || window.event;
        var target = e.target || e.srcElement;//兼容
        var span = document.querySelectorAll('span');
        // console.log($('.clicka').length)
        // if($('.clicka').length<0){
          for(var i in span){
            if(target === span[i]){//判断点击的是否是一个span
              var ind=span[i].getAttribute('index');
              var value = parseInt(i);
              if(span[i].className=='clicka'){//判断是否带clicka类名，带有清除，没有添加
                span[i].className=''
              }else{
                span[i].className='clicka'
              }
            }
          }
        // }

      },
      /*----mint-ui----*/
      showPicker(){
        this.popupVisible = true;
        this.vantShow = true;
      },
      onValuesChange(picker, values) {
        // console.log(picker)
        // console.log(values)
        /*if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }*/
      },
      handleConfirm () {
        this.currentTags = this.$refs.picker.getValues()[0]
        this.popupVisible = false
        //
      },
      handleCancel () {
        this.popupVisible = false
        //
      },
      /*----vant-ui----*/
      vantChange(picker, value, index) {
        console.log(`当前值：${value}, 当前索引：${index}`);
        // this.params.businessQuota = value["index"];
        // debugger
      },
      vantConfirm(value, index) {
        console.log(`当前值：${value}, 当前索引：${index}`);
        this.params.businessQuota = value["index"];
        this.textNode=value["index"];
        this.vantShow = false;
        // debugger
      },
      vantCancel() {
        console.log('取消');
        this.vantShow = false;
      },
      maskshow(){
          if(this.$store.state.show){
                this.$store.commit('SET_SHOW',false);
            }else{
                this.$store.commit('SET_SHOW',true);
            }
      },
    //   frame(){
    //     if(this.flag){
    //         this.flag=false;
    //         this.$refs.bottomframe.style.bottom='-520px';
    //         this.$refs.mask2.style.bottom='-100%';
    //     }else{
    //         this.flag=true;
    //         this.$refs.bottomframe.style.bottom='0';
    //         this.$refs.mask2.style.bottom='0';
    //     }
    // },
      //输入框控制文字改变
      changeinp(){
        if(this.num){
            this.num=0;
        }else{
            this.num=1;
        }
    },
      dataGroup(data,key,name){//data 排序对象,key 排序字段,type 排序类型
        let map = {},newArr = [];
        for(let i = 0; i < data.length; i++){
          let ai = data[i];
          if(!map[ai[key]]){
            newArr.push({
              id: ai[key],
              name: ai[name],
              data: [ai]
            });
            map[ai[key]] = ai;
          }else{
            for(let j = 0; j < newArr.length; j++){
              let dj = newArr[j];
              if(dj.id == ai[key]){
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        console.log(newArr);

        return newArr;
      },
  },
  components:{
    Listall
  },
  watch:{
    "$store.state.show": function (newVal,oldVal) {//路由监听
        this.vantShow2 = this.$store.state.show;
    },
    "params.businessQuota": function (newVal,oldVal) {//路由监听
        // alert(this.params.businessQuota);
        // this.getQuestionList();//获取问题列表
    },
    "params.desc": function (newVal,oldVal) {//路由监听
      // alert(this.params.desc);
      console.log(this.params)
      if(this.params.desc==''){
        this.getQuestionList();
      }
      // this.getQuestionList();//获取问题列表
      return newVal;
    }
    /*"$store.state.show": {//内部变量监听
      handler: function (newVal, oldVal) {
        this.vantShow2 = this.$store.state.show;
      },
      deep: true //深度监听
    },*/
      /*author:function(oldz,newz){
        console.log(oldz,newz)
        this.judge(newz)
        return newz;
      }*/
  }
}
</script>

<style scoped>
    @import './Allproblems.style.css';
  .probInput{
    -webkit-touch-callout:default;
    -webkit-user-select:auto;
    -khtml-user-select:auto;
    -moz-user-select:auto;
    -ms-user-select:auto;
    user-select:auto;
    -o-user-select:auto;
  }
</style>
<style>
  /*-----------mint-ui---------*/
  .mint-popup{
    width: 100%;
  }
  .picker{
    width: 100%;
  }
  .picker-item.picker-selected{
    border-top: 1px solid rgba(0,0,0,0.2);
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .picker .picker-toolbar{
    padding: 0 50px;
    clear: both;
    height: 120px;
  }
  .picker .picker-toolbar .cancel{
    float: left;
  }
  .picker .picker-toolbar .sure{
    float: right;
  }

  /*-----------vant-ui---------*/
  .van-popup{
    height: auto;
    /*height: 100%;*/
    /*width: 100%;*/
    /*position: fixed;*/
  }
  .van-popup--right{
    width:80%;
    height:100%;
  }
  .van-picker{
    width: 100%;
    /*position: fixed;
    top: auto;
    bottom: 0;*/
  }
  .van-picker__toolbar{
    height: 128px !important;
    font-size: 64px !important;
  }
  .van-picker__cancel,.van-picker__confirm{
    padding: 15px 15px !important;
    font-size: 64px !important;
    line-height: 128px !important;
  }
  .van-ellipsis{
    font-size: 64px !important;
  }
</style>
