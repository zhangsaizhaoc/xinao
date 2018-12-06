<template>
  <div id="Enterpriserankings">
  <div class="top_header">
    <p>数据治理标杆企业</p>
    <p><span>{{firstName}} {{DomText}}</span><span>{{firstScore}}分</span></p>
  </div>
    <div class="Enterpriserankings_list">
        <ul>
            <li v-for='(item,index) in arr'>
                <span :style="{'color':item.rank<=3&&item.rank>0?'#FFCE52':'#c9c9c9'}">{{item.rank}}</span>
                <span>{{item.comp_code_text}}</span>
                <span><b>{{item.quality_score }}</b><b>分</b></span>
                <span @click='thumbsUp(item,index)'>
                    <!--<img src="../../image/icon-tags@2x.png" v-if='!item.flag' alt="" v-on:click="getLike(item.comp_code,item.check_date,index)">-->
                    <!--<img src="../../image/icon-tags-act@2x.png" v-if='item.flag' alt=""  v-on:click="deleteLike(item.comp_code,item.check_date,index)">-->
                    <img src="../../image/icon-tags@2x.png" v-if='!item.flag' alt="">
                    <img src="../../image/icon-tags-act@2x.png" v-if='item.flag' alt="">
                    <b>{{item.count}}</b>
                </span>
            </li>
        </ul>
        <h6></h6>
    </div>
    <div class="Enterpriserankings_pf">
        <h5 @click='ifShow'>数据治理评分说明 <img src="../../assets/images/arrow_r.png" alt=""></h5>
    </div>
    <van-popup v-model="show">
      <h4>数据质量评分说明：</h4>
        <ol>
          <li>
            <p>质量分数=1000-(问题分布得分*40%+问题进度*40%+处理时长*20%)，</p>
            <p>其中：</p>
            <p>问题分布：本企业问题总数/所有问题总数</p>
            <p>问题进度：本企业问题关闭数/本企业问题总数</p>
            <p>处理时长：本企业各业务域的平均处理时长等级</p>
          </li>
          <li>
            <h6>平均处理时长等级：</h6>
            <p>
              <span>1-7天</span>
              <span>1000 分</span>
            </p>
            <p>
              <span>8-14天</span>
              <span>800 分</span>
            </p>
            <p>
              <span>15-22天</span>
              <span>700 分</span>
            </p>
            <p>
              <span>23-31天</span>
              <span>600 分</span>
            </p>
            <p>
              <span>1-2个月</span>
              <span>500 分</span>
            </p>
            <p>
              <span>2-3个月</span>
              <span>400 分</span>
            </p>
            <p>
              <span>3-6个月</span>
              <span>300 分</span>
            </p>
            <p>
              <span>6个月以上</span>
              <span>0 分</span>
            </p>
          </li>
        </ol>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return {
          arr:[],//列表数据+点赞
          data:null,
          compData:[],//列表前十
          zqids:'',
          firstName:'',//标杆企业
          firstScore:'',//标杆企业分数
          show: false,//控制弹出层
          brr:[],
          DomText:''
      }
  },
  mounted() {
        //列表数据
    let _this = this;
    this.$axios({//前十数据请求
      method:'get',
      url:'/edata-icome/dqmsIot/getAll',
      params:{
        dataTable:'datagovern_qualitylevel_h',
        limitLower: 0,
        limitUpper: 10,
        checkDate:this.$store.state.jhNowDate,
        orders:'rank'
      }
    }).then((data)=>{
      console.log(data.data.data)
      data.data.data?data.data.data.forEach((item,index)=>{
          if(item.rank==1){
            _this.brr.push(item);
          }
      }):[]
      if(_this.brr.length>1){
        _this.DomText='等'+_this.brr.length+'家'
      }else{
        _this.DomText='';
      }
      _this.compData = data.data.data;
      _this.zqids = '';
      if(_this.compData&&_this.compData.length>0){
        _this.firstName = _this.compData[0].comp_code_text;
        _this.firstScore = _this.compData[0].quality_score;
        for(let i in _this.compData){
          _this.zqids+=","+_this.compData[i].comp_code;
        }
        _this.zqids = _this.zqids.substring(1);
      }
      _this.$axios({//当前数据
        method:'get',
        url:'/edata-icome/dqmsIot/getAll',
        params:{
          dataTable:'datagovern_qualitylevel_h',
          compCode:_this.$store.state.zqid,
          checkDate:_this.$store.state.jhNowDate,
        }
      }).then((data)=>{
        if(data.data.data && data.data.data.length>0){
          _this.compData = data.data.data.concat(_this.compData);
          _this.zqids=data.data.data[0].comp_code+","+_this.zqids;
        }
        console.log("+++++++++++++++")
        console.log(_this.compData)
        _this.$axios({//点赞数据
          method:'get',
          url:'/edata-icome/dqms/getLikeCount',
          params:{
            zqids:_this.zqids,
            checkDate:_this.$store.state.jhNowDate,
            userId:_this.$store.state.userId
          }
        }).then((data)=>{
          console.log("count---------------------")
          console.log(data.data.data)
          let count = data.data.data;
          for(let i in _this.compData){
            _this.compData[i].flag = false;
            _this.compData[i].count = 0;
            for(let j in count){
              if(_this.compData[i].comp_code == count[j].zqid){
                if(count[j].flag=='true'){
                  _this.compData[i].flag = count[j].flag;
                }
                _this.compData[i].count = count[j].count;
              }
            }
          }
          console.log("*******************");
          console.log(_this.compData);
          _this.arr = _this.compData;
        },(err)=>{
          console.log(err)
        });
      },(err)=>{
        console.log(err)
      });

      _this.data=data.data.data;
    },(err)=>{
      console.log(err)
    });

  },
  methods:{
      ifShow(){
        if(this.show){
          this.show=false;
        }else{
          this.show=true;
        }
      },
      thumbsUp(item,index){
        /*if(item.flag){
            item.flag=false;
            item.count--;
            this.deleteLike(item.comp_code,item.check_date)
        }else{
            item.flag=true;
            item.count++;
            this.getLike(item.comp_code,item.check_date)
        }*/
        if(this.arr[index].flag){
          for(var i in this.arr){
            if(this.arr[index].comp_code==this.arr[i].comp_code){
              this.arr[i].flag=false;
              this.arr[i].count--;
            }
          }
          // this.arr[index].flag=false;
          // this.arr[index].count--;
            this.deleteLike(this.arr[index].comp_code,this.arr[index].check_date)
        }else{
          for(var i in this.arr){
            if(this.arr[index].comp_code==this.arr[i].comp_code){
              this.arr[i].flag=true;
              this.arr[i].count++;
            }
          }
          // this.arr[index].flag=true;
          // this.arr[index].count++;
            this.getLike(this.arr[index].comp_code,this.arr[index].check_date)
        }
        this.arr = JSON.parse(JSON.stringify(this.arr));
      },
      //点赞请求
    getLike(zqid,checkDate,index){
        // this.arr[index].flag = !this.arr[index].flag;

        // alert("点赞:"+this.arr[index].flag)
      this.$axios({
        method:'get',
        url:'/edata-icome/dqms/getLike',
        params:{
          userId:this.$store.state.userId,//用户id
          compCode:zqid,//自驱id
          checkDate:checkDate,//当前查看最近检核日期
        }
      }).then((data)=>{
        console.log(data);
      },(err)=>{
        console.log(err)
      });
    },

    //点赞请求
    deleteLike(zqid,checkDate,index){
      // this.arr[index].flag = !this.arr[index].flag;
      // alert("取消赞:"+this.arr[index].flag)
      this.$axios({
        method:'get',
        url:'/edata-icome/dqms/deleteLike',
        params:{
          userId:this.$store.state.userId,//用户id
          compCode:zqid,//自驱id
          checkDate:checkDate,//当前查看最近检核日期
        }
      }).then((data)=>{
        console.log(data);
      },(err)=>{
        console.log(err)
      });
    }

        }
}
</script>

<style>
@import './Enterpriserankings.style.css';
</style>
