<template>
    <div class="city">
        <div class="search_wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input v-model="city_val" type="text" placeholder="输入城市名">
            </div>
            <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
        </div>
        <div  style="height:100%" v-if="searchList.length == 0">
            <div class="location">
                <Location :address="city" @clickLocation="selectCity({name:city})"></Location>
            </div>
            <Alphabet @selectCity='selectCity' :cityInfo="cityInfo" :keys="keys" ref="allcity"></Alphabet>
        </div>
        <div class="search_list" v-else>
            <ul>
                <li @click="selectCity(item)"  v-for="(item,index) in searchList" :key="index">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>


<script>
import Location from '../components/Location.vue'
import Alphabet from '../components/Alphabet'
export default {
    name:'city',
    components:{
        Location,
        Alphabet
    },
    data(){
        return {
            city_val:"",
            cityInfo:null,
            keys:[],
            allCities: [],
            searchList: []
        }
    },
    computed:{
       city(){
            let addressComponent = this.$store.getters.location.addressComponent;
            if(addressComponent){
                return (
                    this.$store.getters.location.addressComponent.city ||
                    this.$store.getters.location.addressComponent.province
                );
            }         
        }
    },
    created(){
        //一进来页面就请求信息
        this.getCityInfo();
    },
    methods:{
        getCityInfo(){
         this.$axios.get("/mock/city.json",{}).then((res) => {
            //this.$axios.get("/api/posts/cities",{}).then((res) => {
              this.cityInfo = res.data
              //处理key 计算key
              this.keys = Object.keys(res.data);
              //将最后hotCities这个key移除掉
              this.keys.pop();
              //keys排序
              this.keys.sort();

              //$nextTick 因为Vue中DOM更新是异步的
              /* 1.在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
              在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，
              所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。
              与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，
              此时在该钩子函数中进行任何DOM操作都不会有问题 。
              2.在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，
              这个操作都应该放进Vue.nextTick()的回调函数中。*/
              
              //在数据都渲染结束后 绑定滚动
              this.$nextTick(()=>{
                //如果获取的是一个子组件，那么通过ref就能获取到子组件中的data和methods
                //此处refs是用来调用子组件Alphabet的initScroll方法
                this.$refs.allcity.initScroll();
              })

              // 存储所有城市, 用来搜索过滤
              this.keys.forEach(key => {
                 this.cityInfo[key].forEach(city=>{
                   this.allCities.push(city);
                 })
              });

            }).catch(err=>{
              console.log(err);
            })
        },
        selectCity(city){
         // console.log(city);
         this.$router.push({name:'address',params:{city:city.name}});
        },
        searchCity(){
            if(!this.city_val){
                this.searchList = [];
            }else{
                this.searchList = this.allCities.filter(item =>{
                    return item.name.includes(this.city_val) == true;
                })
            }
        }
    },
    watch:{
        city_val(){
            this.searchCity();
        }
    }

}
</script>

<style scoped>

.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  color: #009eef;
  border: oldlace;
  background: #fff;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

</style>

