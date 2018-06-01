<template>
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      const self = this
      const query = self.$route.query
      const code = query.code
      const state = query.state
      if (code) {
        Vue.http.get(`${ENV.BokaApi}/api/authUser/${code}`)
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
            Vue.$vux.toast.show({
              text: '服务器错误',
              type: 'warn',
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
