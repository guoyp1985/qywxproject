<template>
  <div class="w_100 h_100">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import { Loading, TransferDom } from 'vux'
import { User, Token, SystemParams, GlobalData, AuthCount } from '#/storage'
import urlParse from 'url-parse'
export default {
  directives: { TransferDom },
  components: { Loading },
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    refresh () {
      let qp = ''
      const url = location.href
      .replace(/(.+?\/)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
        qp = p3
        return `${p1}?${p3}${p2}` // '$1?$3$2'
      })
      .replace(/(.+\?.+?)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
        qp = p3
        return `${p1}&${p3}${p2}` // '$1&$3$2'
      })
      const lUrl = urlParse(url, true)
      const code = lUrl.query.code
      console.log('========进入到了redirect页面了======')
      console.log('lurl=', lUrl)
      console.log('state=', lUrl.query.state)
      if (code) {
        let urlQuery = lUrl.query
        let urlState = urlQuery.state
        console.log('链接里的参数')
        console.log(urlQuery)
        console.log(urlState)
        let jumpUrl = decodeURIComponent(urlState)
        console.log(jumpUrl)
        if (!urlQuery.state) jumpUrl = '/'
        for (let key in urlQuery) {
          console.log('链接里的参数名', key)
          if (key !== 'code' && key !== 'state' && key !== 'appid') {
            console.log('in判断')
            let curVal = urlQuery[key]
            if (jumpUrl.indexOf('?') < 0) {
              jumpUrl = `${jumpUrl}?`
            } else {
              jumpUrl = `${jumpUrl}&`
            }
            jumpUrl = `${jumpUrl}${key}=${curVal}`
          }
        }
        if (jumpUrl === '') jumpUrl = '/'
        console.log('整理过的跳转url')
        console.log(jumpUrl)
        console.log('缓存里的授权次数', AuthCount.get())
        console.log('缓存里的授权次数', AuthCount.get() === 0)
        if (AuthCount.get() && AuthCount.get() !== '0') {
          AuthCount.set(0)
          if (jumpUrl && jumpUrl !== '') {
            this.$router.push(jumpUrl)
          } else {
            this.$router.push('/')
          }
        } else {
          this.$http.get(`${ENV.BokaApi}/api/visitor/workUserAuth/${code}`).then(res => {
            console.log('redirect页面workUserAuth成功了', res)
            if (!res || !res.data || res.data.errcode || res.data.code !== 0) {
              Token.remove()
              this.isLoading = false
              location.replace(lUrl.href)
              return
            }
            AuthCount.set(1)
            console.log('redirect页面设置token')
            console.log(res.data.data)
            Token.set(res.data.data)
            console.log('设置后的token=', Token.get())
            return this.$http.get(`${ENV.BokaApi}/api/user/show`, {
              params: {init: 1}
            })
          }, res => {
            console.log('redirect页面workUserAuth请求失败', res)
            Token.remove()
            this.isLoading = false
            location.href = jumpUrl
          }).then(res => {
            console.log('redirect页面user/show成功了', res)
            if (!res) return
            const data = res.data
            if (data.code === 0) {
              User.set(data.data)
              SystemParams.set(data.paras)
              GlobalData.set(data)
              this.$util.wxConfig()
            }
            // 跳转到授权前打开的页面
            console.log('要跳转的页面链接', jumpUrl)
            this.isLoading = false
            if (jumpUrl && jumpUrl !== '') {
              this.$router.push(jumpUrl)
            } else {
              this.$router.push('/')
            }
          }, res => {
            console.log('redirect页面user/show失败了', res)
            console.log('要跳转的页面链接', jumpUrl)
            Token.remove()
            this.isLoading = false
            if (jumpUrl && jumpUrl !== '') {
              this.$router.push(jumpUrl)
            } else {
              this.$router.push('/')
            }
          })
        }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
