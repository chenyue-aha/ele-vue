<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'app',
  created(){
    this.getLocation();
  },
  methods:{
    getLocation(){
      let self = this;
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息 精准定位
          self.$store.dispatch("setLocation",data)
          self.$store.dispatch("setAddress",data.formattedAddress)
        }

        function onError (data) {
          // 定位出错 非精准定位
          console.log(data);
          self.getLngLatLocation();
        }
      })
    },
    getLngLatLocation(){
      var self = this;
      AMap.plugin('AMap.CitySearch', function () {
      var citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          AMap.plugin('AMap.Geocoder', function() {
            var geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: result.adcode
            }) 
            var lnglat = result.rectangle.split(";")[0].split(",");
            geocoder.getAddress(lnglat, function(status, data) {
              if (status === 'complete' && result.info === 'OK') {
                  // result为对应的地理位置详细信息
                  self.$store.dispatch("setLocation",{
                    addressComponent: {
                      city: result.city,
                      province: result.province
                    },
                    formattedAddress: data.regeocode.formattedAddress
                  });

                  self.$store.dispatch(
                    "setAddress",
                    data.regeocode.formattedAddress
                  );
              }
            })
          })
        }
      })
    })
    }
  }
}
</script>

<style>

#app{
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f1f1f1;
}

</style>
