<template>
  <div class="containerarea font14 bg-page">
  </div>
</template>
<script>
import {} from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Group, GroupTitle, Cell, XImg
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

<style lang="less">
#personal-credit .credit-item img {
  width: 60px;
  float: left;
}

/* weui css hack */
#personal-credit .vux-cell-primary {
  margin-left: 10px;
}
</style>
