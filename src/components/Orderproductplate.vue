<template>
  <div class="bk-orderproductitem order-item bg-white">
    <a class="db pt10 pb10 pl12 pr12" style="color:inherit;">
      <div class="t-table">
        <div class="t-cell pic ">
          <template v-if="product.options && product.options.id">
            <img class="imgcover" :src="product.options.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
          </template>
          <template v-else>
            <img class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
          </template>
          <img v-if="orderData.carddeduct > 0" class="yhq" src="https://tossharingsales.boka.cn/minigxk/yhq.png"/>
        </div>
        <div class="t-cell v_top">
          <div class="clamp1 font14 color-lightgray">{{ product.name }}</div>
          <div class="clamp1 font12 color-gray" v-if="product.options && product.options.id">{{product.options.title}}</div>
          <div class="color-red4 font14">{{ $t('RMB') }} {{ product.special }}</div>
          <div class="font12 color-999">{{ product.dateline | dateformat }}</div>
        </div>
        <div class="t-cell v_top align_right color-gray5 w50 pr10">
          <div class="font12 color-999" style="margin-top: 26px;">× {{ product.quantity }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import Time from '#/time'
export default {
  name: 'Orderproductplate',
  props: {
    orderData: {
      type: Object,
      default: {}
    },
    product: {
      type: Object,
      default: {}
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style lang="less">
.bk-orderproductitem .pic{width:90px;text-align:left;position:relative;}
.bk-orderproductitem .pic img{vertical-align:middle;}
.bk-orderproductitem .yhq{position: absolute;left: 0;top: 0;width:40px !important;  height:40px !important;}
</style>
