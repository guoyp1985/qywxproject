<template>
  <div class="containerarea bg-page font14 retailerordes">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1">
        <div class="row">
          <tab v-model="selectedIndex" class="" active-color="#ea3a3a" default-color="#666666">
            <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
          </tab>
        </div>
      </div>
      <div class="s-container s-container1">
        <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
          <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
            <div v-if="(index == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',index)">
              <div v-if="distabdata1" class="scroll_list">
                <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 align_center color-gray">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">暂无相关订单！</div>
                </div>
                <Orderitemplate v-else v-for="(item,index1) in tabdata1" :key="item.id" :data="item" order-link="/factoryOrderDetail">
                  <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span>
                  <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item">
                    <img slot="photo" class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
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
                      <div class="t-cell middle-cell appendcontrol align_right w80" v-if="item.flag == 2 && item.candeliver">
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
            <div v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',index)">
              <div v-if="distabdata2" class="scroll_list">
                <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 align_center color-gray">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">暂无相关订单！</div>
                </div>
                <orderitemplate v-else v-for="(item,index1) in tabdata2" :key="item.id" :data="item" order-link="/factoryOrderDetail">
                  <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span>
                  <orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item">
                    <img slot="photo" class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
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
            <div v-if="(index == 2)" class="swiper-inner scroll-container31" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3',index)">
              <div v-if="distabdata3" class="scroll_list">
                <div v-if="!tabdata3 || tabdata3.length === 0" class="scroll_item padding10 align_center color-gray">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">暂无相关订单！</div>
                </div>
                <orderitemplate v-else v-for="(item,index1) in tabdata3" :key="item.id" :data="item" order-link="/factoryOrderDetail">
                  <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span>
                  <orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item">
                    <img slot="photo" class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
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
                    <div v-if="item.candeliver" class="t-table pt5 color-lightgray font13 deliverarea">
                      <div class="t-cell middle-cell appendcontrol align_right w80">
                        <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploaddeliver(item,index)">{{ $t('Deliver goods') }}</div>
                      </div>
                    </div>
                  </div>
                </orderitemplate>
              </div>
            </div>
            <div v-if="(index == 3)" class="swiper-inner scroll-container4" ref="scrollContainer4" @scroll="handleScroll('scrollContainer4',index)">
              <div v-if="distabdata4" class="scroll_list">
                <div v-if="!tabdata4 || tabdata4.length === 0" class="scroll_item padding10 align_center color-gray">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">暂无相关订单！</div>
                </div>
                <orderitemplate v-else v-for="(item,index1) in tabdata4" :key="item.id" :data="item" order-link="/factoryOrderDetail">
                  <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span>
                  <orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item">
                    <img slot="photo" class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
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
    </template>
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
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, Orderitemplate, Orderproductplate, XImg, Sos
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      tabtxts: [ '全部', '待付款', '待发货', '已发货' ],
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
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              self.pagestart1++
              self.getData1()
              break
            case 1:
              self.pagestart2++
              self.getData2()
              break
            case 2:
              self.pagestart3++
              self.getData3()
              break
            case 3:
              self.pagestart4++
              self.getData4()
              break
          }
        }
      })
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = { pagestart: self.pagestart1, limit: self.limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/factory`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = { flag: 1, pagestart: self.pagestart2, limit: self.limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/factory`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    getData3 () {
      this.$vux.loading.show()
      const self = this
      const params = { flag: 2, pagestart: self.pagestart3, limit: self.limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/factory`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    getData4 () {
      this.$vux.loading.show()
      const self = this
      const params = { flag: 3, pagestart: self.pagestart4, limit: self.limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/factory`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata4 = self.tabdata4.concat(retdata)
        self.distabdata4 = true
      })
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < this.limit) {
            self.pagestart1 = 0
            self.distabdata1 = false
            this.tabdata1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < this.limit) {
            self.pagestart2 = 0
            self.distabdata2 = false
            this.tabdata2 = []
            self.getData2()
          }
          break
        case 2:
          if (this.tabdata3.length < this.limit) {
            self.pagestart3 = 0
            self.distabdata3 = false
            this.tabdata3 = []
            self.getData3()
          }
          break
        case 3:
          if (this.tabdata4.length < this.limit) {
            self.pagestart4 = 0
            self.distabdata4 = false
            this.tabdata4 = []
            self.getData4()
          }
          break
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
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!self.loginUser.fid && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.query = this.$route.query
          self.pagestart1 = 0
          self.distabdata1 = false
          this.tabdata1 = []
          this.swiperChange()
        }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
</style>
