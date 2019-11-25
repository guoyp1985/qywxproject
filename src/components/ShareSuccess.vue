<template>
  <div class="share_success flex_center font14" @click="clickevent">
  	<div class="shareinner">
      <div class="btn close"><i class="al al-guanbi color-gray font20"></i></div>
  		<div class="font20 color-orange2 bold align_center" style="position:relative;">
        <span>分享成功</span>
      </div>
      <template v-if="data.uploader == loginUser.uid">
    		<div class="border-box color-orange2 align_center pt10 pl15 pr15">你的好友查看你的分享，以及好友的好友查看你的分享，都将成为你的客户。</div>
    		<div class="pl15 pr15">
          <div class="align_center">
            <img class="avatar" :src="loginUser.avatar" />
          </div>
          <div class="align_center mt5">
    			     <img class="w_100" src="https://tossharingsales.boka.cn/images/icon-guanxi.gif" >
          </div>
    		</div>
    		<router-link v-if="module != 'store' && module != 'shop'" :to="{path: '/stat', query: {id: data.id, module: module}}" class="db color-orange2 align_center pt10 pl15 pr15 border-box" >系统已向你推送了【分享统计】，也可以 点击此处查看统计</router-link>
      </template>
      <template v-if="module == 'store' || module == 'shop'">
        <div v-if="data.identity != 'user' && data.uploader != loginUser.uid" class="color-orange2 align_center pt10 pl15 pr15 border-box">凡是查看你分享文章或商品的用户，购买成功后都会给你返点。</div>
  		</template>
      <template v-else>
        <div v-if="data.identity != 'user' && data.retailerinfo && data.retailerinfo.uid != loginUser.uid" class="color-orange2 align_center pt10 pl15 pr15 border-box">凡是查看你分享文章或商品的用户，购买成功后都会给你返点。</div>
  		</template>
  		<div v-if="loginUser.subscribe != 1" class="color-orange2 align_center border-box pl15 pr15 pt10">
  			亲，您还没有关注啊，等关注了再分享金币就到您碗里了，点<a class="font16" style="color:#0598e0;">这里</a>关注吧。
  		</div>
  	</div>
  </div>
</template>

<i18n>
</i18n>

<script>
import jQuery from 'jquery'

export default {
  name: 'ShareSuccess',
  props: {
    data: Object,
    loginUser: {
      type: Object,
      default: { 'avatar': 'https://tossharingsales.boka.cn/images/user.jpg' }
    },
    module: String,
    onClose: Function
  },
  components: {
  },
  data () {
    return {
      isinner: false
    }
  },
  methods: {
    clickevent () {
      const self = this
      let node = event.target
      while (node) {
        if (node.nodeType === 1) {
          let curtarget = jQuery(node)
          if (curtarget.hasClass('.close') || curtarget.parents('.close').length > 0 || curtarget.parents('.shareinner').length === 0) {
            self.onClose && self.onClose()
          }
          break
        }
        node = node.parentNode
      }
    }
  },
  created () {
  }
}
</script>

<style lang="less">
.share_success{position: absolute;top:0;right: 0;left:0;bottom:0;color: #fff;background-color:#1B1B1F;z-index:10;opacity:1;}
.animated{-webkit-animation: opacity 0.5s ease-in 1;animation: opacity 0.5s ease-in 1;}
@-webkit-keyframes opacity {
	0%{opacity:0;}
	100% {opacity:1;}
}
.share_success .shareinner{
  position:relative;padding-top:15px;padding-bottom:5px;box-sizing: border-box;
  width:80%;background-color:#fff;margin:0 auto;border-radius:10px;
}
.share_success .avatar{
  width:45px;height:45px;border: 2px solid #f6c9a5;border-radius:50%;vertical-align:middle;
}
.share_success .btn{
	border-radius:3px;color:#666;
  position:absolute;right:10px;top:5px;z-index:1;
}
</style>
