<template>
  <div id="link-web-page" class="containerarea font14 factorylink">
    <div class="toplink">
      <div class="flex_table flex_center font12">
        <div class="frame pl5 pr5 flex_left" style="">{{appPath}}</div>
        <div class="btnCopy" style="position:relative;" @click="copyTxt('app', 'copy_app_txt')">复制后台管理链接
          <div class="copy_app_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{appPath}}</div>
        </div>
      </div>
    </div>
    <div class="imgContent mt20">
      <div class="flex_table" style="position:relative;height:30px;margin-top:10px;">
        <div class="line"></div>
        <div class="txt">如何打开厂家后台管理</div>
      </div>
      <div class="first">
        <div><span class="bold" style="color:#fd6a61;">第一步：</span>进入厂家中心的PC端后台，点击【复制后台管理链接】按钮。</div>
      </div>
      <div class="img1 mt20">
        <img src="../assets/images/bg-one.png" />
      </div>
      <div class="first mt20">
        <div>
          <span class="bold" style="color:#fd6a61;">第二步：</span>
          打开电脑中的浏览器，将链接复制到浏览器，点击【Enter】键回车搜索，然后用微信【扫一扫】即可进入到厂家后台管理，进行操作。
        </div>
      </div>
      <div class="img1 mt20">
        <img src="../assets/images/bg-two.png" />
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
      appPath: ENV.FactoryLoginUrl,
      webPath: `${ENV.Host}/#/shop`
    }
  },
  methods: {
    copyTxt (type, css) {
      const self = this
      let eleobj = jQuery(`#link-web-page .${css}`)[0]
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
    }
    // toLink () {
    //   const link = window.location.host
    //   console.log('当前域名：')
    //   console.log(link)
    // }
  },
  activated () {
    this.loginUser = User.get()
  }
}
</script>
<style lang="less">
  .factorylink{
    background-color:#f2f2f2;
    .toplink{
      padding:20px 10px;background-color:#ffffff;box-sizing:border-box;
      .frame{border:1px solid #cccccc;border-right:0;height:35px;width:100%;word-wrap:break-word;word-break:break-all;overflow:hidden;}
      .btnCopy{width:165px;height:35px;text-align:center;line-height:35px;background-color:#fd6a61;color:#fff;border:1px solid #fd6a61;}
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
