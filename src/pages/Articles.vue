/*
* @description: 文章列表页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="view-articles">
    <sticky scroll-box="view-articles">
      <tab v-model="selectedIndex" bar-active-color="#04be02">
        <tab-item active-class="active-green" v-for="(tab, index) in tabs" :key="index" :selected="index===0" @on-item-click="onItemClick(tab.id)">{{ tab.title }}</tab-item>
      </tab>
    </sticky>
    <swiper :list="headlines | convertHeadlines" v-model="swiperIndex" @on-index-change="onIndexChange" auto></swiper>
    <div v-for="(tab, index) in tabs" :key="index" v-show="selectedIndex===index">
      <panel v-if="oArticles.length" :list="oArticles | convertArticles" type="5" @on-img-error="onImgError" @on-click-item="clickArticle"></panel>
      <div v-else class="no-related-x color-gray">
        <span>{{$t('No Related Articles')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, Sticky, Swiper, Panel } from 'vux'
import Time from '#/time'
import ENV from 'env'
import urlParse from 'url-parse'

export default {
  components: {
    Tab, TabItem, Sticky, Swiper, Panel
  },
  data () {
    return {
      query: Object,
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
      oArticles: [],
      selectedIndex: 0,
      swiperIndex: 0
    }
  },
  // computed: {
  //   aritcles: {
  //     get () {
  //       return this.oArticles.map((article) => {
  //         article.meta.date = new Time(article.meta.date).dateFormat('yyyy-MM-dd hh:mm')
  //         return article
  //       })
  //     },
  //     set (data) {
  //       this.oArticles = data
  //     }
  //   }
  // },
  filters: {
    convertHeadlines (headlines) {
      return headlines.map((item) => {
        return {
          id: item.id,
          url: item.url,
          title: item.title,
          img: item.photo
        }
      })
    },
    convertArticles (articles) {
      return articles.map((article) => {
        return {
          id: article.id,
          title: article.title,
          desc: article.summary,
          src: article.photo,
          module: article.module,
          meta: {
            source: article.author,
            date: new Time(article.dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
        }
      })
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
    clickArticle (item) {
      this.$router.push({ path: '/news', query: { id: item.id } })
    },
    getData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/classList/news`)
      .then(res => {
        self.tabs = res.data.data
        self.getAritcles(self.tabs[self.selectedIndex].id)
        const lUrl = urlParse(location.href, true)
        return self.$http.post(`${ENV.BokaApi}/api/common/getAd`, {useforurl: lUrl.hash.replace(/#/, '')})
      })
      .then(res => {
        let data = res.data
        if (data.flag) {
          let retdata = data.data
          for (let i = 0; i < retdata.length; i++) {
            let d = retdata[i]
            retdata[i].url = `/news?id=${d.id}&wid=${d.uploader}`
          }
          self.headlines = retdata
        }
      })
    },
    getAritcles (id) {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/list/news?classid=${id}`) // ${this.tabs[index].id}
      .then(res => {
        self.oArticles = res.data
      })
    }
  },
  created () {
    this.query = this.$route.query
    this.getData()
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  }
}
</script>

<style lang="less" scoped>
#view-articles .active-green {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
</style>
