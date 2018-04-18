<template>
  <div id="view-articles">
    <sticky scroll-box="view-articles">
      <tab v-model="selectedIndex" bar-active-color="#04be02">
        <tab-item active-class="active-green" v-for="(tab, index) in tabs" :key="index" :selected="index===0" @on-item-click="onItemClick">{{ tab.name }}</tab-item>
      </tab>
    </sticky>
    <swiper :list="headlines" v-model="swiperIndex" @on-index-change="onIndexChange"></swiper>
    <view-box v-for="(tab, index) in tabs" :key="index" v-show="selectedIndex===index">
      <panel v-if="data[index]" :list="data[index]" type="5" @on-img-error="onImgError"></panel>
      <div v-else class="no-related-x color-gray">
        <span>{{$t('No Related Articles')}}</span>
      </div>
    </view-box>
  </div>
</template>

<i18n>
</i18n>

<script>
import { ViewBox, Tab, TabItem, Sticky, Swiper, Panel } from 'vux'
import Time from '../../libs/time'

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
      tabs: [
        {
          name: '全部'
        },
        {
          name: '养生'
        },
        {
          name: '财经'
        },
        {
          name: '数码控'
        },
        {
          name: '科技'
        }
      ],
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
      data: [
        [
          {
            src: 'http://ossxsb.boka.cn/month_201802/15179954197563.jpg',
            title: '朋友圈里的获客红包，新春获客利器',
            desc: '朋友圈里的获客红包，新春获客利器',
            meta: {
              source: '博卡先锋',
              date: 1522659301220
            }
          },
          {
            src: 'http://www.sharingsales.cn/data/upload/month_201713/15168402846394',
            title: '睡眠不好人易老，且影响寿命！对症调理身体…',
            desc: '睡眠不好人易老，且影响寿命！对症调理身体…',
            meta: {
              source: '楚风越韵  🏠',
              date: 1522659301220
            }
          },
          {
            src: 'http://www.sharingsales.cn/data/upload/month_201713/15166191644949',
            title: '十二经络的走向动画图及不同病症的对治方法…',
            desc: '十二经络的走向动画图及不同病症的对治方法…',
            meta: {
              source: '楚风越韵  🏠',
              date: 1522659301220
            }
          },
          {
            src: 'http://www.sharingsales.cn/data/upload/month_201713/15165807759290',
            title: '咦？你的脸上有张疾病图！教你从脸看健康～',
            desc: '咦？你的脸上有张疾病图！教你从脸看健康～',
            meta: {
              source: '楚风越韵  🏠',
              date: 1522659301220
            }
          }
        ]
      ],
      selectedIndex: 0,
      swiperIndex: 0
    }
  },
  computed: {
    getAritcles () {
      return this.articles.map((article) => {
        article.meta.date = new Time(article.meta.date).dateFormat('yyyy-MM-dd hh:mm')
        return article
      })
    }
  },
  methods: {
    onItemClick (index) {
      console.log(index)
    },
    onIndexChange (index) {
      this.swiperIndex = index
    },
    onImgError () {

    }
  }
}
</script>

<style lang="less">
#view-articles .active-green {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
</style>
