<template>
  <div class="containerarea font14 retailerrevenue">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Myrevenue')}}</div>
          <div class="pr10 align_right" style="width:150px;">
            <div class="qbtn font12" style="border:#fff 1px solid;"  @click="popupexplain">{{$t('Get cash explain')}}</div>
          </div>
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
          <template v-if="(index == 0)">
            <div style="position:absolute;left:0;top:0;right:0;bottom:45px;overflow-y:auto;">
              <div class="scroll_list pl10 pr10">
                <div v-if="!getCheckdata || getCheckdata.length == 0" class="scroll_item color-gray padding10 align_center">
                  <div><i class="al al-wushuju font60" ></i></div>
                  <div class="mt5">暂无待提现金额记录！</div>
                  <div>若客户已购买商品，需等待客户确认收货后，待提现金额方可显示在此处，可点击右上角【提现说明】了解更多提现问题！</div>
                </div>
                <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in tabdata1" :key="item.id" :value.sync="item.checked" @click.native.stop="checkboxclick(item,index)">
                  <div class="t-table">
                    <div class="t-cell pic v_middle w50">
                      <img :src="item.avatar" class="avatarimg1" />
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1">{{item.buyername}}</div>
                      <div class="mt3 clamp1 font12 color-gray"><span class="color-orange mr5">{{ item.content }}</span><span class="disproducts">{{ item.products }}</span></div>
                      <div class="clamp1 font12 color-gray disdate">{{ item.dateline | dateformat }}</div>
                    </div>
                    <div class="t-cell align_right v_middle w100">
                      <div class="clamp1 color-orange">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </div>
                </check-icon>
              </div>
            </div>
            <div class="toolbar_bg" style="position:absolute;left:0;bottom:0;right:0;height:45px;">
              <div class="t-table h_100">
                <div class="t-cell h_100 v_middle w100">
                  <check-icon class="x-check-icon" :value.sync="checkedAll" @click.native.stop="checkAll">全选</check-icon>
                </div>
                <div class="t-cell h_100 v_middle align_left">合计：<font class="color-orange">{{ $t('RMB') }}<span>{{ totalPrice }}</span></font></div>
                <div class="t-cell h_100 v_middle font16 align_center bg-orange1 color-white w80" >提现</div>
              </div>
            </div>
          </template>
          <template v-if="(index == 1)">
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-wushuju font60" ></i></div>
                <div class="mt5">暂无待提现金额记录！</div>
                <div>请到【待提现】页面进行提现，提现后的订单金额方可显示在此处！</div>
              </div>
              <Listplate v-else v-for="(item,index1) in tabdata2" :key="item.id">
                <img slot="pic" :src="item.avatar" class="avatarimg1" />
                <div slot="title" class="clamp1">{{item.buyername}}</div>
                <div slot="title" class="mt3 clamp1 font12 color-gray"><span class="color-orange mr5">{{ item.content }}</span><span>{{ item.products }}</span></div>
                <div slot="title" class="clamp1 font12 color-gray disdate">{{ item.dateline | dateformat }}</div>
                <div class="clamp1 color-orange">{{ $t('RMB') }}{{item.money}}</div>
              </Listplate>
            </div>
          </template>
          <template v-if="(index == 2)">
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-wushuju font60" ></i></div>
                <div class="mt5">暂无待结算订单记录！</div>
                <div>客户在线购买成功后，待结算订单金额方可显示在此处！</div>
              </div>
              <Listplate v-else v-for="(item,index1) in tabdata3" :key="item.id">
                <img slot="pic" :src="item.avatar" class="avatarimg1" />
                <div slot="title" class="clamp1">{{item.buyername}}</div>
                <div slot="title" class="mt3 clamp1 font12 color-gray"><span class="color-orange mr5">{{ item.content }}</span><span>{{ item.products }}</span></div>
                <div slot="title" class="clamp1 font12 color-gray disdate">{{ item.dateline | dateformat }}</div>
                <div class="clamp1 color-orange">{{ $t('RMB') }}{{item.money}}</div>
              </Listplate>
            </div>
          </template>
        </swiper-item>
      </swiper>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Get cash explain') }}</div>
          <div class="popup-middle font14">
            <div class="padding10">
              <div class="bold">第一条 手续费</div>
              <div class="">共销宝卖家需按订单交易额（含运费）的1%承担交易手续费，最低收费金额0.01元，不足0.01元按照0.01元收取。</div>
              <div class="bold mt5">第二条 提现规则</div>
              <div>线上交易的订单，需待买家确认收货后，才可以通过“我的收入”查看并提现收益，未提现金额不足1元时无法进行提现。</div>
              <div class="bold mt5">第三条 退款订单处理规则</div>
              <div>（1）当订单为“待发货”状态时，买家可主动发起交易退款，共销宝将整单全额退款，不收取手续费。</div>
              <div>（2）当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可通过“申请维权”与卖家互加好友，线下协商解决，手续费不予退还。</div>
              <div class="bold mt5">第四条 确认收货规则</div>
              <div>线上交易的订单，若买家没有主动确认收货，系统将在卖家发货后的第七天自动确认收货。</div>
              <div class="bold mt5">第五条 奖励金规则</div>
              <div>（1）线上交易的订单，卖家有机会获得平台奖励金，奖励金将在买家确认收货后，与订单金额一起提现。</div>
              <div>（2）若买家对获得奖励金的订单进行了退款，该订单所获得的奖励金将失效。</div>
              <div class="align_center pt20 pb20">
                      <a class="color-blue" href="support.php">如有其他疑问或建议，点击此处联系客服</a>
              </div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Know txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
