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
      self.$http.get(`${ENV.BokaApi}/weixin/open/getPreAuthorizationUrl`)
      .then(res => {
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
