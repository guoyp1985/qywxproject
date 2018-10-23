/*
* @description: 领取优惠券
* @auther: gyp
* @created_date: 2018-10-23
*/
<template>
  <div class="containerarea font14 receive-card flex_center">
    <div class="imgarea">
      <div class="inner">
        <div class="img-outer">
          <img class="img" src="/src/assets/images/card/card_bg1.png" />
          <div class="txt flex_center">
            <div class="font12"><span class="color-yellow">满100减50</span><span class="color-white ml5">(7日内有效)</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let self = {}
export default {
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    }
  },
  activated () {
    self = this
    self.refresh()
  }
}
</script>

<style lang="less" scoped>
.receive-card{background-color:#000;}
.receive-card .imgarea{width:100%;max-width:450px;position:relative;}
.receive-card .imgarea .inner{width:100%;padding-bottom:101%;position:relative;}
.receive-card .img-outer{position:absolute;left:0;right:0;bottom:0;top:0;}
.receive-card .img-outer .img{vertical-align:middle;max-width:100%;max-height:100%;}
.receive-card .txt-layer{position:absolute;left:0;top:0;right:0;bottom:0;}
.receive-card .txt{position:absolute;left:0;top:0;right:0;bottom:0;}
</style>
