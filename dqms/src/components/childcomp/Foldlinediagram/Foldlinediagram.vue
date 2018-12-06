<template>
  <div id="Foldlinediagram">
    <div id="line" style='width:100%;height:300px; padding:0 10px;'>

    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/line.js'
import { Dialog } from 'vant';
export default {
  name: 'Index',
  data(){
    return {
     data:[],
     lineData:[]
    }
  },
  mounted(){
      var _this=this;
      this.$axios({
        method:'get',
        url:'/edata-icome/dqmsIot/getAll',
        params:{
            dataTable:'datagovern_processinfo_h',
            compCode:this.$store.state.zqid,
            checkDate:this.$store.state.jhNowDate,
            // limitLower: 0,
            // limitUpper: 2,
            orders:'business_id'
        }
        }).then((data)=>{
        console.log(data.data.data)
        //   this.data=data.data.data;
            var arr=[]
        // this.$store.commit('SET_LINEBAR',data.data.data);
            var datas=data.data.data;
            var arr=[];
            datas.length?datas.forEach(function(item,index){
                if(item.business_type=='市场'){
                    arr[0]=item;
                }else if(item.business_type=='工程'){
                    arr[1]=item;
                }else if(item.business_type=='运营'){
                    arr[2]=item
                }else if(item.business_type=='客服'){
                    arr[3]=item;
                }
            }):[]
            _this.lineData=arr;
            
        this.line();
        },(err)=>{
            console.log(err)
        });
  },
  methods:{
      line(){
          var _this=this;
        var myChart = this.$echarts.init(document.getElementById('line'));
        var  colors=['#F8CF66', '#59CA92', '#fff']
        myChart.setOption({
          color:colors,
          tooltip: {
              trigger: 'axis',
              confine: true,
              backgroundColor:'rgba(255,255,255,1)',
              textStyle:{
                color:'#000',
              },
              borderColor:'#aaa',
              borderWidth:1,
          },
          legend: {
                orient:'horizontal',
                show: true,
                top:'10',
                x:'center',
                width:'auto',
                data:['处理时长', '各企业平均处理时长']
          },
          grid: {
              top: 70,
              bottom: 50
          },
          xAxis: [
              {
                  type: 'category',
                  axisLine: {
                      onZero: false,
                      lineStyle: {
                          color: '#000'
                      }
                  },
                  data:  ['市场','工程','运营','客服']
              },
          ],
          yAxis: [
              {
                  type: 'value',
                  name:'单位：天'
              }
          ],
          series: [
              {
                  name:'处理时长',
                  type:'line',
                  smooth: true,
                  data: [
                      _this.lineData[0]?_this.lineData[0].avg_close_time :0,
                      _this.lineData[1]?_this.lineData[1].avg_close_time :0,
                      _this.lineData[2]?_this.lineData[2].avg_close_time :0,
                      _this.lineData[3]?_this.lineData[3].avg_close_time :0/*,
                      this.$store.state.lineBarData[4]?this.$store.state.lineBarData[4].avg_close_time :1*/
                  ]
              },
              {
                  name:'各企业平均处理时长',
                  type:'line',
                  smooth: true,
                  data: [
                      _this.lineData[0]?_this.lineData[0].avg_time:0,
                      _this.lineData[1]?_this.lineData[1].avg_time:0,
                      _this.lineData[2]?_this.lineData[2].avg_time:0,
                      _this.lineData[3]?_this.lineData[3].avg_time:0/*,
                      this.$store.state.lineBarData[4]?this.$store.state.lineBarData[4].avg_time:1*/
                  ]
              }
          ]
        })
      }
  }
}
</script>

<style scoped>

</style>
