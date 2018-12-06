<template>
  <div id="pieChart">
    <div ref="pieChart_in" id='pieChart_in' style="height: 300px;"></div>
    <div class="jiantou">
      <p v-for="(item,index) in pieData" :key="index">
        <span class="icon" :style="{'background':color[index]}"></span>
        <span>{{item.name}} {{item.value}}个</span>
        <img src="../../../image/icon-arr-r@3x.png" :alt="item.rate" v-if="item.flag==1">
        <img src="../../../image/icon-arr-g@2x.png" class='xia' :alt="item.rate" v-if="item.flag==2">
      </p>
    </div>
  </div>
</template>

<script>
  import 'echarts/lib/chart/pie.js'
  export default {
    name: 'Index',
    data(){
      return {
        color:['#FD9D67', '#DAE571', '#FED350', '#A9D3FE', '#8FD3DE', '#E7EBC5', '#A9D371', '#85E1CA', '#E7BD81', '#DBB1E1'],
        pieData:[],
        allData:[],
        pieDataFlag:false,
        pieDataArrow:false
      }
    },
    created(){
      this.$nextTick(function () {
        this.getPieData();
      })
    },
    mounted(){
      // console.log(this.$echarts,this.$refs.pieChart_in)
      // this.pieChart();
      console.log(this.$store.state.myChartData)
    },
    methods:{
      getPieData(){
        let _this = this;
        this.allData = [];
        this.pieData = [];
        this.pieDataFlag=false;
        this.pieDataArrow=false;
        //日期改为近两次检核日期
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
          data.data.data.forEach((item,index) => {
            var re = /^[0-9]+.?[0-9]*$/;
            if(!re.test(item.fourthlevel_count)){
              item.fourthlevel_count = 0;
            }
            if(!re.test(item.thirdlevel_count)){
              item.thirdlevel_count = 0;
            }
            if(!re.test(item.secondevel_count)){
              item.secondevel_count = 0;
            }
            if(!re.test(item.firstevel_count)){
              item.firstevel_count = 0;
            }
          });
          _this.allData=data.data.data;
          console.log(_this.allData)
          if(_this.allData.length>0){
            this.pieData.push({value:_this.allData[0].fourthlevel_count, name:'严重问题',flag:_this.pieDataComp(_this.allData[0],"fourthlevel_rate"),rate:_this.pieDataRate(_this.allData[0],"fourthlevel_rate")});
            this.pieData.push({value:_this.allData[0].thirdlevel_count, name:'比较严重',flag:_this.pieDataComp(_this.allData[0],"thirdlevel_rate"),rate:_this.pieDataRate(_this.allData[0],"thirdlevel_rate")});
            this.pieData.push({value:_this.allData[0].secondevel_count, name:'一般',flag:_this.pieDataComp(_this.allData[0],"secondlevel_rate"),rate:_this.pieDataRate(_this.allData[0],"secondlevel_rate")});
            this.pieData.push({value:_this.allData[0].firstevel_count, name:'轻度',flag:_this.pieDataComp(_this.allData[0],"firstlevel_rate"),rate:_this.pieDataRate(_this.allData[0],"firstlevel_rate")});
          }else{
            this.pieData=[
              {value:0,name:'严重问题',flag:0,rate:0},
              {value:0,name:'比较严重',flag:0,rate:0},
              {value:0,name:'一般',flag:0,rate:0},
              {value:0,name:'轻度',flag:0,rate:0},
            ]
          }
          this.pieChart();
          this.$store.commit('SET_CHARDATA',data.data.data);
        },(err)=>{
          console.log(err)
        });
      },
      pieDataComp(item,key){
        if(item[key]>0){
          return 1;
        }else if(item[key]<0){
          return 2;
        }else {
          return 0;
        }
      },
      pieDataRate(item,key){
        if(item[key]>0){
          return Math.abs(item[key]);
        }else if(item[key]<0){
          return Math.abs(item[key]);
        }else {
          return 0;
        }
      },
      pieChart(){
        let _this = this;
        var myChart = this.$echarts.init(this.$refs.pieChart_in);
        console.log(this.allData);
        console.log(this.pieData);
        myChart.setOption({
          tooltip: {
            confine:true,
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)",
            backgroundColor:'rgba(255,255,255,1)',
              textStyle:{
                color:'#000',
              },
              borderColor:'#aaa',
              borderWidth:1
          },
          color:_this.color,
          legend: {
            orient: 'vertical',
            show: false,
            top:'center',
            right:'80px',
            itemGap:20,
            width:'auto',
            data:['严重问题','比较严重','一般','轻度'],
          },
          // formatter: function(name) {
          //     console.log(Option.series)
          //     var oa = Option.series[0].data;
          //     var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value;
          //     for (var i = 0; i < Option.series[0].data.length; i++) {
          //         if (name == oa[i].name) {
          //             return name + '     ' + (oa[i].value / num * 100).toFixed(2) + '% ↑ ↓';
          //         }
          //     }
          // },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '70%'],
              center:['50%','50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'left'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              /*data:[
                  {value:this.$store.state.myChartData[0]?this.$store.state.myChartData[0].fourthlevel_count:1, name:'严重问题'},
                  {value:this.$store.state.myChartData[0]?this.$store.state.myChartData[0].thirdlevel_count:1, name:'比较严重'},
                  {value:this.$store.state.myChartData[0]?this.$store.state.myChartData[0].secondevel_count:1, name:'一般'},
                  {value:this.$store.state.myChartData[0]?this.$store.state.myChartData[0].firstevel_count:1, name:'轻度'}
              ],*/
              data:_this.pieData

            }
          ]

        })
      }
    }
  }
</script>

<style scoped>
  #pieChart{
    position: relative;
    width: 100%;
  }
  #pieChart_in{
    width: 60%;
  }
  .jiantou{
    width:40%;
    position:absolute;
    right:0px;
    top: 0;
    height: 100%;
    display: flex;
    justify-content:center;
    /*align-items: normal;*/
    flex-direction:column;
  }
  .jiantou p{
    line-height:170px;
  }
  .jiantou p span.icon{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  .jiantou p:first-child,.jiantou p:nth-child(2){
    /*text-align:right;*/
  }
  .xia{
    transform: rotate(180deg);
  }
  #pieChart img{
    width:50px;
    height:60px;
  }
</style>
