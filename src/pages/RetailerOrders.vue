<template>
  <div class="containerarea s-havebottom bg-page font14 retailerordes">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Order list')}}</div>
          <!--
          <div class="pr10 align_right" style="width:100px;">
            <router-link class="qbtn color-white" style="border:#fff 1px solid;" to="/retailerAddorder">{{$t('Add order')}}</router-link>
          </div>
        -->
        </div>
      </div>
      <div class="row">
        <tab v-model="tabmodel" class="x-tab" active-color="#fff" default-color="#fff">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="tabclick">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <div class="scroll_list">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <Orderitemplate v-else v-for="(item,index1) in tabdata1" :key="item.id" :data="item">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" class="imgcover" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg imgcover" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80" v-if="item.flag == 2">
                      <div class="qbtn4 font12" style="padding:1px 8px;">{{ $t('Deliver goods') }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80" v-if="item.flag == 3">
                      <a class="qbtn3 font12 " style="padding:1px 8px;">{{ $t('View deliver') }}</a>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div class="scroll_list">
              <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <Orderitemplate v-else v-for="(item,index1) in tabdata2" :key="item.id" :data="item">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" class="imgcover" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
          <div v-if="(index == 2)">
            <div class="scroll_list">
              <div v-if="!tabdata3 || tabdata3.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <Orderitemplate v-else v-for="(item,index1) in tabdata3" :key="item.id" :data="item">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" class="imgcover" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80">
                      <div class="qbtn4 font12" style="padding:1px 8px;">{{ $t('Deliver goods') }}</div>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
          <div v-if="(index == 3)">
            <div class="scroll_list">
              <div v-if="!tabdata4 || tabdata4.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <Orderitemplate v-else v-for="(item,index1) in tabdata4" :key="item.id" :data="item">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" class="imgcover" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80">
                      <a class="qbtn3 font12 " style="padding:1px 8px;">{{ $t('View deliver') }}</a>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/retailerShop">{{ $t('My shop') }}</router-link>
        <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
        <div class="t-cell item active">{{ $t('My orders') }}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
Add order1:
  zh-CN: 返点客户
My orders:
  zh-CN: 我的订单
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton } from 'vux'
import Orderitemplate from '@/components/Orderitemplate'
import Orderproductplate from '@/components/Orderproductplate'
import Time from '#/time'
import ENV from '#/env'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XTextarea,
    Group,
    XButton,
    Orderitemplate,
    Orderproductplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '全部', '待付款', '待发货', '已发货' ],
      tabmodel: 0,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata4: [],
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      pagestart4: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      isBindScroll3: false,
      isBindScroll4: false,
      scrollArea1: null,
      scrollArea2: null,
      scrollArea3: null,
      scrollArea4: null
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.getdata1()
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    scroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea2,
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    scroll3: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea3,
        callback: function () {
          if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
            self.pagestart3++
            self.$vux.loading.show()
            self.getdata3()
          }
        }
      })
    },
    scroll4: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea4,
        callback: function () {
          if (self.tabdata4.length === (self.pagestart4 + 1) * self.limit) {
            self.pagestart4++
            self.$vux.loading.show()
            self.getdata4()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, params).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.retailerordes .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea2 = items[1]
          self.scrollArea3 = items[2]
          self.scrollArea4 = items[3]
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getdata2 () {
      const self = this
      let params = { params: { flag: 1, pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, params).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        if (!self.isBindScroll2) {
          self.isBindScroll2 = true
          self.scrollArea2.removeEventListener('scroll', self.scroll2)
          self.scrollArea2.addEventListener('scroll', self.scroll2)
        }
      })
    },
    getdata3 () {
      const self = this
      let params = { params: { flag: 2, pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, params).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        if (!self.isBindScroll3) {
          self.isBindScroll3 = true
          self.scrollArea3.removeEventListener('scroll', self.scroll3)
          self.scrollArea3.addEventListener('scroll', self.scroll3)
        }
      })
    },
    getdata4 () {
      const self = this
      let params = { params: { flag: 3, pagestart: self.pagestart4, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, params).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata4 = self.tabdata4.concat(retdata)
        if (!self.isBindScroll4) {
          self.isBindScroll4 = true
          self.scrollArea4.removeEventListener('scroll', self.scroll4)
          self.scrollArea4.addEventListener('scroll', self.scroll4)
        }
      })
    },
    tabclick (index) {
      const self = this
      if (index === 0) {
        if (self.pagestart1 > 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        if (self.pagestart2 === 0 && !self.isBindScroll2) {
          self.$vux.loading.show()
          self.getdata2()
        }
      } else if (index === 2) {
        if (self.pagestart3 === 0 && !self.isBindScroll3) {
          self.$vux.loading.show()
          self.getdata3()
        }
      } else if (index === 3) {
        if (self.pagestart4 === 0 && !self.isBindScroll4) {
          self.$vux.loading.show()
          self.getdata4()
        }
      }
    }
  }
}
</script>

<style lang="less">
</style>
