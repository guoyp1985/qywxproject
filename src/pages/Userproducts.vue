<template>
  <div v-if="loginUser" class="containerarea bg-white font14 uproducts notop">
    <div class="pagemiddle scroll-container" style="bottom:53px;">
      <swiper
        v-if="addata && addata.length > 0"
        :list="addata"
        dots-position="center"
        :interval=6000
        :show-dots="isshowdot"
        :aspect-ratio="500/900"
        auto
        loop>
      </swiper>
      <template v-if="activitydata && activitydata.length > 0">
        <div class="padding5 align_center color-red bold font16 bg-white" style="line-height: 37px;"><i class="al al-tagfill font18 mr10"></i>{{ $t('Selection promotion') }}</div>
        <div class="activitylist">
          <div v-for="(item,index) in activitydata" :key="item.id" class="bg-page">
            <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'" style="background-color:#efeff4 !important;">
              <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" container=".scroll-container"></x-img>
              <span slot="title">{{ item.title }}</span>
              <span slot="numbers">{{ item.numbers }}</span>
              <span slot="havetuan">{{ item.havetuan }}</span>
              <span slot="groupprice">{{ item.groupprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </groupbuyitemplate>
            <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'" style="background-color:#efeff4 !important;">
              <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;"container=".scroll-container"></x-img>
              <span slot="title">{{ item.title }}</span>
              <span slot="saveprice">{{ item.saveprice }}</span>
              <span slot="minprice">{{ item.minprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </bargainbuyitemplate>
          </div>
        </div>
        <router-link to="/saleProducts" class="padding10 flex_center color-gray">{{ $t('View more promotion') }}</router-link>
      </template>
      <div class="bg-page" style="height:12px;"></div>
      <template v-if="productdata.length > 0">
        <div class="padding5 align_center color-red bold font16 bg-white" style="line-height: 37px;"><i class="al al-goodsnewfill font18 mr10"></i>{{ $t('New products') }}</div>
        <div class="b_top_after"></div>
        <div class="productlist squarepic mb12">
          <productitemplate :data="item" v-for="(item,index) in productdata" :key="item.id">
            <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" container=".scroll-container"></x-img>
            <span slot="title">{{ item.title }}</span>
            <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
            <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
          </productitemplate>
        </div>
      </template>
    </div>
    <share-success
      v-show="showShareSuccess"
      v-if="retailerInfo.uploader == loginUser.uid || retailerInfo.identity != 'user'"
      :data="retailerInfo"
      :loginUser="loginUser"
      module="shop"
      :on-close="closeShareSuccess">
    </share-success>
  </div>
</template>

<i18n>
Selection promotion:
  zh-CN: 精选促销
New products:
  zh-CN: 精选新品
Online consulting:
  zh-CN: 在线咨询
Wechat contact:
  zh-CN: 微信联系
Shop topline:
  zh-CN: 店铺头条
Another batch:
  zh-CN: 换一批
View more promotion:
  zh-CN: 查看更多促销
</i18n>

<script>
import Vue from 'vue'
import { Swiper, XImg } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'
import ShareSuccess from '@/components/ShareSuccess'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Swiper, Groupbuyitemplate, Bargainbuyitemplate, Productitemplate, Newsitemplate, ShareSuccess, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      // query: {},
      loginUser: {},
      retailerInfo: { avatar: '/src/assets/images/user.jpg' },
      showShareSuccess: false,
      showdot: true,
      addata: [],
      activitydata: [],
      productdata: [],
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null
    }
  },
  computed: {
    isshowdot: function () {
      if (this.addata.length > 1) {
        this.showdot = true
      } else {
        this.showdot = false
      }
      return this.showdot
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.productdata.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('.uproducts .pagemiddle')
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    closeShareSuccess () {
      this.showShareSuccess = false
    }
  },
  beforeRouteEnter (to, from, next) {
    const user = User.get()
    if(user) {
      let retailerInfo = null
      let addata = null
      let activitydata = null
      Vue.http.get(`${ENV.BokaApi}/api/retailer/info`, {
        params: { uid: user.uid }
      }).then(function (res) {
        const data = res.data
        retailerInfo = data.data ? data.data : data
        return Vue.http.post(`${ENV.BokaApi}/api/common/getAd`, { useforurl: '/mobile/community.php' })
      }).then(function (res) {
        const data = res.data
        let retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          retdata[i].img = retdata[i].photo
        }
        addata = retdata
        const params = { params: { do: 'all', pagestart: 0, limit: 5 } }
        return Vue.http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params)
      }).then(function (res) {
        const data = res.data
        activitydata = data.data ? data.data : data
        next(vm => {
          vm.$store.commit('updateToggleTabbar', {toggleTabbar: true})
          vm.retailerInfo = retailerInfo
          vm.addata = addata
          vm.activitydata = activitydata
          vm.loginUser = user
          vm.$util.handleWxShare({
            module: 'shop',
            moduleid: 0,
            lastshareuid: to.query.share_uid,
            title: '共销宝商城',
            desc: '一款能买能卖的销售平台，你要的都在这里！',
            photo: user.avatar,
            link: `${ENV.Host}/#/userproducts?wid=${user.uid}&share_uid=${user.uid}`,
            successCallback: function () {
              vm.showShareSuccess = true
            }
          })
          vm.getdata1()
        })
      })
    }
    else {
      Vue.http.get(`${ENV.BokaApi}/api/user/show`)
    }
    // next(vm => {
    //   vm.$store.commit('updateToggleTabbar', {toggleTabbar: true})
    //   vm.query = to.query
    //   vm.loginUser = User.get()
    //   if (vm.loginUser) {
    //     vm.$util.handleWxShare({
    //       module: 'shop',
    //       moduleid: 0,
    //       lastshareuid: vm.query.share_uid,
    //       title: '共销宝商城',
    //       desc: '一款能买能卖的销售平台，你要的都在这里！',
    //       photo: vm.loginUser.avatar,
    //       link: `${ENV.Host}/#/userproducts?wid=${vm.loginUser.uid}&share_uid=${vm.loginUser.uid}`,
    //       successCallback: function () {
    //         vm.showShareSuccess = true
    //       }
    //     })
    //     vm.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
    //       params: { uid: vm.loginUser.uid }
    //     }).then(function (res) {
    //       let data = res.data
    //       vm.retailerInfo = data.data ? data.data : data
    //       return vm.$http.post(`${ENV.BokaApi}/api/common/getAd`, { useforurl: '/mobile/community.php' })
    //     }).then(function (res) {
    //       let data = res.data
    //       let retdata = data.data ? data.data : data
    //       for (let i = 0; i < retdata.length; i++) {
    //         retdata[i].img = retdata[i].photo
    //       }
    //       vm.addata = retdata
    //       let params = { params: { do: 'all', pagestart: 0, limit: 5 } }
    //       return vm.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params)
    //     }).then(function (res) {
    //       let data = res.data
    //       vm.activitydata = data.data ? data.data : data
    //       vm.getdata1()
    //       next()
    //     })
    //   } else {
    //     vm.$http.get(`${ENV.BokaApi}/api/user/show`)
    //   }
    // })
  }
}
</script>

<style lang="less" scoped>
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
.uproducts .squarepic .desbox{
  background-color:#f6f6f6;
}

</style>
