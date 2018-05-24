<template>
  <div class="containerarea bg-page rsalechance nobottom font14">
    <div class="pagetop">
      <div class="v-top">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-white font12">访问量</div>
              <div class="color-white font21 mt10">{{ viewdata.views }}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-white font12">分享数</div>
              <div class="color-white font21 mt10">{{ viewdata.share }}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-white font12">销售额</div>
              <div class="color-white font21 mt10">{{ viewdata.orders }}</div>
            </div>
          </div>
        </card>
      </div>
      <tab v-model="tabmodel" class="v-tab">
        <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
      </tab>
    </div>
    <div class="pagemiddle bg-white pl12 pr12">
      <swiper v-model="tabmodel" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="index === 0" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll1">
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
                    <router-link :to="{path: '/membersView', query: { uid: item.uid }}" class="t-cell">
                      <div class="color-orange7 font14">{{ item.linkman }}</div>
                      <div class="color-gray font12 pr10">{{ item.content }}</div>
                    </router-link>
                    <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell w50 align_right v_middle">
                      <div class="qbtn bg-red color-white">{{ $t('Contact') }}</div>
                    </router-link>
                  </div>
                </timeline-item>
              </timeline>
            </template>
          </div>
          <div v-else-if="index === 1" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll2">
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
                    <router-link :to="{path: '/membersView', query: { uid: item.uid }}" class="t-cell">
                      <div class="color-orange7 font14">{{ item.linkman }}</div>
                      <div class="color-gray font12 pr10">{{ item.content }}</div>
                    </router-link>
                    <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell w50 align_right v_middle">
                      <div class="qbtn bg-red color-white">{{ $t('Contact') }}</div>
                    </router-link>
                  </div>
                </timeline-item>
              </timeline>
            </template>
          </div>
        </swiper-item>
      </swiper>
    </div>
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

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, Card, Timeline, TimelineItem
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
      tabmodel: 0,
      tabtxts: [ '分享', '浏览' ],
      viewdata: { orders: '0.00', share: 0, views: 0 },
      tabdata1: [],
      tabdata2: [],
      limit: 20,
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
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'salechance'
    }).then(function () {
      return self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceView`)
    }).then(function (res) {
      let data = res.data
      if (data && data.flag === 1) {
        self.viewdata = data.data
      }
      self.getdata1()
    })
  },
  methods: {
    handleScroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer1[0],
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    handleScroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer2[0],
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { action: 'shares', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.disdatalist1 = true
      })
    },
    getdata2 () {
      const self = this
      let params = { params: { action: 'views', pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.disdatalist2 = true
      })
    },
    swiperChange (index) {
      const self = this
      if (index === 0) {
        if (self.tabdata1.length === 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        if (self.pagestart2 === 0 && !self.isBindScroll2) {
          self.$vux.loading.show()
          self.getdata2()
        }
      }
    }
  }
}
</script>

<style lang="less">
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
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
.rsalechance .pagetop{height:128px;}
.rsalechance .pagemiddle{top:128px;}
.rsalechance .vux-1px-r:after {border: none}
.rsalechance .x-timeline .vux-timeline-item-color{left: 40px; background-color: #f4dcdc;}
.rsalechance .x-timeline .vux-timeline-item-tail{left: 44px;background-color: #f4dcdc;}
</style>
