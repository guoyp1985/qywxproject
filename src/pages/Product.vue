<template>
  <div :class="`containerarea bg-white font14 product ${showtopcss}`">
    <template v-if="loginUser && (loginUser.subscribe == 1 || loginUser.subscribe == 2)">
      <div v-if="isshowtop" class="pagetop">
        <div class="t-table h_100">
          <router-link class="t-cell v_middle pl10" style="width:46px;" :to="{path:'/center'}">
            <img class="v_middle" style="width:36px;height:36px;border-radius:50%" :src="loginUser.avatar" />
          </router-link>
          <router-link class="t-cell v_middle color-black" :to="{path:'/center'}">
            <div>{{ loginUser.linkman }}</div>
            <div class="font12 color-orange">金币：{{ loginUser.credits }}</div>
          </router-link>
          <div class="t-cell v_middle align_center" style="width:65px;">
            <router-link class="db-in" style="position:relative;" :to="{path:'retailerMessagelist'}">
              <i class="al al-pinglun color-black" style="font-size:24px;"></i>
              <span v-if="retailerinfo.newmessage > 0" class="numicon">{{ retailerinfo.newmessage }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="loginUser">
      <router-link v-if="isshowtop" class="pagetop flex_center color-blue" :to="{path:'/center'}">您有{{ waitgetcredit }}个金币，点击领取 ></router-link>
    </template>
    <div class="pagemiddle">
      <swiper
        dots-position="center"
        :interval=6000
        :show-dots="isshowdot"
        :aspect-ratio="1/1"
        auto
        loop>
        <swiper-item v-for="(item, index) in photoarr" :key="index">
          <img :src="item" class="imgcover" style="width:100%;height:100%;" />
        </swiper-item>
      </swiper>
      <div class="grouptitle flex_left" v-if="activityInfo && activityInfo.type == 'groupbuy'">
				<div class="col1"><span>{{ $t('RMB') }}</span><span class="font20 bold">{{ activityInfo.groupprice }}</span></div>
				<div class="col2"><div class="colicon">{{ activityInfo.numbers }}人团</div></div>
				<div class="col3">已团{{ productdata.havetuan }}件</div>
			</div>
      <div class="pt12 pb12 bg-white pl10 pr10 b_bottom_after">
    		<div class="clamp2">
          <span class="v_middle db-in bold"><span v-if="productdata.moderate != 1" class="color-gray bold">【已下架】</span>{{ productdata.title }}</span>
          <span v-if="loginUser.groupid == 1" class="v_middle db-in color-gray font12">分享次数:{{ productdata.shares }}</span>
        </div>
        <div class="font24 color-red"><span class="font18 mr5">{{ $t('RMB') }}</span>{{ productdata.price }}</div>
        <div class="t-table font12 mt5 color-gray2">
          <template v-if="productdata.postage">
  					<div class="t-cell v_middle">快递: {{ productdata.postage }}元</div>
  					<div class="t-cell v_middle pl10 align_right">销量: {{ productdata.saled }}件</div>
          </template>
          <div v-else class="t-cell v_middle align_left">销量: {{ productdata.saled }}件</div>
          <div v-if="loginUser.uid == retailerinfo.uid || productdata.identity != 'user'" class="t-cell v_middle border-box align_right">
            <span>佣金: {{ $t('RMB') }}{{ productdata.rebate }}</span>
          </div>
					<div v-if="productdata.buyonline != 1" class="t-cell v_middle align_right " @click="popupbuy">
						<span class="help-icon">?</span>了解购买流程
					</div>
				</div>
  		</div>
			<div class="groupbuarea" v-if="activityInfo && activityInfo.type == 'groupbuy' && activitydata.length > 0">
				<div class="bg-page" style="height:10px;"></div>
				<div class="bg-white">
					<div class="b_bottom_after padding10">正在开团，可直接参与</div>
          <div class="vux-marquee" item-height=110 duration=2000>
            <marquee>
              <marquee-item v-for="(item,index) in activitydata" :key="item.id">
                <Groupbuyitemplate style="margin-bottom:0 !important;">
                  <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
                  <span slot="title">{{ item.title }}</span>
                  <span slot="numbers">{{ item.numbers }}</span>
                  <span slot="havetuan">{{ item.havetuan }}</span>
                  <span slot="groupprice">{{ item.groupprice }}</span>
                  <span slot="price">{{ item.price }}</span>
                </Groupbuyitemplate>
              </marquee-item>
            </marquee>
          </div>
				</div>
			</div>
			<div class="evluatearea" v-if="productdata.buyonline >= 1 && evluatedata.length > 0">
				<div class="bg-page" style="height:10px;"></div>
				<div class="bg-white">
					<div class="b_bottom_after pl10 pr10 pt5 pb5">
						<div class="t-table">
							<div class="t-cell">宝贝评价</div>
							<div class="t-cell align_right">
								<div class="font12 color-red padding5" @click="popupevluate">查看更多></div>
							</div>
						</div>
					</div>
          <div class="scroll_list">
            <template v-if="evluatedata.length == 0">
              <div class="scroll_item emptyitem">
      					<div class="t-table">
      						<div class="t-cell" style="padding:10px;">暂无评价</div>
      					</div>
      				</div>
            </template>
            <div v-else v-for="(item,index) in evluatedata" :key="item.id" class="scroll_item padding10">
    					<div class="t-table">
    						<div class="t-cell pic" style="width:40px;">
    							<img class="avatarimg" :src="item.avatar" />
    						</div>
    						<div class="t-cell">{{ item.username }}</div>
    						<div class="t-cell color-gray font12 align_right" style="width:70px;">{{ item.dateline | dateformat }}</div>
    					</div>
    					<div class="mt5">{{ item.message }}</div>
    					<div class="mt5 align_right">
                <router-link class="bg-orange color-white qbtn" to="/store" style="width:50px;padding:0px;line-height:25px;">回复</router-link>
    					</div>
    					<div class="mt5" v-if="item.comment && item.comment.length > 0">
        				<div v-for="(citem,index1) in item.comment" :key="citem.id" class="border-box p0" style="background-color:#f7f7f7;">
        					<div class="title clear pt5 pb5">
        						<div class="color-gray font12" style="padding-left:6px;position:relative;">
        							<div class="bg-green" style="position: absolute;left: 0;top: 0px;bottom: 0px;width: 2px;"></div>
        							<span class="color-orange">{{ citem.username }}</span> 回复 :<span>{{ citem.message }}</span>
        						</div>
        					</div>
        				</div>
        			</div>
    				</div>
          </div>
				</div>
			</div>
      <template v-if="buyuserdata.length > 0">
        <div class="bg-page" style="height:10px;"></div>
        <div class="bg-white b_bottom_after">
          <div class="pt10 pl10 pr10">购买过本店商品的好友</div>
          <div class="buylist pt10 pb15 pl10 pr10">
            <router-link class="item" :to="{path:'/product',query:{id:item.uid}}" v-for="(item,index) in buyuserdata" :key="item.uid">
              <div class="align_center">
    						<img class="avatarimg" :src="item.avatar">
    					</div>
    					<div class="clamp1 mt5 font12 color-gray2">{{ item.username }}</div>
            </router-link>
          </div>
        </div>
      </template>
      <div class="bg-page" style="height:10px;"></div>
      <div class="b_top_after"></div>
      <div class="padding10 b_bottom_after">
        <router-link class="t-table" :to="{path:'/store',query:{ wid: retailerinfo.uid}}" style="color:inherit;">
  				<div class="t-cell v_middle" style="width:70px;">
  					<img class="v_middle imgcover" style="width:60px;height:60px;" :src="retailerinfo.avatar" />
  				</div>
  				<div class="t-cell v_middle">
  					<div class="distitle clamp2">{{ retailerinfo.title }}</div>
  					<div class="distitle clamp2 color-gray font12 mt5">全部宝贝: {{ retailerinfo.productcount }}件</div>
  				</div>
  				<div class="t-cell v_middle align_right">
  					<div class="qbtn4 color-orange5 font12 border-color-orange5" style="padding: 1px 8px;">进店逛逛</div>
  				</div>
        </router-link>
      </div>
      <div class="flex_center pt10 pb10 bg-page color-gray">—— 详情 ——</div>
      <div class="productcontent">
        <div v-html="productdata.content"></div>
        <img v-for="(item,index) in previewerPhotoarr" :key="index" :src="item.src" @click="showBigimg(index)" />
      </div>
      <div class="productarea scrollendarea scrollend" style="background-color:#f6f6f6;"></div>
    </div>
		<div class="pagebottom b_top_after" v-if="productdata.moderate != 1">
			<div class="t-table h_100">
				<div :class="`t-cell h_100 v_middle align_center btnfavorite ${favoritecss}`" style="width:100px;" @click="favoriteevent">
					<i class="al font12 mr3"></i>
        </div>
        <router-link class="t-cell bg-orange1 color-white h_100 v_middle align_center" to="/centerSales">我要咨询</router-link>
			</div>
		</div>
    <template v-else>
  		<div v-if="activityInfo && activityInfo.type == 'groupbuy'" class="pagebottom b_top_after groupbybottom">
  			<div class="t-table h_100">
          <router-link class="t-cell h_100 v_middle align_center" to="/centerSales" style="width:50px;">
            <div><i class="al al-buoumaotubiao10 font16 color-red"></i></div>
            <div class="font12">咨询</div>
          </router-link>
  				<div :class="`t-cell h_100 btnfavorite ${favoritecss} v_middle align_center font12`" style="width:50px;" @click="favoriteevent">
  					<i class="al font18 mr3"></i>
  				</div>
  				<div v-if="productdata.storage > 0" class="t-cell color-white h_100 v_middle align_center bg-orange1" @click="buyevent">
  					<div>{{ $t('RMB') }} {{ productdata.price }}</div>
  					<div>原价购买</div>
  				</div>
  				<div class="t-cell color-white h_100 v_middle align_center bg-red2" @click="buyevent('groupbuy')">
  					<div>{{ $t('RMB') }} {{ activityInfo.groupprice }}</div>
  					<div>一键拼团</div>
  				</div>
  			</div>
  		</div>
      <template v-else>
    		<div v-if="productdata.buyonline >= 1" class="pagebottom b_top_after">
    			<div class="t-table h_100">
    				<div :class="`t-cell h_100 btnfavorite ${favoritecss} v_middle align_center`" style="width:100px;" @click="favoriteevent">
    					<i class="al font12 mr3"></i>
    				</div>
            <router-link class="t-cell bg-orange1 color-white h_100 v_middle align_center" to="/centerSales">我要咨询</router-link>
    				<div v-if="productdata.storage <= 0" class="t-cell color-white h_100 v_middle align_center bg-gray">已售罄</div>
    				<div v-else class="t-cell color-white h_100 v_middle align_center bg-red2" @click="buyevent">立即购买</div>
    			</div>
    		</div>
        <div v-else class="pagebottom b_top_after">
    			<div class="t-table h_100">
    				<div :class="`t-cell h_100 btnfavorite ${favoritecss} v_middle align_center`" style="width:100px;" @click="favoriteevent">
    					<i class="al font12 mr3"></i>
    				</div>
            <router-link class="t-cell bg-orange1 color-white h_100 v_middle align_center" to="/centerSales">我要咨询</router-link>
    			</div>
    		</div>
      </template>
    </template>
    <div v-if="query.newadd && showsharetip" class="sharetiplayer" @click="closeSharetip">
			<div class="ico"><i class="al al-feiji"></i></div>
			<div class="txt">点击···，分享给好友或朋友圈吧！</div>
			<div class="pic">
				<img src="../assets/images/share1.jpg" />
			</div>
		</div>
    <div v-transfer-dom class="x-popup" v-if="productdata.buyonline != 1">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">购买流程</div>
          <div class="popup-middle font14">
            <div class="padding10">
  						<div class="mt12 color-gray2">您可以点击下方《我要咨询》，与卖家互加微信好友，以传统类似微商交易模式通过微信沟通咨询下单支付即可。</div>
  						<div class="mt12 color-gray2">温馨提示：</div>
  						<div class="mt12 color-gray2">1. 长按下方二维码关注公众号即可查询订单物流信息。</div>
  						<div class="mt12 color-gray2">2. 平台仅提供商品展示，线下交易出现任何纠纷平台概不负责。</div>
  						<div class="align_center">
  							<img style="max-width:50%;" :src="weixin_qrcode" />
  						</div>
  					</div>
          </div>
          <div class="popup-bottom flex_center bg-orange color-white" @click="closepopup">{{ $t('Know txt') }}</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showevluate" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">评价</div>
          <div class="popup-middle font14">
            <div class="scroll_list">
              <template v-if="evluatedata.length == 0">
                <div class="scroll_item emptyitem">
        					<div class="t-table">
        						<div class="t-cell" style="padding:10px;">暂无评价</div>
        					</div>
        				</div>
              </template>
              <div v-else v-for="(item,index) in evluatedata" :key="item.id" class="scroll_item padding10">
      					<div class="t-table">
      						<div class="t-cell pic" style="width:40px;">
      							<img class="avatarimg" :src="item.avatar" />
      						</div>
      						<div class="t-cell">{{ item.username }}</div>
      						<div class="t-cell color-gray font12 align_right" style="width:70px;">{{ item.dateline | dateformat }}</div>
      					</div>
      					<div class="mt5">{{ item.message }}</div>
      					<div class="mt5 align_right">
                  <router-link class="bg-orange color-white qbtn" to="/store" style="width:50px;padding:0px;line-height:25px;">回复</router-link>
      					</div>
      					<div class="mt5" v-if="item.comment && item.comment.length > 0">
          				<div v-for="(citem,index1) in item.comment" :key="citem.id" class="border-box p0" style="background-color:#f7f7f7;">
          					<div class="title clear pt5 pb5">
          						<div class="color-gray font12" style="padding-left:6px;position:relative;">
          							<div class="bg-green" style="position: absolute;left: 0;top: 0px;bottom: 0px;width: 2px;"></div>
          							<span class="color-orange">{{ citem.username }}</span> 回复 :<span>{{ citem.message }}</span>
          						</div>
          					</div>
          				</div>
          			</div>
      				</div>
            </div>
          </div>
          <div class="popup-bottom flex_center bg-gray color-white" @click="closepopup1">{{ $t('Close') }}</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
    </div>
  </div>
</template>

<i18n>
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
import { Previewer, Swiper, SwiperItem, TransferDom, Popup, Marquee, MarqueeItem } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    Swiper,
    SwiperItem,
    Groupbuyitemplate,
    Bargainbuyitemplate,
    Popup,
    Marquee,
    MarqueeItem
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  data () {
    return {
      query: {},
      showsharetip: true,
      productid: null,
      module: 'product',
      activityInfo: {},
      showtopcss: '',
      loginUser: {},
      isshowtop: false,
      waitgetcredit: 100,
      showdot: true,
      showpopup: false,
      showevluate: false,
      weixin_qrcode: ENV.WeixinQrcode,
      favoritecss: 'none',
      isfavorite: false,
      productdata: {},
      retailerinfo: {},
      photoarr: [],
      contentphotoarr: [],
      previewerPhotoarr: [],
      buyuserdata: [],
      evluatedata: [],
      ingdata: [],
      activitydata: [],
      submitdata: { flag: 1, quantity: 1 }
    }
  },
  watch: {
    query: function () {
      return this.query
    },
    loginUser: function () {
      return this.loginUser
    },
    productdata: function () {
      return this.productdata
    },
    retailerinfo: function () {
      return this.retailerinfo
    },
    buyuserdata: function () {
      return this.buyuserdata
    },
    showtopcss: function () {
      return this.showtopcss
    },
    isshowtop: function () {
      let css = 'notop'
      if (this.isshowtop) {
        css = ''
      }
      this.showtopcss = css
      return this.isshowtop
    },
    favoritecss: function () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.favoritecss
    },
    isfavorite: function () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.isfavorite
    },
    photoarr: function () {
      return this.photoarr
    },
    evluatedata: function () {
      return this.evluatedata
    }
  },
  computed: {
    isshowdot: function () {
      if (this.photoarr.length > 1) {
        this.showdot = true
      } else {
        this.showdot = false
      }
      return this.showdot
    },
    showtop: function () {
      let css = 'notop'
      if (this.isshowtop) {
        css = ''
      }
      return css
    }
  },
  methods: {
    closeSharetip () {
      this.showsharetip = false
    },
    popupbuy () {
      this.showpopup = true
    },
    closepopup () {
      this.showpopup = false
    },
    popupevluate () {
      this.showevluate = true
    },
    closepopup1 () {
      this.showevluate = false
    },
    favoriteevent () {
      const self = this
      if (self.isfavorite) {
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/user/favorite/delete`,
          { params: { module: self.module, id: self.productid } }
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
        let cururl = `/product?id=${self.productid}`
        if (self.query.wid) {
          cururl = `${cururl}&wid=${self.query.wid}`
        }
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/user/favorite/add`,
          { params: { module: self.module, id: self.productid, currenturl: encodeURIComponent(cururl) } }
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
      this.isfavorite = !this.isfavorite
    },
    buyevent (buytype) {
      const self = this
      self.$vux.loading.show()
      if (buytype === 'groupbuy' && self.activityInfo) {
        self.submitdata['activityid'] = self.activityInfo.id
      }
      self.$http.post(`${ENV.BokaApi}/api/order/addShop`, self.submitdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          self.$router.push({ path: '/addOrder', query: { id: self.productid } })
        } else if (data.error) {
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    showBigimg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        self.$vue.wechat.previewImage({
          current: self.photoarr[index],
          urls: self.photoarr
        })
      }
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.productid = self.query.id
    self.loginUser = User.get()
    if (self.loginUser) {
      self.isshowtop = true
      setTimeout(function () {
        self.isshowtop = false
      }, 5000)
    }
    if (self.query.newadd) {
      setTimeout(function () {
        self.showsharetip = false
      }, 10000)
    }
    let infoparams = { id: self.productid, module: 'product' }
    if (self.query.wid) {
      infoparams['wid'] = self.query.wid
    }
    if (self.query.share_uid) {
      infoparams['share_uid'] = self.query.share_uid
    }
    self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
      params: infoparams
    }).then(function (res) {
      let data = res.data
      self.productdata = data.data ? data.data : data
      document.title = self.productdata.title
      self.retailerinfo = self.productdata.retailerinfo
      self.activityInfo = self.productdata.activityinfo
      if (!self.$util.isNull(self.productdata.photo)) {
        self.photoarr = self.productdata.photo.split(',')
      }
      if (self.$util.isNull(self.productdata.content) && self.$util.isNull(self.productdata.contentphoto)) {
        self.previewerPhotoarr = self.$util.previewerImgdata(self.photoarr)
      } else if (!self.$util.isNull(self.productdata.contentphoto)) {
        self.contentphotoarr = self.productdata.contentphoto.split(',')
        self.previewerPhotoarr = self.$util.previewerImgdata(self.contentphotoarr)
      }
      let host = self.$util.getHost()
      let wxData = {
        title: self.productdata.title,
        desc: self.productdata.title,
        link: `${host}/#/product?id=${self.productdata.id}&wid=${self.productdata.uploader}&share_uid=${self.loginUser.uid}`,
        photo: self.photoarr.length > 0 ? self.photoarr[0] : self.productdata.photo
      }
      alert(`host= ${host}`)
      alert(`after info link = ${wxData.link}`)
      alert(`after info photo = ${wxData.photo}`)
      self.$util.wxShare({
        data: wxData
      })
      self.submitdata.id = self.productdata.id
      self.submitdata.wid = self.retailerinfo.uid
      let buyparams = {}
      if (self.query.wid) {
        buyparams['wid'] = self.query.wid
      } else {
        buyparams['productid'] = self.productid
      }
      return self.$http.get(`${ENV.BokaApi}/api/retailer/friendBuy`, {
        params: buyparams
      })
    }).then(function (res) {
      let data = res.data
      if (data.flag === 1) {
        self.buyuserdata = (data.data ? data.data : data)
      }
      return self.$http.get(`${ENV.BokaApi}/api/user/favorite/show`,
        { params: { module: self.module, id: self.productid } }
      )
    }).then(function (res) {
      let data = res.data
      if (data.flag === 1) {
        self.isfavorite = true
      } else {
        self.isfavorite = false
      }
      return self.$http.get(`${ENV.BokaApi}/api/comment/list`,
        { params: { module: self.module, nid: self.productid } }
      )
    }).then(function (res) {
      let data = res.data
      if (data.flag === 1) {
        self.evluatedata = (data.data ? data.data : data)
      }
      if (self.activityInfo && self.activityInfo.type === 'groupbuy') {
        return self.$http.get(`${ENV.BokaApi}/api/activity/crowdUser`,
          { params: { id: self.productid } }
        )
      }
    }).then(function (res) {
      if (res) {
        let data = res.data
        self.activitydata = data.data ? data.data : data
      }
    })
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
.product .buylist:after{
  content:'';
  display:block;
  clear:both;
}
.product .buylist .item{
  float: left;
  width: 50px;
  text-align: center;
  display:block;
  color:inherit;;
}
.productcontent{
  padding:20px 15px;
}
.product .productcontent img{
  max-width:100%;
  vertical-align: middle;
}
.product .productarea.scrollend:after {
    background-color: #f6f6f6;
}

.product .pagetop{
  box-shadow: 0px 0px 10px 3px #d0d0d0;
}
.product .pagemiddle{top:50px;}
.product.notop .pagemiddle{top:0px;}
.product .numicon {
    position: absolute;
    top: 0;
    right: -15px;
    background: #f06825;
    padding: 0 1px;
    border-radius: 16%;
    color: #fff;
    font-size: 10px;
    min-width: 18px;
    text-align: center;
}
.product .vux-swiper-desc{display:none !important;}
.product .grouptitle{
  width:100%;
  height: 45px;
  color: #fff;
  font-size: 12px;
  background-image: url('../assets/images/productbg.png');
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  position:relative;
}
.product .grouptitle .t-table{height:100%;}
.product .grouptitle .t-cell{height:100%;vertical-align:middle;}
.product .grouptitle .col1{padding-left:10px;padding-right:10px;display:inline-block;}
.product .grouptitle .col2{display:inline-block;margin-top:2px;}
.product .grouptitle .col3{
	display:inline-block;border-radius:10px;padding:1px 10px;text-align:center;background-color:rgba(0,0,0,0.1);
	position:absolute;right:10px;top:50%;margin-top:-9px;
}
.product .grouptitle .col2 .colicon{display:inline-block;border-radius:10px;border:#fff 1px solid;padding:1px 10px;text-align:center;}
.product .help-icon{
  color:#ff3b30;
  border:#ff3b30 1px solid;
  border-radius:50%;
  display:inline-block;
  width:13px;height:13px;
  font-size:10px;
  text-align:center;
  line-height:14px;
}

.product .btnfavorite.have .al:before{content:"\e68c";color:red;}
.product .btnfavorite.none .al:before{content:"\e68b";}
.product .groupbybottom .btnfavorite:after{display:block;}
.product .btnfavorite.none:after{content:"收藏";}
.product .btnfavorite.have:after{content:"已收藏";}

.product .pagemiddle{bottom:50px;}
.product .pagebottom{height:50px;}
</style>
