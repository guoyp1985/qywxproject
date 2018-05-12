<template>
  <div class="containerarea bg-white rsalechance nobottom font14">
    <div class="pagetop">
      <div class="bg-gray4 padding10 border-box">
        <card :header="{title: $t('Data text')}" class="x-card">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-gray font14">访问量</div>
              <div class="color-blue9 font17 mt5">{{ viewdata.views }}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-gray font14">分享数</div>
              <div class="color-blue9 font17 mt5">{{ viewdata.share }}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-gray font14">销售额</div>
              <div class="color-blue9 font17 mt5">{{ viewdata.orders }}</div>
            </div>
          </div>
        </card>
      </div>
      <tab v-model="tabmodel" class="x-toptab">
        <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="tabclick">{{item}}</tab-item>
      </tab>
    </div>
    <div class="pagemiddle">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <template v-if="index === 0">
            <div v-if="tabdata1.length == 0" class="scroll_item padding10 color-gray align_center">
              <div class="t-table">
                <div class="t-cell">
                  <div><i class="al al-yulan3 font70 pt20"></i></div>
                  <div class="mt5">暂无分享数据，将商品、活动或文章分享给好友或朋友圈，即可获得更多销售机会！</div>
                </div>
              </div>
            </div>
            <timeline v-else class="x-timeline">
              <timeline-item v-for="(item, index) in tabdata1" :key="item.id">
                <div class="color-black font12 ddate">{{ item.dateline | dateformat }}</div>
                <div class="color-gray font12 dtime">{{ item.dateline | dateformat1 }}</div>
                <div class="t-table">
                  <router-link :to="{path: '/membersView', query: { uid: item.uid }}" class="t-cell">
                    <div class="color-blue font14">{{ item.linkman }}</div>
                    <div class="color-gray font12">{{ item.content }}</div>
                  </router-link>
                  <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell w50 align_right v_middle">
                    <div class="qbtn1 bg-green color-white">{{ $t('Contact') }}</div>
                  </router-link>
                </div>
              </timeline-item>
            </timeline>
          </template>
          <template v-else-if="index === 1">
            <div v-if="tabdata2.length == 0" class="scroll_item padding10 color-gray align_center">
              <div class="t-table">
                <div class="t-cell">
                  <div><i class="al al-yulan3 font70 pt20"></i></div>
                  <div class="mt5">暂无浏览数据，将商品、活动或文章分享给好友或朋友圈，即可获得更多销售机会！</div>
                </div>
              </div>
            </div>
            <timeline v-else class="x-timeline">
              <timeline-item v-for="(item, index) in tabdata2" :key="item.id">
                <div class="color-black font12 ddate">{{ item.dateline | dateformat }}</div>
                <div class="color-gray font12 dtime">{{ item.dateline | dateformat1 }}</div>
                <div class="t-table">
                  <router-link :to="{path: '/membersView', query: { uid: item.uid }}" class="t-cell">
                    <div class="color-blue font14">{{ item.linkman }}</div>
                    <div class="color-gray font12">{{ item.content }}</div>
                  </router-link>
                  <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell w50 align_right v_middle">
                    <div class="qbtn1 bg-green color-white">{{ $t('Contact') }}</div>
                  </router-link>
                </div>
              </timeline-item>
            </timeline>
          </template>
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
      isBindScroll1: false,
      isBindScroll2: false,
      scrollArea1: null,
      scrollArea2: null
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
    self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceView`).then(function (res) {
      let data = res.data
      if (data && data.flag === 1) {
        self.viewdata = data.data
      }
      let params = { params: { action: 'shares', pagestart: self.pagestart1, limit: self.limit } }
      return self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceList`, params)
    }).then(function (res) {
      let data = res.data
      self.$vux.loading.hide()
      let retdata = data.data ? data.data : data
      self.tabdata1 = self.tabdata1.concat(retdata)
      if (!self.isBindScroll1) {
        let items = document.querySelectorAll('.rsalechance .swiperitem')
        self.scrollArea1 = items[0]
        self.scrollArea2 = items[1]
        self.isBindScroll1 = true
        self.scrollArea1.removeEventListener('scroll', self.scroll1)
        self.scrollArea1.addEventListener('scroll', self.scroll1)
      }
    })
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
    getdata1 () {
      const self = this
      let params = { params: { action: 'shares', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/saleChanceList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rsalechance .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea2 = items[1]
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
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
        if (!self.isBindScroll2) {
          self.isBindScroll2 = true
          self.scrollArea2.removeEventListener('scroll', self.scroll2)
          self.scrollArea2.addEventListener('scroll', self.scroll2)
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
      }
    }
  }
}
</script>

<style lang="less" scoped>
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

.bordertxt{
  border-top:@list-border-color 1px solid;
  border-bottom:@list-border-color 1px solid;
}

.rsalechance .pagetop{height:202px;}
.rsalechance .pagemiddle{top:202px;}

</style>
