<style lang="less">
.bind-agent-page{
  background-color:#f2f2f2;
  .page-inner{background: linear-gradient(#6f6e6e, #000);border-radius:10px;width:90%;color:#F5CD91;margin:20px auto;position:relative;}
  .border-right.b_right_after:after{top:20%;bottom:20%;}
  .box-area{width:100%;padding:15px 0;margin-top:10px;text-align:center;}
  .box-area1{width:100%;padding:15px 10px;box-sizing:border-box;margin-top:10px;background-color:#fff0ef;border-radius:5px;}
  .txt_cell{width:80px;}
  .cell-item{
    border-top:#F5CD91 1px solid;width:100%;padding-top:15px;padding-bottom:10px;margin-top:10px;
    .txt_cell{width:75px;}
    .btn_cell{
      width:100px;
      .btn{width:80px;height:30px;border-radius:20px;text-align: center;background-color:#F5CD91;color:#000;}
    }
  }
  .conarea{
    width:100%;border-top-left-radius:10px;border-top-right-radius:10px;padding:18px 18px 10px;box-sizing: border-box;position:relative;
    .right-txt{
      position:absolute;right:10px;top:15px;
      .al{font-size:20px;}
    }
    .txt{text-align:center;margin-top:5px;}
  }
  .avatar{margin:0 auto;width:65px;height:65px;border-radius:50%;border:#fff 3px solid;box-sizing: border-box;}
  .avatar img{width:100%;height:100%;border-radius:50%;object-fit: cover;}
  .btnarea{
    width:100%;height:50px;font-weight:bold;
    .btn{width:85%;margin:0 auto;height:40px;border-radius:5px;background-color:#F5CD91;color:#000;font-size:16px;}
    .btn.dark{background-color:#ECAC4D;}
  }
  .form-control{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    .txt{font-weight: 600;width:60px;text-align:left;}
    .btn-code{
      background-color:#ECAC4D;
      color: #000;
      margin-left: 10px;
      border-radius: 5px;
      padding: 15px 0;
      width: 160px;
      text-align:center;
    }
    .disabled{background-color: #ccc;color: #000;}
    .xcode{background-color: #ccc;}
    input {flex: 1;background-color: transparent;padding: 10px 5px 10px 10px;border:#F5CD91 1px solid;border-radius:5px;color:#fff;}
  }
  checkbox{transform: scale(0.8);}
  checkbox .wx-checkbox-input.wx-checkbox-input-checked{border-color:#ECAC4D;color:#ECAC4D;}
  checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{border-color:#ECAC4D;color:#ECAC4D;}
  .line-area{
    width:100%;padding-top:10px;padding-bottom:10px;font-size:16px;position:relative;
    display:flex !important;justify-content: center; align-items: center;
    .line{width:80%;height:2px;background-color:#FF6B63;position:absolute;}
    .line-txt{width:100px;background-color:#fff;color:#FF6B63;position:relative;z-index:1;text-align:center}
  }
}
</style>
<template>
  <div class="containerarea bg-page font14 bind-agent-page">
    <div class="bg-white">
      <div class="page-inner">
        <div class="conarea">
          <div class="avatar">
            <img :src="loginUser.avatar" />
          </div>
          <div class="txt">恭喜 {{loginUser.linkman}}</div>
          <div class="txt">经销商资格申请成功</div>
          <div class="txt" v-if="query.censor == '1'">管理大大正在审核中，请耐心等待哦^_^</div>
          <div class="btnarea flex_center mt20" v-if="query.minibackurl">
            <div class="btn flex_center dark" @click="toApp">回到首页</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
export default {
  name: 'BindFactory',
  props: {
    loginUser: {
      type: Object,
      default: {}
    },
    query: {
      type: Object,
      default: {}
    }
  },
  methods: {
    toApp () {
      if (this.query.minibackurl) {
        let minibackurl = decodeURIComponent(this.query.minibackurl)
        if (this.loginUser.fid) {
          if (minibackurl.indexOf('?') < 0) {
            minibackurl = `${minibackurl}?`
          } else {
            minibackurl = `${minibackurl}&`
          }
          minibackurl = `${minibackurl}gxkfid=${this.loginUser.fid}`
        }
        if (minibackurl.indexOf('?') < 0) {
          minibackurl = `${minibackurl}?`
        } else {
          minibackurl = `${minibackurl}&`
        }
        minibackurl = `${minibackurl}regwid=${this.loginUser.uid}`
        if (this.query.backtype === 'relaunch') {
          this.$wechat.miniProgram.reLaunch({url: `${minibackurl}`})
        } else if (this.query.backtype === 'redirect') {
          this.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
        } else if (this.query.backtype === 'navigateTo') {
          this.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
        } else {
          this.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
        }
      }
    }
  }
}
</script>
