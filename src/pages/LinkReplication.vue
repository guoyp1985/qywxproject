<template>
  <div id="link-web-page" class="containerarea font14 linkreplication">
    <div class="toplink">
      <div class="flex_table flex_center font12">
        <div class="frame pl5 pr5" style="">{{appPath}}</div>
        <div class="btnCopy" style="position:relative;" @click="copyTxt('app', 'copy_app_txt')">复制小程序路径
          <div class="copy_app_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{appPath}}</div>
        </div>
      </div>
      <div class="flex_table flex_center font12 mt20">
        <div class="frame pl5 pr5">{{webPath}}</div>
        <div class="btnCopy" style="position:relative;" @click="copyTxt('web', 'copy_web_txt')">复制备用网页
          <div class="copy_web_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{appPath}}</div>
        </div>
      </div>
    </div>
    <div class="imgContent mt20">
      <div class="flex_table" style="position:relative;height:30px;margin-top:10px;">
        <div class="line"></div>
        <div class="txt">如何在公众号设置小程序店铺</div>
      </div>
      <div class="first">
        <div><span class="bold" style="color:#fd6a61;">第一步：</span> 登录微信公众平台 (mp.weixin.qq.com)点击【自定义菜单】按钮。</div>
      </div>
      <div class="img1 mt20">
        <img src="../assets/images/link3.png" />
      </div>
      <div class="first mt20">
        <div><span class="bold" style="color:#fd6a61;">第二步：</span> 在菜单中选择【小程序】，并搜索小程序名称【共销客】，搜索完成后，将复制的“小程序路径”及“备用网页”粘贴在相应位置，即可完成设置，点击【保存】并发布即可。</div>
      </div>
      <div class="img1 mt20">
        <img src="../assets/images/link1.png" />
      </div>
      <div class="img1 mt10 pb20">
        <img src="../assets/images/link2.png" />
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import {User} from '#/storage'
import jQuery from 'jquery'
export default {
  data () {
    return {
      loginUser: {},
      appPath: '/packageB/pages/store',
      webPath: `${ENV.Host}/#/shop`
    }
  },
  methods: {
    copyTxt (type, css) {
      const self = this
      let eleobj = jQuery(`#link-web-page ${css}`)[0]
      let txt = this.appPath
      if (type === 'web') {
        txt = this.webPath
      }
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', txt)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      setTimeout(function () {
        self.$vux.toast.show({
          text: '复制成功',
          time: 1500
        })
      }, 200)
    },
  },
  activated () {
    this.loginUser = User.get()
    this.appPath = `${this.appPath}?wid=${this.loginUser.uid}`
    this.webPath = `${this.webPath}?wid=${this.loginUser.uid}`
  }
}
</script>
<style lang="less">
  .linkreplication{
    background-color:#f2f2f2;
    .toplink{
      padding:20px 10px;background-color:#ffffff;box-sizing:border-box;
      .frame{border:1px solid #cccccc;border-right:0;height:35px;width:100%;}
      .btnCopy{width:130px;height:35px;text-align:center;line-height:35px;background-color:#fd6a61;color:#fff;border:1px solid #fd6a61;}
    }
    .imgContent{
      padding:20px;box-sizing:border-box;background-color:#fff;
      .line{width:80%;height:1px;background-color:#fd6a61;margin:0 auto;}
      .txt{color:#fd6a61;position:absolute;width:200px;left:50%;transform: translate(-50%, -50%);background-color:#fff;text-align:center;}
      .first{padding:10px;box-sizing:border-box;background-color:#f2f2f2;border-radius:5px;}
      .img1{
        width:100%;
        img{width:100%;max-width:100%;border: 1px solid #cccccc;}
      }
    }
  }
</style>
