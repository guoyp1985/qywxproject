/*
* @description: 跳转小程序页面
* @auther: gyp
* @created_date: 2021-01-23
*/
<style lang="less">
.jumpmp-page{
  .btn{
    margin-top:20px;
    width: 184px;
    padding: 8px 24px;
    box-sizing: border-box;
    font-weight: 700;
    font-size: 17px;
    text-align: center;
    color: #fff;
    line-height: 1.41176471;
    border-radius: 4px;
    background-color: #07c160;
  }
}
</style>
<template>
  <div class="w_100 h_100 bg-white flex_center jumpmp-page">
    <div class="public-web-container">
      <div>正在打开 【灰太狼】小程序</div>
      <div v-if="disLoading" class="btn" @click="jumpEvent">打开小程序</div>
    </div>
  </div>
</template>

<script>
const cloud = require('../../static/cloud')
export default {
  data () {
    return {
      disLoading: true
    }
  },
  methods: {
    async openWeapp (onBeforeJump) {
      let c = window.c
      const res = await c.callFunction({
        name: 'public',
        data: {
          action: 'getUrlScheme'
        }
      })
      console.warn(res)
      if (onBeforeJump) {
        onBeforeJump()
      }
      location.href = res.result.openlink
    },
    async jumpEvent () {
      let c = new cloud.Cloud({
        identityless: true, // 必填，表示是未登录模式
        resourceAppid: 'wx1b22fe75584085ee', // 资源方 AppID
        resourceEnv: 'duanxintiaozhuanmp-1ddeq566cdb41' // 资源方环境 ID
      })
      await c.init()
      window.c = c
      try {
        await this.openWeapp(() => {
          this.disLoading = true
        })
      } catch (e) {
        this.disLoading = false
        throw e
      }
    },
    refresh () {
    }
  },
  activated () {
  }
}
</script>
