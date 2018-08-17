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
          <img class="logo" src="../assets/images/auth3.png" />
          <span class="txt">{{WeixinName}}授权中心</span>
        </div>
        <div class="row2">
          <div class="grayarea flex_left">
            <div class="col1">
              <div class="txt">一款基于微信，赋能微商用社交电商的方式创业，最终实现为商品找销售，为销售找商品的共享销售平台。</div>
              <div class="btnlist">
                <div class="btn">立即授权</div>
                <div class="btn" @click="clickChat">联系客服</div>
              </div>
            </div>
            <div class="col2 flex_cell flex_center">
              <img class="pic" src="../assets/images/auth2.png" />
              <div class="icon-radius icon1">智能获客</div>
              <div class="icon-radius icon2">社交店铺</div>
              <div class="icon-radius icon3">返点分销</div>
              <div class="icon-radius icon4">社群营销</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layer flex_center" v-if="showLayer">
      <div class="layer-inner">
        <div class="close-area" @click="closeLayer">
          <img class="logo" src="../assets/images/auth4.png" />
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
.authpage{width:100%;height:100%;overflow:auto;min-width:1440px;box-sizing: border-box;}
.authpage * {box-sizing: border-box;}
.auth-container{
  width:1440px;height:720px;margin:0 auto;
  background-image:url(../assets/images/auth1.png);
  background-repeat:no-repeat;background-position:center;
  background-size:100%;z-index:1;
}
.auth-container .inner{padding-top:45px;position:relative;z-index:2;}
.auth-container .row1{color:#fff;padding:0 150px;}
.auth-container .row1 .logo{width:90px;vertical-align:left;}
.auth-container .row1 .txt{text-shadow: rgb(170, 170, 170) 1px 1px 1px;font-size: 28px;}
.auth-container .row2{padding-top:180px;padding-bottom:125px;}
.auth-container .grayarea{
  width: 100%;height: 270px;padding-left:155px;
  background-color: rgb(235, 240, 255);
  box-shadow: rgba(21, 21, 21, 0.28) 0px 3px 22px 0px;
}
.auth-container .row2 .col1{width:580px;}
.auth-container .row2 .col2{position:relative;}
.auth-container .col1 .txt{height: 105px;color: rgb(126, 136, 168);font-size: 24px;line-height: 35px;}
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
  top:114px;left:-12px;
  width:81px;height:81px;background-color: rgb(127, 172, 247);
}
.icon-radius.icon2{
  top:127px;left:569px;
  width:100px;height:100px;background-color: rgb(252, 106, 66);
}
.icon-radius.icon3{
  top:456px;left:58px;
  width:119px;height:119px;background-color: rgb(68, 108, 221);
}
.icon-radius.icon4{
  top:504px;left:548px;
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
.layer-inner{width:440px;height:520px;background-color:#fff;position:relative;border-radius: 8px;}
.layer-inner img{max-width:80%;max-height:80%;}
.layer-inner .close-area{position:absolute;right:-48px;top:-37px;width:47px;height:47px;}
.layer-inner .close-area img{width:47px;height:47px;vertical-align:middle;}
</style>
