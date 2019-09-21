<style lang="less">
.collect-info-page{
  .box-area{
    background-color:#fff;padding:10px;box-sizing:border-box;
    .box-inner:before{
      content:'';width:5px;height:5px;border-radius:50%;background-color:#ff6a61;
      position:absolute;left:0;top:10px;
    }
    .box-inner{
      padding-left:10px;padding-bottom:10px;box-sizing:border-box;position:relative;
    }
  }
}
</style>
<template>
  <div class="containerarea font14 bg-page collect-info-page">
    <div class="box-area">
      <div class="box-inner"></div>
    </div>
  </div>
</template>
<script>
import { Group, GroupTitle, Cell, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

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
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  },
  methods: {
    refresh () {
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
