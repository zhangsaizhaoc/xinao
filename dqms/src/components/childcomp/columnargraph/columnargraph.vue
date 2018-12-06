<template>
  <div id="columnargraph">
    <div id="bar" style='width:100%;height:300px;'></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar.js'
export default {
  name: 'Index',
  data(){
    return {
        BarData:[]
    }
  },
  mounted(){
      console.log(this.$echarts)
      let _this=this;
    /*----请求数据----*/
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
          // alert("888")
          console.log("------------柱图---------------");
        console.log(data.data.data)
        this.$store.commit('SET_LINEBAR',data.data.data);
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
            _this.BarData=arr
            console.log(arr[0])
      //   this.data=data;
      // alert(this.$store.state.lineBarData[0].process_count);
      this.Bar();
    },(err)=>{
            console.log(err)
        });
  },
  methods:{
      Bar(){
          var _this=this;
        var myChart = this.$echarts.init(document.getElementById('bar'));
        myChart.setOption({
          title : {
              text: '',
              subtext: ''
          },
          tooltip : {
              trigger: '',
              confine: true,
              backgroundColor:'rgba(255,255,255,1)',
              textStyle:{
                color:'#000',
              },
              borderColor:'#aaa',
              borderWidth:1
          },
          legend: {
              data:['处理中','已关闭'],
              top:'10px',
              x:'center',
              width:'auto',
              itemGap:40
          },
          toolbox: {
              show : true,
              feature : {

              }
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : ['市场','工程','运营','客服']
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  name:'单位：个'
              }
          ],
          series : [
              {
                  name:'处理中',
                  type:'bar',
                  data:[
                      _this.BarData[0]?_this.BarData[0].process_count:0,
                      _this.BarData[1]?_this.BarData[1].process_count:0,
                      _this.BarData[2]?_this.BarData[2].process_count:0,
                      _this.BarData[3]?_this.BarData[3].process_count:0
                      /*this.$store.state.lineBarData[4]?this.$store.state.lineBarData[4].process_count:1*/
                  ],
                  label:{
                    normal:{
                        // backgroundColor:'#70B6FE',
                        // padding:8,
                        // borderRadius:[50,80,0,80],
                        // rotate:'-45',
                        // distance:10,
                        // offset:[-10,0],
                    }
                  },
                  itemStyle: {
                //通常情况下：
                
                        normal:{
                            color:'#70B6FE',
                            label : {
                                 show: true,
                                 position: 'top',
                                 color:'#70B6FE',
                                //  rotate:45,
                                 fontSize:16,
                                 fontWeight:100,
                                 formatter:function(params){
                                    if(params.value==0){
                                        return '';
                                    }
                                    return params.value;
                                }
                            }
                        },
                       
                    },
                  markPoint : {   
                    //   data : [
                    //       {type : 'max', name: '最大值'},
                    //       {type : 'min', name: '最小值'}
                    //   ],

                  },
                  markLine : {
                    //   data : [
                    //       {type : 'average', name: '平均值'}
                    //   ]
                  }
              },
              {
                  name:'已关闭',
                  type:'bar',
                  data:[
                      _this.BarData[0]?_this.BarData[0].close_count:0,
                      _this.BarData[1]?_this.BarData[1].close_count:0,
                      _this.BarData[2]?_this.BarData[2].close_count:0,
                      _this.BarData[3]?_this.BarData[3].close_count:0
                     /* this.$store.state.lineBarData[4]?this.$store.state.lineBarData[4].close_count:1*/
                  ],
                  itemStyle: {
                //通常情况下：
                        normal:{
                            color:'#7978F5',
                            label : {
                                 show: true,
                                 position: 'top',
                                 fontSize:16,
                                 fontWeight:100,
                                 formatter:function(params){
                                    if(params.value==0){
                                        return '';
                                    }
                                    return params.value;
                                }
                            }
                        }
                    },
                  markPoint : {
                      data : [
                          {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                          {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                      ]
                  },
                  markLine : {
                    //   data : [
                    //       {type : 'average', name : '平均值'}
                    //   ]
                  }
              }
          ]
        })
        // alert("lll");
      }
  }
}
</script>

<style scoped>

</style>
