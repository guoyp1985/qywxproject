<style lang="less">
.store-page{
  .adbg{
    position:relative;padding-bottom: 55.555%;
    .inner{
      position:absolute;left:0;top:0;right:0;bottom:0;
      img{vertical-align:middle;width:100%;height:100%;object-fit: cover;}
      .btn{width:150px;height:35px;border-radius:20px;}
    }
    .pic-swiper{
      position:absolute;left:0;top:0;right:0;bottom:0;
    }
  }
  .vline{position:relative;}
  .vline:after {
    content: " ";
    display: block;
    position: absolute;
    width: 2px;
    top: 4px;
    bottom: 4px;
    margin: auto 0;
    left: -1px;
    background-color: #ff6600;
  }
  .fix-swiper{
    position:absolute;right:0;top:20px;
    width:75px;height:35px;
    .btn{
      width:75px;height:35px;border-top-left-radius:20px;border-bottom-left-radius:20px;
      background-color:#ff6a61;color:#fff;
      display:flex;justify-content: center; align-items: center;
    }
  }
}
</style>
<template>
  <div class="containerarea font14 store-page">
    <template v-if="showTemplate1">
      <Storeview1
        :showSos="showSos"
        :sosTitle="sosTitle"
        :showContainer="showContainer"
        :module="module"
        :query="query"
        :loginUser="loginUser"
        :showShareSuccess="showShareSuccess"
        :retailerInfo="retailerInfo"
        :showqrcode="showqrcode"
        :showSwiper="showSwiper"
        :addata="addata"
        :activitydata="activitydata"
        :disproductdata="disproductdata"
        :productdata="productdata"
        :toplinedata="toplinedata"
        :favoritecss="favoritecss"
        :isfavorite="isfavorite"
        :hideloading="hideloading"
        :isNextNews="isNextNews"
        :haveMoreNews="haveMoreNews"
        :isLoading="isLoading"
        :isDone="isDone"
        :showSuggest="showSuggest"
        :suggestData="suggestData"
        :showHelpModal="showHelpModal"
        :pageStart="pageStart"
        :newPageStart="newPageStart"
        @clickDecoration="toDecoration"
        @clickSuggest="clickSuggest"
        @handleScroll="handleScroll"
        @toCenterSales="toCenterSales"
        @toChat="toChat"
        @clickWetchat="clickWetchat"
        @closepopup="closepopup"
        @closeShareSuccess="closeShareSuccess"
        @clickHelp="clickHelp"
        @closeHelpModal="closeHelpModal"
        @favoriteevent="favoriteevent">
      </Storeview1>
    </template>
    <template v-if="showTemplate2">
      <Storeview2
        :showSos="showSos"
        :sosTitle="sosTitle"
        :showContainer="showContainer"
        :module="module"
        :query="query"
        :loginUser="loginUser"
        :showShareSuccess="showShareSuccess"
        :retailerInfo="retailerInfo"
        :showqrcode="showqrcode"
        :showSwiper="showSwiper"
        :addata="addata"
        :activitydata="activitydata"
        :disproductdata="disproductdata"
        :productdata="productdata"
        :toplinedata="toplinedata"
        :favoritecss="favoritecss"
        :isfavorite="isfavorite"
        :hideloading="hideloading"
        :isNextNews="isNextNews"
        :haveMoreNews="haveMoreNews"
        :isLoading="isLoading"
        :isDone="isDone"
        :showSuggest="showSuggest"
        :suggestData="suggestData"
        :showHelpModal="showHelpModal"
        :pageStart="pageStart"
        :newPageStart="newPageStart"
        @clickDecoration="toDecoration"
        @clickSuggest="clickSuggest"
        @handleScroll="handleScroll"
        @toCenterSales="toCenterSales"
        @toChat="toChat"
        @clickWetchat="clickWetchat"
        @closepopup="closepopup"
        @closeShareSuccess="closeShareSuccess"
        @clickHelp="clickHelp"
        @closeHelpModal="closeHelpModal"
        @favoriteevent="favoriteevent">
      </Storeview2>
    </template>
    <template v-if="showTemplate3">
      <Storeview3
        :showSos="showSos"
        :sosTitle="sosTitle"
        :showContainer="showContainer"
        :module="module"
        :query="query"
        :loginUser="loginUser"
        :showShareSuccess="showShareSuccess"
        :retailerInfo="retailerInfo"
        :showqrcode="showqrcode"
        :showSwiper="showSwiper"
        :addata="addata"
        :activitydata="activitydata"
        :disproductdata="disproductdata"
        :productdata="productdata"
        :toplinedata="toplinedata"
        :favoritecss="favoritecss"
        :isfavorite="isfavorite"
        :hideloading="hideloading"
        :isNextNews="isNextNews"
        :haveMoreNews="haveMoreNews"
        :isLoading="isLoading"
        :isDone="isDone"
        :showSuggest="showSuggest"
        :suggestData="suggestData"
        :showHelpModal="showHelpModal"
        :pageStart="pageStart"
        :newPageStart="newPageStart"
        @clickDecoration="toDecoration"
        @clickSuggest="clickSuggest"
        @handleScroll="handleScroll"
        @toCenterSales="toCenterSales"
        @toChat="toChat"
        @clickWetchat="clickWetchat"
        @closepopup="closepopup"
        @closeShareSuccess="closeShareSuccess"
        @clickHelp="clickHelp"
        @closeHelpModal="closeHelpModal"
        @favoriteevent="favoriteevent">
      </Storeview3>
    </template>
    <template v-if="showTemplate4">
      <Storeview4
        :showSos="showSos"
        :sosTitle="sosTitle"
        :showContainer="showContainer"
        :module="module"
        :query="query"
        :loginUser="loginUser"
        :showShareSuccess="showShareSuccess"
        :retailerInfo="retailerInfo"
        :showqrcode="showqrcode"
        :showSwiper="showSwiper"
        :addata="addata"
        :activitydata="activitydata"
        :disproductdata="disproductdata"
        :productdata="productdata"
        :toplinedata="toplinedata"
        :favoritecss="favoritecss"
        :isfavorite="isfavorite"
        :hideloading="hideloading"
        :isNextNews="isNextNews"
        :haveMoreNews="haveMoreNews"
        :isLoading="isLoading"
        :isDone="isDone"
        :showSuggest="showSuggest"
        :suggestData="suggestData"
        :showHelpModal="showHelpModal"
        :pageStart="pageStart"
        @clickDecoration="toDecoration"
        @clickSuggest="clickSuggest"
        @handleScroll="handleScroll"
        @toCenterSales="toCenterSales"
        @toChat="toChat"
        @clickWetchat="clickWetchat"
        @closepopup="closepopup"
        @closeShareSuccess="closeShareSuccess"
        @clickHelp="clickHelp"
        @closeHelpModal="closeHelpModal"
        @favoriteevent="favoriteevent">
      </Storeview4>
    </template>
    <share-success
      v-show="showShareSuccess"
      v-if="retailerInfo.uploader == loginUser.uid || retailerInfo.identity != 'user'"
      :data="retailerInfo"
      :loginUser="loginUser"
      module="store"
      :on-close="closeShareSuccess">
    </share-success>
    <template v-if="showHelpModal">
      <tip-layer
        @clickClose="closeHelpModal"
        title="超值优惠"
        content="超值优惠商品是官方为你提供的爆款低价商品，帮助你转化客户，促进用户购买，用户购买完成后，你还可以获得商品的佣金奖励哦！">
      </tip-layer>
    </template>
  </div>
