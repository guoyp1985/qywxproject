/*
* @description: 订单查询页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-search" class="containerarea font14 nobottom">
    <div class="s-topbanner s-topbanner1">
      <tab v-model="selectedIndex">
        <tab-item selected @on-item-click="toggleTab">{{ $t('All') }}</tab-item>
        <tab-item @on-item-click="toggleTab">{{ $t('To Be Delivered') }}</tab-item>
        <tab-item @on-item-click="toggleTab">{{ $t('Shipped') }}</tab-item>
        <tab-item @on-item-click="toggleTab">{{ $t('Completed') }}</tab-item>
      </tab>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="scrollHandle">
      <div v-show="selectedIndex===0">
        <template v-if="distabdata1">
          <template v-if="tabdata1.length">
            <order-info v-for="(item, index) in getList1" :item="item" :key="index" @on-process="orderProcess"></order-info>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Orders')}}</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===1">
        <template v-if="distabdata2">
          <template v-if="tabdata2.length">
            <order-info v-for="(item, index) in getList2" :item="item" :key="index" @on-process="orderProcess"></order-info>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Orders')}}</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===2">
        <template v-if="distabdata3">
          <template v-if="tabdata3.length">
            <order-info v-for="(item, index) in getList3" :item="item" :key="index" @on-process="orderProcess"></order-info>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Orders')}}</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===3">
        <template v-if="distabdata4">
          <template v-if="tabdata4.length">
            <order-info v-for="(item, index) in getList4" :item="item" :key="index" @on-process="orderProcess"></order-info>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Orders')}}</span>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Sticky, Tab, TabItem } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import ENV from 'env'

export default {
  components: {
    Sticky, Tab, TabItem, OrderInfo
  },
  data () {
    return {
      selectedIndex: 0,
      // list: [],
      // list1: [],
      // list2: [],
      // list3: [],
      // scrollContainer: null,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      distabdata4: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata4: [],
      // limit: 20,
      pagestart1: 1,
      pagestart2: 1,
      pagestart3: 1,
      pagestart4: 1
      // isBindScroll1: false,
      // isBindScroll2: false,
      // isBindScroll3: false,
      // isBindScroll4: false,
      // scrollArea1: null,
      // scrollArea2: null,
      // scrollArea3: null,
      // scrollArea4: null
    }
  },
  computed: {
    getList1 () {
      return this.setListButton(this.tabdata1)
    },
    getList2 () {
      return this.setListButton(this.tabdata2)
    },
    getList3 () {
      return this.setListButton(this.tabdata3)
    },
    getList4 () {
      return this.setListButton(this.tabdata4)
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
              // {id: 5, name: '申请售后'},
              {id: 6, name: '确认收货'}
            ]
            break
          case 4:
            item.buttons = [
              // {id: 5, name: '申请售后'},
              {id: 7, name: '评价'}
            ]
            break
        }
      }
      return list
    },
    evaluate (order) {
      this.$router.push({name: 'tEvaluation', query: {id: order.id}})
    },
    confirm (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您是否确认收货？',
        content: '请确认货物已收到',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/order/receive`, {id: order.id})
          .then(res => {
            self.$vux.loading.hide()
            if (res.data.flag) {
              self.$vux.toast.text(res.data.error)
              self.changeOrderView(order, 4, [4, 6])
            }
          })
        }
      })
    },
    cancel (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您确认取消订单？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/order/cancel`, {id: order.id})
          .then(res => {
            self.$vux.loading.hide()
            self.$vux.toast.text(res.data.error)
            self.changeOrderView(order, 0, [])
          })
        }
      })
    },
    refund (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您是否要申请退款？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/order/refund`, {id: order.id})
          .then(res => {
            self.$vux.loading.hide()
            self.$vux.toast.text(res.data.error)
            self.changeOrderView(order, 0, [])
          })
        }
      })
    },
    viewShipping (order) {
      this.$router.push({path: `/deliverinfo`, query: {id: order.id}})
    },
    afterSale (order) {
    },
    payment (order) {
      this.$router.push({path: '/pay', query: {id: order.id}})
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
    changeOrderView (order, status, buttons) {
      const self = this
      let list = []
      switch (this.selectedIndex) {
        case 0:
          list = this.tabdata1
          break
        case 1:
          list = this.tabdata2
          break
        case 2:
          list = this.tabdata3
          break
        case 3:
          list = this.tabdata4
          break
      }
      this.$util.changeItem(list, order.id, function (m) {
        return { ...m, flag: status, flagstr: self.$util.getItem(ENV.OrderStatus, status).status, buttons: buttons}
      })
    },
    toggleTab () {
      switch (this.selectedIndex) {
        case 0:
        /*
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`)
          .then(res => {
            if (res.data.flag) {
              self.list = res.data.data
            }
          })
          */
          // self.scrollContainer.removeEventListener('scroll', self.scroll1)
          // self.scrollContainer.addEventListener('scroll', self.scroll1)
          // if (self.tabdata1.length === 0) {
          //   self.$vux.loading.show()
          //   self.getdata1()
          // }
          !this.tabdata1.length && this.getData()
          break
        case 1:
        /*
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user?flag=2`)
          .then(res => {
            if (res.data.flag) {
              self.list1 = res.data.data
            }
          })
          */
          // self.scrollContainer.removeEventListener('scroll', self.scroll2)
          // self.scrollContainer.addEventListener('scroll', self.scroll2)
          // if (self.pagestart2 === 0 && !self.isBindScroll2) {
          //   self.$vux.loading.show()
          //   self.getdata2()
          // }
          !this.tabdata2.length && this.getData(2)
          break
        case 2:
        /*
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user?flag=3`)
          .then(res => {
            if (res.data.flag) {
              self.list2 = res.data.data
            }
          })
          */
          // self.scrollContainer.removeEventListener('scroll', self.scroll3)
          // self.scrollContainer.addEventListener('scroll', self.scroll3)
          // if (self.pagestart3 === 0 && !self.isBindScroll3) {
          //   self.$vux.loading.show()
          //   self.getdata3()
          // }
          !this.tabdata3.length && this.getData(3)
          break
        case 3:
        /*
          this.$http.get(`${ENV.BokaApi}/api/order/orderList/user?flag=4`)
          .then(res => {
            if (res.data.flag) {
              self.list3 = res.data.data
            }
          })
          */
          // self.scrollContainer.removeEventListener('scroll', self.scroll4)
          // self.scrollContainer.addEventListener('scroll', self.scroll4)
          // if (self.pagestart4 === 0 && !self.isBindScroll4) {
          //   self.$vux.loading.show()
          //   self.getdata4()
          // }
          !this.tabdata4.length && this.getData(4)
          break
      }
    },
    // getData () {
    //   const self = this
    //   this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`)
    //   .then(res => {
    //     if (res.data.flag) {
    //       self.list = res.data.data
    //     }
    //   })
    // },
    // getScrollContainer () {
    //   this.scrollContainer = document.querySelector('.scroll-container')
    // },
    scrollHandle () {
      const self = this
      this.$util.scrollEvent({
        element: this.$refs.scrollContainer,
        callback: () => {
          switch (self.selectedIndex) {
            case 0:
              self.getPageData(0, self.pagestart1)
              break
            case 1:
              self.getPageData(2, self.pagestart2)
              break
            case 2:
              self.getPageData(3, self.pagestart3)
              break
            case 3:
              self.getPageData(4, self.pagestart4)
              break
          }
        }
      })
    },
    getData(flag) {
      flag = flag || 0
      this.$vux.loading.show()
      const self = this
      let params = { params: { flag: flag, pagestart: 0, limit: 20 } }
      this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        switch (flag) {
          case 0:
            self.tabdata1 = retdata
            self.distabdata1 = true
            break
          case 2:
            self.tabdata2 = retdata
            self.distabdata2 = true
            break
          case 3:
            self.tabdata3 = retdata
            self.distabdata3 = true
            break
          case 4:
            self.tabdata4 = retdata
            self.distabdata4 = true
            break
        }
      })
    },
    getPageData (flag, page) {
      flag = flag || 0
      page = page || 0
      this.$vux.loading.show()
      const self = this
      let params = { params: { flag: flag, pagestart: page, limit: 20 } }
      this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        switch (flag) {
          case 0:
            retdata.length && self.pagestart1++
            self.tabdata1 = self.tabdata1.concat(retdata)
            break
          case 2:
            retdata.length && self.pagestart2++
            self.tabdata2 = self.tabdata2.concat(retdata)
            break
          case 3:
            retdata.length && self.pagestart3++
            self.tabdata3 = self.tabdata3.concat(retdata)
            break
          case 4:
            retdata.length && self.pagestart4++
            self.tabdata4 = self.tabdata4.concat(retdata)
            break
        }
      })
    },
    // scroll1 () {
    //   const self = this
    //   self.$util.scrollEvent({
    //     element: self.scrollContainer,
    //     callback: function () {
    //       if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
    //         self.pagestart1++
    //         self.$vux.loading.show()
    //         self.getdata1()
    //       }
    //     }
    //   })
    // },
    // scroll2 () {
    //   const self = this
    //   self.$util.scrollEvent({
    //     element: self.scrollContainer,
    //     callback: function () {
    //       if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
    //         self.pagestart2++
    //         self.$vux.loading.show()
    //         self.getdata2()
    //       }
    //     }
    //   })
    // },
    // scroll3 () {
    //   const self = this
    //   self.$util.scrollEvent({
    //     element: self.scrollContainer,
    //     callback: function () {
    //       if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
    //         self.pagestart3++
    //         self.$vux.loading.show()
    //         self.getdata3()
    //       }
    //     }
    //   })
    // },
    // scroll4 () {
    //   const self = this
    //   self.$util.scrollEvent({
    //     element: self.scrollContainer,
    //     callback: function () {
    //       if (self.tabdata4.length === (self.pagestart4 + 1) * self.limit) {
    //         self.pagestart4++
    //         self.$vux.loading.show()
    //         self.getdata4()
    //       }
    //     }
    //   })
    // },
    // getdata1 () {
    //   const self = this
    //   let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
    //   self.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, params).then(function (res) {
    //     let data = res.data
    //     self.$vux.loading.hide()
    //     let retdata = data.data ? data.data : data
    //     self.tabdata1 = self.tabdata1.concat(retdata)
    //     self.distabdata1 = true
        // if (!self.isBindScroll1) {
        //   self.getScrollContainer()
        //   self.isBindScroll1 = true
          // self.scrollContainer.removeEventListener('scroll', self.scroll1)
          // self.scrollContainer.addEventListener('scroll', self.scroll1)
        // }
    //   })
    // },
    // getdata2 () {
    //   const self = this
    //   let params = { params: { flag: 2, pagestart: self.pagestart2, limit: self.limit } }
    //   self.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, params).then(function (res) {
    //     let data = res.data
    //     self.$vux.loading.hide()
    //     let retdata = data.data ? data.data : data
    //     self.tabdata2 = self.tabdata2.concat(retdata)
    //     self.distabdata2 = true
        // if (!self.isBindScroll2) {
        //   self.getScrollContainer()
        //   self.isBindScroll2 = true
          // self.scrollContainer.removeEventListener('scroll', self.scroll2)
          // self.scrollContainer.addEventListener('scroll', self.scroll2)
        // }
    //   })
    // },
    // getdata3 () {
    //   const self = this
    //   let params = { params: { flag: 3, pagestart: self.pagestart3, limit: self.limit } }
    //   self.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, params).then(function (res) {
    //     let data = res.data
    //     self.$vux.loading.hide()
    //     let retdata = data.data ? data.data : data
    //     self.tabdata3 = self.tabdata3.concat(retdata)
    //     self.distabdata3 = true
    //     // if (!self.isBindScroll3) {
    //     //   self.getScrollContainer()
    //     //   self.isBindScroll3 = true
    //       // self.scrollContainer.removeEventListener('scroll', self.scroll3)
    //       // self.scrollContainer.addEventListener('scroll', self.scroll3)
    //     // }
    //   })
    // },
    // getdata4 () {
    //   const self = this
    //   let params = { params: { flag: 4, pagestart: self.pagestart4, limit: self.limit } }
    //   self.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, params).then(function (res) {
    //     let data = res.data
    //     self.$vux.loading.hide()
    //     let retdata = data.data ? data.data : data
    //     self.tabdata4 = self.tabdata4.concat(retdata)
    //     self.distabdata4 = true
        // if (!self.isBindScroll4) {
        //   self.getScrollContainer()
        //   self.isBindScroll4 = true
          // self.scrollContainer.removeEventListener('scroll', self.scroll4)
          // self.scrollContainer.addEventListener('scroll', self.scroll4)
        // }
    //   })
    // }
  },
  created () {
    // const self = this
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.$vux.loading.show()
    this.getData()
    // self.getScrollContainer()
    // if (!self.isBindScroll1 && self.scrollContainer) {
    //   self.isBindScroll1 = true
      // self.scrollContainer.removeEventListener('scroll', self.scroll1)
      // self.scrollContainer.addEventListener('scroll', self.scroll1)
    // }
  }
}
</script>

<style lang="less">
</style>
