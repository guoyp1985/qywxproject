<template>
  <div v-if="loginUser" class="containerarea bg-white font14 uproducts notop">
    <div class="pagemiddle scroll-container" style="bottom:53px;" ref="scrollContainer" @scroll="handleScroll">
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
          <div v-for="(item,index) in activitydata" :key="index" class="bg-page">
            <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'" style="background-color:#efeff4 !important;">
              <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              <span slot="title">{{ item.title }}</span>
              <span slot="numbers">{{ item.numbers }}</span>
              <span slot="havetuan">{{ item.havetuan }}</span>
              <span slot="groupprice">{{ item.groupprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </groupbuyitemplate>
            <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'" style="background-color:#efeff4 !important;">
              <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
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
          <productitemplate :data="item" v-for="(item,index) in productdata" :key="index">
            <img slot="photo" class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
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
View more promotion:
  zh-CN: 查看更多促销
</i18n>

<script>
import { Swiper, XImg } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'
import ShareSuccess from '@/components/ShareSuccess'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
let pageStart = 0

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
      query: {},
      loginUser: {},
      retailerInfo: { avatar: 'https://tossharingsales.boka.cn/images/user.jpg' },
      showShareSuccess: false,
      showdot: true,
      addata: [],
      activitydata: [],
      productdata: [],
      disData: false,
      limit: 10,
      pagestart1: 0
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
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.productdata.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = { params: { pagestart: pageStart, limit: limit } }
      this.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
      })
    },
    closeShareSuccess () {
      this.showShareSuccess = false
    },
    getData () {
      const self = this
      const user = User.get()
      this.query = this.$route.query
      this.loginUser = user
      if (user) {
        let retailerInfo = null
        let addata = null
        let activitydata = null
        this.$http.get(`${ENV.BokaApi}/api/retailer/info`, { params: { uid: user.uid } })
        .then(res => {
          const data = res.data
          retailerInfo = data.data ? data.data : data
          return self.$http.post(`${ENV.BokaApi}/api/common/getAd`, { useforurl: '/mobile/community.php' })
        })
        .then(res => {
          const data = res.data
          let retdata = data.data ? data.data : data
          for (let i = 0; i < retdata.length; i++) {
            retdata[i].img = retdata[i].photo
          }
          addata = retdata
          const params = { params: { do: 'all', pagestart: 0, limit: 5 } }
          return self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params)
        })
        .then(res => {
          const data = res.data
          activitydata = data.data ? data.data : data
          self.$store.commit('updateToggleTabbar', {toggleTabbar: true})
          self.retailerInfo = retailerInfo
          self.addata = addata
          self.activitydata = activitydata
          self.loginUser = user
          let shareParams = {
            module: 'shop',
            moduleid: 0,
            title: '共销客商城',
            desc: '一款能买能卖的销售平台，你要的都在这里！',
            photo: user.avatar,
            link: `${ENV.Host}/#/userproducts?wid=${user.uid}&share_uid=${user.uid}`,
            successCallback: function () {
              self.showShareSuccess = true
            }
          }
          if (self.query.share_uid) {
            shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
            shareParams.lastshareuid = self.query.share_uid
          }
          self.$util.handleWxShare(shareParams)
        })
      } else {
        this.$http.get(`${ENV.BokaApi}/api/user/show`)
      }
    },
    init () {
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: true})
      if (this.loginUser && this.productdata.length < limit) {
        this.$vux.loading.show()
        this.productdata = []
        pageStart = 0
        this.getData1()
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
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
