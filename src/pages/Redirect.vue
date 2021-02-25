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
import { User, Token } from '#/storage'
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
        let jumpUrl = decodeURIComponent(urlQuery.state)
        for (let key in urlQuery) {
          if (key !== 'code' && key !== 'state') {
            let curVal = urlQuery[key]
            if (jumpUrl.indexOf('?') < 0) {
              jumpUrl = `${jumpUrl}?`
            } else {
              jumpUrl = `${jumpUrl}&`
            }
            jumpUrl = `${jumpUrl}${key}=${curVal}`
          }
        }
        this.$http.get(`${ENV.BokaApi}/api/visitor/workUserAuth/${code}`).then(res => {
          console.log('redirect页面workUserAuth', res)
          if (!res || !res.data || res.data.errcode || res.data.code !== 0) {
            Token.remove()
            this.isLoading = false
            location.replace(lUrl.href)
            return
          }
          Token.set(res.data.data)
          return this.$http.get(`${ENV.BokaApi}/api/user/show`)
        }, res => {
          console.log('redirect页面workUserAuth请求失败', res)
          Token.remove()
          this.isLoading = false
          location.href = jumpUrl
        }).then(res => {
          console.log('redirect页面user/show成功了', res)
          if (!res) return
          User.set(res.data)
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
  },
  activated () {
    this.refresh()
  }
}
</script>
