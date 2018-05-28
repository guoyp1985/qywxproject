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
    <div class="s-container s-container1 scroll-container">
      <swipeout v-show="selectedIndex===0">
        <template v-if="articles.length">
          <swipeout-item transition-mode="follow" @click.native="articleItemClick(article)" v-for="(article, index) in articles" :key="index">
            <div slot="right-menu">
              <swipeout-button @click.native.stop="cancelArticel(article)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
            </div>
            <div slot="content" class="item-content vux-1px-t">
              <div class="img-cell">
                <x-img :src="article.photo" default-src="/src/assets/images/nopic.jpg" container="#vux_view_box_body"></x-img>
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
        <template v-else>
          <div class="no-related-x color-gray">
            <span>{{$t('No Related Data')}}</span>
          </div>
        </template>
      </swipeout>
      <swipeout v-show="selectedIndex===1">
        <template v-if="commodities.length">
          <swipeout-item transition-mode="follow" @click.native="commodityItemClick(commodity)" v-for="(commodity, index) in commodities" :key="index">
            <div slot="right-menu">
              <swipeout-button @click.native.stop="cancelCommodity(commodity)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
            </div>
            <div slot="content" class="item-content vux-1px-t">
              <div class="img-cell">
                <x-img :src="commodity.photo" default-src="/src/assets/images/nopic.jpg" container="#vux_view_box_body"></x-img>
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
        <template v-else>
          <div class="no-related-x color-gray">
            <span>{{$t('No Related Data')}}</span>
          </div>
        </template>
      </swipeout>
      <swipeout v-show="selectedIndex===2">
        <template v-if="stores.length">
          <swipeout-item transition-mode="follow" @click.native="storeItemClick(store)" v-for="(store, index) in stores" :key="index">
            <div slot="right-menu">
              <swipeout-button @click.native.stop="cancelStore(store)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
            </div>
            <div slot="content" class="item-content vux-1px-t">
              <div class="img-cell">
                <x-img default-src="/src/assets/images/nopic.jpg" :src="store.photo" container="#vux_view_box_body"></x-img>
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
      stores: []
    }
  },
  methods: {
    onItemClick () {
      switch (this.selectedIndex) {
        case 0:
          !this.articles.length && this.getArticles()
          break
        case 1:
          !this.commodities.length && this.getCommodities()
          break
        case 2:
          !this.stores.length && this.getStores()
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
        self.articles = res.data
      })
    },
    getCommodities () {
      const self = this
      const user = User.get()
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, {uploader: user.uid, type: 'product'})
      .then(res => {
        self.commodities = res.data
      })
    },
    getStores () {
      const self = this
      const user = User.get()
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, {uploader: user.uid, type: 'store'})
      .then(res => {
        self.stores = res.data
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
}

#personal-favorite .item-content .info-cell {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: auto 10px;
}

</style>
