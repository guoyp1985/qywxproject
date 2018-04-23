<template>
  <div class="containerarea bg-white font14">
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
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <div class="scroll_list pl10 pr10">
              <div v-if="!data1 || data1.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">该返点客还没有带来消费</div>
                <div>积极与返点客沟通可调动TA的积极性哦！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in data1" :key="item.id">
                <div class="t-table">
                  <div class="t-cell v_middle w50" style="width:50px;">
                    <img :src="item.avatar" class="avatarimg1 imgcover v_middle" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.linkman}}</div>
                    <div class="clamp1 font12 color-gray">订单金额:{{ $t('RMB') }}{{item.special}}</div>
                    <div class="clamp1 font12 color-gray">时间:{{ item.dateline | dateformat }}</div>
                  </div>
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
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">该返点客还没有分享过</div>
                <div>积极与返点客沟通可调动TA的积极性哦！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in data2" :key="item.id">
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
            <div class="scroll_list pl10 pr10 cols-2">
              <div v-if="!data3 || data3.length == 0" class="scroll_item color-gray padding10 align_center">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">该返点客还没有带来客户</div>
                <div>积极与返点客沟通可调动TA的积极性哦！</div>
              </div>
              <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in data3" :key="item.id">
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
                  <div class="t-cell align_right" style="width:60px;">
                    <div class="qbtn bg-green color-white">联系</div>
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
import ENV from '#/env'

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
      data1: [],
      data2: [],
      data3: []
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$http.get(`${ENV.BokaApi}/api/retailer/sellerView`,
      { params: { selleruid: self.query.uid } }
    ).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.sellerUser = (data.data ? data.data : data)
    })
    self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`,
      { params: { selleruid: self.query.uid, action: 'orders' } }
    ).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.data1 = data.data ? data.data : data
    })
  },
  methods: {
    tabclick (index) {
      event.preventDefault()
      const self = this
      if (index === 0) {
        self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`,
          { params: { selleruid: self.query.uid, action: 'orders' } }
        ).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.data1 = data.data ? data.data : data
        })
      } else if (index === 1) {
        self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`,
          { params: { selleruid: self.query.uid, action: 'shares' } }
        ).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.data2 = data.data ? data.data : data
        })
      } else if (index === 2) {
        self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`,
          { params: { selleruid: self.query.uid, action: 'customers' } }
        ).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.data3 = data.data ? data.data : data
        })
      }
    }
  }
}
</script>

<style lang="less">
</style>
