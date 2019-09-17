<style lang="less">
.invite-factory-page{
  .btn-create{
    width:200px;height:40px;border-radius:70px;
  }
}
</style>
<template>
  <div class="containerarea flex_center invite-factory-page">
    <div v-if="showError" class="btn-create bg-theme color-white flex_center" @click="createQrcode">重新生成邀请二维码</div>
    <div class="w_100" v-if="showContainer">
      <div class="flex_center" style="width:75%;margin:0 auto;">
        <img :src="qrcodeImg" />
      </div>
      <div class="flex_center mt20">保存图片发送给好友，邀请加盟</div>
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
      qrcodeImg: ''
    }
  },
  methods: {
    createQrcode () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/factory/joinQRCode`, {
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
      if (!this.qrcodeImg || this.qrcodeImg === '') {
        this.createQrcode()
      }
    }
  },
  activated () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.refresh()
  }
};
</script>
