<template>
  <div class="containerarea paypage bg-white">
    <div class="flex_center inner">
      <div>{{ $t('RMB') }}{{ payprice }}</div>
  	</div>
    <div class="pt10 pb10 pl5 pr5 b_bottom_after">
      <div class="t-table">
        <div class="t-cell align_left">收款方</div>
        <div class="t-cell align_right">博卡授权中心</div>
      </div>
    </div>
    <div class="padding10">
      <div class="btn bg-green color-white align_center">微信安全支付</div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>

export default {
  data () {
    return {
      payprice: '1.00'
    }
  }
}
</script>

<style lang="less">
.paypage .inner{
  height:180px;font-size:35px;font-weight:bold;
  border-bottom:@list-border-color 1px solid;
}
.paypage .btn{
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  padding-top:10px;
  padding-bottom:10px;
}
</style>
