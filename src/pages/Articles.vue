<template>
  <div id="view-articles">
    <sticky scroll-box="view-articles">
      <tab v-model="selectedIndex" bar-active-color="#04be02">
        <tab-item active-class="active-green" v-for="(tab, index) in tabs" :key="index" :selected="index===0" @on-item-click="onItemClick">{{ tab.title }}</tab-item>
      </tab>
    </sticky>
    <swiper :list="headlines" v-model="swiperIndex" @on-index-change="onIndexChange"></swiper>
    <view-box v-for="(tab, index) in tabs" :key="index" v-show="selectedIndex===index">
      <panel v-if="aritcles.length" :list="aritcles" type="5" @on-img-error="onImgError"></panel>
      <div v-else class="no-related-x color-gray">
        <span>{{$t('No Related Articles')}}</span>
      </div>
    </view-box>
  </div>
</template>
<script>
import { ViewBox, Tab, TabItem, Sticky, Swiper, Panel } from 'vux'
import Time from '../../libs/time'
import ENV from '../../libs/env'

export default {
  components: {
    ViewBox,
    Tab,
    TabItem,
    Sticky,
    Swiper,
    Panel
  },
  data () {
    return {
      tabs: [],
      headlines: [
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        },
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/2.jpg',
          title: '送你一辆车'
        },
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg',
          title: '送你一次旅行'
        }
      ],
      data: [],
      oArticles: [],
      selectedIndex: 0,
      swiperIndex: 0
    }
  },
  computed: {
    aritcles: {
      get () {
        return this.data.map((article) => {
          article.meta.date = new Time(article.meta.date).dateFormat('yyyy-MM-dd hh:mm')
          return article
        })
      },
      set (data) {
        this.data = data
      }
    }
  },
  methods: {
    onItemClick (index) {
      this.getAritcles(index)
    },
    onIndexChange (index) {
      this.swiperIndex = index
    },
    onImgError () {

    },
    getInitData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/classList/news`)
      .then(res => res.json())
      .then(data => {
        self.tabs = data.data
        self.getAritcles(self.selectedIndex)
      })
    },
    getAritcles (index) {
      this.$http.get(`${ENV.BokaApi}/api/list/news?classid=${this.tabs[index].id}`)
      .then(res => res.json())
      .then(data => {
        self.articles = data
      })
    }
  },
  created () {
    this.getInitData()
  }
}
</script>

<style lang="less">
#view-articles .active-green {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
</style>
