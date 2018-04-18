<template>
  <div class="bk-orderproductitem order-item">
    <a class="db pt10 pb10" style="color:inherit;">
      <div class="t-table">
        <div class="t-cell pic pl10">
          <slot name="photo"></slot>
        </div>
        <div class="t-cell v_top">
          <div class="clamp2 font12 color-gray5"><slot name="name"></slot></div>
        </div>
        <div class="t-cell v_top align_right color-gray5 w90 pr10">
          <div>{{ $t('RMB') }} <slot name="special"></slot></div>
          <div class="color-gray">× <slot name="quantity"></slot></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Orderproductplate'
}
</script>

<style lang="less">
.bk-orderproductitem .pic{width:60px;text-align:left;}
.bk-orderproductitem .pic img{vertical-align:middle;}
</style>
