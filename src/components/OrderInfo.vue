/*
* @description: 订单列表项组件
* @auther: simon
* @created_date: 2018-4-7
*/
<template>
  <div class="order-info">
    <router-link :to="`/retailerShop/${order.storeId}`">
      <div class="store-info">
        <div class="info-cell">
          <span :class="`al ${storeType} font22`"></span>
          <span>{{order.storeName}}</span>
          <span class="al al-mjiantou-copy font16"></span>
        </div>
        <div class="status-cell" v-if="order.status">
          <span>{{order.status}}</span>
        </div>
      </div>
    </router-link>
    <router-link :to="{path:'/orderDetail',query:{order:order}}">
      <div class="products-info" v-if="order.imgs.length > 1">
      </div>
      <div class="product-info" v-else>
        <div class="product-img">
          <x-img :src="order.imgs[0]"></x-img>
        </div>
        <div class="product-detail">
          <div class="product-name">
            {{order.name}}
          </div>
          <div class="product-desc" v-if="order.desc">
            {{order.desc}}
          </div>
        </div>
      </div>
    </router-link>
    <div class="pay-info">
      <span class="font12">共{{order.num}}件商品 实付款: </span><span class="font14">¥{{order.pay}}</span>
    </div>
    <div class="operate-area">
      <x-button mini v-for="(button, index) in buttons[order.type]" :key="index" @click.native="buttonClick(button.id)">{{button.name}}</x-button>
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
    order: {
      type: Object,
      default: () => {
        return {
          id: '0',
          type: 1,
          name: 'unkown',
          storeId: '0',
          storeType: 1,
          storeName: 'unkown',
          status: 0,
          imgs: ['../assets/_images/nopic.jpg'],
          desc: undefined,
          num: 0,
          pay: 0
        }
      }
    },
    buttons: {
      type: Array,
      default: () => [
        [],
        [
          {
            id: 1,
            name: '评价'
          }
        ]
      ]
    }
  },
  computed: {
    storeType () {
      let icon = ''
      switch (this.order.storeType) {
        case 1:
          icon = 'al-weidian1'
          break
        default:
          icon = 'al-weidian1'
      }
      return icon
    }
  }
}
</script>

<style lang="less">
.order-info,
.order-info .operate-area {
  position: relative;
}
.order-info {
  margin-top: 10px;
}
.order-info .operate-area:before,
.order-info:before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #f0f0f0;
}
.order-info .store-info,
.order-info .pay-info,
.order-info .operate-area {
  background-color: #ffffff;
}
.order-info .store-info,
.order-info .product-info,
.order-info .product-info .product-img,
.order-info .product-info .product-detail {
  display: flex;
}
.order-info .store-info {
  padding: 0 10px;
}
.order-info .store-info .info-cell,
.order-info .product-info .product-detail {
  flex: 1;
}
.order-info .product-info .product-detail {
  margin-left: 10px;
}
.order-info .store-info .info-cell span {
  vertical-align: middle;
}
.order-info .product-info,
.order-info .products-info {
  padding: 10px 15px;
  background-color: #f7f7f7;
}
.order-info .store-info .status-cell {
  width: 80px;
}
.order-info .store-info .status-cell span {
  line-height: 32px;
}
.order-info .product-info .product-img img{
  width: 60px;
  height: 60px;
}
.order-info .pay-info,
.order-info .operate-area {
  text-align: right;
}
.order-info .pay-info {
  padding: 5px 20px;
}
.order-info .operate-area {
  padding: 8px 10px;
}
/* vux css hack */
.order-info .weui-btn + .weui-btn {
  margin-top: 0;
}
</style>
