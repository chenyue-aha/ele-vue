<template>
    <div class="address">
        <Header :isLeft="true" title="选择收获地址"></Header>
        <div class="city_search">
            <div class="search">
                <span class="city" @click="$router.push('/city')">{{showCity}}
                     <i class="fa fa-angle-down"></i>
                </span>
                <i class="fa fa-search"></i>
                <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
            </div>
            <Location :address="address" @clickLocation='selectAddress'></Location>
        </div>
        <div class="area">
            <ul class="area_list" v-for="(item,index) in areaList" :key="index">
                <li @click="selectAddress(item)">
                    <h4>{{item.name}}</h4>
                    <p>{{item.district}}{{item.address}}</p>
                </li>
            </ul>
        </div>
        
    </div>
</template>


<script>
import Header from '../components/Header.vue'
import Location from '../components/Location.vue'
export default {
    name:'me',
    components:{
        Header,
        Location
    },
    data(){
        return {
            city:"",
            search_val:"",
            areaList:[],
        }
    }, 
    beforeRouteEnter(to,from,next){   //在进入路由的时候 获取参数
        next(vm=>{
            vm.city = to.params.city;
        });
    },
    computed:{
        address(){
            return this.$store.getters.location.formattedAddress;
        },
        showCity(){
            if(this.city){
                return this.city;
            }else{
                let addressComponent = this.$store.getters.location.addressComponent;
                if(addressComponent){
                    return (
                        this.$store.getters.location.addressComponent.city ||
                        this.$store.getters.location.addressComponent.province
                    );
                } 
            }      
        }
    },
    watch:{
        search_val:function(){
            this.searchPlace();
        }
    },
    methods:{
        searchPlace(){
            const self = this;
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    // city: '全国'
                    city: self.city
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                autoComplete.search(self.search_val, function(status, result) {
                    // 搜索成功时，result即是对应的匹配数据
                    self.areaList = result.tips;
                })
            })
        },
        selectAddress(item){
            //设置地址 判断item 因为有两部分点击 有传参和不传参的处理方式
            if (item) {
                this.$store.dispatch(
                "setAddress",
                item.district + item.address + item.name
                );
            } else {
                this.$store.dispatch("setAddress", this.address);
            }

            // 跳转home
            this.$router.push("/home");
        }
    }
}
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

</style>

