/*
* @description: 群群推订单列表页面(发单方)
* @auther: simon
* @created_date: 2019-1-6
*/
<template>
  <div id="room-orders" class="containerarea font14 no-bottom">
    <div class="s-topbanner s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">正在进行</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">已完成</tab-item>
      </tab>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="scrollHandle">
      <div v-show="selectedIndex===0">
        <template v-if="distabdata1">
          <template v-if="orders.length">
            <room-order-business v-for="(item, index) in orders" :key="index" :item="item"></room-order-business>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>还没有订单信息</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===1">
        <template v-if="distabdata2">
          <template v-if="completedOrders.length">
            <room-order-business v-for="(item, index) in completedOrders" :key="index" :item="item"></room-order-business>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>还没有订单信息</span>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import RoomOrderBusiness from '@/components/RoomOrderBusiness'
export default {
  components: {
    Tab, TabItem, RoomOrderBusiness
  },
  data () {
    return {
      selectedIndex: 0,
      distabdata1: true,
      distabdata2: true,
      income: 0,
      orders: [
        {
          productName: 'unkown',
          status: 0,
          productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          retailerTitle: 'retailerTitle',
          productPrice: 'productPrice',
          retailPrice: 1,
          trafficCharge: 1,
          currentTrafficFee: 0,
          currentRetailFee: 0,
          trafficFee: 0,
          retailFee: 0
        },
        {
          productName: 'unkown2',
          status: 1,
          productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          retailerTitle: 'retailerTitle',
          productPrice: 'productPrice',
          retailPrice: 1,
          trafficCharge: 1,
          currentTrafficFee: 0,
          currentRetailFee: 0,
          trafficFee: 0,
          retailFee: 0
        },
        {
          productName: 'unkown3',
          status: 2,
          productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          retailerTitle: 'retailerTitle',
          productPrice: 'productPrice',
          retailPrice: 1,
          trafficCharge: 1,
          currentTrafficFee: 0,
          currentRetailFee: 0,
          trafficFee: 0,
          retailFee: 0
        }
      ],
      completedOrders: [
        {
          productName: 'unkown1',
          status: 4,
          productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          retailerTitle: 'retailerTitle',
          productPrice: 'productPrice',
          retailPrice: 1,
          trafficCharge: 1,
          currentTrafficFee: 0,
          currentRetailFee: 0,
          trafficFee: 0,
          retailFee: 0
        }
      ]
    }
  },
  methods: {
    toggleTab () {
    },
    scrollHandle () {
    }
  }
}
</script>
<style lang="less">
#room-orders .b-tab .vux-tab .vux-tab-item.vux-tab-selected {
  color: @boka-red;
  border-bottom: 3px solid @boka-red;
}
#room-orders .b-tab .vux-tab-ink-bar {
  background-color: @boka-red;
}
</style>
