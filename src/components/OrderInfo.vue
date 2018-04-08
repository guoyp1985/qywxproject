/*
* @description: 订单列表项组件
* @auther: simon
* @created_date: 2018-4-7
*/
<template>
  <div class="order-info">
    <div class="store-info">
      <div class="info-cell">
        <span class="al al-weidian1 font22"></span>
        <span>{{storeName}}</span>
        <span class="al al-mjiantou-copy font16"></span>
      </div>
      <div class="status-cell" v-if="orderStatus">
        {{orderStatus}}
      </div>
    </div>
    <div class="products-info" v-if="orderImgs.length > 1">
    </div>
    <div class="product-info" v-else>
      <div class="product-img">
        <x-img :src="orderImgs[0]"></x-img>
      </div>
      <div class="product-detail">
        <div class="product-name">
          {{orderName}}
        </div>
        <div class="product-desc">
          {{orderDesc}}
        </div>
      </div>
    </div>
    <div class="pay-info">
      <span class="font12">共{{orderNum}}商品 实付款: </span><span class="font14">¥{{orderPay}}</span>
    </div>
    <div class="operate-area">
      <x-button mini>submit1</x-button>
      <x-button mini>submit2</x-button>
    </div>
  </div>
</template>

<script>
import { XImg, XButton } from 'vux'

export default {
  name: 'OrderInfo',
  components: {
    XImg,
    XButton
  },
  props: {
    storeName: {
      type: String,
      default: 'unkown'
    },
    orderStatus: {
      type: String,
      default: 'unkown'
    },
    orderImgs: {
      type: Array,
      default: ['../assets/_images/nopic.jpg']
    },
    orderName: {
      type: String,
      default: 'unkown'
    },
    orderDesc: String
    orderNum: {
      type: Number,
      default: 0
    }
    orderPay: {
      type: Number,
      default: 0
    }
  },
}
</script>

<style lang="less">
.order-info {
  padding: 5px;
}
.order-info .store-info,
.order-info .product-info,
.order-info .product-info .product-img,
.order-info .product-info .product-detail {
  display: flex;
}
.order-info .store-info .info-cell,
.order-info .product-info .product-detail {
  flex: 1;
}
.order-info .product-info,
.order-info .products-info {
  padding: 5px;
  background-color: #f7f7f7;
}
.order-info .store-info .status-cell {
  width: 80px;
}
.order-info .product-info .product-img img{
  width: 60px;
  height: 60px;
}
.order-info .pay-info,
.order-info .operate-area {
  text-align: right;
  padding: 5px 10px;
}
</style>
