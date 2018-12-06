<template>
    <div class="tab2">
        <List v-for='(item,index) in data' :data='item'></List>
    </div>
</template>
<script>
import List from '../list/list'
export default {
    name: 'Index',
    data(){
        return{
            data:null//数据承接
        }
    },
   mounted() {
        this.$axios({
            method:'get',
            url:'/edata-icome/dqms/selQuestionByLevel',
            params:{
                // dataTable:'datagovern_detailinfo_h',
                compCode:this.$store.state.zqid,
                checkDate:this.$store.state.jhNowDate,
                userId:this.$store.state.userId,
                level:4
                // limitLower: 0,
                // limitUpper: 2,
                // orders:'-check_date'
            }
        }).then((data)=>{
            console.log(data.data.data)
            this.data=data.data.data;
        },(err)=>{
            console.log(err)
        });
    },
    components:{
        List
    }
}
</script>
<style scoped>

</style>
