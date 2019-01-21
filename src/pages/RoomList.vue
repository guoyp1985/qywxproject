/*
* @description: 群群推群列表页面(接单方)
* @auther: simon
* @created_date: 2019-1-4
*/
<template>
  <div id="room-list" class="containerarea font14 s-havebottom">
    <div class="s-topbanner s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">我的群</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">我的群订单</tab-item>
      </tab>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="scrollHandle">
      <div v-show="selectedIndex===0">
        <template v-if="distabdata1">
          <template v-if="rooms.length">
            <room v-for="(item, index) in rooms" :key="index" :item="item"></room>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>还没有提交群信息</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===1">
        <template v-if="distabdata2">
          <template v-if="roomOrders.length">
            <room-order-consumer v-for="(item, index) in roomOrders" :key="index" :item="item"></room-order-consumer>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>还没有群订单信息</span>
            </div>
          </template>
        </template>
      </div>
    </div>
    <router-link v-if="selectedIndex===0" :to="{ name: 'tRoomApply'}" class="s-bottom submit-button color-white">
      <span>申请群验证</span>
    </router-link>
    <div v-if="selectedIndex===1" class="s-bottom db-flex income-area">
      <div class="flex_cell income-info">
        <span>待提现收入: </span>
        <span class="color-red">￥{{income}}</span>
      </div>
      <div class="cashed-btn">
        <span class="color-white">提现</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, XButton } from 'vux'
import Room from '@/components/Room'
import RoomOrderConsumer from '@/components/RoomOrderConsumer'
import ENV from 'env'

export default {
  components: {
    Tab, TabItem, XButton, Room, RoomOrderConsumer
  },
  data () {
    return {
      selectedIndex: 0,
      distabdata1: true,
      distabdata2: true,
      income: 0,
      rooms: [
        {id: 1, topic: 'baba', status: 1, avatar: 'https://tossharingsales.boka.cn/images/nopic.jpg'}
      ],
      roomOrders: [
        {
          productName: 'unkown',
          status: 0,
          productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          retailerTitle: 'retailerTitle',
          productPrice: 'productPrice',
          retailPrice: 1,
          trafficCharge: 1,
          currentTrafficIncome: 0,
          currentRetailIncome: 0,
          trafficIncome: 0,
          retailIncome: 0
        }
      ]
    }
  },
  methods: {
    toggleTab () {
      console.log(this.selectedIndex)
      switch (this.selectedIndex) {
        case 0:
          break
        case 1:
          break
      }
    },
    scrollHandle () {
    },
    refresh () {
      this.$http.get(`${ENV.BokaApi}/api/groups/myGroups`).then(res => {
        console.log(res)
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
#room-list .income-area {
  background-color: #ffffff;
}
#room-list .income-area .income-info {
  line-height: 45px;
  padding-left: 10px;
  text-align: left;
}
#room-list .cashed-btn {
  line-height: 45px;
  width: 120px;
  background-color: @boka-red;
  text-align: center;
}
#room-list .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
#room-list .b-tab .vux-tab .vux-tab-item.vux-tab-selected {
  color: @boka-red;
  border-bottom: 3px solid @boka-red;
}
#room-list .b-tab .vux-tab-ink-bar {
  background-color: @boka-red;
}
</style>
