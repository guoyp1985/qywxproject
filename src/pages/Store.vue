<template>
  <div class="containerarea bg-page font14 s-havebottom store">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll">
        <swiper
          class="pic-swiper notitle"
          v-if="addata && addata.length > 0"
          :list="addata"
          dots-position="center"
          :interval="6000"
          :show-dots="isshowdot"
          :aspect-ratio="500/900"
          auto
          loop>
        </swiper>
        <template v-if="retailerInfo.uid">
          <div class="pt12 pb12 bg-white pl10 pr10 b_bottom_after">
        		<div class="t-table">
        			<div class="t-cell v_middle w50">
                <x-img class="avatarimg1 imgcover" :src="retailerInfo.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container"></x-img>
        			</div>
        			<div class="t-cell v_middle shopkeeper_txt">
        				<div class="clamp1 font16">{{ retailerInfo.title }}</div>
        			</div>
        				<div v-if="retailerInfo.uid == loginUser.uid" class="t-cell v_middle align_right" style="width:160px;">
                  <router-link class="font12 color-gray5 mr5 v_middle" to="/decorationShop"><i class="al al-dianpu font18 color-red"></i>{{$t('Rolling display')}}</router-link>
                  <router-link class="font12 color-gray5 v_middle" to="/centerSales"><i class="al al-xiaoshou font18 color-red"></i>{{$t('Manage center')}}</router-link>
        				</div>
                <div v-else class="t-cell v_middle align_right w100">
                  <div :class="`collect btnfavorite ${favoritecss}`" @click="favoriteevent"><i class="al al-xing font13 v_middle staricon"></i><span class="txt v_middle"></span></div>
                </div>
      			</div>
      		</div>
        </template>
        <template v-if="activitydata && activitydata.length > 0">
          <div class="bg-white mt5 padding10 b_top_after">
      			<span class="db-in pl5 font16 vline">{{ $t('Selection promotion') }}</span>
      		</div>
          <div class="b_top_after"></div>
          <div class="activitylist">
            <div v-for="(item,index) in activitydata" :key="item.id" class="bg-page">
              <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'">
                <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container"></x-img>
                <span slot="title">{{ item.title }}</span>
                <span slot="numbers">{{ item.numbers }}</span>
                <span slot="havetuan">{{ item.havetuan }}</span>
                <span slot="groupprice">{{ item.groupprice }}</span>
                <span slot="price">{{ item.price }}</span>
              </groupbuyitemplate>
              <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'">
                <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container"></x-img>
                <span slot="title">{{ item.title }}</span>
                <span slot="saveprice">{{ item.saveprice }}</span>
                <span slot="minprice">{{ item.minprice }}</span>
                <span slot="price">{{ item.price }}</span>
              </bargainbuyitemplate>
            </div>
          </div>
        </template>
        <div class="bg-white mt5 padding10 b_top_after">
    			<span class="db-in pl5 font16 vline">{{ $t('All products') }}</span>
    		</div>
        <div class="b_top_after"></div>
        <div v-if="disproductdata" class="productlist squarepic">
          <div v-if="productdata.length == 0" class="emptyitem flex_center">暂无商品</div>
          <productitemplate v-else :data="item" v-for="(item,index) in productdata" :key="item.id">
            <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" :offset="0" container=".scroll-container"></x-img>
            <span slot="title">{{ item.title }}</span>
            <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
            <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
          </productitemplate>
        </div>
        <div class="bg-white mt5 padding10 b_top_after">
          <div class="t-table">
            <div class="t-cell v_middle align_left">
      			     <span class="db-in pl5 font16 vline">{{ $t('Shop topline') }}</span>
            </div>
            <div class="t-cell v_middle align_right">
              <div class="qbtn4" style="padding: 3px 8px;line-height: 1;" @click="changeNews">
    						<i class="al al-shuaxin4 font12 mr3"></i><span>{{ $t('Another batch') }}</span>
    					</div>
            </div>
          </div>
    		</div>
        <div class="b_top_after"></div>
        <template v-if="toplinedata.length > 0">
          <div class="productlist">
            <newsitemplate :data="item" v-for="(item,index) in toplinedata" :key="item.id">
              <x-img slot="photo" class="v_middle imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width: 70px; height: 50px;" :offset="0" container=".scroll-container"></x-img>
              <span slot="title">{{ item.title }}</span>
              <span slot="date">{{ item.dateline | dateformat }}</span>
            </newsitemplate>
          </div>
        </template>
        <div class="padding10">
          <div class="btn-open" @click="openShop" style="display: block;background-color: #e10c00">我也要开店</div>
        </div>
      </div>
      <div class="s-bottom flex_center">
        <router-link :to="{path: '/chat', query: {uid: query.wid}}" class="flex_cell bg-orange1 color-white h_100 flex_center" style="border-right:#fff 1px solid;"><i class="al al-pinglun color-fff font18" style="padding-right:3px;"></i>{{ $t('Online consulting') }}</router-link>
        <div class="flex_cell bg-red color-white h_100 flex_center" @click="clickWetchat"><i class="al al-weixin2 color-fff font18" style="padding-right:3px;"></i>{{ $t('Wechat contact') }}</div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showqrcode" height="100%">
          <div class="popup1 h_100 flex_center font14 bg-black">
            <div class="flex_center" style="width:82%;height:82%;">
              <div class="align_center">
                <img :src="retailerInfo.qrcode" class="db" style="max-width:100%;max-height:100%;margin:0 auto 15px;">
        				<div class="color-white bg-blue padding5 border-box" style="background-color: #0f96e8;border-radius:4px;">长按识别二维码成为微信好友</div>
        				<div style="margin-top:30px;">
        					<span class="db-in" @click="closepopup">
        						<i class="al al-close color-white font36"></i>
        					</span>
        				</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <share-success
        v-show="showShareSuccess"
        v-if="retailerInfo.uploader == loginUser.uid || retailerInfo.identity != 'user'"
        :data="retailerInfo"
        :loginUser="loginUser"
        module="store"
        :on-close="closeShareSuccess">
      </share-success>
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
import { Swiper, TransferDom, Popup, XImg } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'
import ShareSuccess from '@/components/ShareSuccess'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
const newsLimit = 3
let initNewsData = []
let pageStart = 0
let newPageStart = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper, Popup, Groupbuyitemplate, Bargainbuyitemplate, Productitemplate, Newsitemplate, ShareSuccess, XImg, Sos
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
      // wid: 0,
      retailerInfo: { avatar: '/src/assets/images/user.jpg' },
      showqrcode: false,
      showdot: true,
      addata: [],
      activitydata: [],
      disproductdata: false,
      productdata: [],
      // limit: 10,
      // pageStart: 0,
      // newPageStart: 0,
      // newsLimit: 3,
      // isgetnews: true,
      toplinedata: [],
      favoritecss: 'none',
      isfavorite: false,
      hideloading: false
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
  computed: {
    isshowdot () {
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
      let params = { params: { pagestart: pageStart, limit: limit } }
      if (self.query.wid) {
        params.params.uploader = self.query.wid
      } else {
        params.params.from = 'myshop'
      }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        const data = res.data
        if (self.hideloading) {
          self.$vux.loading.hide()
        }
        const retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        self.disproductdata = true
      })
    },
    getnewsdata () {
      const self = this
      // if (self.isgetnews) {
      const params = { params: { pagestart: newPageStart, limit: newsLimit, uploader: self.query.wid } }
      self.$http.get(`${ENV.BokaApi}/api/list/news`, params)
      .then(res => {
        const data = res.data
        if (newPageStart === 0) {
          initNewsData = data
        }
        if (data.length === 0) {
          self.toplinedata = initNewsData
        } else {
          self.toplinedata = data
        }
        if (data.length === newsLimit) {
          newPageStart++
        } else if (data.length < newsLimit) {
          newPageStart = 0
        }
          // if (retdata.length === 0) {
          //   newPageStart = 0
          //   self.getnewsdata()
          // } else {
          //   if (retdata.length < newsLimit) {
          //     self.toplinedata = retdata
          //     if (newPageStart === 0) {
          //       self.isgetnews = false
          //     } else {
          //       newPageStart = 0
          //     }
          //   } else if (retdata.length === newsLimit) {
          //     self.toplinedata = retdata
          //     newPageStart++
          //   }
          // }
      })
      // }
    },
    changeNews () {
      this.getnewsdata()
    },
    clickWetchat () {
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
          { params: { module: self.module, id: self.query.wid, currenturl: encodeURIComponent(cururl) } }
        ).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.isfavorite = true
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
    openShop () {
      const self = this
      if (!self.loginUser || !self.loginUser.usergroup || self.loginUser.usergroup.length === 0) {
        self.$router.push('/retailerApply')
      } else if (self.loginUser.usergroup) {
        self.$router.push('/centerSales')
      }
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
        // if (res) {
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
          document.title = self.retailerInfo.title
          const wid = self.retailerInfo.uid
          self.$util.handleWxShare({
            module: 'store',
            moduleid: wid,
            lastshareuid: self.query.share_uid,
            title: self.retailerInfo.title,
            desc: self.retailerInfo.title,
            photo: self.retailerInfo.avatar,
            link: `${ENV.Host}/#/store?wid=${wid}&share_uid=${self.loginUser.uid}`,
            successCallback: function () {
              self.showShareSuccess = true
            }
          })
          if (wid !== self.loginUser.uid) {
            self.getCollectStaus()
          }
          return self.$http.post(`${ENV.BokaApi}/api/common/topShow`, { wid: self.query.wid })
        }
        // }
      }).then(res => {
        // if (res) {
        const data = res.data
        const retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          let p = retdata[i]
          p.img = p.photo
          p.url = `/product?id=${p.moduleid}&wid=${self.retailerInfo.uid}`
        }
        self.addata = retdata
        const params = { params: { do: 'store', pagestart: 0, limit: 20, wid: self.query.wid } }
        return self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params)
        // }
      }).then(res => {
        // if (res) {
        const data = res.data
        self.activitydata = data.data ? data.data : data
        // self.getData1()
        self.getnewsdata()
        // }
      })
    },
    init () {
      this.loginUser = User.get()
      // if (this.showContainer && this.productdata.length < limit) {
      //   this.disproductdata = false
      //   this.productdata = []
        // this.$vux.loading.show()
      // this.query = this.$route.query
      // this.getData1()
      // }
    },
    refresh () {
      if (this.query.wid !== this.$route.query.wid) {
        initNewsData = []
        pageStart = 0
        newPageStart = 0
        this.addata = []
        this.activitydata = []
        this.toplinedata = []
        this.query = this.$route.query
        this.$vux.loading.show()
        this.getData()
      }
      this.productdata = []
      this.getData1()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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

.store .collect{
  display:inline-block;vertical-align:middle;width:80px;box-sizing: border-box;font-size:13px;
  padding: 2px 0; background: #8e8e8e;color: #fff;border-radius: 50px;text-align: center;
}
.store .collect.have{background: #67cccc;}
.store .collect .txt:after{content:"收藏";}
.store .collect.have .txt:after{content:"已收藏"}
.store .staricon{margin-top:-2px;display:inline-block;}
.store .btn-open{
  background-color: #e10c00;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  padding:8px;
  letter-spacing: 2px;
}
</style>
