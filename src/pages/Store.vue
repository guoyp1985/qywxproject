<template>
  <div class="containerarea bg-page font14 s-havebottom store">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll">
        <div class="adbg" v-if="addata && addata.length == 1">
          <router-link class="inner" :to="addata[0].url">
            <img :src="addata[0].photo" />
          </router-link>
        </div>
        <swiper
          class="pic-swiper notitle"
          v-if="addata && addata.length > 1"
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
        			<router-link class="t-cell v_middle w50" :to="{path: '/centerSeller',query:{uid:query.wid}}">
                <img class="avatarimg1 imgcover" :src="retailerInfo.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
              </router-link>
        			<router-link class="t-cell v_middle shopkeeper_txt" :to="{path: '/centerSeller',query:{uid:query.wid}}">
        				<div class="clamp1 font16">{{ retailerInfo.title }}</div>
        			</router-link>
      				<div v-if="retailerInfo.uid == loginUser.uid" class="t-cell v_middle align_right" style="width:160px;">
                <router-link class="font12 color-gray5 mr5 v_middle" to="/decorationShop"><i class="al al-dianpu font18 color-red"></i>{{$t('Rolling display')}}</router-link>
                <router-link class="font12 color-gray5 v_middle" to="/centerSales"><i class="al al-xiaoshou font18 color-red"></i>{{$t('Manage center')}}</router-link>
      				</div>
              <div v-else class="t-cell v_middle align_right" style="width:90px;padding-left:10px;box-sizing:border-box;">
                <router-link class="collect have" to="/center">个人中心</router-link>
                <div :class="`collect btnfavorite mt5 ${favoritecss}`" @click="favoriteevent"><i class="al al-xing font13 v_middle staricon"></i><span class="txt v_middle"></span></div>
              </div>
      			</div>
            <!--
            <div class="pt10 align_right">
              <router-link class="db-in collect have" to="/center">个人中心</router-link>
              <div :class="`db-in collect btnfavorite ${favoritecss}`" @click="favoriteevent"><i class="al al-xing font13 v_middle staricon"></i><span class="txt v_middle"></span></div>
            </div>
          -->
      		</div>
        </template>
        <template v-if="showSuggest && suggestData.length">
          <div class="bg-white mt5 padding10 b_top_after db-flex suggest-area">
            <div class="flex_left flex_cell pl5 font16 vline">超值优惠</div>
            <div class="w80 flex_right" v-if="retailerInfo.uid == loginUser.uid" @click="clickSuggest">
              <div class="btn flex_center">不再显示</div>
            </div>
      		</div>
          <div class="b_top_after"></div>
          <div class="activitylist">
            <div v-for="(item,index) in suggestData" :key="item.id" class="bg-page">
              <router-link :to="{path:'/product',query:{id:item.id,wid:retailerInfo.uid}}" class="scroll_item mb5 font14 bg-white db">
            		<div class="t-table padding10 border-box">
            			<div class="t-cell v_middle" style="width:90px;">
                    <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            			</div>
            			<div class="t-cell v_middle">
            				<div class="clamp1">{{ item.title }}</div>
            				<div class="clamp1 font12 color-gray" v-if="loginUser.uid == retailerInfo.uid">佣金: {{ $t('RMB') }} {{ item.rebatein }}</div>
                    <div class="clear">
              				<div class="mt5 db-in">
              					<span class="color-red font14 middle-cell">{{ $t('RMB') }} {{item.price}}</span>
              				</div>
              				<div class="align_right db-in fr">
              					<div class="qbtn5 bg-red color-white">马上购买</div>
              				</div>
                    </div>
            			</div>
            		</div>
              </router-link>
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
                <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                <span slot="title">{{ item.title }}</span>
                <span slot="numbers">{{ item.numbers }}</span>
                <span slot="havetuan">{{ item.havetuan }}</span>
                <span slot="groupprice">{{ item.groupprice }}</span>
                <span slot="price">{{ item.price }}</span>
              </groupbuyitemplate>
              <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'">
                <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
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
        <div v-if="disproductdata" :class="`productlist ${productdata.length == 0 ? '' : 'squarepic'}`">
          <div v-if="productdata.length == 0" class="emptyitem flex_center">暂无商品</div>
          <productitemplate v-else :data="item" v-for="(item,index) in productdata" :key="item.id">
            <img slot="photo" class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            <span slot="title" style="word-break:break-all;">{{ item.title }}</span>
            <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
            <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
          </productitemplate>
        </div>
        <template v-if="toplinedata.length > 0">
          <div class="bg-white mt5 pl12 pr12 pt10 pb10 b_top_after">
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
          <div class="productlist">
            <newsitemplate :data="item" v-for="(item,index) in toplinedata" :key="item.id">
              <img slot="photo" class="v_middle imgcover" style="width: 70px; height: 50px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              <span slot="title">{{ item.title }}</span>
              <span slot="date">{{ item.dateline | dateformat }}</span>
            </newsitemplate>
          </div>
        </template>
        <div v-if="query.wid && query.wid != loginUser.uid" class="pb10 pl10 pr10">
          <router-link to="/centerSales" class="btn-open db" style="background-color: #e10c00">我也要开店</router-link>
        </div>
        <div style="text-align: center;color:#999;height: 30px;line-height:30px;font-size: 14px;" v-if="scrollEnd">没有更多商品了！</div>
      </div>
      <div class="s-bottom flex_center list-shadow">
        <div @click="toCenterSales" class="flex_cell color-white h_100 flex_center" style="background:#f9f9f9;border-right:#e8e8e8 1px solid;">
          <i class="al al-maijiaxiu2 color-orange font18 v_middle" style="margin-top:-1px;"></i>
          <span class="v_middle" style="color:#323232;margin-left:-4px;">卖家秀</span>
        </div>
        <div @click="toChat" class="flex_cell color-white h_100 flex_center" style="background:#f9f9f9;border-right:#e8e8e8 1px solid;">
          <i class="al al-zixun color-red font18 v_middle" style="padding-right:3px;"></i>
          <span class="v_middle" style="color:#323232">{{ $t('Online consulting') }}</span>
        </div>
        <div class="flex_cell color-white h_100 flex_center" style="background:#f9f9f9" @click="clickWetchat"><i class="al al-weixin  font18" style="padding-right:3px;color:#36ab60;"></i><span style="color:#323232">{{ $t('Wechat contact') }}</span></div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showqrcode" height="100%">
          <div class="popup1 h_100 flex_center font14 bg-black">
            <div class="flex_center" style="width:82%;height:82%;">
              <div class="align_center">
                <template v-if="!retailerInfo.qrcode || retailerInfo.qrcode == ''">
                  <router-link v-if="loginUser.uid == retailerInfo.uid" to="/retailerSetting" class="color-white bg-blue padding5 border-box" style="background-color: #0f96e8;border-radius:4px;">上传二维码</router-link>
                  <div v-else class="color-white bg-blue padding5 border-box" style="background-color: #0f96e8;border-radius:4px;">卖家没有上传二维码</div>
                </template>
                <template v-else>
                  <img :src="retailerInfo.qrcode" class="db" style="max-width:100%;max-height:100%;margin:0 auto 15px;">
          				<div class="color-white bg-blue padding5 border-box" style="background-color: #0f96e8;border-radius:4px;">长按识别二维码成为微信好友</div>
                </template>
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
      retailerInfo: { avatar: 'https://tossharingsales.boka.cn/images/user.jpg' },
      showqrcode: false,
      showdot: true,
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
      scrollEnd: false,
      showSuggest: false,
      suggestData: []
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
    initData () {
      initNewsData = []
      pageStart = 0
      newPageStart = 0
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
          if (self.query.from) {
            params.from = self.query.from
          }
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
    handleScroll () {
      const self = this
      const scrollarea = self.$refs['scrollContainer'][0] ? self.$refs['scrollContainer'][0] : self.$refs['scrollContainer']
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          console.log('in 滚动事件到底部了')
          if (self.productdata.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData1()
          } else {
            self.scrollEnd = true
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
      if (self.isNextNews) {
        self.isNextNews = false
        const params = { pagestart: newPageStart, limit: newsLimit, uploader: self.query.wid }
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
          if (newPageStart === 0) {
            initNewsData = data
          }
          let isEmpty = false
          if (data.length === 0) {
            if (newPageStart === 1) {
              self.$vux.toast.text('不要再戳啦，没有更多咯', 'middle')
            }
            self.toplinedata = initNewsData
            newPageStart = 1
            isEmpty = true
          } else {
            self.toplinedata = data
          }
          if (data.length === newsLimit) {
            newPageStart++
            self.haveMoreNews = true
          } else if (data.length < newsLimit && !isEmpty) {
            newPageStart = 0
          }
        })
      }
    },
    getSuggestData () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/list/product?uploader=-1`, {
        params: {pagestart: 0, limit: 2}
      }).then(function (res) {
        const data = res.data
        const retdata = data.data ? data.data : data
        self.suggestData = retdata
      })
    },
    changeNews () {
      const self = this
      if (!self.haveMoreNews && newPageStart === 0 && self.toplinedata.length < newsLimit) {
        self.$vux.toast.text('不要再戳啦，没有更多咯', 'middle')
      } else {
        this.getnewsdata()
      }
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

<style lang="less" scoped>
.store{
  .suggest-area{
    .btn{border:#ff6a61 1px solid;color:#ff6a61;width:70px;height:25px;border-radius:30px;font-size:12px;}
  }
}
.store .adbg{position:relative;padding-bottom: 55.555%;}
.store .adbg .inner{position:absolute;left:0;top:0;right:0;bottom:0;}
.store .adbg .inner img{vertical-align:middle;width:100%;height:100%;object-fit: cover;}
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
