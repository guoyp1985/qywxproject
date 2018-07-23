<template>
  <div class="containerarea bg-page flex_center">
    <div class="btn-open" @click="openEvent">小程序登录授权</div>
  </div>
</template>

<script>
import ENV from 'env'
export default {
  data () {
    return {
    }
  },
  methods: {
    openEvent () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/open/getPreAuthorizationUrl`, {
        params: {url: location.href}
      })
      .then(res => {
        const retdata = res.data
        if (retdata.flag) {
          location.href = retdata.data
        } else {
          self.$vux.toast.show({
            text: retdata.error,
            type: 'warn',
            time: self.$util.delay(retdata.error)
          })
        }
      })
    },
    refresh () {
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
.btn-open {
  display:inline-block;height:35px;line-height: 35px;
  color: #fff;background-color: #069FFC;padding: 0 5px;
}
</style>
