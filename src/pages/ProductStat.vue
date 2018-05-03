<template>
  <div class="containerarea font14 notop nobottom productstat">
    <div class="pagemiddle">
      <div class="bannerbg padding10 flex_left font18 color-white">{{ title }}</div>
      <div class="radiusarea mt12">
        <div class="item" v-for="(item,index) in radiusdata" :key="index">
          <div class="inner">
            <div class="radius font22">{{ item.number }}</div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <tab v-model="tabmodel" class="mt12">
        <tab-item v-for="(item,index) in tabsdata" :selected="index == 0" :key="index" @on-item-click="tabclick(index)">{{item}}</tab-item>
      </tab>
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabsdata" :key="index">
          <div class="scroll_list padding10">
            <template v-if="index == 0">
              <div v-if="!tabdata1 || tabdata1.length == 0" class="emptyitem flex_center">暂无数据</div>
              <div v-else v-for="(item,index1) in tabdata1" :key="item.id" class="scroll_item pt10 pb10">
                <div class="t-table">
                  <div class="t-cell v_middle w50">
                    <img class="avatarimg1" :src="item.avatar" />
                  </div>
                  <div class="t-cell">
                    <div class="clamp1">{{ item.linkman }}</div>
                    <div class="clamp1 font12 color-gray">{{ item.dateline }}</div>
                  </div>
                  <div class="t-cell v_middle align_right" style="width:60px;">
                    <span class="qbtn1 bg-green color-white">联系</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="index == 1">
              <div v-if="!tabdata2 || tabdata2.length == 0" class="emptyitem flex_center">暂无数据</div>
              <div v-else v-for="(item,index1) in tabdata2" :key="item.id" class="scroll_item pt10 pb10">
                <div class="t-table">
                  <div class="t-cell v_middle w50">
                    <img class="avatarimg1" :src="item.avatar" />
                  </div>
                  <div class="t-cell">
                    <div class="clamp1">{{ item.linkman }}</div>
                    <div class="clamp1">停留时间:{{ item.staytime }}秒</div>
                    <div class="clamp1">阅读次数:{{ item.number }}次</div>
                    <div class="clamp1 font12 color-gray">{{ item.dateline }}</div>
                  </div>
                  <div class="t-cell v_middle align_right" style="width:60px;">
                    <span class="qbtn1 bg-green color-white">联系</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="index == 2">
              <div v-if="!tabdata3 || tabdata3.length == 0" class="emptyitem flex_center">暂无数据</div>
              <div v-else v-for="(item,index1) in tabdata3" :key="item.id" class="scroll_item pt10 pb10">
                <div class="t-table">
                  <div class="t-cell v_middle w50">
                    <img class="avatarimg1" :src="item.avatar" />
                  </div>
                  <div class="t-cell">
                    <div class="clamp1">{{ item.linkman }}</div>
                    <div class="clamp1 font13">{{ item.content }}</div>
                    <div class="clamp1 font12 color-gray">{{ item.dateline }}</div>
                  </div>
                  <div class="t-cell v_middle align_right" style="width:60px;">
                    <span class="qbtn1 bg-green color-white">联系</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="index == 3">
              <div v-if="!tabdata3 || tabdata3.length == 0" class="emptyitem flex_center">暂无数据</div>
              <div v-else v-for="(item,index1) in tabdata3" :key="item.id" class="scroll_item pt10 pb10">
                <div class="t-table">
                  <div class="t-cell v_middle w50">
                    <img class="avatarimg1" :src="item.avatar" />
                  </div>
                  <div class="t-cell">
                    <div class="clamp1">{{ item.username }}</div>
                    <div class="clamp1">传播级别:{{ item.level }}人</div>
                    <div class="clamp1 font12 color-gray">{{ item.dateline }}</div>
                  </div>
                  <div class="t-cell v_middle align_right" style="width:60px;">
                    <span class="qbtn1 bg-green color-white">联系</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import Listplate from '@/components/Listplate'
import Time from '#/time'
import ENV from '#/env'
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Listplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      title: '维生素B族片',
      tabmodel: 0,
      radiusdata: [
        { title: '销量', number: 6 },
        { title: '销售额', number: 1.41 },
        { title: '浏览次数', number: 7 },
        { title: '分享次数', number: 1 },
        { title: '收藏数', number: 0 }
      ],
      tabsdata: [ '购买', '浏览', '咨询', '分享' ],
      tabstype: [ 'buylist', 'viewlist', 'asklist', 'sharelist' ],
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata4: [],
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      pagestart4: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      isBindScroll3: false,
      isBindScroll4: false,
      scrollArea1: null,
      scrollArea2: null,
      scrollArea3: null,
      scrollArea4: null
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
    scroll4: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea4,
        callback: function () {
          if (self.tabdata4.length === (self.pagestart4 + 1) * self.limit) {
            self.pagestart4++
            self.$vux.loading.show()
            self.getdata4()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { type: self.tabstype[0], id: self.query.id, pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/statDetail/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.productstat .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea2 = items[1]
          self.scrollArea3 = items[2]
          self.scrollArea4 = items[3]
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getdata2 () {
      const self = this
      let params = { params: { type: self.tabstype[1], id: self.query.id, pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/statDetail/product`, params).then(function (res) {
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
      let params = { params: { type: self.tabstype[2], id: self.query.id, pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/statDetail/product`, params).then(function (res) {
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
    getdata4 () {
      const self = this
      let params = { params: { type: self.tabstype[3], id: self.query.id, pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/statDetail/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata4 = self.tabdata4.concat(retdata)
        if (!self.isBindScroll4) {
          self.isBindScroll4 = true
          self.scrollArea4.removeEventListener('scroll', self.scroll4)
          self.scrollArea4.addEventListener('scroll', self.scroll4)
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
      } else if (index === 3) {
        if (self.pagestart4 === 0 && !self.isBindScroll4) {
          self.$vux.loading.show()
          self.getdata4()
        }
      }
    }
  },
  created: function () {
    let self = this
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$http.get(`${ENV.BokaApi}/api/statData/product`,
      { params: { id: self.query.id } }
    ).then(function (res) {
      let data = res.data
    })
    self.getdata1()
  }
}
</script>

<style lang="less" scoped>
.radiusarea:after{content:"";clear:both;display:block;}
.radiusarea .item{float:left;width:33.333333%;text-align:center;}
.radiusarea .inner{padding:10px 10px 0 10px;}
.radiusarea .radius{margin:0 auto;width:60px;height:60px;border-radius:50%;background-color:#69d6e3;color:#fff;line-height:60px;}
.radiusarea .title{margin-top:5px;line-height:25px;}
.radiusarea .item:nth-child(1) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(2) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(3) .radius{background-color:#aed370;}
.radiusarea .item:nth-child(4) .radius{background-color:#ffb22d;}
.radiusarea .item:nth-child(5) .radius{background-color:#ea8482;}
</style>
