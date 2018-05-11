<template>
  <div v-if="showcontainer" class="containerarea font14 notop nobottom statpage productstat bg-white">
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
      <div class="tabarea">
        <template v-if="tabsdata && tabsdata.length > 0">
          <tab v-model="tabmodel" class="mt12 bg-page">
            <tab-item v-for="(item,index) in tabsdata" :selected="index == 0" :key="index" @on-item-click="tabclick(item,index)">{{ item.title }}</tab-item>
          </tab>
          <swiper v-model="tabmodel" class="x-swiper no-indicator">
            <swiper-item class="swiperitem" v-for="(tabitem, index) in tabsdata" :key="index">
              <div class="scroll_list padding10">
                <div v-if="!arrData || arrData.length == 0" class="emptyitem flex_center">暂无数据</div>
                <div v-else v-for="(item,index1) in arrData" :key="item.id" class="scroll_item pt10 pb10">
                  <template v-if="tabitem.type == 'shareview'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
                      </router-link>
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                        <div class="clamp1">{{ item.linkman }}</div>
                        <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                      </router-link>
                      <div class="t-cell v_middle align_right w60">
                        <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                      </div>
                    </div>
                    <div class="mt5 clamp1 color-gray font13"><span class="db-in">停留: {{ item.staytime }}秒</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                  </template>
                  <template v-else-if="tabitem.type == 'buylist'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
                      </router-link>
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                        <div class="clamp1">{{ item.linkman }}</div>
                        <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                      </router-link>
                      <div class="t-cell v_middle align_right w60">
                        <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="tabitem.type == 'sharelist'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
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
                  </template>
                  <template v-else-if="tabitem.type == 'asklist'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
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
                  </template>
                  <template v-else-if="tabitem.type == 'viewlist'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
                      </router-link>
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                        <div class="clamp1">{{ item.username }}</div>
                        <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                      </router-link>
                      <div class="t-cell v_middle align_right w60">
                        <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                      </div>
                    </div>
                    <div class="mt5 clamp1 color-gray font13"><span class="db-in">停留: {{ item.staytime }}秒</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                  </template>
                  <template v-else-if="tabitem.type == 'second'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
                      </router-link>
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                        <div class="clamp1">{{ item.linkman }}</div>
                        <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                      </router-link>
                      <div class="t-cell v_middle align_right w60">
                        <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                      </div>
                    </div>
                    <div class="mt5 clamp1 color-gray font13"><span class="db-in">停留: {{ item.staytime }}秒</span><span class="db-in ml5">阅读: {{ item.number }}次</span></div>
                  </template>
                  <template v-else-if="tabitem.type == 'crowdlist_isdeliver_1'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
                      </router-link>
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                        <div class="clamp1">{{ item.linkman }}</div>
                        <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                      </router-link>
                      <div class="t-cell v_middle align_right w60">
                        <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="tabitem.type == 'crowdlist_isdeliver_0'">
                    <div class="t-table">
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                        <img class="avatarimg1" :src="item.avatar" />
                      </router-link>
                      <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell">
                        <div class="clamp1">{{ item.linkman }}</div>
                        <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                      </router-link>
                      <div class="t-cell v_middle align_right w60">
                        <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="qbtn1 bg-green color-white">联系</router-link>
                      </div>
                    </div>
                    <div class="mt5 clamp1 color-gray font13">
                      <span class="db-in">已砍到: <span class="color-orange">{{ $t('RMB') }}{{ item.currentprice }}</span></span>
                      <span class="db-in ml5">助力: {{ item.sumothers }}人</span>
                    </div>
                  </template>
                </div>
              </div>
            </swiper-item>
          </swiper>
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
import Time from '#/time'
import ENV from 'env'

export default {
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
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
      scrollArea4: null,
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
    getListdata: function (index) {
      const self = this
      return self.datalist[index]
    },
    scroll: function () {
      const self = this
      let index = self.clickTabIndex
      self.$util.scrollEvent({
        element: self.scrollData[index].scrollArea,
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
          self.tabtop = document.querySelector('.productstat .tabarea').offsetTop + 44
          let swiper = document.querySelector('.productstat .x-swiper')
          swiper.style['position'] = 'absolute'
          swiper.style['top'] = `${self.tabtop}px`
          swiper.style['bottom'] = '0px'
          let items = document.querySelectorAll('.statpage .swiperitem')
          for (let i = 0; i < items.length; i++) {
            self.scrollData[i].scrollArea = items[i]
          }
        }
        if (!self.scrollData[index].isBindScroll) {
          self.scrollData[index].isBindScroll = true
          self.scrollData[index].scrollArea.removeEventListener('scroll', self.scroll)
          self.scrollData[index].scrollArea.addEventListener('scroll', self.scroll)
        }
      })
    },
    tabclick (item, index) {
      const self = this
      self.clickTabitem = item
      self.clickTabIndex = index
      self.arrData = self.datalist[index]
      if (self.scrollData[index].pagestart === 0 && !self.scrollData[index].isBindScroll) {
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

.statpage .x-swiper{height:auto;}
.statpage .vux-tab{background-color:@page-bg-color}
</style>
