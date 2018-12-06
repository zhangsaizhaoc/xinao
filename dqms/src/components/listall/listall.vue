<template>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item v-for='(item,index) in data' :title='item.name' :value="jia(item)+'个'" :name="index+1" >
        <List v-for='(items,index) in item.data' :data='items' ></List>
        <!--<div class="loadMore">查看更多</div>-->
      </van-collapse-item>
    </van-collapse>
</template>
<script>
import List from '../list/list'
export default {
  name: 'App',
  props:{
    data:{
      type:Array
    }
  },
  data(){
      return {
        activeName: ['1','2'],//默认第一个为展开
        num:2
      }
  },
  mounted() {
    // this.jia();
      // this.$axios({
      //       method:'get',
      //       url:'/edata-icome/dqmsIot/getAll',
      //       params:{
      //           dataTable:'datagovern_detailinfo_h',
      //           comp_code:'TC0002251',
      //           // check_date:'--20181120',
      //           // limitLower: 0,
      //           // limitUpper: 2,
      //           // orders:'-check_date'
      //       }
      //   }).then((data)=>{
      //       console.log(data.data.data)
      //       this.data=data.data.data;
      //   },(err)=>{
      //       console.log(err)
      //   });
  },
  methods:{
    jia(num){
      // console.log(num)
      var n=0;
      for(var i=0;i<num.data.length;i++){
        n+=num.data[i].count*1;//把每行下的每一项count相加；因其为字符型，故*1转换
      }
      return n;
    }
  },
  computed:{
    },
  components:{
      List
  }
}
</script>
<style>
  .loadMore{
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 64px;
    text-align: center;
    margin: 30px 0;
  }
  .van-cell{
    font-size: 64px;
    line-height: 100px;
    padding:40px 40px;
  }
  .van-cell__right-icon{
    font-size: 64px;
    line-height: 100px;
  }
  .van-collapse-item__content{
    /*padding:40px 60px;*/
    /*font-size: 60px;*/
    padding: 0px;
  }
  .van-cell__value{
    padding-right: 20px;
  }
  .van-cell__right-icon::before{
    content: '';
    width: 40px;
    height: 70px;
    display: inline-block;
    background: url("../../assets/images/picker-cctrl-right@2x.png");
    background-size:100% 100%;
  }
  .van-cell__right-icon{
    margin: 20px 20px 0 20px;
    width: 40px;
    height: 70px;
    display: inline-block;
    /*background: url("../../assets/images/picker-cctrl-right@2x.png");*/
    /*background-size:100% 100%;*/
  }
</style>
