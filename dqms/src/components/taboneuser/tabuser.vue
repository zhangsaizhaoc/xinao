<template>
    <div class="tab1">
        <List v-for='(item,index) in data' :data='item'></List>
    </div>
</template>
<script>
import List from '../list/list'
export default {
    name: 'Index',
    data(){
        return{
            data:null
        }
    },
    watch:{
        data(newval,oldval){
            console.log('新：'+newval)
            console.log('老：'+oldval)
            return newval;
        }
    },
    mounted() {
        this.$axios({
            method:'get',
            url:'/edata-icome/dqms/selQuestion',
            params:{
                // dataTable:'datagovern_detailinfo_h',
                compCode:this.$store.state.zqid,
                checkDate:this.$store.state.jhNowDate,
                userId:this.$store.state.userId
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
<style>

</style>
