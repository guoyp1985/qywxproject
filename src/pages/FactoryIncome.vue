<template>
  <div class="containerarea font14 retailerrevenue bg-page">
    <template v-if="showContainer">
      <div class="s-topbanner bg-white">
        <div class="s-topbanner s-topbanner1 flex_center toprow pl20 pr20">
          <div class="flex_cell color-white font16">{{$t('Myrevenue')}}</div>
          <div class="align_right" style="width:100px;">
            <div @click="toBank"  class="qbtn font12 color-white" style="border:#fff 1px solid;">我的银行卡</div>
          </div>
          <div class="align_right" style="width:100px;">
            <div class="qbtn font12 color-white" style="border:#fff 1px solid;" @click="popupexplain">{{$t('Get cash explain')}}</div>
          </div>
        </div>
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="swiperChange">{{item}}</tab-item>
        </tab>
      </div>
      <div class="s-container" style="top:88px;">
        <!-- <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
          <swiper-item v-for="(tabitem, index) in tabtxts" :key="index"> -->
            <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', selectedIndex)">
              <div v-if="disData1" class="scroll_list listarea">
                <div v-if="!tabdata1 || tabdata1.length == 0" class="scroll_item color-gray padding10 align_center">
                  <div><i class="al al-wushuju font60" ></i></div>
                  <div class="mt5">暂无待结算记录！</div>
                  <div>客户在线购买成功后，待结算订单金额方可显示在此处！</div>
                </div>
                <div v-else v-for="(item,index1) in tabdata1" :key="index1" class="scroll_item bg-white mt10 list-shadow">
                  <template v-if="item.content.indexOf('厂家佣金') > -1">
                    <div class="pl12 pr12 pt10 pb10">
                      <div class="t-table">
                        <div class="t-cell pic v_middle w45 pr10 border-box">
                          <img class="avatarimg6 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 color-999">{{item.buyername}}</div>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 font12 color-999 disdate align_right">{{ item.dateline | dateformat }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                      <div class="clamp1 font14 color-999"><span class="color-orange7 mr5">{{item.content}}</span><span>{{ item.products }}</span></div>
                      <div class="clamp1 font14 color-gray">厂家佣金: +￥{{ item.special }}</div>
                      <div class="clamp1 font14 color-gray"><span class="db-in">返点佣金: -￥{{ item.income }}</span></div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 flex_right">
                      <div class="font14 color-999">实际收入：</div>
                      <div class="clamp1 color-red4">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </template>
                  <template v-else-if="item.isaward == 1">
                    <div class="pl12 pr12 pt10 pb10">
                    <div class="t-table">
                      <div class="t-cell pic v_middle w45 pr10 border-box">
                        <img class="avatarimg6 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                      </div>
                      <div class="t-cell v_middle" style="color:inherit;">
                        <div class="clamp1 color-999">{{item.linkman}}</div>
                      </div>
                      <div class="t-cell v_middle" style="color:inherit;">
                        <div class="clamp1 font12 color-gray disdate align_right">{{ item.dateline | dateformat }}</div>
                      </div>
                    </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                      <div class="clamp1 font14 color-999">
                        <span class="v_middle color-orange7 mr5">{{ item.content }}</span>
                        <span class="v_middle">{{ item.products }}</span>
                      </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 flex_right">
                      <div class="font14 color-999">实际收入：</div>
                      <div class="clamp1 color-red4">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="pl12 pr12 pt10 pb10">
                      <div class="t-table">
                        <div class="t-cell pic v_middle w45 pr10 border-box">
                          <img class="avatarimg6 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 color-999">{{item.buyername}}</div>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 font12 color-999 disdate align_right">{{ item.dateline | dateformat }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                      <div class="clamp1 font14 color-999"><span class="color-orange7 mr5">{{item.content}}</span><span>{{ item.products }}</span></div>
                      <div class="clamp1 font14 color-gray">
                        <span class="v_middle">订单金额: ￥{{ item.special }}</span>
                        <template v-if="item.postage && item.postage != ''">
                          <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                          <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
                        </template>
                      </div>
                      <div class="clamp1 font14 color-gray" v-if="item.carddeduct && item.carddeduct != '0.00'">优惠券抵扣: -￥{{ item.carddeduct }}</div>
                      <div class="clamp1 font14 color-gray"><span class="db-in">佣金: -￥{{ item.income }}</span><span class="db-in ml20">手续费: -￥{{ item.commission }}</span></div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 flex_right">
                      <div class="font14 color-999">实际收入：</div>
                      <div class="clamp1 color-red4">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', selectedIndex)">
              <div v-if="disData2" class="scroll_list">
                <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item color-gray padding10 align_center">
                  <div><i class="al al-wushuju font60" ></i></div>
                  <div class="mt5">暂无已提现记录！</div>
                  <div>请到【待提现】页面进行提现，提现后的订单金额方可显示在此处！</div>
                </div>
                <div v-else v-for="(item,index1) in tabdata2" :key="index1" class="scroll_item bg-white mt10 list-shadow">
                  <template v-if="item.content.indexOf('厂家佣金') > -1">
                    <div class="pl12 pr12 pt10 pb10">
                      <div class="t-table">
                        <div class="t-cell pic v_middle w45 pr10 border-box">
                          <img class="avatarimg6 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 color-999">{{item.buyername}}</div>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 font12 color-999 disdate align_right">{{ item.dateline | dateformat }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                      <div class="clamp1 font14 color-999"><span class="color-orange7 mr5">{{item.content}}</span><span>{{ item.products }}</span></div>
                      <div class="clamp1 font14 color-gray">厂家佣金: +￥{{ item.special }}</div>
                      <div class="clamp1 font14 color-gray"><span class="db-in">返点佣金: -￥{{ item.income }}</span></div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 flex_right">
                      <div class="font14 color-999">实际收入：</div>
                      <div class="clamp1 color-red4">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </template>
                  <template v-else-if="item.isaward == 1">
                    <div class="pl12 pr12 pt10 pb10">
                    <div class="t-table">
                      <div class="t-cell pic v_middle w45 pr10 border-box">
                        <img class="avatarimg6 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                      </div>
                      <div class="t-cell v_middle" style="color:inherit;">
                        <div class="clamp1 color-999">{{item.linkman}}</div>
                      </div>
                      <div class="t-cell v_middle" style="color:inherit;">
                        <div class="clamp1 font12 color-gray disdate align_right">{{ item.dateline | dateformat }}</div>
                      </div>
                    </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                      <div class="clamp1 font14 color-999">
                        <span class="v_middle color-orange7 mr5">{{ item.content }}</span>
                        <span class="v_middle">{{ item.products }}</span>
                      </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 flex_right">
                      <div class="font14 color-999">实际收入：</div>
                      <div class="clamp1 color-red4">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="pl12 pr12 pt10 pb10">
                      <div class="t-table">
                        <div class="t-cell pic v_middle w45 pr10 border-box">
                          <img class="avatarimg6 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 color-999">{{item.buyername}}</div>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1 font12 color-999 disdate align_right">{{ item.dateline | dateformat }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                      <div class="clamp1 font14 color-999"><span class="color-orange7 mr5">{{item.content}}</span><span class="color-999">{{ item.products }}</span></div>
                      <div class="clamp1 font14 color-gray">
                        <span class="v_middle">订单金额: ￥{{ item.special }}</span>
                        <template v-if="item.postage && item.postage != ''">
                          <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                          <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
                        </template>
                      </div>
                      <div class="clamp1 font14 color-gray" v-if="item.carddeduct && item.carddeduct != '0.00'">优惠券抵扣: -￥{{ item.carddeduct }}</div>
                      <div class="clamp1 font14 color-gray"><span class="db-in">佣金: -￥{{ item.income }}</span><span class="db-in ml20">手续费: -￥{{ item.commission }}</span></div>
                    </div>
                    <div class="pl12 pr12 pt10 pb10 flex_right">
                      <div class="font14 color-999">实际收入：</div>
                      <div class="clamp1 color-red4">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div v-show="(selectedIndex == 2)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', selectedIndex)">
              <div v-if="disData3" class="scroll_list">
                <div v-if="!tabdata3 || tabdata3.length == 0" class="scroll_item color-gray padding10 align_center">
                  <div><i class="al al-wushuju font60" ></i></div>
                  <div class="mt5">暂无已提现记录！</div>
                </div>
                <div v-else v-for="(item,index1) in tabdata3" :key="index1" class="scroll_item bg-white mt10 list-shadow">
                  <div class="pl12 pr12 pt10 pb10">
                    <div class="db-flex">
                      <div class="flex_cell flex_left">
                        <div class="w_100">
                          <div><span>{{item.cashtypetext}}</span><span v-if="item.status == 1" class="color-green2">【{{item.statustext}}】</span><span v-else class="color-theme">【{{item.statustext}}】</span></div>
                          <div class="mt5 color-gray" v-if="item.cmms && item.cmms > 0">手续费: {{ $t('RMB') }}{{item.cmms}}</div>
                          <div class="color-theme mt5" v-if="item.reason && item.reason != ''">{{item.reason}}</div>
                          <div class="mt5 font12 clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                        </div>
                      </div>
                      <div class="w100 flex_right">
                        <div class="clamp1">{{ $t('RMB') }}{{item.money}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <!-- </swiper-item>
        </swiper> -->
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showpopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">{{ $t('Get cash explain') }}</div>
            <div class="popup-middle font14">
              <div class="padding10">
                <div class="bold">第一条 手续费</div>
                <div>1. 交易手续费：聚客365卖家需按订单交易额（含运费）的0.6%承担交易手续费，最低收费金额0.01元，不足0.01元按照0.01元收取。</div>
                <div>2. 提现手续费：</div>
                <div>提现至微信零钱：无需支付手续费。</div>
                <div>提现至银行卡：每笔提现扣除提现金额的0.1%，最低1元，最高25元。</div>
                <div class="bold mt5">第二条 提现规则</div>
                <div>1. 线上交易的订单，需待买家确认收货后，才可以通过“我的收入”查看并提现收益。</div>
                <div>2. 待提现金额不足1元时无法进行提现。</div>
                <div>3. 微信规定每日提现至微信零钱的额度为5千元，每日提现至银行卡的额度为2万元。</div>
                <div>4. 提现至银行卡的到账时间为1-3日内，具体以银行到账时间为准。</div>
                <div class="bold mt5">第三条 退款订单处理规则</div>
                <div>1. 当订单为“待发货”状态时，买家可主动发起交易退款，聚客365将整单全额退款，不收取手续费。</div>
                <div>2. 当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可与卖家互加好友，线下协商解决，手续费不予退还。</div>
                <div class="bold mt5">第四条 确认收货规则</div>
                <div>线上交易的订单，若买家没有主动确认收货，系统将在卖家发货后的第7天自动确认收货。</div>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Know txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <popup class="bg-white" v-model="showMoneyPopup" position="bottom">
          <div class="">
            <div class="padding10">本次提现金额为 <span class='color-red'>{{summoney}} 元</span></div>
            <div class="pb20">
              <check-icon class="red-check" :value.sync="wechatCash" @click.native.stop="setCashType()">提现到微信</check-icon>
              <check-icon class="red-check" :value.sync="bankCash" @click.native.stop="setCashType('bank')">提现到银行卡</check-icon>
            </div>
          </div>
          <div class="flex_center" style="width:100%;height:45px;">
            <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closeMoneyPopup">取消</div>
            <div class="flex_cell bg-red color-white h_100 flex_center" @click="getcash">确认提现</div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Popup, XImg, CheckIcon } from 'vux'
