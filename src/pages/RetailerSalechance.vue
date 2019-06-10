<template>
  <div class="containerarea bg-page rsalechance nobottom font14">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-topbanner">
        <div slot="content" class="card-demo-flex flex_center" style="height:88px;">
          <div class="vux-1px-r">
            <div class="color-white font14">访问量</div>
            <div class="color-white font21 mt10 clamp1">{{ viewdata.views }}</div>
          </div>
          <div class="vux-1px-r">
            <div class="color-white font14">分享数</div>
            <div class="color-white font21 mt10 clamp1">{{ viewdata.share }}</div>
          </div>
          <div class="vux-1px-r">
            <div class="color-white font14">销售额</div>
            <div class="color-white font21 mt10 clamp1">{{$t('RMB')}}{{ viewdata.orders }}</div>
          </div>
        </div>
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
      <div class="pagemiddle bg-white pl12 pr12">
        <div v-show="selectedIndex === 0" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
          <template v-if="disdatalist1">
            <div v-if="tabdata1.length == 0" class="scroll_item padding10 color-gray align_center">
              <div class="t-table ml10">
                <div class="t-cell">
                  <div><i class="al al-yulan3 font70 pt20"></i></div>
                  <div class="mt5">暂无分享数据，将商品、活动或文章分享给好友或朋友圈，即可获得更多销售机会！</div>
                </div>
              </div>
            </div>
            <timeline v-else class="x-timeline">
              <timeline-item v-for="(item, index) in tabdata1" :key="item.id">
                <div class="color-lightgray font14 ddate">{{ item.dateline | dateformat }}</div>
                <div class="color-999 font12 dtime">{{ item.dateline | dateformat1 }}</div>
                <div class="t-table ml10">
                  <div @click="toMembersView(item)" class="t-cell">
                    <div class="color-orange7 font14">{{ item.linkman }}</div>
                    <div class="color-gray font12 pr10">{{ item.content }}</div>
                  </div>
                  <div @click="toChat(item)" class="t-cell w50 align_right v_middle">
                    <div class="qbtn bg-red color-white">{{ $t('Contact') }}</div>
                  </div>
                </div>
              </timeline-item>
            </timeline>
          </template>
        </div>
        <div v-show="selectedIndex === 1" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
          <template v-if="disdatalist2">
            <div v-if="tabdata2.length == 0" class="scroll_item padding10 color-gray align_center">
              <div class="t-table ml10">
                <div class="t-cell">
                  <div><i class="al al-yulan3 font70 pt20"></i></div>
                  <div class="mt5">暂无浏览数据，将商品、活动或文章分享给好友或朋友圈，即可获得更多销售机会！</div>
                </div>
              </div>
            </div>
            <timeline v-else class="x-timeline vux-tab">
              <timeline-item v-for="(item, index) in tabdata2" :key="item.id">
                <div class="color-lightgray font14 ddate">{{ item.dateline | dateformat }}</div>
                <div class="color-gray font12 dtime">{{ item.dateline | dateformat1 }}</div>
                <div class="t-table ml10">
                  <div @click="toMembersView(item)" class="t-cell">
                    <div class="color-orange7 font14">{{ item.linkman }}</div>
                    <div class="color-gray font12 pr10">{{ item.content }}</div>
                  </div>
                  <div @click="toChat(item)" class="t-cell w50 align_right v_middle">
                    <div class="qbtn bg-red color-white">{{ $t('Contact') }}</div>
                  </div>
                </div>
              </timeline-item>
            </timeline>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
Data text:
  zh-CN: 数据
Sale chance:
  zh-CN: 销售机会
Contact:
  zh-CN: 联系
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Card, Timeline, TimelineItem } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, Card, Timeline, TimelineItem, Subscribe, ApplyTip
  },
  filters: {
    dateformat: function (dt) {
      let newtime = new Time(dt * 1000)
      let year = newtime.year()
      let month = newtime.month()
      let date = newtime.date()
      let nowtime = new Time(new Date())
      let nowyear = nowtime.year()
      let nowmonth = nowtime.month()
      let nowdate = nowtime.date()
      let state = ''
      if (year === nowyear && month === nowmonth) {
        if (date === nowdate) {
          state = '今天'
        } else if (date + 1 === nowdate) {
          state = '昨天'
        } else if (date + 2 === nowdate) {
          state = '前天'
        } else {
          state = new Time(dt * 1000).dateFormat('MM-dd')
        }
      } else {
        state = new Time(dt * 1000).dateFormat('MM-dd')
      }
      return state
    },
    dateformat1: function (value) {
      return new Time(value * 1000).dateFormat('hh:mm')
    }
  },
  data () {
    return {
      loginUser: {},
      query: {},
      showApply: false,
      showContainer: false,
      selectedIndex: 0,
      tabtxts: [ '分享', '浏览' ],
      viewdata: { orders: '0.00', share: 0, views: 0 },
      tabdata1: [],
      tabdata2: [],
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      disdatalist1: false,
      disdatalist2: false
    }
  },
  watch: {
    tabdata1: function () {
      return this.tabdata1
    },
    tabdata2: function () {
      return this.tabdata2
    }
  },
  methods: {
    toMembersView (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    toChat (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid, fromModule: 'retailer'})
      this.$router.push({path: '/chat', query: params})
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else {
            if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
              self.pagestart2++
              self.$vux.loading.show()
              self.getData2()
            }
          }
        }
      })
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { action: 'shares', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceList`, params).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.disdatalist1 = true
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { action: 'views', pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceList`, params).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.disdatalist2 = true
      })
    },
    clickTab () {
      this.swiperChange()
    },
    swiperChange (index) {
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < this.limit) {
            self.pagestart1 = 0
            this.distabdata1 = false
            this.tabdata1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < this.limit) {
            self.pagestart2 = 0
            this.distabdata2 = false
            this.tabdata2 = []
            this.getData2()
          }
          break
      }
    },
    init () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'salechance'
      })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceView`))
      .then(res => {
        const data = res.data
        if (data && data.flag === 1) {
          self.viewdata = data.data
        }
      })
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
      this.query = this.$route.query
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        // if (self.loginUser.isretailer === 2) {
        //   self.initContainer()
        //   self.$vux.loading.hide()
        //   let backUrl = encodeURIComponent(location.href)
        //   location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        // } else {
        this.$vux.loading.hide()
        if (!this.loginUser.isretailer) {
          self.initContainer()
          this.showApply = true
        } else {
          self.initContainer()
          this.showContainer = true
          this.swiperChange()
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

<style lang="less">
.card-demo-flex {
  display: flex;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.x-card{
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.14);
  padding-bottom: 10px;
}
.x-card .weui-panel__hd{color:#000;}
.x-card.weui-panel:after{display:none;}
.x-card .vux-1px-r:after{display:none;}
.x-card .weui-panel__hd:after{display:none;}

.bordertxt{border-top:@list-border-color 1px solid;border-bottom:@list-border-color 1px solid;}
.rsalechance .s-topbanner{height:132px;}
.rsalechance .pagemiddle{top:132px;}
.rsalechance .vux-1px-r:after {border: none}
.rsalechance .x-timeline .vux-timeline-item-color{left: 40px; background-color: #f4dcdc;}
.rsalechance .x-timeline .vux-timeline-item-tail{left: 44px;background-color: #f4dcdc;}
</style>
