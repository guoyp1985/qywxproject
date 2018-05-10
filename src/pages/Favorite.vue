/*
* @description: 收藏页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-favorite">
    <sticky scroll-box="personal-favorite">
      <div class="top-banner">
        <div class="f-title">
          <div class="user-avatar">
            <img :src="avatar"/>
          </div>
          <div class="user-info">
            <div class="font16 color-white">{{ name }}</div>
            <div class="coin-row">
              <span class="user-coin">
                <i class="al al-jinbi3 font20"></i>
                <span class="font13 color-white">{{ coins }}</span>
              </span>
            </div>
          </div>
        </div>
        <tab class="x-tab" v-model="selectedIndex">
          <tab-item selected class="" @on-item-click="onItemClick(selectedIndex)">{{ $t('Article') }}</tab-item>
          <tab-item @on-item-click="onItemClick(selectedIndex)">{{ $t('Commodity') }}</tab-item>
          <tab-item @on-item-click="onItemClick(selectedIndex)">{{ $t('Store') }}</tab-item>
        </tab>
      </div>
    </sticky>
    <swipeout v-show="selectedIndex===0">
      <template v-if="articles.length">
        <swipeout-item transition-mode="follow" @click.native="articleItemClick(article)" v-for="(article, index) in articles" :key="index">
          <div slot="right-menu">
            <swipeout-button @click.native.stop="cancelArticel(article)" type="primary" background-color="#D23934">{{$t('Cancel')}}</swipeout-button>
          </div>
          <div slot="content" class="item-content vux-1px-t">
            <div class="img-cell">
              <x-img :src="article.photo" container="#vux_view_box_body"></x-img>
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
              <x-img :src="commodity.photo"></x-img>
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
              <x-img  default-src="../assets/_images/nopic.jpg" :src="store.photo"></x-img>
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
      <!-- <swiper v-model="selectedIndex" height="100px" :show-dots="false">
        <swiper-item key="0">
          12123
        </swiper-item>
        <swiper-item key="1">
          2312
        </swiper-item>
        <swiper-item key="2">
          233
        </swiper-item>
      </swiper> -->
  </div>
</template>

<i18n>

</i18n>

<script>
import { Grid, GridItem, Tab, TabItem, Swiper, SwiperItem, Swipeout, SwipeoutItem, SwipeoutButton, XImg, Sticky } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {
    Grid,
    GridItem,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XImg,
    Sticky
  },
  data () {
    return {
      selectedIndex: 0,
      avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/user.jpg',
      name: '黄一萌',
      coins: 50,
      articles: [],
      commodities: [],
      stores: []
    }
  },
  methods: {
    onItemClick (index) {
      switch (index) {
        case 0:
          this.getArticles()
          break
        case 1:
          this.getCommodities()
          break
        case 2:
          this.getStores()
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
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/list`, {uploader: user.uid, type: 'retailer'})
      .then(res => {
        self.stores = res.data
      })
    },
    articleItemClick (item) {
      this.$router.push({path: `/articles/${item.id}`})
    },
    commodityItemClick (item) {
      this.$router.push({path: `/product`, query: {id: item.id, wid: item.wid}})
    },
    storeItemClick (item) {
      this.$router.push({path: `/store`, query: {wid: item.wid}})
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
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return `收藏时间: ${new Time(isoDate * 1000).dateFormat('yyyy-MM-dd hh:mm')}`
    }
  },
  created () {
    this.getData()
    this.getArticles()
  }
}
</script>

<style lang="less">
#personal-favorite .top-banner {
  width: 100%;
  // height: 154px;
  // position: absolute;
  // left: 0;
  // top: 0;
  // right: 0;
  background-image: url(../assets/images/bannerbg2.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

#personal-favorite .f-title {
  height: 110px;
  padding: 0 10px;
  display: flex;
}

#personal-favorite .user-avatar {
  width: 110px;
  margin: auto;
  text-align: center;
}

#personal-favorite .user-info {
  flex: 1;
  margin: auto;
}

#personal-favorite .user-avatar img {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #fff;
}

#personal-favorite .x-tab {
  background: none;
}

#personal-favorite .user-coin {
  border: 1px solid #ffd706;
  border-radius: 22px;
  padding-right: 12px;
  min-width: 40px;
  display: inline-block;
  height: 20px;
  position: relative;
}

#personal-favorite .user-coin i {
  line-height: 20px;
  color: #ffd706;
}

#personal-favorite .user-coin span {
  line-height: 22px;
  vertical-align: top;
}

#personal-favorite .coin-row {
  margin-top: 10px;
}

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

/* vux css hack */
#personal-favorite .vux-tab {
  background-color: rgba(255, 255, 255, 0.1);
}

#personal-favorite .vux-tab .vux-tab-item {
  color: #ffffff;
}
</style>
