<style lang="less">
.service-page{
  width:100%;padding:20px;box-sizing: border-box;height:100%;overflow-y:auto;background-color:#fff;
}
</style>
<template>
  <div class="service-page">
    <div class="align_center">
      <img src="../assets/images/kefu.jpg" style="max-width:100%;" />
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import { User } from '#/storage'
export default {
  components: {},
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  methods: {
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
