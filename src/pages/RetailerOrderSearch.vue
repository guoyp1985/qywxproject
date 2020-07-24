<template>
  <div class="containerarea bg-page font14 retailerordes">
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1">
        <div class="row">
          <search
            class="v-search bg-white"
            v-model='searchword1'
            :auto-fixed="autofixed"
            @on-submit="onSubmit1"
            @on-change="onChange1"
            @on-cancel="onCancel1"
            ref="search">
          </search>
        </div>
      </div>
      <div class="s-container s-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
        <div v-if="distabdata1" class="scroll_list">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 align_center color-gray">
            <div><i class="al al-wushuju font60 pt20"></i></div>
            <div class="mt5">暂无相关订单！</div>
            <div>积极分享商品或活动，客户才会购买哦~</div>
          </div>
          <Orderitemplate v-else v-for="(item,index1) in tabdata1" :key="item.id" :data="item">
            <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
            <div slot="receivearea">
              <div class="t-table">
                <div class="font12 color-lightgray"><span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span></div>
                <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                  <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                </div>
              </div>
              <div class="t-table pt5 color-lightgray font13 deliverarea" >
                <template v-if="item.flag == 1 && item.fid == 0 && item.crowdid == 0">
                  <div class="t-cell v_middle align_left color-orange">
                    <div class="clamp1">
                      <span class="v_middle">{{$t('Order price')}}: {{ $t('RMB') }}</span><span class="v_middle">{{ item.special }}</span>
                      <template v-if="item.postage && item.postage != ''">
                        <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                        <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
                      </template>
                    </div>
                  </div>
                  <div class="t-cell v_middle appendcontrol align_right w80">
                    <div class="qbtn4 font12" style="padding:1px 14px;" @click="changePrice(item)">{{ $t('Change price') }}</div>
                  </div>
                </template>
                <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 2 && item.candeliver">
                  <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploaddeliver(item)">{{ $t('Deliver goods') }}</div>
                </div>
                <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 3">
                  <router-link :to="{path: '/deliverinfo', query: {id: item.id}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                </div>
              </div>
            </div>
          </Orderitemplate>
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
import { XTextarea, Group, XButton, Popup, TransferDom, XImg, Search } from 'vux'
import Orderitemplate from '@/components/Orderitemplate'
import Orderproductplate from '@/components/Orderproductplate'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
const jweixin = require('../../static/jweixin')

export default {
  directives: {
    TransferDom
  },
  components: {
    XTextarea, Group, XButton, Popup, Orderitemplate, Orderproductplate, XImg, Subscribe, ApplyTip, Search
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      distabdata1: false,
      tabdata1: [],
      limit: 10,
      pagestart1: 0,
      showpopup: false,
      deliveritem: null,
      deliverindex: 0,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' },
      autofixed: false,
      searchword1: ''
    }
  },
  methods: {
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.getData1()
          }
        }
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = { pagestart: self.pagestart1, limit: self.limit }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/order/orderList/retailer`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    changePrice (item, index) {
      event.preventDefault()
      const self = this
      let showtitle = '修改价格'
      let inputval = item.special
      self.$vux.confirm.prompt(inputval, {
        title: showtitle,
        onShow () {
          self.$vux.confirm.setInputValue(inputval)
        },
        onConfirm (val) {
          if (val === undefined || self.$util.trim(val) === '' || isNaN(val) || parseFloat(val) < 0) {
            self.$vux.toast.text('请输入正确的价格', 'middle')
            return false
          }
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/order/changePrice`,
            { id: item.id, price: val }
          ).then(res => {
            const data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  item.special = parseFloat(val).toFixed(2)
                }
              }
            })
          })
        }
      })
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
      if (self.deliverdata.delivercompany.toString() === '' || self.deliverdata.delivercompany.toString() === '-1' || !self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '') {
        self.$vux.toast.text('请输入物流单号', 'middle')
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
      jweixin.scanQRCode({
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
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'orders'
      })
    },
    init () {
      this.loginUser = User.get()
      this.getData()
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        // if (self.loginUser.isretailer === 2) {
        //   self.initContainer()
        //   self.$vux.loading.hide()
        //   let backUrl = encodeURIComponent(location.href)
        //   location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        // } else {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showSos = true
        } else {
          self.initContainer()
          this.$vux.loading.hide()
          this.showContainer = true
          this.query = this.$route.query
          if (self.query.keyword) {
            self.searchword1 = self.query.keyword
          }
          self.distabdata1 = false
          self.tabdata1 = []
          self.getData1()
        }
        // }
      }
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

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
</style>
