<template>
  <div class="containerarea flex_center bold font20">
    <div @click="test" class="qbtn bg-green color-white">测试授权</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    test () {
      this.$util.wxAccess()
    },
    init () {
      this.$util.wxAccessListening()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
