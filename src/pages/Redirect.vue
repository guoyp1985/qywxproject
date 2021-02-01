<template>
  <div>
  </div>
</template>

<script>
import ENV from 'env'
import { User, Token } from '#/storage'
import urlParse from 'url-parse'
const alertStack = []
export default {
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      this.$vux.loading.show()
      const lUrl = urlParse(location.href, true)
      const code = lUrl.query.code
      if (code) {
        const jumpUrl = decodeURIComponent(lUrl.query.state)
        this.$http.get(`${ENV.BokaApi}/api/visitor/workUserAuth/${code}`).then(res => {
          console.log('redirect页面workUserAuth', res)
          if (!res || !res.data || res.data.errcode || !res.data.flag) {
            Token.remove()
            this.$vux.alert.show({
              title: '提示',
              content: `用户信息获取失败，请重新进入`,
              onHide () {
                location.replace(lUrl.href)
              }
            })
            return
          }
          Token.set(res.data.data)
          return this.$http.get(`${ENV.BokaApi}/api/user/show`)
        }, res => {
          console.log('redirect页面workUserAuth请求失败', res)
          Token.remove()
          this.$vux.alert.show({
            title: '提示',
            content: `未获取到用户信息`,
            onHide () {
              location.href = jumpUrl
            }
          })
        }).then(res => {
          console.log('redirect页面user/show成功了', res)
          if (!res) return
          const rData = res.data
          for (let i = 0; i < ENV.DebugList.length; i++) {
            console.log(ENV.DebugList[i].uid === rData.uid)
            if (ENV.DebugList[i].uid === rData.uid) {
              this.$vux.alert.show({
                title: '提示',
                content: `token:${Token.get().token} :: 已取到用户信息`,
                onShow () {
                  console.log('Plugin: I\'m showing')
                },
                onHide () {
                  const f = alertStack.pop()
                  if (f) {
                    f()
                  }
                }
              })
            }
          }
          User.set(res.data)
          // 跳转到授权前打开的页面
          location.href = jumpUrl
        }, res => {
          console.log('redirect页面user/show失败了', res)
          Token.remove()
          this.$vux.alert.show({
            title: '提示',
            content: `未取到用户信息`,
            onHide () {
              location.href = jumpUrl
            }
          })
        })
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
