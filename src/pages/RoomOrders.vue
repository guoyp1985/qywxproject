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
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="handleScroll">
      <div v-show="selectedIndex===0">
        <template v-if="showTab1">
          <template v-if="orders.length">
            <room-order-business v-for="(item, index) in orders" :key="index" :item="item"></room-order-business>
          </template>
          <template v-else>
            <div class="color-gray align_center font16" style="padding:200px 20px;">
              <span>还没有订单信息</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===1">
        <template v-if="showTab2">
          <template v-if="completedOrders.length">
            <room-order-business v-for="(item, index) in completedOrders" :key="index" :item="item"></room-order-business>
          </template>
          <template v-else>
            <div class="color-gray align_center font16" style="padding:200px 20px;">
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
import ENV from 'env'
export default {
  components: {
    Tab, TabItem, RoomOrderBusiness
  },
  data () {
    return {
      selectedIndex: 0,
      showTab1: false,
      showTab2: false,
      pageStart1: 0,
      pageStart2: 0,
      limit: 10,
      orders: [],
      completedOrders: []
    }
  },
  methods: {
    initData () {
      this.selectedIndex = 0
      this.showTab1 = false
      this.showTab2 = false
      this.pageStart1 = 0
      this.pageStart2 = 0
      this.orders = []
      this.completedOrders = []
    },
    toggleTab () {
      switch (this.selectedIndex) {
        case 0:
          !this.orders.length && this.loadData()
          break
        case 1:
          !this.completedOrders.length && this.loadData(100)
          break
      }
    },
    handleScroll () {
      const _this = this
      this.$util.scrollEvent({
        element: this.$refs.scrollContainer,
        callback: () => {
          switch (_this.selectedIndex) {
            case 0:
              if (_this.orders.length === _this.pageStart1 * _this.limit) {
                _this.loadData(0, _this.pageStart1)
              }
              break
            case 1:
              if (_this.completedOrders.length === _this.pageStart2 * _this.limit) {
                _this.loadData(100, _this.pageStart2)
              }
              break
          }
        }
      })
    },
    loadData (flag, page) {
      flag = flag || 0
      page = page || 0
      const params = {from: 'sellers', pagestart: page, limit: this.limit, flag: flag}
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/groups/orderList`, params)
      .then(res => {
        this.$vux.loading.hide()
        if (res.data.flag === 1) {
          const data = res.data.data
          switch (flag) {
            case 0:
              data.length && this.pageStart1++
              this.showTab1 = true
              this.orders = this.orders.concat(data)
              break
            case 100:
              data.length && this.pageStart2++
              this.showTab2 = true
              this.completedOrders = this.completedOrders.concat(data)
              break
          }
        }
      })
    },
    refresh () {
      let flag = 0
      if (this.$route.query.flag) {
        flag = parseInt(this.$route.query.flag)
      }
      switch (flag) {
        case 0:
          this.selectedIndex = 0
          break
        case 100:
          this.selectedIndex = 1
          break
      }
      this.toggleTab()
    }
  },
  activated () {
    this.initData()
    this.refresh()
  }
}
</script>
<style lang="less">
#room-orders{
  .room-order-business:not(:last-child){margin-bottom:10px;}
}
#room-orders .b-tab .vux-tab .vux-tab-item.vux-tab-selected {
  color: @boka-red;
  border-bottom: 3px solid @boka-red;
}
#room-orders .b-tab .vux-tab-ink-bar {
  background-color: @boka-red;
}
</style>
