<template>
  <div class="bk-orderproductitem order-item bg-white">
    <a class="db pt10 pb10 pl12 pr12" style="color:inherit;">
      <div class="t-table">
        <div class="t-cell pic ">
          <slot name="photo"></slot>
        </div>
        <div class="t-cell v_top">
          <div class="clamp2 font16 color-lightgray"><slot name="name"></slot></div>
        </div>
        <div class="t-cell v_top align_right color-gray5 w90 pr10">
          <div>{{ $t('RMB') }} <slot name="special"></slot></div>
          <div class="font14 color-999">× <slot name="quantity"></slot></div>
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
.bk-orderproductitem .pic{width:90px;text-align:left;}
.bk-orderproductitem .pic img{vertical-align:middle;}
</style>