import { User } from '#/storage'
import Time from '#/time'
import ENV from 'env'

const limit = 10
let pageStart1 = 0
let pageStart2 = 0
let pageStart3 = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Popup, CheckIcon, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      loginUser: {},
      tabtxts: [ '待结算', '已结算', '提现明细' ],
      selectedIndex: 0,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      disData1: false,
      disData2: false,
      disData3: false,
      totalPrice: '0.00',
      checkedData: [],
      checkedAll: true,
      showpopup: false,
      eventIng: false,
      summoney: '0.00',
      showMoneyPopup: false,
      wechatCash: true,
      bankCash: false,
      fromPage: '',
      showContainer: false
    }
  },
  methods: {
    toBank () {
      this.$router.push({path: '/bindingBank', query: {fromPage: this.fromPage}})
    },
    clickCash () {
      this.showMoneyPopup = true
    },
    closeMoneyPopup () {
      this.showMoneyPopup = false
    },
    setCashType (type) {
      if (type === 'bank') {
        this.bankCash = true
        this.wechatCash = false
      } else {
        this.bankCash = false
        this.wechatCash = true
      }
    },
    handleScroll (refname, index) {
      const self = this
      let scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          console.log('滚动到底部')
          console.log(index)
          if (index === 0 && self.tabdata1.length === (pageStart1 + 1) * limit) {
            self.$vux.loading.show()
            pageStart1++
            self.getData1()
          } else if (index === 1 && self.tabdata2.length === (pageStart2 + 1) * limit) {
            self.$vux.loading.show()
            pageStart2++
            self.getData2()
          } else if (index === 2 && self.tabdata3.length === (pageStart3 + 1) * limit) {
            self.$vux.loading.show()
            pageStart3++
            self.getData3()
          }
        }
      })
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { from: 'retailerrevenue', pagestart: pageStart1, limit: limit, cashed: 2 } }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.disData1 = true
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { from: 'retailerrevenue', pagestart: pageStart2, limit: limit, cashed: 0 } }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.disData2 = true
      })
    },
    getData3 () {
      this.$vux.loading.show()
      const self = this
      const params = { pagestart: pageStart3, limit: limit }
      self.$http.post(`${ENV.BokaApi}/api/accounting/cashList`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.disData3 = true
      })
    },
    getcash () {
      const self = this
      if (!self.eventIng) {
        let fromPage = ''
        if (self.query.appid) {
          fromPage = encodeURIComponent(`/retailerRevenue?appid=${self.query.appid}`)
        } else {
          fromPage = encodeURIComponent('/retailerRevenue')
        }
        if (!self.loginUser.idcardno || self.loginUser.idcardno === '') {
          self.$router.push({path: '/authPhoto', query: {fromPage: fromPage}})
        } else {
          this.showMoneyPopup = false
          let cashstr = '微信'
          let cashtype = 'lingqian'
          if (this.bankCash) {
            cashstr = '银行卡'
            cashtype = 'yinhang'
          }
          if (this.bankCash && (!this.loginUser.bankcardno || this.loginUser.bankcardno === '')) {
            self.$vux.confirm.show({
              content: `您还没有绑定银行卡`,
              confirmText: '去绑定',
              onConfirm: () => {
                self.$router.push({path: '/bindingBank', query: {fromPage: fromPage}})
              }
            })
            return false
          }
          self.$vux.confirm.show({
            content: `本次提现金额为<span class='color-orange'>${self.summoney}元</span>，确认提现到${cashstr}吗？`,
            onConfirm: () => {
              self.eventIng = true
              self.$vux.loading.show()
              let postData = {type: cashtype, money: self.summoney}
              if (self.query.appid) {
                postData.appid = self.query.appid
              }
              self.$http.post(`${ENV.BokaApi}/api/accounting/cashMoney`, postData).then(function (res) {
                let data = res.data
                self.$vux.loading.hide()
                self.$vux.toast.show({
                  text: data.error,
                  time: self.$util.delay(data.error),
                  onHide: function () {
                    if (data.flag === 1) {
                      self.totalPrice = '0.00'
                      self.tabdata1 = []
                      self.summoney = '0.00'
                    }
                    self.eventIng = false
                  }
                })
              })
            }
          })
        }
      }
    },
    popupexplain () {
      this.showpopup = !this.showpopup
    },
    closepopup () {
      this.showpopup = false
    },
    swiperChange (index) {
      console.log('进入到了选项卡change页面')
      if (index !== undefined) {
        this.selectedIndex = index
      }
      console.log(this.selectedIndex)
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < limit) {
            pageStart1 = 0
            this.distabdata1 = false
            this.totalPrice = '0.00'
            this.tabdata1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < limit) {
            pageStart2 = 0
            this.distabdata2 = false
            this.tabdata2 = []
            this.getData2()
          }
          break
        case 2:
          if (this.tabdata3.length < limit) {
            pageStart3 = 0
            this.distabdata3 = false
            this.tabdata3 = []
            this.getData3()
          }
          break
      }
    },
    init () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'revenue'
      })
    },
    initData () {
      pageStart1 = 0
      pageStart2 = 0
      pageStart3 = 0
      this.showContainer = false
      this.eventIng = false
      this.selectedIndex = 0
      this.disData1 = false
      this.disData2 = false
      this.disData3 = false
      this.tabdata1 = []
      this.tabdata2 = []
      this.tabdata3 = []
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      this.query = this.$route.query
      this.loginUser = User.get()
      if (this.query.appid) {
        this.fromPage = encodeURIComponent(`/income?appid=${this.query.appid}`)
      } else {
        this.fromPage = encodeURIComponent('/income')
      }
      this.showContainer = true
      if (this.query.flag === '1' || this.query.flag === 1) {
        console.log(1)
        this.selectedIndex = 1
      } else if (this.query.flag === '2' || this.query.flag === 2) {
        console.log(2)
        this.selectedIndex = 2
      }
      this.swiperChange()
    }
  },
  created () {
    this.init()
  },
  activated () {
    console.log('in 进入到了 activated')
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.retailerrevenue .scroll_list .scroll_item:after{display:none;}
.retailerrevenue .scroll_list .scroll_item:not(:last-child){margin-bottom:10px;}
.retailerrevenue .weui-icon-success{color: #ea3a3a;}
.retailerrevenue .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{color: #ea3a3a;}
</style>
