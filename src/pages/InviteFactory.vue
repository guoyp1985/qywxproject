<style lang="less">
.invite-factory-page{
  padding-bottom:50px;background-color:#ff9691;
  .btn-create{
    width:200px;height:40px;border-radius:70px;
  }
  .bottom-area{
    position:fixed;left:0;bottom:20px;right:0;height:50px;
    .btn{
      width:100px;height:35px;border-radius:35px;box-shadow:0px 0px 3px 1px #fff;
    }
  }
}
</style>
<template>
  <div class="containerarea invite-factory-page">
    <!-- <div v-if="showError" class="btn-create bg-theme color-white flex_center" @click="createQrcode">重新生成邀请二维码</div> -->
    <div class="w_100">
      <img style="display:block;margin:0 auto;max-width:100%;" src="https://tossharingsales.boka.cn/minigxk/factory/invite_factory.png" />
      <!-- <div class="flex_center" style="width:75%;margin:0 auto;">
        <img :src="qrcodeImg" />
      </div>
      <div class="flex_center mt20">保存图片发送给好友，邀请加盟</div> -->
    </div>
    <div class="bottom-area flex_center">
      <div class="flex_cell flex_center">
        <div class="btn bg-theme color-white flex_center" @click="toUse">马上使用</div>
      </div>
      <div class="flex_cell flex_center" v-if="loginUser.fid">
        <div class="btn color-white flex_center" style="background-color:#6080ec;" @click="toQrcode">二维码</div>
      </div>
    </div>
    <div v-if="showQrcode" class="auto-modal flex_center" style="position:fixed;">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="flex_center" style="width:75%;margin:0 auto;">
          <img :src="qrcodeImg" />
        </div>
        <div class="flex_center mt20 pb20">保存图片发送给好友，邀请加盟</div>
        <div class="close-area flex_center" @click="closeQrcode">
          <i class="al al-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import ENV from 'env'
import { User } from '#/storage'

export default {
  data () {
    return {
      showContainer: false,
      showError: false,
      query: {},
      loginUser: {},
      fid: 0,
      qrcodeImg: '',
      showQrcode: false
    }
  },
  methods: {
    toUse () {
      let params = this.$util.handleAppParams(this.query, {})
      if (this.query.share_uid) {
        params.share_uid = this.query.share_uid
      }
      if (this.query.share_fid) {
        params.share_fid = this.query.share_fid
      }
      this.$router.push({path: '/centerFactory', query: params})
    },
    closeQrcode () {
      this.showQrcode = false
    },
    toQrcode () {
      if (!this.qrcodeImg || this.qrcodeImg === '') {
        this.$vux.loading.show()
        this.$http.post(`${ENV.BokaApi}/api/factory/joinfactory`, {
          fid: this.fid
        }).then(res => {
          let data = res.data
          this.$vux.loading.hide()
          if (data.flag === 1) {
            this.qrcodeImg = data.data
            this.showError = false
            this.showQrcode = true
          } else {
            this.$vux.toast.show({
              text: data.error,
              time: this.$util.delay(data.error)
            })
          }
        })
      } else {
        this.showQrcode = true
      }
    },
    createQrcode () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/factory/joinfactory`, {
        fid: this.fid
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        if (data.flag === 1) {
          this.qrcodeImg = data.data
          this.showError = false
          this.showContainer = true
        } else {
          this.showContainer = false
          this.showError = true
          this.$vux.toast.show({
            text: data.error,
            time: this.$util.delay(data.error)
          })
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.fid) {
        this.fid = this.query.fid
      } else {
        this.fid = this.loginUser.fid
      }
      // if (!this.qrcodeImg || this.qrcodeImg === '') {
      //   this.createQrcode()
      // }
    }
  },
  activated () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.refresh()
  }
};
</script>
