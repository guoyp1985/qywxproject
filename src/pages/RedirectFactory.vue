<template>
  <div>
  </div>
</template>

<script>
import { User } from '#/storage'
export default {
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      const self = this
      self.$vux.loading.show()
      const user = User.get()
      const query = this.$route.query
      if (user.fid) {
        this.$router.push({path: '/factory', query: {fid: user.fid}})
      } else {
        this.$router.push({path: '/addFactory', query: {share_uid: query.share_uid}})
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
