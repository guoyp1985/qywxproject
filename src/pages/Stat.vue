<template>
  <div v-if="showcontainer" class="containerarea font14 notop nobottom bg-white">
    <div class="pagemiddle">
      <div class="bannerbg border-box padding10 flex_left font18 color-white">{{ data.title }}</div>
      <div v-if="statData && statData.length > 0" class="radiusarea mt12">
        <div class="item" v-for="(item,index) in statData" :key="index">
          <div class="inner">
            <div class="radius font22 clamp1">{{ item.value }}</div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="tabarea" ref="tabArea">
        <template v-if="tabsdata && tabsdata.length > 0">
          <tab v-model="tabmodel" class="v-tab">
            <tab-item v-for="(item,index) in tabsdata" :selected="index == 0" :key="index">{{ item.title }}</tab-item>
          </tab>
          <div ref="tabSwiper" class="w_100">
            <swiper v-model="tabmodel" class="x-swiper no-indicator" @on-index-change="swiperChange">
              <swiper-item v-for="(tabitem, index) in tabsdata" :key="index">
                <div v-if="tabitem.type == 'shareview'" class="scroll_list padding10 border-box swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container1"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.linkman }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                      <div class="mt5 clamp1 color-gray font13"><span class="db-in">停留: {{ item.staytime | staytimeFormat }}</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'buylist'" class="scroll_list padding10 border-box swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" :container="`.scroll-container${index}`"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.username }}</div>
                          <div class="clamp1 font12 color-gray">订单金额：{{ item.special }}</div>
                          <div class="clamp1 font12 color-gray">购买时间：{{ item.dateline | dateformat }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'sharelist'" class="scroll_list padding10 border-box swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container3"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.username }}</div>
                          <div class="clamp1 font12 color-gray">传播级别: {{ item.level }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'asklist'" class="scroll_list padding10 border-box swiper-inner scroll-container4" ref="scrollContainer4" @scroll="handleScroll('scrollContainer4')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container4"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.linkman }}</div>
                          <div class="clamp1 font13">{{ item.content }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'viewlist'" class="scroll_list padding10 border-box swiper-inner scroll-container5" ref="scrollContainer5" @scroll="handleScroll('scrollContainer5')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container5"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.username }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                      <div class="mt5 clamp1 color-gray font13"><span class="db-in">停留: {{ item.staytime | staytimeFormat }}</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'second'" class="scroll_list padding10 border-box swiper-inner scroll-container6" ref="scrollContainer6" @scroll="handleScroll('scrollContainer6')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container6"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.linkman }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                      <div class="mt5 clamp1 color-gray font13"><span class="db-in">停留: {{ item.staytime | staytimeFormat }}</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'crowdlist'" class="scroll_list padding10 border-box swiper-inner scroll-container7" ref="scrollContainer7" @scroll="handleScroll('scrollContainer7')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container7"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.linkman }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.isfull }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                      <div class="mt5 clamp1 color-gray font13">团员: {{ item.otherusers }}</div>
                      <div class="clamp1 color-gray font13">开团时间: {{ item.dateline }}</div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'crowdlist_isdeliver_1'" class="scroll_list padding10 border-box swiper-inner scroll-container8" ref="scrollContainer8" @scroll="handleScroll('scrollContainer8')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container8"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.linkman }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.dateline }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div v-if="tabitem.type == 'crowdlist_isdeliver_0'" class="scroll_list padding10 border-box swiper-inner scroll-container9" ref="scrollContainer9" @scroll="handleScroll('scrollContainer9')">
                  <template>
                    <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                    <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                      <div class="t-table">
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                          <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container="scroll-container9"></x-img>
                        </router-link>
                        <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                          <div class="clamp1">{{ item.linkman }}</div>
                          <div class="clamp1 font12 color-gray">{{ item.dateline }}</div>
                        </router-link>
                        <div class="t-cell v_middle align_right w60">
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                        </div>
                      </div>
                      <div class="mt5 clamp1 color-gray font13">
                        <span class="db-in">已砍到: <span class="color-orange">{{ $t('RMB') }}{{ item.currentprice }}</span></span>
                        <span class="db-in ml5">助力: {{ item.sumothers }}人</span>
                      </div>
                    </div>
                  </template>
                </div>
              </swiper-item>
            </swiper>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XImg } from 'vux'
import Listplate from '@/components/Listplate'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, Listplate, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    staytimeFormat: function (value) {
      let ret = ''
      let stay = parseInt(value)
      if (stay < 60) {
        ret = `${stay}秒`
      } else if (stay >= 60 && stay < 3660) {
        let m = Math.floor(stay / 60)
        let s = stay % 60
        ret = `${m}分钟${s}秒`
      } else if (stay >= 3660) {
        let h = Math.floor(stay / 3660)
        let val1 = stay % 3660
        let m = Math.floor(val1 / 60)
        let s = val1 % 60
        ret = `${h}小时${m}分钟${s}秒`
      }
      return ret
    }
  },
  data () {
    return {
      showcontainer: false,
      query: Object,
      module: '',
      data: Object,
      arrData: [],
      tabmodel: 0,
      statData: [],
      tabsdata: [],
      tabtop: 'auto',
      limit: 20,
      scrollData: [],
      datalist: [],
      isFirst: true,
      clickTabitem: null,
      clickTabIndex: 0
    }
  },
  watch: {
    datalist: function () {
      return this.datalist
    }
  },
  computed: {
  },
  methods: {
    isShowArea: function (index) {
      return this.isShowArea
    },
    getListdata: function (index) {
      const self = this
      return self.datalist[index]
    },
    handleScroll: function (refname) {
      const self = this
      let index = self.clickTabIndex
      let scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.datalist[index].length === (self.scrollData[index].pagestart + 1) * self.limit) {
            self.scrollData[index].pagestart++
            self.$vux.loading.show()
            self.getdata()
          }
        }
      })
    },
    getdata () {
      const self = this
      let item = self.clickTabitem
      let index = self.clickTabIndex
      if (self.scrollData.length === 0) {
        for (let i = 0; i < self.tabsdata.length; i++) {
          self.scrollData.push({ pagestart: 0 })
          self.datalist.push([])
        }
      }
      let params = { params: { type: item.type, id: self.query.id, pagestart: self.scrollData[index].pagestart, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/statDetail/${self.module}`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.datalist[index] = self.datalist[index].concat(retdata)
        self.arrData = self.datalist[index]
        if (self.isFirst) {
          self.isFirst = false
          let tabArea = self.$refs.tabArea[0] ? self.$refs.tabArea[0] : self.$refs.tabArea
          self.tabtop = tabArea.offsetTop + 44
          let swiper = self.$refs.tabSwiper[0] ? self.$refs.tabSwiper[0] : self.$refs.tabSwiper
          swiper.style['position'] = 'absolute'
          swiper.style['top'] = `${self.tabtop}px`
          swiper.style['bottom'] = '0px'
        }
      })
    },
    swiperChange (index) {
      const self = this
      self.clickTabitem = self.tabsdata[index]
      self.clickTabIndex = index
      self.arrData = self.datalist[index]
      if (self.datalist[index].length === 0) {
        self.$vux.loading.show()
        self.getdata()
      }
    }
  },
  created: function () {
    let self = this
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.module = self.query.module
    self.$vux.loading.show()
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: self.module, action: 'stat', id: self.query.id
    }).then(function (res) {
      return self.$http.get(`${ENV.BokaApi}/api/statData/${self.module}`,
          { params: { id: self.query.id } }
      )
    }).then(function (res) {
      self.showcontainer = true
      let data = res.data
      self.statData = data.data ? data.data : data
      self.tabsdata = data.detail
      for (let i = 0; i < self.tabsdata.length; i++) {
        let type = self.tabsdata[i].type
      }
      self.data = data.moduleinfo
      document.title = `统计-${self.data.title}`
      self.clickindex = 0
      self.clickTabitem = self.tabsdata[0]
      self.getdata()
    })
  }
}
</script>

<style lang="less">
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
