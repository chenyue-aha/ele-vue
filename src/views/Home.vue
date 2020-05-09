<template>
    <div class="home">
        <div class="header">
          <!-- 跳转路由带参数 -->
            <div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
                <i class="fa fa-map-marker"></i>
                <span>{{address}}</span>
                <i class="fa fa-sort-desc"></i>
            </div>
        </div>
        <div class="search_wrap"> 
            <div class="shop_search">
                <i class="fa fa-search"></i>
                <span>搜索商家 商家名称</span>
            </div>
        </div>
        <div id="container"> 
            <!-- 轮播  4000代表轮播间隔为4s -->
            <mt-swipe :auto="4000" class="swiper">
              <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
                <img :src="img" alt>
              </mt-swipe-item>
            </mt-swipe>

            <!-- 分类 -->
            <mt-swipe :auto="0" class="entries">
              <mt-swipe-item v-for="(entry,i) in entries" :key="i" class="entry_wrap">
                <div class="foodentry" v-for="(item,index) in entry" :key="index">
                  <div class="img_wrap">
                    <img :src="item.image" alt>
                  </div>
                  <span>{{item.name}}</span>
                </div>
              </mt-swipe-item>
            </mt-swipe>
        </div>
         <!-- 推荐商家 -->
        <div class="shoplist-title">推荐商家</div>

        <!-- 导航 -->
        <FilterView :filterData="filterData"></FilterView>
    </div>
</template>


<script>
import { Swipe, SwipeItem, Loadmore } from "mint-ui";
import FilterView from "../components/FilterView";
export default {
    name:'home',
    components:{
      FilterView
    },
    data(){
        return {
            swipeImgs: [],
            entries: [],
            filterData: null,
            showFilter: false,
        }
    },
    computed:{
        address(){
            return this.$store.getters.address;
        },
         city() {
          return (
            this.$store.getters.location.addressComponent.city ||
            this.$store.getters.location.addressComponent.province
          );
        }
    },
    created(){
      this.getData();
    },
    methods:{
        getData(){
            this.$axios('/mock/shopping.json').then(res=>{
            //this.$axios('/api/profile/shopping').then(res=>{
              let data = res.data;
              this.swipeImgs = data.swipeImgs;
              this.entries = data.entries;
            }).catch(err=>{
              console.log(err);
            })

            this.$axios('/mock/filter.json').then(res=>{
            //this.$axios('/api/profile/filter').then(res=>{
                this.filterData = res.data
            }).catch(err=>{
              console.log(err); 
            })
        }
    }

}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.shop_search i{
  margin-right: 5px;
}
.search_wrap {
  /* sticky是relative和fixed的结合 用于监控滚动 必须给top down right left中的一个值*/
  position: sticky;   
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 10px;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>

