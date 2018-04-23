<template>
  <div class="containerarea bg-white fong14">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Rebate customer')}}</div>
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
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
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
              <div v-if="!data1 || data1.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">竟然没有返点客，点击【邀请返点客】，选择客户并【邀请】，与返点客一起赚钱吧！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in data1" :key="item.id">
                <div class="t-table">
                  <router-link :to="{ path: '/retailerSaleview', query: { uid: item.uid } }" class="t-cell v_middle" style="width:50px;">
                    <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                  </router-link>
                  <router-link :to="{ path: '/retailerSaleview', query: { uid: item.uid } }" class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.username}}({{item.linkman}})</div>
                    <div class="clamp1 mt5 font12 color-gray">带来消费：￥{{item.sales}}</div>
                  </router-link>
                  <div class="t-cell align_right" style="width:60px;">
                    <div class="qbtn bg-green color-white">联系</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div class="scroll_list pl10 pr10">
              <div v-if="!data2 || data2.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">竟然没有客户！将商品、活动或文章分享给好友或朋友圈，获得客户后即可将客户邀请成返点客啦！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in data2" :key="item.id">
                <div class="t-table">
                  <router-link :to="{ path: '/membersView', query: { uid: item.uid } }" class="t-cell v_middle" style="width:50px;">
                    <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                  </router-link>
                  <router-link :to="{ path: '/membersView', query: { uid: item.uid } }" class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.linkman}}</div>
                    <div class="clamp1 mt5 font12 color-gray">返点客:{{item.uploadname}}</div>
                  </router-link>
                  <div class="t-cell align_right" style="width:60px;">
                    <div class="qbtn bg-green color-white" @click="inviteevent(item,index1)">邀请</div>
                  </div>
                </div>
                <div class="clamp1 mt5 font12 color-gray">成为客户时间:{{ item.dateline | dateformat }}</div>
              </div>
            </div>
          </div>
          <div v-if="(index == 2)">
          <div class="scroll_list pl10 pr10 cols-2">
            <div v-if="!data3 || data3.length == 0" class="scroll_item color-gray padding10 align_center">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无返点记录，返点客帮你带来消费后，系统即可自动返点并记录！</div>
            </div>
            <router-link :to="{ path: '/accountDetail', query: { uid: item.uid } }" v-else class="scroll_item pt10 pb10" v-for="(item,index1) in data3" :key="item.id">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:50px;">
                  <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14">{{item.linkman}}</div>
                  <div class="clamp1 mt5 font12 color-gray">{{ item.dateline | dateformat }} 返点金额：￥{{item.sales}}</div>
                </div>
              </div>
            </router-link>
          </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<i18n>
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
import Time from '#/time'
import ENV from '#/env'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Search,
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
      tabtxts: [ '返点客户', '邀请返点客', '返点记录' ],
      tabmodel: 0,
      data1: [],
      data2: [],
      data3: []
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$http.post(`${ENV.BokaApi}/api/retailer/sellersList`).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.data1 = data.data ? data.data : data
    })
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
    },
    tabclick (index) {
      const self = this
      if (index === 0) {
        self.$http.post(`${ENV.BokaApi}/api/retailer/sellersList`).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.data1 = data.data ? data.data : data
        })
      } else if (index === 1) {
        self.$http.post(`${ENV.BokaApi}/api/retailer/sellerRecommend`).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.data2 = data.data ? data.data : data
        })
      } else if (index === 2) {
        self.$http.get(`${ENV.BokaApi}/api/accounting/list?from=retailer`).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.data3 = data.data ? data.data : data
        })
      }
    },
    inviteevent (item, index) {
      const self = this
      let content = `<div class="font14 v_middle">该客户是 <span class="color-orange v_middle">${item.uploadname}</span> 带来的，邀请成返点客后， <span class="color-orange v_middle">${item.uploadname}</span> 的收入可能受到影响，邀请成功后，返点客可在商品页面看到佣金金额，返点客购买以及带来客户购买后均可获得佣金奖励！确定邀请吗？</div>`
      self.$vux.confirm.show({
        content: content,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/inviteSeller`,
            { inviteuid: item.uid }
          ).then(function (res) {
            return res.json()
          }).then(function (data) {
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.data2.splice(index, 1)
                }
              }
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
