<template>
  <div id="order-management-page" :class="`containerarea bg-page font14 ordermanagement ${showTip ? 'show-tip-page' : ''}`">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div v-if="showTip" class="pagetop border-box db-flex top-subscribe-tip">
        <div class="flex_cell h_100 flex_left">
          <i class="al al-gantanhaozhong font20"></i><span>关注公众号可及时接收私信提醒</span>
        </div>
        <div class="w80 h_100 flex_right">
          <div class="btn flex_center" @click="toSubscribe">立即关注</div>
        </div>
      </div>
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
          <tab v-model="selectedIndex" class="" active-color="#ea3a3a" default-color="#666666">
            <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index">{{item}}</tab-item>
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
                  <div>积极分享商品或活动，客户才会购买哦~</div>
                </div>
                <managetemplate v-else @clickCancel="clickCancel" @clickConfirm="clickConfirm" @uploadDeliver="uploadDeliver" @viewDeliver="viewDeliver" v-for="(item,index1) in tabdata1" :key="item.id" :data="item" :dataIndex="index1">
                  <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span>
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
                            <span class="v_middle">待支付: {{ $t('RMB') }}</span><span class="v_middle">{{ item.paymoney }}</span>
                            <template v-if="item.postage && item.postage != ''">
                              <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                              <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
                            </template>
                          </div>
                        </div>
                        <div class="t-cell v_middle appendcontrol align_right w80">
                          <div class="qbtn4 font12" style="padding:1px 14px;" @click="changePrice(item,index1)">{{ $t('Change price') }}</div>
                        </div>
                      </template>
                      <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 2 && item.candeliver">
                        <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploadDeliver(item,index)">{{ $t('Deliver goods') }}</div>
                      </div>
                      <div class="t-cell v_middle appendcontrol align_right w80" v-if="item.flag == 3">
                        <router-link :to="{path: '/deliverinfo', query: {id: item.id}}" class="qbtn4 color-orange7 font12" style="border:1px solid #ee9f25;padding:1px 8px">{{ $t('View deliver') }}</router-link>
                      </div>
                    </div>
                  </div>
                </managetemplate>
              </div>
            </div>
            <div v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',index)">
              <div v-if="distabdata2" class="scroll_list">
                <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 align_center color-gray">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">暂无相关订单！</div>
                  <div>积极分享商品或活动，客户才会购买哦~</div>
                </div>
                <managetemplate v-else @clickConfirm="clickConfirm" v-for="(item,index1) in tabdata2" :key="item.id" :data="item" :dataIndex="index1">
                  <!-- <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span> -->
                  <manageproducttemplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item">
                    <img slot="photo" class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
                    <span slot="name">{{ product.name }}</span>
                    <span slot="special">{{ product.special }}</span>
                    <span slot="quantity" class="font12">{{ product.quantity }}</span>
                    <span slot="createdate">{{ product.dateline | dateformat }}</span>
                  </manageproducttemplate>
                  <div slot="receivearea">
                    <div class="t-table">
                      <div class="font12 color-lightgray"><span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span></div>
                      <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                        <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                      </div>
                    </div>
                    <div v-if="item.flag == 1 && item.fid == 0 && item.crowdid == 0" class="t-table pt5 color-lightgray font13 deliverarea" >
                      <div class="t-cell v_middle align_left color-orange">
                        <div class="clamp1">
                          <span class="v_middle">待支付: {{ $t('RMB') }}</span><span class="v_middle">{{ item.paymoney }}</span>
                          <template v-if="item.postage && item.postage != ''">
                            <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                            <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
                          </template>
                        </div>
                      </div>
                      <div class="t-cell v_middle appendcontrol align_right w80">
                        <div class="qbtn4 font12" style="padding:1px 14px;" @click="changePrice(item,index1)">{{ $t('Change price') }}</div>
                      </div>
                    </div>
                  </div>
                </managetemplate>
              </div>
            </div>
            <div v-if="(index == 2)" class="swiper-inner scroll-container31" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3',index)">
              <div v-if="distabdata3" class="scroll_list">
                <div v-if="!tabdata3 || tabdata3.length === 0" class="scroll_item padding10 align_center color-gray">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">暂无相关订单！</div>
                  <div>积极分享商品或活动，客户才会购买哦~</div>
                </div>
                <managetemplate v-else v-for="(item,index1) in tabdata3" :key="item.id" :data="item" :dataIndex="index1" @uploadDeliver="uploadDeliver">
                  <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span>
                  <manageproducttemplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item">
                    <img slot="photo" class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
                    <span slot="name">{{ product.name }}</span>
                    <span slot="special">{{ product.special }}</span>
                    <span slot="quantity" class="font12">{{ product.quantity }}</span>
                    <span slot="createdate">{{ product.dateline | dateformat }}</span>
                  </manageproducttemplate>
                  <div slot="receivearea">
                    <div class="t-table">
                      <div class="font12 color-lightgray"><span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span></div>
                      <div v-if="item.seller && item.seller.uid" class="t-cell v_middle align_right color-lightgray font12">
                        <div class="clamp1">{{ $t('Rebate customer') }}: {{ item.seller.username }}</div>
                      </div>
                    </div>
                    <div v-if="item.candeliver" class="t-table pt5 color-lightgray font13 deliverarea">
                      <div class="t-cell middle-cell appendcontrol align_right w80">
                        <div class="qbtn4 font12" style="padding:1px 14px;" @click="uploadDeliver(item,index)">{{ $t('Deliver goods') }}</div>
                      </div>
                    </div>
                  </div>
                </managetemplate>
              </div>
            </div>
            <div v-if="(index == 3)" class="swiper-inner scroll-container4" ref="scrollContainer4" @scroll="handleScroll('scrollContainer4',index)">
              <div v-if="distabdata4" class="scroll_list">
                <div v-if="!tabdata4 || tabdata4.length === 0" class="scroll_item padding10 align_center color-gray">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">暂无相关订单！</div>
                  <div>积极分享商品或活动，客户才会购买哦~</div>
                </div>
                <managetemplate v-else v-for="(item,index1) in tabdata4" :key="item.id" :data="item" :dataIndex="index1" @viewDeliver="viewDeliver">
                  <span slot="orderno">{{ item.orderno }}</span>
                  <span slot="flagstr">{{ item.flagstr }}</span>
                  <manageproducttemplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item">
                    <img slot="photo" class="imgcover" :src="product.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
                    <span slot="name">{{ product.name }}</span>
                    <span slot="special">{{ product.special }}</span>
                    <span slot="quantity" class="font12">{{ product.quantity }}</span>
                    <span slot="createdate">{{ product.dateline | dateformat }}</span>
                  </manageproducttemplate>
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
                </managetemplate>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div v-transfer-dom class="x-popup popup-deliver">
        <popup v-model="showDeliver" height="100%">
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
              <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closeDeliver">{{ $t('Close') }}</div>
              <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmDeliver">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
    </template>
    <div class="modalarea flex_center" v-if="showConfirm">
      <div class="modalSure font14">
        <div class="align_center font16">请确认是否收到买家的付款</div>
        <div class="flex_table flex_center" style="margin-top:50px;">
          <div class="flex_left">
            <div style="width:100px;">备注付款金额</div>
            <x-input v-model="price" class="input" type="text" placeholder="输入金额" maxlength="10" size="10"></x-input>
            <div class="flex_right" style="width:30px;">元</div>
          </div>
        </div>
        <div class="flex_table flex_center" style="margin-top:50px;">
          <div @click="closeModal" class="btns canle align_center mr10">取消</div>
          <div class="btns sure align_center ml10" @click="confirmOrder">确认收款</div>
        </div>
      </div>
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
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg, Search, XInput } from 'vux'
import Managetemplate from '@/components/Managetemplate'
import Manageproducttemplate from '@/components/Manageproducttemplate'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, Managetemplate, Manageproducttemplate, XImg, Subscribe, ApplyTip, Search, XInput
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showConfirm: false,
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      tabtxts: [ '全部', '待确认', '待发货', '已发货' ],
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
      showDeliver: false,
      deliveritem: null,
      deliverindex: 0,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' },
      autofixed: false,
      searchword1: '',
      showTip: false,
      price: '',
      clickData: null,
      clickIndex: 0
    }
  },
  methods: {
    clickCancel (item, index) {
      console.log(this.tabdata1[index])
      this.$vux.confirm.show({
        content: '确定要取消该订单吗？',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/ordersoffline/state`, {
            id: item.id, type: 'cancel'
          }).then(res => {
            const data = res.data
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: this.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  this.tabdata1[index].flag = 0
                  console.log(this.tabdata1[index])
                }
              }
            })
          })
        }
      })
    },
    clickConfirm (item, index) {
      this.clickData = item
      this.clickIndex = index
      this.showConfirm = true
    },
    viewDeliver (item, index) {
      this.clickData = item
      this.clickIndex = index
      let params = this.$util.handleAppParams(this.query, {id: item.id})
      this.$router.push({path: '/simpleDeliverinfo', query: params})
    },
    closeModal () {
      this.showConfirm = false
    },
    toSubscribe () {
      this.$wechat.miniProgram.navigateTo({url: '/pages/subscribe'})
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      this.searchword1 = ''
    },
    onSubmit1 () {
      const kw = this.searchword1
      this.searchword1 = ''
      this.$router.push({path: '/RetailerOrderSearch', query: {keyword: kw}})
    },
    confirmOrder () {
      let inputMoney = `${this.price}`
      if (inputMoney.indexOf(',') > -1) {
        inputMoney = inputMoney.replace(/,/g, '')
      }
      if (inputMoney === '' || isNaN(inputMoney) || parseFloat(inputMoney) < 0) {
        this.$vux.toast.show({
          text: '请输入正确的付款金额',
          width: '200px',
          type: 'text'
        })
        return false
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/ordersoffline/state`, {
        id: this.clickData.id, type: 'confirm', price: inputMoney
      }).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              const retdata = data.data
              switch (this.clickIndex) {
                case 0:
                  this.tabdata1[this.clickIndex] = retdata
                  break
                case 1:
                  this.tabdata2[this.clickIndex] = retdata
                  break
              }
              this.showConfirm = false
            }
          }
        })
      })
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
                self.pagestart1++
                self.getData1()
              }
              break
            case 1:
              if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
                self.pagestart2++
                self.getData2()
              }
              break
            case 2:
              if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
                self.pagestart3++
                self.getData3()
              }
              break
            case 3:
              if (self.tabdata4.length === (self.pagestart4 + 1) * self.limit) {
                self.pagestart4++
                self.getData4()
              }
              break
          }
        }
      })
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/ordersoffline/list`, params).then(function (res) {
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
      const params = { params: { flag: 1, pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/ordersoffline/list`, params).then(function (res) {
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
      const params = { params: { flag: 2, pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/ordersoffline/list`, params).then(function (res) {
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
      const params = { params: { flag: 3, pagestart: self.pagestart4, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/ordersoffline/list`, params).then(function (res) {
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
    changePrice (item, index) {
      event.preventDefault()
      const self = this
      let showtitle = '修改价格'
      let inputval = item.paymoney.replace(/,/g, '')
      self.$vux.confirm.prompt(inputval, {
        title: showtitle,
        onShow: () => {
          self.$vux.confirm.setInputValue(inputval)
        },
        onConfirm: (val) => {
          if (val === undefined || self.$util.trim(val) === '' || isNaN(val) || parseFloat(val) < 0) {
            self.$vux.toast.text('请输入正确的价格', 'middle')
            return false
          }
          self.$vux.loading.show()
          val = val.replace(/,/g, '')
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
                  if (this.selectedIndex === 0) {
                    this.tabdata1[index].paymoney = parseFloat(val).toFixed(2)
                  } else if (this.selectedIndex === 1) {
                    this.tabdata2[index].paymoney = parseFloat(val).toFixed(2)
                  }
                }
              }
            })
          })
        }
      })
    },
    uploadDeliver (item, index) {
      console.log('click deliver')
      const self = this
      self.deliveritem = item
      self.deliverindex = index
      this.clickIndex = index
      this.clickData = item
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
      this.showDeliver = true
    },
    confirmDeliver () {
      const self = this
      if (self.deliverdata.delivercompany.toString() === '' || self.deliverdata.delivercompany.toString() === '-1' || !self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '') {
        self.$vux.toast.text('请输入物流单号', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/ordersoffline/state`, {
        ...self.deliverdata, id: this.clickData.id, type: 'deliver'
      }).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              const retdata = data.data
              switch (this.clickIndex) {
                case 0:
                  this.tabdata1[this.clickIndex] = retdata
                  break
                case 2:
                  this.tabdata3[this.clickIndex] = retdata
                  break
              }
              this.closeDeliver()
            }
          }
        })
      })
    },
    closeDeliver () {
      this.clickData = null
      this.clickIndex = 0
      this.showDeliver = false
      this.deliveritem = null
      this.deliverindex = 0
      this.deliverdata = { delivercompany: '-1', delivercode: '' }
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
      if (this.$route.query.from && this.loginUser.subscribe !== 1) {
        this.showTip = true
      }
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showSos = true
        } else {
          self.initContainer()
          this.$vux.loading.hide()
          this.showContainer = true
          this.query = this.$route.query
          if (this.query.flag === '1') {
            this.selectedIndex = 1
          } else if (this.query.flag === '2') {
            this.selectedIndex = 2
          } else if (this.query.flag === '3') {
            this.selectedIndex = 3
          } else {
            this.selectedIndex = 0
          }
          if (this.selectedIndex === 0) {
            this.swiperChange()
          }
        }
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

<style lang="less">
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.ordermanagement{
  .s-topbanner{height:99px;}
  .s-container{top:99px;}
  .modalSure{
    width:70%;background-color:#ffffff;padding:20px 10px;box-sizing:border-box;border-radius:10px;
    input{border:1px solid #e5e5e5;width:100%;height:30px;line-height:30px;padding:0 5px;}
    .btns{width:100px;height:35px;line-height:35px;border-radius:5px;}
    .canle{background-color:#e0e0e0;}
    .sure{background-color:#fc6863;color:#ffffff;}
    .weui-cell{padding:0;}
  }
}
.ordermanagement.show-tip-page{
  .s-topbanner{top:48px;}
  .s-container{top:147px;}
}
</style>
