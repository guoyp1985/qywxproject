<style lang="less">
.data-stat-page{
  .box-area:not(:last-child){margin-bottom:20px;}
  .box-area{
    box-shadow:0px 0px 3px 1px #e6ebed;
    padding:10px;background-color:#fff;
  }
}
</style>
<template>
  <div class="containerarea font14 bg-page data-stat-page">
    <div class="box-area"></div>
  </div>
</template>
<script>
import {} from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
  },
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
