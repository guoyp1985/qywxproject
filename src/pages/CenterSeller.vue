<template>
  <div class="containerarea font14 bg-page">
  </div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import ENV from 'env'
import Time from '#/time'

export default {
  components: {
  },
  data () {
    return {
      query: {},
      data: {},
      orders: [],
      showOrders: false,
      totalPrice: '0.00'
    }
  },
  methods: {
    getData () {
      const self = this
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
</style>
