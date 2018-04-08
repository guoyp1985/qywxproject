<template>
  <div class="containerarea font14">
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
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item v-for="(item, index) in tabtxts" :key="index">
          <template v-if="(index == 0)">
            <div style="position:absolute;left:0;top:0;right:0;bottom:45px;overflow-y:auto;">
              <div class="scroll_list pl10 pr10">
                <Checkboxitemplate v-for="(item,index) in getCheckdata" >
                  <input slot="checkbox" type="checkbox" :checked="item.checked" @click="checkboxclick(item)" />
                  <img slot="pic" :src="item.avatar" class="avatarimg1" />
                  <div slot="title" class="clamp1">{{item.buyername}}</div>
                  <div slot="title" class="mt3 clamp1 font12 color-gray"><span class="color-orange mr5">{{ item.content }}</span><span class="disproducts">{{ item.products }}</span></div>
                  <div slot="title" class="clamp1 font12 color-gray disdate">{{ item.dateline | dateformat }}</div>
                  <div class="clamp1 color-orange">{{ $t('RMB') }}{{item.money}}</div>
                </Checkboxitemplate>
              </div>
            </div>
            <div class="toolbar_bg" style="position:absolute;left:0;bottom:0;right:0;height:45px;">
              <div class="t-table h_100">
                <div class="t-cell h_100 v_middle checkAll pl10 w70">
                  <label class="qcheckbox m0">
                    <input type="checkbox" :checked="checkedAll" @click="checkAll" />
                    <i class="al"></i><span class="v_middle">全选</span>
                  </label>
                </div>
                <div class="t-cell h_100 v_middle align_left pl20">合计：<font class="color-orange">{{ $t('RMB') }}<span>{{ totalPrice }}</span></font></div>
                <div class="t-cell h_100 v_middle font16 align_center bg-orange1 color-white w80" >提现</div>
              </div>
            </div>
          </template>
          <template v-if="(index == 1)">
            <div class="scroll_list pl10 pr10">
              <Listplate v-for="(item,index) in tabdata2" >
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
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Popup } from 'vux'
import Checkboxitemplate from './Checkboxitemplate'
import Listplate from './Listplate'
import Time from '../../libs/time'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Checkboxitemplate,
    Listplate,
    Popup
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '未提现', '已提现' ],
      tabmodel: 0,
      tabdata1: [
        {
          id: '1', uid: '51', dateline: 1522221270, content: '订单收入', buyername: '艳绝天下', username: '贪吃小松鼠', products: '欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年', money: '1.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          id: '2', uid: '272', dateline: 1522221270, content: '订单收入', buyername: '周学江', username: 'zxj', products: '苹果手机', money: '0.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          id: '3', uid: '29', dateline: 1522221270, content: '订单收入', buyername: '销售宝技术支持', username: '网络影响力', products: '苹果手机', money: '1214.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          id: '4', uid: '4', dateline: 1522221270, content: '订单收入', buyername: '销售宝技术支持', username: '楚风越韵  🏠', products: '苹果手机', money: '89.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          id: '5', uid: '2', dateline: 1522221270, content: '订单收入', buyername: '销售宝技术支持', username: '仇红波', products: '苹果手机', money: '840.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ],
      tabdata2: [
        {
          id: '1', uid: '51', dateline: 1522221270, content: '订单收入', buyername: '艳绝天下', username: '贪吃小松鼠', products: '苹果手机', money: '1.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          id: '2', uid: '272', dateline: 1522221270, content: '订单收入', buyername: '周学江', username: 'zxj', products: '苹果手机', money: '0.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          id: '3', uid: '29', dateline: 1522221270, content: '订单收入', buyername: '销售宝技术支持', username: '网络影响力', products: '苹果手机', money: '1214.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          id: '4', uid: '4', dateline: 1522221270, content: '订单收入', buyername: '销售宝技术支持', username: '楚风越韵  🏠', products: '苹果手机', money: '89.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          id: '5', uid: '2', dateline: 1522221270, content: '订单收入', buyername: '销售宝技术支持', username: '仇红波', products: '苹果手机', money: '840.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ],
      totalPrice: '0.00',
      checkdata: this.tabdata1,
      checkedAll: true,
      showpopup: false
    }
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
    checkboxclick (d) {
      d.checked = !d.checked
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
      this.checkedAll = !this.checkedAll
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
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/center.less';
@import '../assets/fonts.less';
@import '../assets/global.less';
</style>
