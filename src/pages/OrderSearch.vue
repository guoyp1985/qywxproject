/*
* @description: 订单查询页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-search" :class="`containerarea font14 ${(loginUser.isretailer && query.fromapp != 'factory') ? 's-havebottom' : ''}`">
    <div class="s-topbanner s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">{{ $t('All') }}</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">{{ $t('To Be Delivered') }}</tab-item>
        <tab-item :selected="selectedIndex==2" @on-item-click="toggleTab">{{ $t('Shipped') }}</tab-item>
        <tab-item :selected="selectedIndex==3" @on-item-click="toggleTab">{{ $t('Completed') }}</tab-item>
      </tab>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="scrollHandle">
      <div v-show="selectedIndex===0">
        <template v-if="distabdata1">
          <template v-if="tabdata1.length">
            <order-info v-for="(item, index) in tabdata1" :item="item" :key="index" :index="index" @on-process="orderProcess"></order-info>
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
            <order-info v-for="(item, index) in tabdata2" :item="item" :key="index" :index="index" @on-process="orderProcess"></order-info>
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
            <order-info v-for="(item, index) in tabdata3" :item="item" :key="index" :index="index" @on-process="orderProcess"></order-info>
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
            <order-info v-for="(item, index) in tabdata4" :item="item" :key="index" :index="index" @on-process="orderProcess"></order-info>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Orders')}}</span>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="s-bottom flex_center pl12 pr12 list-shadow02" v-if="loginUser.isretailer && query.fromapp != 'factory'">
      <div class="flex_cell flex_center">
        <div class="color-white flex_center btn-bottom-red" @click="toRetailerOrders" style="width:85%;">我的销售订单</div>
      </div>
    </div>
    <div v-if="showRefundModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">申请退款</div>
        <div class="align_left txt padding10">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="titleTextarea"
              v-model="refundContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入退款原因"
              :show-counter="false"
              :rows="6"
              :max="200"
              @on-change="textareaChange('titleTextarea')"
              @on-focus="textareaFocus('titleTextarea')"
              autosize>
            </x-textarea>
          </group>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeRefund">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitRefund">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Sticky, Tab, TabItem, Group, XTextarea } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import {User} from '#/storage'
import ENV from 'env'

export default {
  components: {
    Sticky, Tab, TabItem, OrderInfo, Group, XTextarea
  },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      distabdata4: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata4: [],
      limit: 10,
      pagestart1: 1,
      pagestart2: 1,
      pagestart3: 1,
      pagestart4: 1,
      showRefundModal: false,
      refundContent: '',
      clickOrder: {},
      clickIndex: 0
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
    addressFormat (address) {
      return `${address.area.join('')}${address.details}`
    }
  },
  methods: {
    initData () {
      this.selectedIndex = 0
      this.distabdata1 = false
      this.distabdata2 = false
      this.distabdata3 = false
      this.distabdata4 = false
      this.tabdata1 = []
      this.tabdata2 = []
      this.tabdata3 = []
      this.tabdata4 = []
      this.pagestart1 = 1
      this.pagestart2 = 1
      this.pagestart3 = 1
      this.pagestart4 = 1
      this.showRefundModal = false
      this.refundContent = ''
      this.clickOrder = {}
      this.clickIndex = 0
    },
    toRetailerOrders () {
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/retailerOrders', query: params})
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
      setTimeout(function () {
        curArea.updateAutosize()
      }, 50)
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
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
            if (item.canback && item.backflag !== 20 && (item.orderonline !== 0 || (item.orderonline === 0 && item.fid))) {
              item.buttons = [
                {id: 3, name: '申请退款'}
              ]
            }
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
    refund (order, index) {
      this.showRefundModal = true
      this.clickOrder = order
      this.clickIndex = index
    },
    closeRefund () {
      this.showRefundModal = false
    },
    submitRefund () {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/order/applyRefund`, {id: this.clickOrder.id, reasonreturn: this.refundContent})
      .then(res => {
        self.$vux.loading.hide()
        this.showRefundModal = false
        const data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              // self.changeOrderView(this.clickOrder, 0, [])
              switch (this.selectedIndex) {
                case 0:
                  this.tabdata1[this.clickIndex].backflag = 20
                  this.tabdata1[this.clickIndex].flagstr = '待发货(退款申请中)'
                  this.tabdata1[this.clickIndex].buttons = []
                  for (let i = 0; i < this.tabdata2.length; i++) {
                    if (this.tabdata2[i].id === this.clickData.id) {
                      this.tabdata2[i].backflag = 20
                      this.tabdata2[i].flagstr = '待发货(退款申请中)'
                      this.tabdata2[i].buttons = []
                      break
                    }
                  }
                  break
                case 1:
                  this.tabdata2[this.clickIndex].backflag = 20
                  this.tabdata2[this.clickIndex].flagstr = '待发货(退款申请中)'
                  this.tabdata2[this.clickIndex].buttons = []
                  for (let i = 0; i < this.tabdata1.length; i++) {
                    if (this.tabdata1[i].id === this.clickData.id) {
                      this.tabdata1[i].backflag = 20
                      this.tabdata1[i].flagstr = '待发货(退款申请中)'
                      this.tabdata1[i].buttons = []
                      break
                    }
                  }
                  this.$apply()
                  break
              }
            }
          }
        })
      })
    },
    viewShipping (order) {
      this.$router.push({path: `/deliverinfo`, query: {id: order.id}})
    },
    afterSale (order) {
    },
    payment (order) {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `/packageB/pages/pay?id=${order.id}&weburl=orderSearch`})
      } else {
        location.replace(`${ENV.Host}/#/pay?id=${order.id}`)
      }
    },
    orderProcess (type, order, index) {
      switch (type) {
        case 1:
          this.cancel(order)
          break
        case 2:
          this.payment(order)
          break
        case 3:
          this.refund(order, index)
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
        return { ...m, flag: status, flagstr: self.$util.getItem(ENV.OrderStatus, status).status, buttons: buttons }
      })
    },
    toggleTab () {
      switch (this.selectedIndex) {
        case 0:
          !this.tabdata1.length && this.getData()
          break
        case 1:
          !this.tabdata2.length && this.getData(2)
          break
        case 2:
          !this.tabdata3.length && this.getData(3)
          break
        case 3:
          !this.tabdata4.length && this.getData(4)
          break
      }
    },
    scrollHandle () {
      const self = this
      this.$util.scrollEvent({
        element: this.$refs.scrollContainer,
        callback: () => {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === self.pagestart1 * self.limit) {
                self.getPageData(0, self.pagestart1)
              }
              break
            case 1:
              if (self.tabdata2.length === self.pagestart2 * self.limit) {
                self.getPageData(2, self.pagestart2)
              }
              break
            case 2:
              if (self.tabdata3.length === self.pagestart3 * self.limit) {
                self.getPageData(3, self.pagestart3)
              }
              break
            case 3:
              if (self.tabdata4.length === self.pagestart4 * self.limit) {
                self.getPageData(4, self.pagestart4)
              }
              break
          }
        }
      })
    },
    getData (flag) {
      flag = flag || 0
      this.$vux.loading.show()
      const self = this
      let params = { params: { flag: flag, pagestart: 0, limit: self.limit } }
      this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, params).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        retdata = this.setListButton(retdata)
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
      let params = { params: { flag: flag, pagestart: page, limit: self.limit } }
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
    init () {
      this.$vux.loading.show()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.initData()
      // if ((this.query.flag === undefined && this.$route.query.flag === undefined) || this.query.flag !== this.$route.query.flag) {
      this.query = this.$route.query
      let flag = parseInt(this.query.flag)
      switch (flag) {
        case 2:
          this.selectedIndex = 1
          break
        case 3:
          this.selectedIndex = 2
          break
        case 4:
          this.selectedIndex = 3
          break
        default :
          this.selectedIndex = 0
          break
      }
      this.toggleTab()
      // }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.b-tab .vux-tab .vux-tab-item.vux-tab-selected{color:#ea3a3a;}
.b-tab .vux-tab-ink-bar{background-color:#ea3a3a;}
</style>
