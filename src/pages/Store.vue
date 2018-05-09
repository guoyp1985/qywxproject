<template>
  <div class="containerarea bg-page font14 s-havebottom store">
    <div class="s-container" style="top:0px;">
      <swiper
        class="pic-swiper notitle"
        v-if="addata && addata.length > 0"
        :list="addata"
        dots-position="center"
        :interval=6000
        :show-dots="isshowdot"
        :aspect-ratio="500/900"
        auto
        loop>
      </swiper>
      <div class="pt12 pb12 bg-white pl10 pr10 b_bottom_after">
    		<div class="t-table">
    			<div class="t-cell v_middle w50">
    				<img class="avatarimg1" :src="retailerInfo.avatar"/>
    			</div>
    			<div class="t-cell v_middle shopkeeper_txt">
    				<div class="clamp1 font16">{{ retailerInfo.title }}</div>
    			</div>
  				<div class="t-cell v_middle align_right" style="width:160px;">
            <router-link class="font12 color-gray5 mr5 v_middle" to="/decorationShop"><i class="al al-dianpu font18 color-red"></i>{{$t('Decoration shop')}}</router-link>
            <router-link class="font12 color-gray5 v_middle" to="/centerSales"><i class="al al-xiaoshou font18 color-red"></i>{{$t('Sales center')}}</router-link>
  				</div>
  			</div>
  		</div>
      <template v-if="activitydata && activitydata.length > 0">
        <div class="bg-white mt5 padding10 b_top_after">
    			<span class="db-in pl5 font16 vline">{{ $t('Selection promotion') }}</span>
    		</div>
        <div class="b_top_after"></div>
        <div class="activitylist">
          <div v-for="(item,index) in activitydata" :key="item.id" class="bg-page">
            <Groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="numbers">{{ item.numbers }}</span>
              <span slot="havetuan">{{ item.havetuan }}</span>
              <span slot="groupprice">{{ item.groupprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Groupbuyitemplate>
            <Bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="saveprice">{{ item.saveprice }}</span>
              <span slot="minprice">{{ item.minprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Bargainbuyitemplate>
          </div>
        </div>
      </template>
      <div class="bg-white mt5 padding10 b_top_after">
  			<span class="db-in pl5 font16 vline">{{ $t('All products') }}</span>
  		</div>
      <div class="b_top_after"></div>
      <div class="productlist squarepic">
        <div v-if="productdata.length == 0" class="emptyitem flex_center">暂无商品</div>
        <Productitemplate v-else :data="item" v-for="(item,index) in productdata" :key="item.id">
          <img slot="photo" class="imgcover" :src="item.photo" />
          <span slot="title">{{ item.title }}</span>
          <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
          <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
        </Productitemplate>
      </div>
      <template v-if="toplinedata.length > 0">
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
        <div class="productlist">
          <Newsitemplate :data="item" v-for="(item,index) in toplinedata" :key="item.id">
            <img slot="photo" :src="item.photo" class="v_middle" style="width: 70px; height: 50px;" />
            <span slot="title">{{ item.title }}</span>
            <span slot="date">{{ item.dateline | dateformat }}</span>
          </Newsitemplate>
        </div>
      </template>
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
    <ShareSuccess
      v-show="showShareSuccess"
      v-if="retailerInfo.uploader == loginUser.uid || retailerInfo.identity != 'user'"
      :data="retailerInfo"
      :loginUser="loginUser"
      module="store"
      :on-close="closeShareSuccess">
    </ShareSuccess>
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
import { Swiper, TransferDomDirective as TransferDom, Popup } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'
import ShareSuccess from '@/components/ShareSuccess'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    Groupbuyitemplate,
    Bargainbuyitemplate,
    Productitemplate,
    Newsitemplate,
    Popup,
    ShareSuccess
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: Object,
      loginUser: Object,
      showShareSuccess: false,
      wid: null,
      retailerInfo: { avatar: '/src/assets/images/user.jpg' },
      showqrcode: false,
      showdot: true,
      addata: [],
      activitydata: [],
      productdata: [],
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null,
      newspagestart: 0,
      newslimit: 3,
      isgetnews: true,
      toplinedata: []
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
      if (self.query.wid) {
        params.params.uploader = self.query.wid
      } else {
        params.params.from = 'myshop'
      }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('.store .s-container')
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getnewsdata () {
      const self = this
      if (self.isgetnews) {
        let params = { params: { pagestart: self.newspagestart, limit: self.newslimit, uploader: self.query.wid } }
        self.$http.get(`${ENV.BokaApi}/api/list/news`, params).then(function (res) {
          let data = res.data
          let retdata = data.data ? data.data : data
          if (retdata.length === 0) {
            self.newspagestart = 0
            self.getnewsdata()
          } else {
            if (retdata.length < self.newslimit) {
              self.toplinedata = data.data ? data.data : data
              if (self.newspagestart === 0) {
                self.isgetnews = false
              } else {
                self.newspagestart = 0
              }
            } else if (retdata.length === self.newslimit) {
              self.toplinedata = data.data ? data.data : data
              self.newspagestart++
            }
          }
        })
      }
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
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.loginUser = User.get()
    self.query = self.$route.query
    self.$vux.loading.show()
    self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
      params: { uid: self.query.wid }
    }).then(function (res) {
      self.$vux.loading.hide()
      let data = res.data
      self.retailerInfo = data.data ? data.data : data
      document.title = self.retailerInfo.title
      self.wid = self.retailerInfo.uid
      self.$util.handleWxShare({
        module: 'store',
        moduleid: self.wid,
        lastshareuid: self.query.share_uid,
        title: self.retailerInfo.title,
        desc: self.retailerInfo.title,
        photo: self.retailerInfo.avatar,
        link: `${ENV.Host}/#/store?wid=${self.wid}&share_uid=${self.loginUser.uid}`,
        successCallback: function () {
          self.showShareSuccess = true
        }
      })
      return self.$http.post(`${ENV.BokaApi}/api/common/topShow`, { wid: self.query.wid })
    }).then(function (res) {
      let data = res.data
      let retdata = data.data ? data.data : data
      for (let i = 0; i < retdata.length; i++) {
        let p = retdata[i]
        p.img = p.photo
        p.url = `/product?id=${p.moduleid}&wid=${self.retailerInfo.uid}`
      }
      self.addata = retdata
      let params = { params: { do: 'store', pagestart: 0, limit: 20, wid: self.query.wid } }
      return self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params)
    }).then(function (res) {
      let data = res.data
      self.activitydata = data.data ? data.data : data
    })
    self.getdata1()
    self.getnewsdata()
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
</style>
