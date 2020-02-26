<template>
  <div class="containerarea exam-test-page">
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      loginUser: {},
      query: {}
    }
  },
  computed: {
  },
  methods: {
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.exam-test-page{
}
</style>
