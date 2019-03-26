/*
* @description: 授权页
* @auther: gyp
* @created_date: 2018-08-17
*/
<template>
  <div class="authpage">
    <div class="auth-container">
      <div class="inner">
        <div class="row1 flex_left">
          <img class="logo" src="https://tossharingsales.boka.cn/images/auth3.png" />
          <span class="txt">{{WeixinName}}授权中心</span>
        </div>
        <div class="row2">
          <div class="grayarea">
            <div class="col1">
              <div class="txt">一款基于微信，赋能微商用社交电商的方式创业，最终实现为商品找销售，为销售找商品的共享销售平台。</div>
              <div class="btnlist">
                <div class="btn" @click="clickAuth">立即授权</div>
                <div class="btn" @click="clickChat">联系客服</div>
              </div>
            </div>
            <div class="col2">
              <div class="pic flex_center">
                <img src="https://tossharingsales.boka.cn/images/auth2.png" />
                <div class="icon-radius icon1">智能获客</div>
                <div class="icon-radius icon2">社交店铺</div>
                <div class="icon-radius icon3">返点分销</div>
                <div class="icon-radius icon4">社群营销</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer flex_center" v-if="showLayer">
      <div class="layer-inner">
        <div class="close-area" @click="closeLayer">
          <img class="logo" src="https://tossharingsales.boka.cn/images/auth4.png" />
        </div>
        <div class="pagetop flex_center font24 b_bottom_after" style="height:92px;">微信扫码加官方微信</div>
        <div class="pagemiddle flex_center" style="bottom:0;top:92px;">
          <img :src="WeixinQrcode" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'

