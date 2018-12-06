<template>
     <div class='header' id="headers">
        <span @click="goBack" class="goBack"></span>
        <span>{{navTitle}}</span>
        <span><b v-show="flag" @click="changeAttributes()"></b></span>
    </div>
</template>
<script>
export default {
    name:'headers',
    data(){
        return {
            navTitle:'数据示险',
            flag:false,
        }
    },
    mounted() {
        let self =this;
        this.$router.afterEach((to,from)=>{
            self.navTitle = to.meta.title || "数据示险";
            self.flag=to.meta.flag || false;
        });
    },
    methods:{
        changeAttributes(){
          this.$store.commit('SET_SHOW',!this.$store.state.show)
            /*if(this.$store.state.show){
                this.$store.commit('SET_SHOW',false);
                console.log(222)
            }else{
                this.$store.commit('SET_SHOW',true)
                console.log(333)
                
            }*/
        },
        goBack(){
          if(this.navTitle=='数据示险'){
            try {
              icome.goToList();
            }catch (e) {
              console.log("关闭icome的webview失败，请联系管理员！");
            }
          }else {
            this.$router.back(-1);
          }
        }
    },
    watch: {
    },
}
let state={
    show:false
}
</script>
<style scoped>
    @import '../index/index.style.css';
    .goBack{
      background: url("../../assets/images/backImg@2x.png") center center no-repeat;
      background-size: 30% 50%;
    }
</style>
