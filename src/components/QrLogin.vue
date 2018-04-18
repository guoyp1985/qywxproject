<template>
  <div v-cloak class="qrcode-box">
    <div class="qrcode-title font16 color-gray">
      <span>{{$t('Wx Login')}}</span>
    </div>
    <div class="qrcode-img">
      <img :src="getQrCode.url"/>
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

<i18n>
</i18n>

<script>
import { Token } from '../../libs/storage'
export default {
  created () {
    this.polling()
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  },
  data () {
    return {
      qrCode: {
        url: '',
        verifycode: 0
      },
      intervalId: 0
    }
  },
  computed: {
    getQrCode () {
      console.log(this.$route.params.qrCode)
      this.qrCode = this.$route.params.qrCode
      return this.qrCode
    }
  },
  methods: {
    polling () {
      const self = this
      this.intervalId = setInterval(() => {
        self.$http.get(`http://laravel.boka.cn/api/scanlogin/${this.qrCode.verifycode}`, {})
        .then(res => res.json())
        .then(data => {
          const token = data.data ? data.data.token : null
          const error = data.error
          if (error) {
            console.error(error)
          } else if (token) {
            Token.set(token)
            self.$router.push({path: self.$route.params.fromPath})
            self.$store.commit('updateToggleTabbar', {toggleTabbar: true})
            clearInterval(self.intervalId)
          }
        })
      }, 5000)
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
