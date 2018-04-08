<template>
  <div class="containerarea s-havebottom">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Myrevenue')}}</div>
          <div class="pr10 align_right" style="width:150px;">
            <div class="qbtn" style="border:#fff 1px solid;">{{$t('Get cash explain')}}</div>
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
          <div v-if="(index == 0)">
            <search
              class="x-search"
              position="absolute"
              auto-scroll-to-top top="0px"
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search">
            </search>
            <div class="scroll_list pl10 pr10">
              <Listplate v-for="(item,index) in tabdata1" :key="index">
                <img slot="pic" :src="item.avatar" class="avatarimg1" />
                <div slot="title" class="clamp1 font14">{{item.username}}({{item.linkman}})</div>
                <div slot="title" class="clamp1 mt5 font12 color-gray">带来消费：￥{{item.sales}}</div>
                <div class="qbtn bg-green color-white">联系</div>
              </Listplate>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div class="scroll_list pl10 pr10 cols-2">
              <Listplate v-for="(item,index) in tabdata2" :key="index">
                <img slot="pic" :src="item.avatar" class="avatarimg1" />
                <div slot="title" class="clamp1 font14">{{item.linkman}}</div>
                <div slot="title" class="clamp1 mt5 font12 color-gray">{{ item.dateline | dateformat }} 返点金额：￥{{item.sales}}</div>
              </Listplate>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom flex_center bg-blue3 color-white font18">{{$t('Rebate manage')}}</div>
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
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group } from 'vux'
import Listplate from './Listplate'
import Time from '../../libs/time'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Search,
    Listplate,
    XTextarea,
    Group
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
          id: '1', uid: '51', dateline: 1522221270, linkman: '艳绝天下', username: '贪吃小松鼠', sales: '1.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          id: '2', uid: '272', dateline: 1522221270, linkman: '周学江', username: 'zxj', sales: '0.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          id: '3', uid: '29', dateline: 1522221270, linkman: '销售宝技术支持', username: '网络影响力', sales: '1214.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          id: '4', uid: '4', dateline: 1522221270, linkman: '销售宝技术支持', username: '楚风越韵  🏠', sales: '89.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          id: '5', uid: '2', dateline: 1522221270, linkman: '销售宝技术支持', username: '仇红波', sales: '840.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ],
      tabdata2: [
        {
          id: '1', uid: '51', dateline: 1522221270, linkman: '艳绝天下', username: '贪吃小松鼠', sales: '1.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          id: '2', uid: '272', dateline: 1522221270, linkman: '周学江', username: 'zxj', sales: '0.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          id: '3', uid: '29', dateline: 1522221270, linkman: '销售宝技术支持', username: '网络影响力', sales: '1214.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          id: '4', uid: '4', dateline: 1522221270, linkman: '销售宝技术支持', username: '楚风越韵  🏠', sales: '89.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          id: '5', uid: '2', dateline: 1522221270, linkman: '销售宝技术支持', username: '仇红波', sales: '840.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ]
    }
  },
  methods: {
    setFocus () {
    },
    resultClick (item) {
    },
    getResult (val) {
    },
    onSubmit () {
    },
    onFocus () {
    },
    onCancel () {
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/center.less';
@import '../assets/global.less';
</style>
