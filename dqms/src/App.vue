<template>
  <div id="app">
    <div class="overlayer">
    </div>
    <Headers></Headers>
    <!--<keep-alive exclude="Product_progress_detail">-->
      <!--<router-view/>-->
    <!--</keep-alive>-->
    <!--<keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <div class="scroll">
      <router-view></router-view>
    </div>
    
  </div>
</template>
<script>
import Headers from './components/header/header'
export default {
  name: 'app',
  beforeCreate(){
    /*try{
      icome.hidenNavgationBar();
      console.log("隐藏icome头部");
    }catch (e) {
      console.log("隐藏icome头部失败");
    }*/
  },
  methods:{

  },
  mounted(){
    console.log()
  },
  components:{
    Headers
  }
}
</script>

<style>
  *{
    font-family: "Microsoft YaHei"!important;
  }
#app{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: "Microsoft YaHei";
  /*-webkit-overflow-scrolling: touch;*/
}
  /*遮罩层*/
.overlayer{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:21;
    background-color: #000;
    opacity: 0.5;
    display: none;
}
</style>
