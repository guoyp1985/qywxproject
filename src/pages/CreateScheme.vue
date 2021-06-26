<template>
  <div class="containerarea bg-page font14 duser">
    <div class="mt12">
      <div class="btn bg-red color-white" @click="createEvent">生成小程序首页短链接</div>
    </div>
    <div class="mt12 padding10" v-if="shortUrl && shortUrl != ''" @click="toUrl">{{shortUrl}}</div>
  </div>
</template>

<script>
import ENV from 'env'

export default {
  data () {
    return {
      shortUrl: ''
    }
  },
  methods: {
    toUrl () {
      window.open(this.shortUrl)
    },
    createEvent () {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/wxa/url_scheme`, {
        params: {
          path: '/pages/qyshop',
          query: 'storeid=1&tableid=1',
          expiredays: 0
        }
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        if (data.code === 0) {
          this.shortUrl = data.data
        }
      })
    }
  },
  activated () {
  }
}
</script>

<style lang="less" scoped>
.duser .btn{
  margin:0 auto;
  width:60%;
  padding:10px;
  box-sizing: border-box;
  text-align:center;
}
</style>
