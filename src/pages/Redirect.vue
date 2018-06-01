<template>
  <div>
  </div>
</template>

<script>
import ENV from 'env'
import { User } from '#/storage'
import urlParse from 'url-parse'
export default {
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      const self = this
      self.$vux.loading.show()
      const lUrl = urlParse(location.href, true)
      const code = lUrl.query.code
      const state = lUrl.query.state
      alert(lUrl)
      alert(code)
      alert(state)
      if (code) {
        self.$http.get(`${ENV.BokaApi}/api/authUser/${code}`)
        .then(
          res => {
            alert(JSON.stringify(res.data))
            if (res.data.flag) {
              User.set({
                ...user,
                ...res.data.data
              })
              location.replace(`${state}`)
            }
          },
          error => {
            self.$vux.toast.show({
              text: '服务器错误',
              type: 'warn'
            })
          }
        )
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
