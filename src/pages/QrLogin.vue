/*
* @description: 扫码登录页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div v-cloak class="qrcode-box">
    <div class="qrcode-title font16 color-gray">
      <span>{{$t('Wx Login')}}</span>
    </div>
    <div class="qrcode-img">
      <img v-if="qrCode" :src="qrCode.url"/>
    </div>
    <div class="qrcode-footer font16 color-gray">
      <div>
        <span>{{$t('Scan To Login')}}</span>
      </div>
      <div>
        <span>{{$t('Boka Authorization Center')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Token, User } from '#/storage'
import ENV from '#/env'
let intervalId = 0
export default {
  created () {
    // const token = Token.get()
    // if (token) {
    //
    // }
    // this.qrCode = this.$route.params.qrCode
    // if (!this.qrCode) {
    //   this.requestLogin()
    //   this.polling()
    // }
    this.requestLogin()
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  },
  data () {
    return {
      qrCode: {
        url: '',
        verifycode: 0
      }
    }
  },
  methods: {
    polling () {
      const self = this
      intervalId = setInterval(() => {
        self.$http.get(`${ENV.BokaApi}/api/scanlogin/${this.qrCode.verifycode}`)
        .then(res => {
          const token = res.data.data ? res.data.data.token : null
          const error = res.data.data ? res.data.data.error : null
          if (error) {
            console.error(error)
          } else if (token) {
            Token.set(token)
            self.$http.get(`${ENV.BokaApi}/api/user/show`)
            .then(res => {
              console.log(res)
              User.set(res.data)
              self.$router.go(-1)
              self.$store.commit('updateToggleTabbar', {toggleTabbar: true})
              clearInterval(intervalId)
            })
          }
        })
      }, 5000)
    },
    requestLogin () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/qrcode/login`)
      .then(
        res => {
          self.qrCode = res.data
          self.polling()
        }
      )
    }
  }
}
</script>

<style lang="less">
.qrcode-box {
  margin-top: 50px;
  text-align: center;
}
.qrcode-box .qrcode-title,
.qrcode-box .qrcode-footer {
  padding: 20px 0;
}
.qrcode-img img {
  padding: 20px;
  border: 1px solid #ececec;
  background-color: #ececec;
  width: 300px;
}
</style>
