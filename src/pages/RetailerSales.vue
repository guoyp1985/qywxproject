<template>
  <div class="containerarea bg-white fong14 rsales">
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
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <search
              class="x-search"
              :auto-fixed="autofixed"
              @on-submit="onSubmit1"
              @on-change="onChange1"
              ref="search">
            </search>
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult1">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">竟然没有返点客，点击【邀请返点客】，选择客户并【邀请】，与返点客一起赚钱吧！</div>
                </template>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata1" :key="item.id">
                <div class="t-table">
                  <router-link :to="{ path: '/retailerSaleview', query: { uid: item.uid } }" class="t-cell v_middle" style="width:50px;">
                    <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                  </router-link>
                  <router-link :to="{ path: '/retailerSaleview', query: { uid: item.uid } }" class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.username}}({{item.linkman}})</div>
                    <div class="clamp1 mt5 font12 color-gray">带来消费：￥{{item.sales}}</div>
                  </router-link>
                  <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell w60 align_right v_middle">
                    <div class="qbtn bg-green color-white">联系</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <search
              class="x-search"
              :auto-fixed="autofixed"
              @on-submit="onSubmit2"
              @on-change="onChange2"
              ref="search">
            </search>
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item color-gray padding10 align_center">
                <template v-if="searchresult2">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">竟然没有客户！将商品、活动或文章分享给好友或朋友圈，获得客户后即可将客户邀请成返点客啦！</div>
                </template>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata2" :key="item.id">
                <div class="t-table">
                  <router-link :to="{ path: '/membersView', query: { uid: item.uid } }" class="t-cell v_middle w50">
                    <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                  </router-link>
                  <router-link :to="{ path: '/membersView', query: { uid: item.uid } }" class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.linkman}}</div>
                    <div class="clamp1 mt5 font12 color-gray">返点客:{{item.uploadname}}</div>
                  </router-link>
                  <div class="t-cell v_middle align_right w60">
                    <div class="qbtn bg-green color-white" @click="inviteevent(item,index1)">邀请</div>
                  </div>
                </div>
                <div class="clamp1 mt5 font12 color-gray">成为客户时间:{{ item.dateline | dateformat }}</div>
              </div>
            </div>
          </div>
          <div v-if="(index == 2)">
          <div class="scroll_list pl10 pr10 cols-2">
            <div v-if="!tabdata3 || tabdata3.length == 0" class="scroll_item color-gray padding10 align_center">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无返点记录，返点客帮你带来消费后，系统即可自动返点并记录！</div>
            </div>
            <router-link :to="{ path: '/accountDetail', query: { uid: item.uid } }" v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata3" :key="item.id">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:50px;">
                  <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14">{{item.linkman}}</div>
                  <div class="clamp1 mt5 font12 color-gray">{{ item.dateline | dateformat }} 返点金额：￥{{item.money}}</div>
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
      autofixed: false,
      tabtxts: [ '返点客户', '邀请返点客', '返点记录' ],
      tabmodel: 0,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      searchword1: '',
      searchresult1: false,
      searchword2: '',
      searchresult2: false,
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
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && !self.$util.isNull(keyword)) {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rsales .swiperitem')
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
      let params = { pagestart: self.pagestart2, limit: self.limit }
      let keyword = self.searchword2
      if (typeof keyword !== 'undefined' && !self.$util.isNull(keyword)) {
        self.searchresult2 = true
        params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerRecommend`, params).then(function (res) {
        let data = res.data
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
      let params = { params: { pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list?from=retailer`, params).then(function (res) {
        let data = res.data
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
    onChange1 (val) {
      this.searchword1 = val
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getdata1()
    },
    onChange2 (val) {
      this.searchword2 = val
    },
    onSubmit2 () {
      const self = this
      self.$vux.loading.show()
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getdata2()
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
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.tabdata2.splice(index, 1)
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

<style lang="less" scoped>
</style>