Get cash explain:
  zh-CN: 提现说明
Rebate customer:
  zh-CN: 返点客户
Share invite customer:
  zh-CN: 分享邀请返点客户
Rebate manage:
  zh-CN: 返点管理
Message text:
  zh-CN: 早上八点到晚上十一点可以发送消息,但只有48小时内互动过的返点客户才能收到消息,消息将通过博卡授权中心 公众号直接推送给返点客户,每日只能推送一次。
Send text:
  zh-CN: 发送
Know txt:
  zh-CN: 知道了
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Popup, CheckIcon } from 'vux'
import Listplate from '@/components/Listplate'
import Time from '#/time'
import ENV from '#/env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Listplate,
    Popup,
    CheckIcon
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '未提现', '待结算', '已提现' ],
      tabmodel: 0,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      totalPrice: '0.00',
      checkdata: this.tabdata1,
      checkedAll: true,
      showpopup: false,
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      isBindScroll3: false,
      scrollArea1: null,
      scrollArea2: null,
      scrollArea3: null
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.getdata1()
  },
  computed: {
    getCheckdata: function () {
      let curdata = this.tabdata1
      for (var i = 0; i < curdata.length; i++) {
        let d = curdata[i]
        d.checked = true
      }
      this.checkdata = curdata
      return curdata
    },
    getTotalprice: function () {
      let curdata = this.checkdata
      for (var i = 0; i < curdata.length; i++) {
        let d = curdata[i]
        if (d.checked) {
          this.totalPrice = parseFloat(this.totalPrice) + parseFloat(d.money)
        }
      }
      this.totalPrice = this.totalPrice.toFixed(2)
      return this.totalPrice
    }
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
          if (self.tabdata3.length === self.pagestart3 + self.limit) {
            self.pagestart3 += self.limit
            self.getdata3()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/accounting/list`, {
        params: { from: 'retailerrevenue', pagestart: self.pagestart1, limit: self.limit }
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.retailerrevenue .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea2 = items[1]
          self.scrollArea3 = items[2]
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getdata2 () {
      const self = this
      let params = { params: { from: 'retailerrevenue', pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list`, params).then(function (res) {
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
      let params = { params: { from: 'retailerrevenue', pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list`, params).then(function (res) {
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
    checkboxclick (d) {
      this.totalPrice = 0
      let curdata = this.checkdata
      for (var i = 0; i < curdata.length; i++) {
        let d = curdata[i]
        if (d.checked) {
          this.totalPrice = parseFloat(this.totalPrice) + parseFloat(d.money)
        }
      }
      this.totalPrice = this.totalPrice.toFixed(2)
    },
    checkAll () {
      let curdata = this.checkdata
      for (var i = 0; i < curdata.length; i++) {
        let d = curdata[i]
        curdata[i].checked = this.checkedAll
        if (this.checkedAll) {
          this.totalPrice = parseFloat(this.totalPrice) + parseFloat(d.money)
        } else {
          this.totalPrice = 0
        }
      }
    },
    popupexplain () {
      this.showpopup = !this.showpopup
    },
    closepopup () {
      this.showpopup = false
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
      }
    }
  }
}
</script>

<style lang="less">
</style>
