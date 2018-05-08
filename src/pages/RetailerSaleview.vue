<template>
  <div class="containerarea bg-white font14 rsaleview">
    <div class="s-topbanner s-topbanner2">
      <div class="row row1">
        <div class="bg"></div>
        <div class="pl10 pr10 h_100">
          <div class="t-table h_100 toprow">
            <router-link :to="{ path: '/membersView', query: { uid: sellerUser.uid } }" class="t-cell v_middle w80">
              <img class="avatarimg4 v_middle" :src="sellerUser.avatar" />
            </router-link>
            <router-link :to="{ path: '/membersView', query: { uid: sellerUser.uid } }" class="t-cell v_middle font18">{{ sellerUser.username }}</router-link>
            <div class="t-cell v_middle w70 align_center">
              <div class="qbtn2">联系</div>
              <a class="db-in mt5" v-if="sellerUser.mobile && sellerUser.mobile != ''" :href="`tel:${sellerUser.mobile}`"><i class="al al-fuwuzhongxin font16"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="row row2">
        <tab v-model="tabmodel" class="x-tab" active-color="#fff" default-color="#fff">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="tabclick">
            <div class="flex_center txt">
              <div>
                <div>{{item}}</div>
                <div v-if="index == 0">{{ $t('RMB') }}{{ sellerUser.total }}</div>
                <div v-else-if="index == 1">{{ sellerUser.shares }}次</div>
                <div v-else-if="index == 2">{{ sellerUser.customers }}人</div>
              </div>
            </div>
          </tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container2">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <div v-if="distabdata1" class="scroll_list pl10 pr10">
              <div v-if="!tabdata1 || tabdata1.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">该返点客还没有带来消费</div>
                <div>积极与返点客沟通可调动TA的积极性哦！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata1" :key="item.id">
                <div class="t-table">
                  <div class="t-cell v_middle w50" style="width:50px;">
                    <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.linkman}}</div>
                    <div class="clamp1 font12 color-gray">订单金额:{{ $t('RMB') }}{{item.special}}</div>
                    <div class="clamp1 font12 color-gray">时间:{{ item.dateline | dateformat }}</div>
                  </div>
                  <div class="t-cell v_middle align_right w60">
                    <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn bg-green color-white">联系</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div v-if="distabdata2" class="scroll_list pl10 pr10">
              <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">该返点客还没有分享过</div>
                <div>积极与返点客沟通可调动TA的积极性哦！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata2" :key="item.id">
                <div class="t-table">
                  <div class="t-cell v_middle w80">
                    <img :src="item.photo" class="imgcover v_middle" style="width:70px;height:70px;" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.title}}</div>
                    <div class="clamp1 font12 color-gray">分享次数:{{item.shares}}</div>
                    <div class="clamp1 font12 color-gray">带来访问:{{item.visitor}}</div>
                    <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 2)">
            <div class="font12 padding10 b_bottom">
              <div class="t-table w_100">
                <div class="t-cell align_left pl10">{{ $t('Customer text') }}</div>
                <div class="t-cell align_right pr10">{{ $t('Percent') }}</div>
              </div>
            </div>
            <div v-if="distabdata3" class="scroll_list pl10 pr10 cols-2">
              <div v-if="!tabdata3 || tabdata3.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">该返点客还没有带来客户</div>
                <div>积极与返点客沟通可调动TA的积极性哦！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata3" :key="item.id">
                <div class="t-table">
                  <div class="t-cell v_middle w50">
                    <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.linkman}}</div>
                    <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                  </div>
                  <div class="t-cell w60 h_100">
                    <div class="w_100 h_100 flex_right">
                      <div class="percentarea db-in">
                        <div class="inner" :style="`width:${item.percent}%`"></div>
                        <div class="txt font12">{{ item.percent }}%</div>
                      </div>
                    </div>
                  </div>
                  <div class="t-cell v_middle align_right w60">
                    <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn bg-green color-white">联系</router-link>
                  </div>
                </div>
              </div>
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
import { Tab, TabItem, Swiper, SwiperItem, Group } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Group
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      sellerUser: { avatar: '/src/assets/images/user.jpg', total: '0.00', shares: 0, customers: 0 },
      tabtxts: [ '带来消费', '分享记录', '带来客户' ],
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
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
      let params = { params: { selleruid: self.query.uid, action: 'orders', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rsaleview .swiperitem')
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
      let params = { params: { selleruid: self.query.uid, action: 'shares', pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
        if (!self.isBindScroll2) {
          self.isBindScroll2 = true
          self.scrollArea2.removeEventListener('scroll', self.scroll2)
          self.scrollArea2.addEventListener('scroll', self.scroll2)
        }
      })
    },
    getdata3 () {
      const self = this
      let params = { params: { selleruid: self.query.uid, action: 'customers', pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
        if (!self.isBindScroll3) {
          self.isBindScroll3 = true
          self.scrollArea3.removeEventListener('scroll', self.scroll3)
          self.scrollArea3.addEventListener('scroll', self.scroll3)
        }
      })
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
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$http.get(`${ENV.BokaApi}/api/retailer/sellerView`,
      { params: { selleruid: self.query.uid } }
    ).then(function (res) {
      let data = res.data
      self.sellerUser = (data.data ? data.data : data)
      if (self.sellerUser) {
        document.title = self.sellerUser.username
        self.getdata1()
      }
    })
  }
}
</script>

<style lang="less" scoped>
</style>
