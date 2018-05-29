<template>
  <div class="containerarea font14 notop nobottom">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle">
        <template v-if="module == 'activity' && data.type === 'groupbuy'">
          <router-link :to="{path: '/product', query: {id: query.id}}" class="v-top font16 color-white clamp1">{{ data.title }}</router-link>
        </template>
        <template v-else>
          <router-link :to="{path: `/${module}`, query: {id: query.id}}" class="v-top font16 color-white clamp1">{{ data.title }}</router-link>
        </template>
        <div v-if="statData && statData.length > 0" class="radiusarea mb10 pb15 bg-white list-shadow01">
          <div class="item" v-for="(item,index) in statData" :key="index">
            <div class="inner">
              <div class="radius font22 clamp1">{{ item.value }}</div>
              <div class="title color-gray">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="tabarea bg-white" ref="tabArea">
          <template v-if="tabsdata && tabsdata.length > 0">
            <tab v-model="selectedIndex" class="v-tab">
              <tab-item v-for="(item,index) in tabsdata" :selected="index == 0" :key="index">{{ item.title }}</tab-item>
            </tab>
            <div ref="tabSwiper" class="w_100 bg-white">
              <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
                <swiper-item v-for="(tabitem, index) in tabsdata" :key="index">
                  <div v-if="tabitem.type == 'shareview'" class="scroll_list border-box swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <x-img class="avatarimg2 imgcover" :src="item.avatar" default-src="/src/assets/images/user.jpg" :offset="0" container=".scroll-container1"></x-img>
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                            <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'buylist'" class="scroll_list border-box swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.username }}</div>
                            <div class="clamp1 color-gray">订单金额：{{ item.special }}</div>
                            <div class="clamp1 color-gray">购买时间：{{ item.dateline | dateformat }}</div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'sharelist'" class="scroll_list border-box swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.username }}</div>
                            <div class="clamp1 color-gray">传播级别: {{ item.level }}</div>
                            <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'asklist'" class="scroll_list border-box swiper-inner scroll-container4" ref="scrollContainer4" @scroll="handleScroll('scrollContainer4')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                            <div class="clamp1">{{ item.content }}</div>
                            <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'viewlist'" class="scroll_list border-box swiper-inner scroll-container5" ref="scrollContainer5" @scroll="handleScroll('scrollContainer5')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.username }}</div>
                            <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                            <div class="clamp1 color-gray"><span class="db-in">停留: {{ item.staytime | staytimeFormat }}</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'second'" class="scroll_list border-box swiper-inner scroll-container6" ref="scrollContainer6" @scroll="handleScroll('scrollContainer6')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                            <div class="clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                            <div class="clamp1 color-gray"><span class="db-in">停留: {{ item.staytime | staytimeFormat }}</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'crowdlist'" class="scroll_list border-box swiper-inner scroll-container7" ref="scrollContainer7" @scroll="handleScroll('scrollContainer7')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="flex_left"><span class="clamp1 color-gray2 pr5" style="max-width:60%;">{{ item.linkman }}</span><span class="clamp1 color-orange">{{ item.isfull }}</span></div>
                            <div class="color-gray">团员: {{ item.otherusers }}</div>
                            <div class="clamp1 color-gray">开团时间: {{ item.dateline }}</div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'crowdlist_isdeliver_1'" class="scroll_list border-box swiper-inner scroll-container8" ref="scrollContainer8" @scroll="handleScroll('scrollContainer8')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                            <div class="clamp1 color-gray">{{ item.dateline }}</div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-if="tabitem.type == 'crowdlist_isdeliver_0'" class="scroll_list border-box swiper-inner scroll-container9" ref="scrollContainer9" @scroll="handleScroll('scrollContainer9')">
                    <template>
                      <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                      <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item padding10">
                        <div class="flex_left">
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}">
                            <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='/src/assets/images/user.jpg'" />
                          </router-link>
                          <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="flex_cell pl10 pr20">
                            <div class="clamp1 color-gray2">{{ item.linkman }}</div>
                            <div class="clamp1 color-gray">
                              <span class="db-in">已砍到: <span class="color-orange">{{ $t('RMB') }}{{ item.currentprice }}</span></span>
                              <span class="db-in ml5">助力: {{ item.sumothers }}人</span>
                            </div>
                            <div class="clamp1 color-gray">{{ item.dateline }}</div>
                          </router-link>
                          <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn9-contact">联系</router-link>
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
    </template>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XImg } from 'vux'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'

const limit = 10
export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, XImg, Sos
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
      showSos: false,
      sosTitle: '该信息不存在',
      showContainer: false,
      query: {},
      module: '',
      data: {},
      arrData: [],
      selectedIndex: 0,
      statData: [],
      tabsdata: [],
      tabtop: 'auto',
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
  methods: {
    initData () {
      this.query = this.$route.query
      this.module = this.query.module
      this.selectedIndex = 0
      this.arrData = []
      this.statData = []
      this.tabsdata = []
      this.scrollData = []
      this.isFirst = true
    },
    handleScroll (refname) {
      const self = this
      const index = this.selectedIndex
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.datalist[index].length === (self.scrollData[index].pagestart + 1) * limit) {
            self.scrollData[index].pagestart++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      const item = self.clickTabitem
      const index = this.selectedIndex
      let params = { params: { type: item.type, id: self.query.id, pagestart: self.scrollData[index].pagestart, limit: limit } }
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
      alert(index)
      if (index !== undefined) {
        this.selectedIndex = index
      }
      const self = this
      const index1 = this.selectedIndex
      alert(index1)
      alert(JSON.stringify(this.datalist))
      this.clickTabitem = this.tabsdata[index1]
      this.arrData = this.datalist[index1]
      alert(JSON.stringify(this.arrData))
      if (self.scrollData.length === 0) {
        for (let i = 0; i < self.tabsdata.length; i++) {
          self.scrollData.push({ pagestart: 0 })
          self.datalist.push([])
        }
      }
      if (this.datalist[index1].length < limit) {
        this.datalist[index1] = []
        self.$vux.loading.show()
        this.getData1()
      }
    },
    getData () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: this.module, action: 'stat', id: this.query.id })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/statData/${self.module}`, { params: { id: self.query.id } }))
      .then(res => {
        self.$vux.loading.hide()
        self.showcontainer = true
        let data = res.data
        self.data = data.moduleinfo
        if (!self.data || self.data.length === 0) {
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.statData = data.data ? data.data : data
          self.tabsdata = data.detail
          document.title = `统计-${self.data.title}`
          self.clickTabitem = self.tabsdata[0]
          self.swiperChange()
        }
      })
    },
    init () {
      this.$vux.loading.show()
      this.query = this.$route.query
      this.module = this.query.module
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      if (this.query.module !== this.$route.query.module || this.query.id !== this.$route.query.id) {
        this.query = this.$route.query
        this.initData()
        this.getData()
        console.log(1)
      } else if (this.showContainer) {
        this.swiperChange()
        console.log(2)
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.radiusarea:after{content:"";clear:both;display:block;}
.radiusarea .item{float:left;width:33.333333%;text-align:center;}
.radiusarea .inner{padding:20px 10px 0 10px;}
.radiusarea .radius{margin:0 auto;width:60px;height:60px;border-radius:50%;background-color:#69d6e3;color:#fff;line-height:60px;}
.radiusarea .title{margin-top:5px;line-height:25px;}
.radiusarea .item:nth-child(1) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(2) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(3) .radius{background-color:#aed370;}
.radiusarea .item:nth-child(4) .radius{background-color:#ffb22d;}
.radiusarea .item:nth-child(5) .radius{background-color:#ea8482;}
</style>
