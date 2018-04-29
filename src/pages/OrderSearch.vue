/*
* @description: 订单查询页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-search">
    <sticky scroll-box="vux_view_box_body">
      <Tab v-model="selectedIndex">
        <tab-item selected @on-item-click="toggleTab">{{ $t('All') }}</tab-item>
        <tab-item @on-item-click="toggleTab">{{ $t('To Be Delivered') }}</tab-item>
        <tab-item @on-item-click="toggleTab">{{ $t('Shipped') }}</tab-item>
        <tab-item @on-item-click="toggleTab">{{ $t('Completed') }}</tab-item>
      </Tab>
    </sticky>
    <div v-show="selectedIndex===0">
      <template v-if="list.length">
        <order-info v-for="(item, index) in getList" :item="item" :key="index" @on-process="orderProcess"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </div>
    <div v-show="selectedIndex===1">
      <template v-if="list1.length">
        <order-info v-for="(item, index) in getList1" :key="index" @on-process="orderProcess"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </div>
    <div v-show="selectedIndex===2">
      <template v-if="list2.length">
        <order-info v-for="(item, index) in getList2" :key="index" @on-process="orderProcess"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </div>
    <div v-show="selectedIndex===3">
      <template v-if="list3.length">
        <order-info v-for="(item, index) in getList3" :key="index" @on-process="orderProcess"></order-info>
      </template>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Orders')}}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Sticky, Tab, TabItem } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import ENV from '#/env'

export default {
  components: {
    Sticky,
    Tab,
    TabItem,
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
    // getItems () {
    //   let data = this.$route.query.data
    //   if (typeof data === 'object') {
    //     let match = false
    //     this.items = this.items.map(item => {
    //       if (item.id === data.id) {
    //         match = true
    //         return data
    //       }
    //       return item
    //     })
    //     if (!match) {
    //       this.items.push(data)
    //     }
    //   }
    //   return this.items
    // }
    getList () {
      console.log(this.list)
      return this.setListButton(this.list)
    },
    getList1 () {
      return this.setListButton(this.list1)
    },
    getList2 () {
      return this.setListButton(this.list2)
    },
    getList3 () {
      return this.setListButton(this.list3)
    }
  },
  filters: {
    addressFormat: function (address) {
      return `${address.area.join('')}${address.details}`
    }
  },
  methods: {
    setListButton (list) {
      for (let item of list) {
        switch (item.flag) {
          case 0:
            item.buttons = []
            break
          case 1:
            item.buttons = [
              {id: 1, name: '取消订单'},
              {id: 2, name: '去支付'}
            ]
            break
          case 2:
            item.buttons = [
              {id: 3, name: '申请退款'}
            ]
            break
          case 3:
            item.buttons = [
              {id: 4, name: '查看物流'},
              {id: 5, name: '申请售后'},
              {id: 6, name: '确认收货'}
            ]
            break
          case 4:
            item.buttons = [
              {id: 5, name: '申请售后'},
              {id: 7, name: '评价'}
            ]
            break
        }
      }
      return list
    },
    evaluate (order) {
      this.$router.push({name: 'tEvaluation', params: {order: order}})
    },
    confirm (order) {
      // const self = this
      this.$vux.confirm.show({
        title: '您是否确认收货？',
        content: '请确认货物已收到',
        onConfirm () {

        }
      })
    },
    cancel (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您确认取消订单？',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/order/cancel`, {id: order.id})
          .then(res => {
            self.$vux.toast.text(res.data.error)
            self.changeOrderView(order)
          })
        }
      })
    },
    refund (order) {

    },
    viewShipping (order) {
      this.$router.push({path: `/shippingDetails/${order.id}`})
    },
    afterSale (order) {

    },
    payment (order) {
      this.$router.push({path: `/pay/${order.id}`})
    },
    orderProcess (type, order) {
      switch (type) {
        case 1:
          this.cancel(order)
          break
        case 2:
          this.payment(order)
          break
        case 3:
          this.refund(order)
          break
        case 4:
          this.viewShipping(order)
          break
        case 5:
          this.afterSale(order)
          break
        case 6:
          this.confirm(order)
          break
        case 7:
          this.evaluate(order)
          break
      }
    },
    changeOrderView (order) {
      let list = []
      switch (this.selectedIndex) {
        case 0:
          list = this.list
          break
        case 1:
          list = this.list1
          break
        case 2:
          list = this.list2
          break
        case 3:
          list = this.list3
          break
      }
      this.$util.changeItem(list, order.id, function (m) {
        m.flag = 0
        m.buttons = []
      })
    },
    toggleTab () {
      switch (this.selectedIndex) {
        case 0:
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`)
          .then(res => {
            if (res.data.flag) {
              self.list = res.data.data
            }
          })
          break
        case 1:
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user?flag=2`)
          .then(res => {
            if (res.data.flag) {
              self.list1 = res.data.data
            }
          })
          break
        case 2:
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user?flag=3`)
          .then(res => {
            if (res.data.flag) {
              self.list2 = res.data.data
            }
          })
          break
        case 3:
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user?flag=4`)
          .then(res => {
            if (res.data.flag) {
              self.list3 = res.data.data
            }
          })
          break
      }
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
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  }
}
</script>

<style lang="less">
</style>
