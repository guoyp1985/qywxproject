<template>
  <div class="containerarea s-havebottom bg-page font14 retailerordes">
    <div class="s-topbanner">
      <div class="row">
        <tab v-model="tabmodel" class="" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll1">
            <div v-if="distabdata1" class="scroll_list">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <Orderitemplate v-else v-for="(item,index1) in tabdata1" :key="item.id" :data="item">
                <span slot="orderno">{{ item.orderno }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <x-img slot="photo" class="imgcover" :src="product.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container1"></x-img>
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                  <span slot="createdate">{{ product.dateline | dateformat }}</span>
                </Orderproductplate>
                <div slot="receivearea">
                  <div class="t-table">
                    <div class="font12 color-lightgray"><span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span></div>
                    <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                      <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                    </div>
                  </div>
                  <div class="t-table pt5 color-lightgray font13 deliverarea" >
                    <div class="t-cell middle-cell appendcontrol align_right w80" v-if="item.flag == 2">
                      <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploaddeliver(item,index)">{{ $t('Deliver goods') }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80" v-if="item.flag == 3">
                      <router-link :to="{path: '/deliverinfo', query: {id: item.id}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
          <div v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll2">
            <div v-if="distabdata2" class="scroll_list">
              <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <orderitemplate v-else v-for="(item,index1) in tabdata2" :key="item.id" :data="item">
                <span slot="orderno">{{ item.orderno }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <x-img slot="photo" class="imgcover" :src="product.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container2"></x-img>
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                  <span slot="createdate">{{ product.dateline | dateformat }}</span>
                </orderproductplate>
                <div slot="receivearea">
                  <div class="t-table">
                    <div class="font12 color-lightgray"><span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span></div>
                    <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                      <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                    </div>
                  </div>
                </div>
              </orderitemplate>
            </div>
          </div>
          <div v-if="(index == 2)" class="swiper-inner scroll-container31" ref="scrollContainer3" @scroll="handleScroll3">
            <div v-if="distabdata3" class="scroll_list">
              <div v-if="!tabdata3 || tabdata3.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <orderitemplate v-else v-for="(item,index1) in tabdata3" :key="item.id" :data="item">
                <span slot="orderno">{{ item.orderno }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <x-img slot="photo" class="imgcover" :src="product.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container3"></x-img>
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                  <span slot="createdate">{{ product.dateline | dateformat }}</span>
                </orderproductplate>
                <div slot="receivearea">
                  <div class="t-table">
                    <div class="font12 color-lightgray"><span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span></div>
                    <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                      <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                    </div>
                  </div>
                  <div class="t-table pt5 color-lightgray font13 deliverarea">
                    <div class="t-cell middle-cell appendcontrol align_right w80">
                      <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploaddeliver(item,index)">{{ $t('Deliver goods') }}</div>
                    </div>
                  </div>
                </div>
              </orderitemplate>
            </div>
          </div>
          <div v-if="(index == 3)" class="swiper-inner scroll-container4" ref="scrollContainer4" @scroll="handleScroll4">
            <div v-if="distabdata4" class="scroll_list">
              <div v-if="!tabdata4 || tabdata4.length === 0" class="scroll_item padding10 align_center color-gray">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">暂无相关订单！</div>
                <div>积极分享商品或活动，客户才会购买哦~</div>
              </div>
              <orderitemplate v-else v-for="(item,index1) in tabdata4" :key="item.id" :data="item">
                <span slot="orderno">{{ item.orderno }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <x-img slot="photo" class="imgcover" :src="product.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container4"></x-img>
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                  <span slot="createdate">{{ product.dateline | dateformat }}</span>
                </orderproductplate>
                <div slot="receivearea">
                  <div class="t-table">
                    <div class="font12 color-lightgray"><span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span></div>
                    <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                      <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                    </div>
                  </div>
                  <div class="t-table pt5 color-lightgray font13 deliverarea">
                    <div class="t-cell middle-cell appendcontrol align_right w80">
                      <router-link :to="{path: '/deliverinfo', query: {id: item.id}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                    </div>
                  </div>
                </div>
              </orderitemplate>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/store">{{ $t('My shop') }}</router-link>
        <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
        <div class="t-cell item active">{{ $t('My orders') }}</div>
      </div>
    </div>
    <div v-transfer-dom class="x-popup popup-deliver">
      <popup v-model="showpopup" height="100%">
        <div class="popup1 font14">
          <div class="popup-top flex_center">发货</div>
          <div class="popup-middle">
            <div class="scroll_list">
              <div class="scroll_item padding10">
                <div class="t-table">
                  <div class="t-cell w80">物流<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                  <div class="t-cell">
                    <select class="qselect" v-model="deliverdata.delivercompany" :value="deliverdata.delivercompany">
                      <option v-for="(item,index) in delivercompany" :key='item.id' :value="item.id" >{{ item.name }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div v-if="deliverdata.delivercompany != '-1'" class="scroll_item padding10 form-item">
                <div class="t-table">
                  <div class="t-cell w80">运单号<span class="al al-xing color-red font12" style="vertical-align: 3px;"></span></div>
                  <div class="t-cell">
                    <input v-model="deliverdata.delivercode" type="text" class="input" placeholder="运单号" />
                  </div>
                  <div class="t-cell align_right w50" style="position:relative;" @click="scanClick">
                    <i class="al al-scanning color-blue"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Close') }}</div>
            <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmpopup">{{ $t('Confirm txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<i18n>
Add order1:
  zh-CN: 返点客
My orders:
  zh-CN: 我的订单
</i18n>
<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg } from 'vux'
import Orderitemplate from '@/components/Orderitemplate'
import Orderproductplate from '@/components/Orderproductplate'
import Time from '#/time'
import ENV from 'env'
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, Orderitemplate, Orderproductplate, XImg
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
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      distabdata4: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata4: [],
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      pagestart4: 0,
      showpopup: false,
      deliveritem: null,
      deliverindex: 0,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' }
    }
  },
  methods: {
    handleScroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer1[0],
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    handleScroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer2[0],
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    handleScroll3: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer3[0],
        callback: function () {
          if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
            self.pagestart3++
            self.$vux.loading.show()
            self.getdata3()
          }
        }
      })
    },
    handleScroll4: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer4[0],
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
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getdata2 () {
      const self = this
      let params = { params: { flag: 1, pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    getdata3 () {
      const self = this
      let params = { params: { flag: 2, pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    getdata4 () {
      const self = this
      let params = { params: { flag: 3, pagestart: self.pagestart4, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata4 = self.tabdata4.concat(retdata)
        self.distabdata4 = true
      })
    },
    swiperChange (index) {
      const self = this
      if (index === 0 && self.tabdata1.length === 0) {
        self.$vux.loading.show()
        self.getdata1()
      } else if (index === 1 && self.tabdata2.length === 0) {
        self.$vux.loading.show()
        self.getdata2()
      } else if (index === 2 && self.tabdata3.length === 0) {
        self.$vux.loading.show()
        self.getdata3()
      } else if (index === 3 && self.tabdata4.length === 0) {
        self.$vux.loading.show()
        self.getdata4()
      }
    },
    uploaddeliver (item, index) {
      event.preventDefault()
      const self = this
      self.deliveritem = item
      self.deliverindex = index
      for (let key in self.deliverdata) {
        if (self.deliveritem[key] && self.$util.trim(self.deliveritem[key] !== '')) {
          self.deliverdata[key] = self.deliveritem[key]
        }
      }
      if (!self.delivercompany.length) {
        self.$http.post(`${ENV.BokaApi}/api/order/delivercompany`).then(function (res) {
          let data = res.data
          self.delivercompany = data.data ? data.data : data
        })
      }
      this.showpopup = true
    },
    confirmpopup () {
      const self = this
      if (self.deliverdata.delivercompany !== '-1' && (!self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '')) {
        self.$vux.alert.show({
          title: '',
          content: '请输入物流单号'
        })
        return false
      }
      self.$vux.loading.show()
      self.deliverdata.id = self.deliveritem.id
      self.$http.post(`${ENV.BokaApi}/api/order/deliver`, self.deliverdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              /*
              let updatedata = self.tabdata1[self.deliverindex]
              updatedata.delivercompany = self.deliverdata.delivercompany
              updatedata.delivercode = self.deliverdata.delivercode
              updatedata.flag = 3
              for (let i = 0; i < self.tabdata3.length; i++) {
                let td = self.tabdata3[i]
                if (td.id === updatedata.id) {
                  td.delivercompany = self.deliverdata.delivercompany
                  td.delivercode = self.deliverdata.delivercode
                }
              }
              */
              self.deliveritem.flag = 3
              self.deliveritem.delivercompany = self.deliverdata.delivercompany
              self.deliveritem.delivercode = self.deliverdata.delivercode
              self.$util.deleteItem(self.tabdata3, self.deliveritem.id)
              self.tabdata4.push(self.deliveritem)

              self.showpopup = false
              self.deliveritem = null
              self.deliverindex = 0
              self.deliverdata = { delivercompany: '-1', delivercode: '' }
            }
          }
        })
      })
    },
    closepopup () {
      this.showpopup = false
      self.deliveritem = null
      self.deliverindex = 0
      self.deliverdata = { delivercompany: '-1', delivercode: '' }
    },
    scanClick () {
      const self = this
      self.$wechat.scanQRCode({
        needResult: 1,
        desc: '识别物流信息',
        success: function (res) {
          if (res.errMsg === 'scanQRCode:ok') {
            let result = res.resultStr.split(',')
            if (result[0] === 'CODE_128') {
              self.deliverdata.delivercode = result[1]
            } else {
              self.$vux.toast.show({
                text: '请扫描物流条形码',
                time: 1500
              })
            }
          }
        },
        failed: function () {
          self.$vux.toast.show({
            text: '扫描失败'
          })
        }
      })
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'orders'
    })
    self.$vux.loading.show()
    self.getdata1()
  }
}
</script>

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.retailerordes .s-topbanner{
  background: #fff;
  height: 44px;
}
.retailerordes .s-container{
  top:44px;
}
</style>
