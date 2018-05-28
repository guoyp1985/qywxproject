/*
* @description: 收藏页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-favorite" class="containerarea bg-page font14">
    <div class="pagetop">
      <div class="top-banner">
        <tab class="b-tab" v-model="selectedIndex">
          <tab-item selected class="">{{ $t('Article') }}</tab-item>
          <tab-item>{{ $t('Commodity') }}</tab-item>
          <tab-item>{{ $t('Store') }}</tab-item>
        </tab>
      </div>
    </div>
    <div class="pagemiddle">
      <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <swipeout v-if="(index == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', index)">
            <template v-if="disData1">
              <template v-if="articles.length > 0">
                <swipeout-item transition-mode="follow" @click.native="articleItemClick(article)" v-for="(article, index) in articles" :key="index">
                  <div slot="right-menu">
                    <swipeout-button @click.native.stop="cancelArticel(article)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
                  </div>
                  <div slot="content" class="item-content vux-1px-t">
                    <div class="img-cell">
                      <x-img :src="getPhoto(article.photo)" default-src="/src/assets/images/nopic.jpg" container="#vux_view_box_body"></x-img>
                    </div>
                    <div class="info-cell">
                      <div class="font14">
                        {{article.title}}
                      </div>
                      <div class="font12 color-gray">
                        {{article.dateline | dateFormat}}
                      </div>
                    </div>
                  </div>
                </swipeout-item>
              </template>
              <div v-else class="no-related-x color-gray">
                <span>{{$t('No Related Data')}}</span>
              </div>
            </template>
          </swipeout>
          <swipeout v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', index)">
            <template v-if="disData2">
              <template v-if="commodities.length">
                <swipeout-item transition-mode="follow" @click.native="commodityItemClick(commodity)" v-for="(commodity, index) in commodities" :key="index">
                  <div slot="right-menu">
                    <swipeout-button @click.native.stop="cancelCommodity(commodity)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
                  </div>
                  <div slot="content" class="item-content vux-1px-t">
                    <div class="img-cell">
                      <x-img :src="getPhoto(commodity.photo)" default-src="/src/assets/images/nopic.jpg" container="#vux_view_box_body"></x-img>
                    </div>
                    <div class="info-cell">
                      <div class="font14">
                        {{commodity.title}}
                      </div>
                      <div class="font12 color-gray">
                        {{commodity.dateline | dateFormat}}
                      </div>
                    </div>
                  </div>
                </swipeout-item>
              </template>
              <div v-else class="no-related-x color-gray">
                <span>{{$t('No Related Data')}}</span>
              </div>
            </template>
          </swipeout>
          <swipeout v-show="index===2" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', index)">
            <template v-if="disData3">
              <template v-if="stores.length">
                <swipeout-item transition-mode="follow" @click.native="storeItemClick(store)" v-for="(store, index) in stores" :key="index">
                  <div slot="right-menu">
                    <swipeout-button @click.native.stop="cancelStore(store)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
                  </div>
                  <div slot="content" class="item-content vux-1px-t">
                    <div class="img-cell">
                      <x-img default-src="/src/assets/images/nopic.jpg" :src="getPhoto(store.photo)" container="#vux_view_box_body"></x-img>
                    </div>
                    <div class="info-cell">
                      <div class="font14">
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
        </swiper-item>
      </swiper>
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

const limit = 10
let pageStart1 = 0
let pageStart2 = 0
let pageStart3 = 0
export default {
  components: {
    Grid, GridItem, Tab, TabItem, Swiper, SwiperItem, Swipeout, SwipeoutItem, SwipeoutButton, XImg
  },
  data () {
    return {
      selectedIndex: 0,
      tabtxts: [ '文章', '商品', '店铺' ],
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
    getPhoto (photo) {
      return this.$util.getPhoto(photo)
    },
    handleScroll (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.articles.length === (pageStart1 + 1) * limit) {
              pageStart1++
              self.$vux.loading.show()
              self.getArticles()
            }
          } else if (index === 1) {
            if (self.commodities.length === (pageStart2 + 1) * limit) {
              pageStart2++
              self.$vux.loading.show()
              self.getCommodities()
            }
          } else if (index === 2) {
            if (self.stores.length === (pageStart3 + 1) * limit) {
              pageStart3++
              self.$vux.loading.show()
              self.getStores()
            }
          }
        }
      })
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.articles.length < limit) {
            self.disData1 = false
            this.articles = []
            self.getArticles()
          }
          break
        case 1:
          if (this.commodities.length < limit) {
            self.disData2 = false
            this.commodities = []
            self.getCommodities()
          }
          break
        case 2:
          if (this.stores.length < limit) {
            self.disData3 = false
            this.stores = []
            self.getStores()
          }
          break
      }
    },
    onCancelClick () {

    },
    getArticles () {
      const self = this
      const user = User.get()
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, {uploader: user.uid, type: 'news'})
      .then(res => {
        self.$vux.loading.hide()
        self.articles = res.data
        self.disData1 = true
      })
    },
    getCommodities () {
      const self = this
      const user = User.get()
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, {uploader: user.uid, type: 'product'})
      .then(res => {
        self.$vux.loading.hide()
        self.commodities = res.data
        self.disData2 = true
      })
    },
    getStores () {
      const self = this
      const user = User.get()
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, {uploader: user.uid, type: 'store'})
      .then(res => {
        self.$vux.loading.hide()
        self.stores = res.data
        self.disData3 = true
      })
    },
    articleItemClick (item) {
      this.$router.push(item.url)
    },
    commodityItemClick (item) {
      this.$router.push(item.url)
    },
    storeItemClick (item) {
      this.$router.push(item.url)
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
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: item.id})
    },
    cancelStore (item) {
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: item.id})
    },
    getData () {
      const user = User.get()
      this.avatar = user.avatar
      this.name = user.linkman
      this.coins = user.credit
      this.swiperChange()
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
}

#personal-favorite .item-content .info-cell {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: auto 10px;
}

</style>