export default {
  data () {
    return {
      query: {},
      loginUser: {},
      WeixinName: ENV.WeixinName,
      WeixinQrcode: ENV.WeixinQrcode,
      showLayer: false
    }
  },
  methods: {
    clickChat () {
      this.showLayer = true
    },
    closeLayer () {
      this.showLayer = false
    },
    clickAuth () {
      const self = this
      self.$vux.loading.show()
      self.$http.get(`http://wechat.boka.cn/api/open/getPreAuthorizationUrl`, {
        params: {url: `${ENV.Host}/#/mpSetting`}
      }).then(res => {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag && data.data) {
          location.replace(data.data)
        } else if (data.error) {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
        console.log(res)
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
body{background-color: #5b81ec;}
.authpage{
  width:100%;height:100%;
  background-image:url(https://tossharingsales.boka.cn/images/auth1.png);
  background-repeat:no-repeat;
  background-position:top center;
  background-size:cover;

}
.authpage * {box-sizing: border-box;}
.auth-container{margin:0 auto;position:relative;}
.auth-container .inner{position:relative;z-index:2;}
.auth-container .row1{color:#fff;}
.auth-container .row1 .logo{width:90px;vertical-align:middle;}
.auth-container .row1 .txt{text-shadow: rgb(170, 170, 170) 1px 1px 1px;font-size: 28px;}
.auth-container .row2{width:100%;}
.auth-container .grayarea{width: 100%;}
.auth-container .row2 .col2{position:relative;}
.auth-container .row2 .col2 .pic{width:290px;position:relative;}
.auth-container .row2 .col2 .pic img{width:100%;}
.auth-container .col1 .txt{font-size: 24px;line-height: 35px;}
.auth-container .btnlist{}
.auth-container .btnlist .btn{width: 145px;height: 50px;color: rgb(255, 255, 255);border-radius: 4px;font-size: 16px;display:inline-block;text-align:center;line-height:50px;}
.auth-container .btnlist .btn:nth-child(1){background-color: rgb(255, 115, 73);}
.auth-container .btnlist .btn:nth-child(2){background-color: rgb(68, 102, 201);margin-left:35px;}
.icon-radius{
  position:absolute;
  border-radius:50%;color:#fff;font-size: 16px;
  display:flex;justify-content: center; align-items: center;
  animation-delay: 0.2s;
  animation-iteration-count: infinite;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-animation-name: pulse;
  animation-name: pulse;
}
.icon-radius.icon1{
  width:81px;height:81px;background-color: rgb(127, 172, 247);
}
.icon-radius.icon2{
  width:100px;height:100px;background-color: rgb(252, 106, 66);
}
.icon-radius.icon3{
  width:119px;height:119px;background-color: rgb(68, 108, 221);
}
.icon-radius.icon4{
  width:81px;height:81px;background-color: rgb(253, 195, 76);
}
@keyframes pulse {
  0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
  }

  50% {
      -webkit-transform: scale3d(1.05, 1.05, 1.05);
      transform: scale3d(1.05, 1.05, 1.05);
  }
  100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
  }
}

.layer{position:absolute;left:0;top:0;right:0;bottom:0;background-color:rgba(21, 21, 21, 0.58);z-index:10;}
.layer-inner{width:440px;height:520px;max-width:70%;max-height:60%;background-color:#fff;position:relative;border-radius: 8px;}
.layer-inner img{max-width:80%;max-height:80%;}
.layer-inner .close-area{position:absolute;right:-48px;top:-37px;width:47px;height:47px;}
.layer-inner .close-area img{width:47px;height:47px;vertical-align:middle;}

@media (min-width: 1115px) {
  .auth-container .row1{padding:45px 50px 180px;}
  .auth-container .grayarea{
    height: 270px;padding-left:50px;
    background-color: rgb(235, 240, 255);
    box-shadow: rgba(21, 21, 21, 0.28) 0px 3px 22px 0px;
    display:flex;justify-content: flex-start; align-items: center;
  }
  .auth-container .grayarea .col1{width:500px;}
  .auth-container .col1 .txt{height: 105px;color: rgb(126, 136, 168);}
  .auth-container .grayarea .col2{
    flex:1;display:flex;justify-content: center; align-items: center;
  }
  .auth-container .row2{height:603px;}
  .icon-radius.icon1{top:114px;left:-171px;}
  .icon-radius.icon2{top:127px;right:-110px;}
  .icon-radius.icon3{top:456px;left:-150px;}
  .icon-radius.icon4{top:504px;right:-95px;}
}
@media (min-width: 1390px) {
  .auth-container .row1{padding:45px 150px 180px;}
  .auth-container .grayarea{
    height: 270px;padding-left:150px;
    background-color: rgb(235, 240, 255);
    box-shadow: rgba(21, 21, 21, 0.28) 0px 3px 22px 0px;
    display:flex;justify-content: flex-start; align-items: center;
  }
  .auth-container .grayarea .col1{width:580px;}
  .auth-container .col1 .txt{height: 105px;color: rgb(126, 136, 168);}
  .auth-container .grayarea .col2{
    flex:1;display:flex;justify-content: center; align-items: center;
  }
  .auth-container .row2{height:603px;}
  .icon-radius.icon1{top:114px;left:-171px;}
  .icon-radius.icon2{top:127px;right:-168px;}
  .icon-radius.icon3{top:456px;left:-150px;}
  .icon-radius.icon4{top:504px;right:-129px;}
}
@media (max-width: 1114px) {
  .auth-container .row1{padding:45px 30px;}
  .auth-container .grayarea .col1{padding:0 30px 30px;color:#fff;}
  .auth-container .col1 .txt{color:#fff;}
  .auth-container .btnlist{text-align:center;padding-top:30px;}
  .auth-container .row2{padding-bottom:100px;}
  .auth-container .row2 .col2{text-align:center;width:290px;margin:0 auto;}
  .auth-container .row2 .col2 .pic{width:100%;}
  .icon-radius.icon1{top:114px;left:-171px;}
  .icon-radius.icon2{top:127px;right:-168px;}
  .icon-radius.icon3{top:456px;left:-150px;}
  .icon-radius.icon4{top:504px;right:-129px;}
}
@media (max-width: 700px) {
  .auth-container .row1 .txt{font-size:20px;}
  .auth-container .col1 .txt{font-size:16px;line-height: 25px;}
  .auth-container .row2 .col2{text-align:center;width:200px;margin:0 auto;}
  .auth-container .row2 .col2 .pic{width:100%;}
  .icon-radius.icon1{top:114px;left:-80px;width:60px;height:60px;font-size:12px;}
  .icon-radius.icon2{top:127px;right:-90px;width:60px;height:60px;font-size:12px;}
  .icon-radius.icon3{top:356px;left:-70px;width:60px;height:60px;font-size:12px;}
  .icon-radius.icon4{top:404px;right:-80px;width:60px;height:60px;font-size:12px;}
}
@media (max-width: 400px) {
  .auth-container .row1{padding:20px;}
  .auth-container .row1 .logo{width:50px;}
  .auth-container .row1 .txt{font-size:18px;}
  .auth-container .grayarea .col1{padding:0 20px 20px;color:#fff;}
  .auth-container .col1 .txt{font-size:14px;line-height: 25px;}
  .auth-container .btnlist .btn {display:block;margin:0 auto;}
  .auth-container .btnlist .btn:nth-child(2){margin-left:auto;margin-top:15px;}
  .auth-container .row2 .col2{text-align:center;width:200px;margin:0 auto;}
  .auth-container .row2 .col2 .pic{width:100%;}
  .icon-radius.icon1{top:72px;left:-53px;width:60px;height:60px;font-size:12px;}
  .icon-radius.icon2{top:118px;right:-52px;width:60px;height:60px;font-size:12px;}
  .icon-radius.icon3{top:300px;left:-48px;width:60px;height:60px;font-size:12px;}
  .icon-radius.icon4{top:264px;right:-40px;width:60px;height:60px;font-size:12px;}
}
</style>
