/*
* @description: 订单查询页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-search">
    <sticky scroll-box="order-search">
      <Tab v-model="selectedIndex">
        <tab-item selected>{{ $t('All') }}</tab-item>
        <tab-item>{{ $t('To Be Delivered') }}</tab-item>
        <tab-item>{{ $t('Shipped') }}</tab-item>
        <tab-item>{{ $t('Completed') }}</tab-item>
      </Tab>
    </sticky>
    <view-box v-show="selectedIndex===0">
      <template v-if="list.length">
        <order-info v-for="(item, index) in list" :item="item" :key="index" @on-eval="onEvaluate(item)"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </view-box>
    <view-box v-show="selectedIndex===1">
      <template v-if="list1.length">
        <order-info v-for="(item, index) in list1" :key="index" @on-eval="onEvaluate(item)"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </view-box>
    <view-box v-show="selectedIndex===2">
      <template v-if="list2.length">
        <order-info v-for="(item, index) in list2" :key="index" @on-eval="onEvaluate(item)"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </view-box>
    <view-box v-show="selectedIndex===3">
      <template v-if="list3.length">
        <order-info v-for="(item, index) in list3" :key="index" @on-eval="onEvaluate(item)"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </view-box>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Sticky, Tab, TabItem, ViewBox } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import ENV from '#/env'

export default {
  components: {
    Sticky,
    Tab,
    TabItem,
    ViewBox,
    OrderInfo
  },
  data () {
    return {
      selectedIndex: 0,
      list: [],
      list1: [],
      list2: [],
      list3: []
    }
  },
  computed: {
    getItems () {
      let data = this.$route.query.data
      if (typeof data === 'object') {
        let match = false
        this.items = this.items.map(item => {
          if (item.id === data.id) {
            match = true
            return data
          }
          return item
        })
        if (!match) {
          this.items.push(data)
        }
      }
      return this.items
    }
  },
  filters: {
    addressFormat: function (address) {
      return `${address.area.join('')}${address.details}`
    }
  },
  methods: {
    onEvaluate (order) {
      this.$router.push({name: 'tEvaluation', params: {order: order}})
    },
    getData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`)
      .then(res => {
        if (res.data.flag) {
          self.list = res.data.data
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less">
</style>
