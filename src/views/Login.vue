<template>
   <div class="login">
       <div class="logo"><img src="../assets/logo.jpg" alt=" my login img"></div>
       <!-- 手机号 -->
       <InputGroup type="number" v-model="phone" placeholder="手机号" :btnTitle="btnTitle" 
        :disabled="disabled" :error="errors.phone" @btnClick="getVerifyCode"/>
        <!-- 验证码 -->
       <InputGroup type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code"/>

       <div class="login_des"><p>新用户登录即自动注册，表示已同意<span>《用户服务协议》</span></p></div>

       <div class="login_btn"><button :disabled="isClick" @click="handLogin">登录</button></div>
   </div>
    
</template>

<script>
import InputGroup from '@/components/InputGroup.vue'
export default {
    name:'login',
    data(){
        return {
            phone: "",
            verifyCode: "",
            errors: {},
            btnTitle: "获取验证码",
            disabled: false
        }
    },
    components:{
        InputGroup
    },
    computed:{
        //computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
        //computed比较适合对多个变量或者对象进行处理后返回一个结果值
        //watch主要用于监控vue实例的变化，它监控的变量当然必须在data里面声明才可以，它可以监控一个变量，也可以是一个对象
        isClick(){
            if(!this.phone || !this.verifyCode){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        handLogin(){
            //取消错误提醒
            this.errors ={};
            this.$axios.post('/api/posts/sms_back',{
                phone:this.phone,
                code:this.verifyCode
            }).then(res=>{
                console.log(res);
                //检验成功 设置成功状态 并且跳转
                localStorage.setItem('ele_login',true)
                this.$router.push("/");
            }).catch(err=>{
                //返回错误信息
                this.errors = {
                    code:err.response.data.msg
                }
            })

        },
        getVerifyCode(){
            if(this.validatePhone()){   
                //倒计时
                this.validateBtn();
                // 发送网络请求
                this.$axios.post('/api/posts/sms_send',{
                    sid:'70e9281073fe5e1546b7f657cae73897',
                    token:'d1a5431e19d2005c3286794786111d79',
                    appid:'099a1aedcf19400a9eb83d857eb7b845',
                    templateid:'522016',
                    phone:this.phone
                }).then(res=>{
                    console.log(res); 
                })
            }
        },
        validateBtn(){
            let time = 60;
            let timer = setInterval(()=>{
                if(time == 0){
                    clearInterval(timer);
                    this.btnTitle = '获取验证码';
                    this.disabled = false;
                }else{
                    //倒计时
                    console.log(time);
                    this.btnTitle = `${time}秒后重试`;
                    this.disabled =true;
                    time--;
                }
            },1000)
        },
        validatePhone(){
            //验证手机号码
            if(!this.phone){
                this.errors = {
                    phone:'手机号码不能为空'
                };
                return false;
            }else if (!/^1[345678]\d{9}$/.test(this.phone)){
                 this.errors = {
                    phone:'请填写正确的手机号码'
                };
                return false;
            } else {
                this.errors = {};
                return true;
            }
        }
    }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>