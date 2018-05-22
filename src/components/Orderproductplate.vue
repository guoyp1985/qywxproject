<template>
  <div class="bk-orderproductitem order-item bg-white">
    <a class="db pt10 pb10 pl12 pr12" style="color:inherit;">
      <div class="t-table">
        <div class="t-cell pic ">
          <slot name="photo"></slot>
        </div>
        <div class="t-cell v_top">
          <div class="clamp1 font14 color-lightgray"><slot name="name"></slot></div>
          <div class="mt5 color-red4 font14">{{ $t('RMB') }} <slot name="special"></slot></div>
          <div class="mt5 font12 color-999"> <slot name="createdate"></slot>
          </div>
        </div>
        <div class="t-cell v_top align_right color-gray5 w50 pr10">
          <div class="font14 color-999" style="margin-top: 26px;">× <slot name="quantity"></slot></div>
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
