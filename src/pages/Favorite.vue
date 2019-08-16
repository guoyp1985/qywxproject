/*
* @description: 收藏页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-favorite" class="containerarea bg-page font14">
    <div class="s-topbanner s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item selected class="" @on-item-click="onItemClick(selectedIndex)">{{ $t('Article') }}</tab-item>
        <tab-item @on-item-click="onItemClick(selectedIndex)">{{ $t('Commodity') }}</tab-item>
        <tab-item @on-item-click="onItemClick(selectedIndex)">{{ $t('Store') }}</tab-item>
      </tab>
    </div>
    <div class="s-container s-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <swipeout v-show="selectedIndex===0">
        <template v-if="disData1">
          <template v-if="articles.length">
            <swipeout-item transition-mode="follow" @click.native="articleItemClick(article)" v-for="(article, index) in articles" :key="index">
              <div slot="right-menu">
                <swipeout-button @click.native.stop="cancelArticel(article)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
              </div>
              <div slot="content" class="item-content vux-1px-t">
                <div class="img-cell">
                  <img :src="getPhoto(article.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="info-cell flex_cell">
                  <div class="font14 clamp1">
                    {{article.title}}
                  </div>
                  <div class="font12 color-gray">
                    {{article.dateline | dateFormat}}
                  </div>
                </div>
              </div>
            </swipeout-item>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Data')}}</span>
            </div>
          </template>
        </template>
      </swipeout>
      <swipeout v-show="selectedIndex===1">
        <template v-if="disData2">
          <template v-if="commodities.length">
            <swipeout-item transition-mode="follow" @click.native="commodityItemClick(commodity)" v-for="(commodity, index) in commodities" :key="index">
              <div slot="right-menu">
                <swipeout-button @click.native.stop="cancelCommodity(commodity)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
              </div>
              <div slot="content" class="item-content vux-1px-t">
                <div class="img-cell">
                  <img :src="getPhoto(commodity.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="info-cell flex_cell">
                  <div class="font14 clamp1">
                    {{commodity.title}}
                  </div>
                  <div class="font12 color-gray">
                    {{commodity.dateline | dateFormat}}
                  </div>
                </div>
              </div>
            </swipeout-item>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Data')}}</span>
            </div>
          </template>
        </template>
      </swipeout>
      <swipeout v-show="selectedIndex===2">
        <template v-if="disData3">
          <template v-if="stores.length">
            <swipeout-item transition-mode="follow" @click.native="storeItemClick(store)" v-for="(store, index) in stores" :key="index">
              <div slot="right-menu">
                <swipeout-button @click.native.stop="cancelStore(store)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
              </div>
              <div slot="content" class="item-content vux-1px-t">
                <div class="img-cell">
                  <img :src="getPhoto(store.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="info-cell flex_cell">
                  <div class="font14 clamp1">
                    {{store.title}}
                  </div>
                  <div class="font12 color-gray">
                    {{store.dateline | dateFormat}}
                  </div>
                </div>
              </div>
            </swipeout-item>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Data')}}</span>
            </div>
          </template>
        </template>
      </swipeout>
    </div>
  </div>
</template>

<i18n>

</i18n>

<script>
import { Grid, GridItem, Tab, TabItem, Swiper, SwiperItem, Swipeout, SwipeoutItem, SwipeoutButton, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

let pageStart1 = 0
let pageStart2 = 0
let pageStart3 = 0
const limit = 20
export default {
  components: {
    Grid, GridItem, Tab, TabItem, Swiper, SwiperItem, Swipeout, SwipeoutItem, SwipeoutButton, XImg
  },
  data () {
    return {
      selectedIndex: 0,
      avatar: '',
      name: '',
      coins: 50,
      articles: [],
      commodities: [],
      stores: [],
      disData1: false,
      disData2: false,
      disData3: false
    }
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.articles.length === (pageStart1 + 1) * limit) {
                pageStart1++
                self.$vux.loading.show()
                self.getArticles()
              }
              break
            case 1:
              if (self.commodities.length === (pageStart2 + 1) * limit) {
                pageStart2++
                self.$vux.loading.show()
                self.getCommodities()
              }
              break
            case 2:
              if (self.stores.length === (pageStart3 + 1) * limit) {
                pageStart3++
                self.$vux.loading.show()
                self.getStores()
              }
              break
          }
        }
      })
    },
    onItemClick () {
      switch (this.selectedIndex) {
        case 0:
          if (this.articles.length < limit) {
            pageStart1 = 0
            this.disData1 = false
            this.articles = []
            this.$vux.loading.show()
            this.getArticles()
          }
          break
        case 1:
          if (this.commodities.length < limit) {
            pageStart2 = 0
            this.disData2 = false
            this.commodities = []
            this.$vux.loading.show()
            this.getCommodities()
          }
          break
        case 2:
          if (this.stores.length < limit) {
            pageStart3 = 0
            this.disData3 = false
            this.stores = []
            this.$vux.loading.show()
            this.getStores()
          }
          break
      }
    },
    onCancelClick () {
    },
    getArticles () {
      const self = this
      const user = User.get()
      let params = {pagestart: pageStart1, limit: limit, uploader: user.uid, type: 'news'}
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        self.articles = self.articles.concat(res.data)
        self.disData1 = true
      })
    },
    getCommodities () {
      const self = this
      const user = User.get()
      let params = {pagestart: pageStart2, limit: limit, uploader: user.uid, type: 'product'}
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        self.commodities = self.commodities.concat(res.data)
        self.disData2 = true
      })
    },
    getStores () {
      const self = this
      const user = User.get()
      let params = {pagestart: pageStart3, limit: limit, uploader: user.uid, type: 'store'}
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        self.stores = self.stores.concat(res.data)
        self.disData3 = true
      })
    },
    articleItemClick (item) {
      this.$router.push({path: item.url})
    },
    commodityItemClick (item) {
      this.$router.push({path: item.url})
    },
    storeItemClick (item) {
      this.$router.push({path: item.url})
    },
    cancelArticel (item) {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: item.moduleid, module: item.type})
      .then(res => {
        if (res.data.flag) {
          self.$util.deleteItem(self.articles, item.id)
        }
      })
    },
    cancelCommodity (item) {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: item.moduleid, module: item.type})
      .then(res => {
        if (res.data.flag) {
          self.$util.deleteItem(self.commodities, item.id)
        }
      })
    },
    cancelStore (item) {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: item.moduleid, module: item.type})
      .then(res => {
        if (res.data.flag) {
          self.$util.deleteItem(self.stores, item.id)
        }
      })
    },
    getData () {
      const user = User.get()
      this.avatar = user.avatar
      this.name = user.linkman
      this.coins = user.credit
      this.onItemClick()
    },
    refresh () {
      this.getData()
    }
  },
  filters: {
    dateFormat (isoDate) {
      return `收藏时间: ${new Time(isoDate * 1000).dateFormat('yyyy-MM-dd hh:mm')}`
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
#personal-favorite .item-content {
  padding: 10px;
  display: flex;
}

// #personal-favorite .item-content:first-of-type:before {
//   content: " ";
//   position: absolute;
//   left: 0;
//   top: 0;
//   right: 0;
//   height: 1px;
//   border-top: 1px solid #C7C7C7;
//   color: #C7C7C7;
//   -webkit-transform-origin: 0 0;
//   transform-origin: 0 0;
//   -webkit-transform: scaleY(0.5);
//   transform: scaleY(0.5);
// }

#personal-favorite .vux-swipeout-item:first-of-type .item-content:before {
  height: 0px;
  border-top: none;
}

#personal-favorite .item-content .img-cell {
  display: flex;
}

#personal-favorite .item-content .img-cell img {
  width: 40px;
  height: 40px;
  object-fit:cover;
}

#personal-favorite .item-content .info-cell {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: auto 10px;
}

</style>
