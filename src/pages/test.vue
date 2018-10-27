<template>
  <div class="containerarea flex_center bold font20">测试授权
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    init () {
      this.$util.wxAccessListening()
      this.$util.wxAccess()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
