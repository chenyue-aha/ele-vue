<template>
    <div class="index">
        <router-view></router-view>
        <tab-bar :data = tabbarData>

        </tab-bar>
    </div>
</template>

<script>
import TabBar from '../components/TabBar.vue'
export default {
    name:"index",
    components:{
        TabBar
    },
    data(){
        return {
            tabbarData:[
                {title:'首页',icon:'home',path:'/home'},
                {title:'订单',icon:'file-text-o',path:'/order'},
                {title:'我的',icon:'user',path:'/me'},
            ]
        }
    }

}
</script>


<style>

.index{
    width: 100%;
    height: calc(100% - 45px);
}

</style>