</template>

<i18n>
Decoration shop:
  zh-CN: 装修店铺
Selection promotion:
  zh-CN: 精选促销
All products:
  zh-CN: 全部商品
Online consulting:
  zh-CN: 在线咨询
Wechat contact:
  zh-CN: 微信联系
Shop topline:
  zh-CN: 店铺头条
Another batch:
  zh-CN: 换一批
</i18n>

<script>
import Storeview1 from '@/components/Store1'
import Storeview2 from '@/components/Store2'
import Storeview3 from '@/components/Store3'
import Storeview4 from '@/components/Store4'
import ShareSuccess from '@/components/ShareSuccess'
import TipLayer from '@/components/TipLayer'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
const newsLimit = 3
let initNewsData = []

export default {
  components: {
    Storeview1, Storeview2, Storeview3, Storeview4, ShareSuccess, TipLayer
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      showContainer: false,
      module: 'store',
      query: {},
      loginUser: {},
      showShareSuccess: false,
      retailerInfo: { avatar: 'https://tossharingsales.boka.cn/images/user.jpg' },
      showqrcode: false,
      showSwiper: false,
      addata: [],
      activitydata: [],
      disproductdata: false,
      productdata: [],
      toplinedata: [],
      favoritecss: 'none',
      isfavorite: false,
      hideloading: false,
      isNextNews: true,
      haveMoreNews: false,
      showSuggest: false,
      suggestData: [],
      showHelpModal: false,
      pageStart: 0,
      newPageStart: 0,
      showTemplate1: false,
      showTemplate2: false,
      showTemplate3: false,
      showTemplate4: false,
      isLoading: false,
      isDone: false,
      ajaxIng: false
    }
  },
  watch: {
    favoritecss () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.favoritecss
    },
    isfavorite () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.isfavorite
    }
  },
  methods: {
    initData () {
      initNewsData = []
      this.pageStart = 0
      this.newPageStart = 0
      this.query = {}
      this.retailerInfo = {}
      this.showSos = false
      this.sosTitle = ''
      this.showContainer = false
      this.showShareSuccess = false
      this.showqrcode = false
      this.addata = []
      this.activitydata = []
      this.disproductdata = false
      this.productdata = []
      this.toplinedata = []
      this.isfavorite = false
      this.hideloading = false
      this.isNextNews = true
      this.haveMoreNews = false
      this.showTemplate1 = false
      this.showTemplate2 = false
      this.showTemplate3 = false
      this.showTemplate4 = false
      this.ajaxIng = false
    },
    toDecoration () {
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/decorationShop', query: params})
    },
    clickHelp () {
      this.showHelpModal = true
    },
    closeHelpModal () {
      this.showHelpModal = false
    },
    clickSuggest () {
      this.$vux.confirm.show({
        content: '确认关闭超值优惠商品？关闭后可在卖家设置中开启。',
        onConfirm: () => {
          this.showSuggest = false
          this.$http.post(`${ENV.BokaApi}/api/card/setParas`, {
            params: {suggest_open: 0}
          }).then(res => {
            const data = res.data
            if (data.flag) {
              this.loginUser.retailerinfo.params = data.data
              this.retailerInfo.params = data.data
              User.set(this.loginUser)
            }
          })
        }
      })
    },
    toChat () {
      const self = this
      let params = { uid: self.query.wid }
      if (!self.query.wid) {
        params.uid = self.loginUser.uid
      }
      if (parseInt(params.uid) === self.loginUser.uid) {
        self.$vux.toast.text('不能和自己聊天哦', 'middle')
      } else {
        if (self.loginUser.subscribe === 0) {
          const originHref = encodeURIComponent(`${ENV.Host}/#/store?wid=${params.uid}&fromModule=store&fromId=${params.uid}`)
          const callbackHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
          location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${callbackHref}&response_type=code&scope=snsapi_userinfo&state=${originHref}#wechat_redirect`)
        } else {
          params.fromModule = 'store'
          params.fromId = params.uid
          params.wid = params.uid
          params = this.$util.handleAppParams(this.query, params)
          self.$router.push({path: '/chat', query: params})
        }
      }
    },
    toCenterSales () {
      const self = this
      let params = { uid: self.query.wid }
      if (!self.query.wid) {
        params.wid = self.loginUser.uid
      }
      self.$router.push({path: '/centerSeller', query: params})
    },
    handleScroll (scrollarea) {
      const self = this
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          console.log('in 滚动事件到底部了')
          console.log(self.productdata.length)
          console.log((self.pageStart + 1) * limit)
          if (self.productdata.length === (self.pageStart + 1) * limit && !this.ajaxIng) {
            console.log(1)
            self.pageStart++
            self.$vux.loading.show()
            self.isLoading = true
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      if (this.ajaxIng) return false
      this.ajaxIng = true
      const self = this
      let params = {pagestart: this.pageStart, limit: limit, wid: this.loginUser.uid}
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/getRetailerProducts`, {
        params: params
      }).then(res => {
        this.ajaxIng = false
        const data = res.data
        if (self.hideloading) {
          self.$vux.loading.hide()
        }
        const retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        this.isLoading = false
        if (retdata.length < limit && this.productdata.length && this.pageStart > 0) {
          this.isDone = true
        } else {
          this.isDone = false
        }
        self.disproductdata = true
      })
    },
    getnewsdata () {
      const self = this
      if (self.isNextNews) {
        self.isNextNews = false
        const params = { pagestart: this.newPageStart, limit: newsLimit, uploader: self.query.wid }
        if (!self.query.wid) {
          params.uploader = self.loginUser.uid
        } else {
          params.uploader = self.query.wid
        }
        self.$http.get(`${ENV.BokaApi}/api/list/news`, {
          params: params
        })
        .then(res => {
          self.isNextNews = true
          const data = res.data
          const retdata = data.data ? data.data : data
          if (this.newPageStart === 0) {
            initNewsData = retdata
          }
          let isEmpty = false
          if (retdata.length === 0) {
            if (this.newPageStart === 1) {
              self.$vux.toast.text('不要再戳啦，没有更多咯', 'middle')
            }
            self.toplinedata = initNewsData
            this.newPageStart = 1
            isEmpty = true
          } else {
            self.toplinedata = retdata
          }
          if (retdata.length === newsLimit) {
            this.newPageStart++
            self.haveMoreNews = true
          } else if (retdata.length < newsLimit && !isEmpty) {
            this.newPageStart = 0
          }
        })
      }
    },
    getSuggestData () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/list/product?uploader=-13`, {
        params: {pagestart: 0, limit: 2}
      }).then(function (res) {
        const data = res.data
        const retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          let cur = retdata[i]
          let disrebate = parseFloat(cur.superioraward) + parseFloat(cur.rebatein)
          retdata[i].disrebate = disrebate.toFixed(2)
        }
        self.suggestData = retdata
      })
    },
    changeNews () {
      const self = this
      if (!self.haveMoreNews && this.newPageStart === 0 && self.toplinedata.length < newsLimit) {
        self.$vux.toast.text('不要再戳啦，没有更多咯', 'middle')
      } else {
        this.getnewsdata()
      }
    },
    clickWetchat () {
      if (!this.retailerInfo.qrcode || this.retailerInfo.qrcode === '') {
        this.$util.remindQrcode(this.retailerInfo.uid)
      }
      this.showqrcode = true
    },
    closepopup () {
      this.showqrcode = false
    },
    closeShareSuccess () {
      this.showShareSuccess = false
    },
    getCollectStaus () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/user/favorite/show`,
        { params: { module: self.module, id: self.query.wid } }
      ).then(function (res) {
        let data = res.data
        if (data.flag === 1) {
          self.isfavorite = true
        } else {
          self.isfavorite = false
        }
      })
    },
    favoriteevent () {
      const self = this
      if (self.isfavorite) {
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/user/favorite/delete`,
          { params: { module: self.module, id: self.query.wid } }
        ).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.isfavorite = false
            self.$vux.toast.show({
              text: '取消收藏'
            })
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      } else {
        let cururl = `/store?wid=${self.query.wid}`
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/user/favorite/add`,
          { params: { module: self.module, id: self.query.wid, wid: self.retailerInfo.uid, currenturl: encodeURIComponent(cururl) } }
        ).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.isfavorite = true
            self.$vux.toast.show({
              text: '收藏成功'
            })
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
      self.isfavorite = !self.isfavorite
    },
    getData () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'store'
      })
      .then(res => {
        let infoparams = { uid: self.query.wid }
        if (self.query.share_uid) {
          infoparams.share_uid = self.query.share_uid
        }
        if (self.query.lastshareuid) {
          infoparams.lastshareuid = self.query.lastshareuid
        }
        return self.$http.get(`${ENV.BokaApi}/api/retailer/info`, { params: infoparams })
      })
      .then(res => {
        self.$vux.loading.hide()
        self.hideloading = true
        const data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.retailerInfo = data.data ? data.data : data
          this.$util.miniPost({type: 'store', data: self.retailerInfo})
          document.title = self.retailerInfo.title
          if (this.retailerInfo.params.suggest_open === '1' || this.retailerInfo.params.suggest_open === 1) {
            this.showSuggest = true
            this.getSuggestData()
          } else {
            this.showSuggest = false
          }
          let shopmodel = `${this.retailerInfo.shopmodel}`
          if (shopmodel === '2') {
            self.showTemplate2 = true
          } else if (shopmodel === '3') {
            self.showTemplate3 = true
          } else if (shopmodel === '4') {
            self.showTemplate4 = true
          } else {
            self.showTemplate1 = true
          }
          const wid = self.retailerInfo.uid
          let shareParams = {
            module: 'store',
            moduleid: wid,
            title: self.retailerInfo.title,
            desc: self.retailerInfo.title,
            photo: self.retailerInfo.avatar,
            link: `${ENV.Host}/#/store?wid=${wid}&share_uid=${self.loginUser.uid}`,
            successCallback: function () {
              self.showShareSuccess = true
            }
          }
          if (self.query.share_uid) {
            shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
            shareParams.lastshareuid = self.query.share_uid
          }
          self.$util.handleWxShare(shareParams)
          if (wid !== self.loginUser.uid) {
            self.getCollectStaus()
          }
          let topParams = { wid: self.query.wid }
          if (self.query.share_uid) {
            topParams.share_uid = self.query.share_uid
          }
          if (self.query.lastshareuid) {
            topParams.lastshareuid = self.query.lastshareuid
          }
          return self.$http.post(`${ENV.BokaApi}/api/common/topShow`, topParams)
        }
      }).then(res => {
        if (res) {
          const data = res.data
          const retdata = data.data ? data.data : data
          for (let i = 0; i < retdata.length; i++) {
            let p = retdata[i]
            p.img = p.photo
            p.url = `/product?id=${p.moduleid}&wid=${self.retailerInfo.uid}`
          }
          self.addata = retdata
          self.showSwiper = true
          const params = { params: { do: 'store', pagestart: 0, limit: 20, wid: self.query.wid } }
          return self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params)
        }
      }).then(res => {
        if (res) {
          const data = res.data
          self.activitydata = data.data ? data.data : data
          // self.getnewsdata()
        }
      })
    },
    init () {
      this.loginUser = User.get()
      console.log('当前登录用户')
      console.log(this.loginUser)
    },
    refresh (query) {
      this.initData()
      this.query = query
      console.log(this.query)
      this.$vux.loading.show()
      this.getData()
      if (this.productdata.length < limit) {
        this.productdata = []
        this.getData1()
      }
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh(this.$route.query)
  }
}
</script>
