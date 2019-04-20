<template>
  <div :class="`containerarea bg-white font14 product notop ${topcss}`">
    <template v-if="showSos">
      <sos :title="sosTitle"></sos>
    </template>
    <template v-if="showContainer">
      <div v-if="playVideo" class="videoarea">
        <video
          ref="productVideo"
          :src="productdata.video"
          controls
          autoplay="true"
          webkit-playsinline=""
          playsinline="true"
          x-webkit-airplay="true"
          raw-controls=""
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portrait">
        </video>
        <div class="close-icon flex_center" @click="stopPlay('productVideo')">
          <i class="al al-guanbi"></i>
        </div>
      </div>
      <div id="scroll-container" class="pagemiddle scroll-container">
        <template v-if="showFlash">
          <swiper
            class="pic-swiper notitle"
            dots-position="center"
            :interval=6000
            :show-dots="isshowdot"
            :aspect-ratio="1/1"
            loop>
            <swiper-item v-for="(item,index) in photoarr" :key="item.id">
              <img class="db imgcover w_100 h_100" :src="item" default-src="https://tossharingsales.boka.cn/images/nopic.jpg" @click="showBigimg1(index)" />
              <template v-if="index == 0 && productdata.video && productdata.video != ''">
                <div class="play-icon flex_center" @click="clickPlay('productVideo')">
                  <i class="al al-bofang"></i>
                </div>
              </template>
            </swiper-item>
          </swiper>
        </template>
        <div class="pt12 pb12 bg-white pl10 pr10 b_bottom_after">
      		<div class="clamp2">
            <span class="v_middle db-in bold"><span v-if="productdata.moderate != 1" class="color-gray bold">【已下架】</span>{{ productdata.title }}</span>
          </div>
          <div v-if="productdata.sellingpoint && productdata.sellingpoint != ''" class="color-theme">{{productdata.sellingpoint}}</div>
          <div class="color-red">
            <span class="font18 mr3 v_middle">{{ $t('RMB') }}</span>
            <span class="font18 mr5 v_middle">{{ productdata.price }}</span>
            <span class="color-gray font14 line-through" v-if="productdata.oriprice">
              <span class="mr3 v_middle">{{ $t('RMB') }}</span>
              <span class="v_middle">{{ productdata.oriprice }}</span>
            </span>
          </div>
        </div>
        <div class="bg-page" style="height:10px;"></div>
        <div class="b_top_after"></div>
        <div class="padding10 b_bottom_after levelarea">
          <div class="levelitem">
            <div><span class="bold">推荐人佣金:</span><span class="bold">{{ $t('RMB') }}{{ productdata.superiorrebate }}</span><i class="al al-bangzhu font16 color-theme ml10" @click="clickHelp"></i></div>
          </div>
        </div>
        <div class="padding10 b_bottom_after levelarea">
          <div class="levelitem">
            <div><span class="bold">销售佣金:</span><span class="bold"> {{ $t('RMB') }}{{ productdata.salesrebate }}</span><i class="al al-bangzhu font16 color-theme ml10" @click="clickHelp1"></i></div>
          </div>
        </div>
        <!-- <template v-if="feeData.length != 0 && (productdata.identity == 'factory' || productdata.joinstatus == 0)">
          <div class="bg-page" style="height:10px;"></div>
          <div class="b_top_after"></div>
          <div class="padding10 b_bottom_after levelarea">
            <div class="levelitem" v-for="(item,index) in feeData" :key="index">
              <div class="font18 color-red">{{levelNameData[index]}}</div>
              <div>佣金: {{ $t('RMB') }}{{ item }}</div>
            </div>
          </div>
        </template> -->
        <template v-if="productdata.identity == 'retailer' && productdata.joinstatus == 1">
          <div class="bg-page" style="height:10px;"></div>
          <div class="b_top_after"></div>
          <div class="padding10 b_bottom_after">
            <div class="font18 color-red">{{ productdata.levelname }}</div>
            <div>佣金: {{ $t('RMB') }}{{ productdata.agentfee }}</div>
          </div>
        </template>
        <div class="bg-page" style="height:10px;"></div>
        <div class="b_top_after"></div>
        <div class="padding10 b_bottom_after" @click="tofactoryDetail">
          <div class="t-table">
    				<div class="t-cell v_middle w70" v-if="factoryinfo.photo && factoryinfo.photo != ''">
              <img class="v_middle imgcover" style="width:60px;height:60px;" :src="factoryinfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
    				<div class="t-cell v_middle">
    					<div class="distitle clamp2">{{ factoryinfo.title }}旗舰店</div>
    					<div class="distitle clamp2 color-gray font12 mt5">{{ factoryinfo.summary }}</div>
    				</div>
          </div>
        </div>
        <div class="flex_center pt10 pb10 bg-page color-gray">—— 详情 ——</div>
        <div class="productcontent">
          <div v-html="productdata.content"></div>
          <img v-for="(item,index) in previewerPhotoarr" :key="index" :src="item.src" @click="showBigimg(index)" />
        </div>
        <div class="productarea scrollendarea scrollend">
          <div class="inner">
            <div class="txt1">{{WeixinName}}</div>
            <div class="txt2">-- 社交电商2.0 --</div>
          </div>
        </div>
      </div>
      <div v-if="loginUser.isretailer" class="pagebottom list-shadow flex_center bg-white pl12 pr12 border-box">
        <div class="align_center flex_center flex_cell">
          <div class="btn-bottom-red flex_center" style="width:80%;" v-if="productdata.haveimport">已上架</div>
          <div class="btn-bottom-red flex_center" style="width:80%;" v-else @click="importEvent">上架到店铺</div>
        </div>
        <div class="align_center flex_center flex_cell">
          <div @click="toStore" class="btn-bottom-orange flex_center" style="width:80%;">我的店铺</div>
        </div>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerFlasharr" ref="previewerFlash"></previewer>
      </div>
      <template v-if="loginUser && showShareSuccess">
        <share-success
          v-if="productdata.uploader === loginUser.uid || productdata.identity !== 'user'"
          :data="productdata"
          :loginUser="loginUser"
          :module="module"
          :on-close="closeShareSuccess">
        </share-success>
      </template>
      <template v-if="showTip">
        <tip-layer buttonTxt="立即申请" content="会员卖家才可代理厂家商品，赶快入住申请吧！" @clickClose="closeTip" @clickButton="toApply"></tip-layer>
      </template>
    </template>
    <template v-if="showHelpModal">
      <tip-layer
        @clickClose="closeHelpModal"
        title="什么是推荐人佣金？"
        content="推荐人佣金是指销售该商品的上级推荐人所得的佣金。">
      </tip-layer>
    </template>
    <template v-if="showHelpModal1">
      <tip-layer
        @clickClose="closeHelpModal"
        title="什么是销售佣金？"
        content="销售佣金是指卖家销售厂家的商品后，卖家所得到的佣金。">
      </tip-layer>
    </template>
    <template v-if="showHb">
      <firstHb action="importproduct" @closeFirstHb="closeFirstHb"></firstHb>
    </template>
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
import { Previewer, Swiper, SwiperItem, TransferDom, Popup, XImg } from 'vux'
import ShareSuccess from '@/components/ShareSuccess'
import TipLayer from '@/components/TipLayer'
import Sos from '@/components/Sos'
import TitleTip from '@/components/TitleTip'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Socket from '#/socket'
import OpenVip from '@/components/OpenVip'
import FirstHb from '@/components/FirstHb'

let room = ''
export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer, Swiper, SwiperItem, Popup, ShareSuccess, Sos, XImg, TitleTip, OpenVip, TipLayer, FirstHb
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  data () {
    return {
      loginUser: {},
      retailerInfo: {},
      module: 'factoryproduct',
      query: {},
      disTimeout: true,
      showHelpModal: false,
      showHelpModal1: false,
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      showShareSuccess: false,
      productid: null,
      productdata: {},
      factoryinfo: {},
      isshowtop: false,
      waitgetcredit: 100,
      showFlash: false,
      showdot: true,
      weixin_qrcode: ENV.WeixinQrcode,
      flashdata: [],
      photoarr: [],
      contentphotoarr: [],
      previewerPhotoarr: [],
      previewerFlasharr: [],
      ingdata: [],
      activitydata: [],
      replyData: null,
      messages: 0,
      feeData: {},
      levelpolicy: [],
      levelNameData: {},
      topcss: '',
      showVideo: true,
      playVideo: false,
      showTip: false,
      WeixinName: ENV.WeixinName,
      isFirst: false,
      showHb: false
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
    productid: function () {
      return this.productid
    },
    factoryinfo: function () {
      return this.factoryinfo
    },
    photoarr: function () {
      const self = this
      if (self.photoarr.length > 0 || !self.$util.isNull(self.productdata.video)) {
        self.showFlash = true
      }
      return this.photoarr
    },
    showFlash: function () {
      return this.showFlash
    }
  },
  computed: {
    isshowdot: function () {
      if (this.photoarr.length > 1 || !this.$util.isNull(this.productdata.video)) {
        this.showdot = true
      } else {
        this.showdot = false
      }
      return this.showdot
    }
  },
  methods: {
    initData () {
      this.disTimeout = true
      this.showSos = false
      this.sosTitle = '抱歉，您暂无权限访问此页面！'
      this.showContainer = false
      this.showShareSuccess = false
      this.showVideo = true
      this.productid = null
      this.productdata = {}
      this.factoryinfo = {}
      this.showFlash = false
      this.showdot = true
      this.flashdata = []
      this.photoarr = []
      this.contentphotoarr = []
      this.previewerPhotoarr = []
      this.previewerFlasharr = []
      this.ingdata = []
      this.messages = 0
    },
    closeFirstHb () {
      this.isFirst = false
      this.showHb = false
    },
    clickHelp () {
      this.showHelpModal = true
    },
    clickHelp1 () {
      this.showHelpModal1 = true
    },
    closeHelpModal () {
      this.showHelpModal = false
      this.showHelpModal1 = false
    },
    tofactoryDetail () {
      this.$router.push('/factoryDetail?fid=' + this.productdata.fid)
    },
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    closeTip () {
      this.showTip = false
    },
    toApply () {
      if (this.query.from) {
        let webquery = encodeURIComponent(`id=${this.query.id}&from=${this.query.from}`)
        this.$wechat.miniProgram.redirectTo({url: `/pages/vip?weburl=factoryProduct&webquery=${webquery}`})
      } else {
        let backurl = `/factoryProduct?id=${this.query.id}`
        if (this.query.from) {
          backurl = `${backurl}&from=${this.query.from}`
        }
        backurl = encodeURIComponent(backurl)
        this.$router.push({path: '/center', query: {backurl: backurl}})
      }
    },
    toStore () {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.store}?wid=${this.loginUser.uid}`})
      } else {
        this.$router.push({path: '/store', query: {wid: this.loginUser.uid}})
      }
    },
    clickPlay (refname) {
      this.playVideo = true
    },
    stopPlay (refname) {
      this.playVideo = false
    },
    access () {
      if (this.loginUser.subscribe === 0) {
        this.$util.wxAccess()
      } else {
        this.$router.push('/center')
      }
    },
    showBigimg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        let viewarr = self.contentphotoarr.length > 0 ? self.contentphotoarr : self.photoarr
        window.WeixinJSBridge.invoke('imagePreview', {
          current: viewarr[index],
          urls: viewarr
        })
      }
    },
    showBigimg1 (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewerFlash.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: self.photoarr[index],
          urls: self.photoarr
        })
      }
    },
    closeShareSuccess () {
      this.showShareSuccess = false
      this.showVideo = true
    },
    handelShare () {
      const self = this
      let shareData = {
        module: self.module,
        moduleid: self.productid,
        link: `${ENV.Host}/#/factoryProduct?id=${self.productid}&share_uid=${self.loginUser.uid}`,
        successCallback: function () {
          self.showShareSuccess = true
          self.showVideo = false
        }
      }
      if (self.query.share_uid) {
        shareData.link = `${shareData.link}&lastshareuid=${self.query.share_uid}`
        shareData.lastshareuid = self.query.share_uid
      }
      shareData.data = self.productdata
      self.$util.handleWxShare(shareData)
    },
    importProduct () {
      const self = this
      self.$vux.confirm.show({
        content: '确定将该商品上架到店铺并进行出售吗？',
        onConfirm: () => {
          self.$vux.loading.show()
          let params = {id: self.query.id}
          if (self.query.wid) {
            params.wid = self.query.wid
          }
          self.$http.post(`${ENV.BokaApi}/api/factory/importFactoryProduct`, params).then((res) => {
            let data = res.data
            self.$vux.loading.hide()
            let error = data.error
            if (data.flag === 1) {
              error = '上架成功！该商品已显示在你的店铺中！'
              self.productdata.haveimport = 1
            }
            self.$vux.toast.show({
              text: error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(error),
              onHide: () => {
                if (this.isFirst && data.flag) {
                  this.showHb = true
                }
              }
            })
          })
        }
      })
    },
    importEvent () {
      if (!this.loginUser.isretailer || !this.retailerInfo.vipvalidate) {
        this.showTip = true
      } else {
        this.importProduct()
      }
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipProduct,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    getData () {
      const self = this
      this.productid = this.query.id
      let infoparams = { id: this.productid, module: this.module, fid: self.query.fid }
      if (this.query.share_uid) {
        infoparams.share_uid = this.query.share_uid
      }
      if (this.query.lastshareuid) {
        infoparams.lastshareuid = this.query.lastshareuid
      }
      if (this.query.from === 'poster') {
        infoparams.from = 'poster'
      }
      this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
        params: infoparams
      }).then((res) => {
        if (res && res.status === 200) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag !== 1) {
            self.sosTitle = data.error
            self.showSos = true
          } else {
            self.showContainer = true
            self.productdata = data.data
            self.factoryinfo = self.productdata.factoryinfo
            document.title = self.productdata.title
            const photo = self.productdata.photo
            if (photo && self.$util.trim(photo) !== '') {
              self.photoarr = photo.split(',')
            }
            if (self.photoarr.length > 0) {
              self.showFlash = true
              self.previewerFlasharr = self.$util.previewerImgdata(self.photoarr)
            }
            if (!self.$util.isNull(self.productdata.video)) {
              self.showFlash = true
            }
            const content = self.productdata.content
            const contetnphoto = self.productdata.contentphoto
            if ((!content || self.$util.trim(content) === '') && (!contetnphoto || self.$util.trim(contetnphoto) === '')) {
              self.previewerPhotoarr = self.$util.previewerImgdata(self.photoarr)
            } else if (contetnphoto && self.$util.trim(contetnphoto) !== '') {
              self.contentphotoarr = contetnphoto.split(',')
              self.previewerPhotoarr = self.$util.previewerImgdata(self.contentphotoarr)
            }
            self.handelShare()
            if (!self.loginUser.isretailer) {
              self.topcss = 'nobottom'
            }
            self.feeData = self.productdata.agentfee ? self.productdata.agentfee : []
            self.levelNameData = self.productdata.levelname ? self.productdata.levelname : {}
          }
        }
      })
    },
    createSocket () {
      const uid = this.loginUser.uid
      const linkman = this.loginUser.linkman
      // const fromId = this.query.fromId
      room = `${this.module}-${this.query.id}`
      Socket.listening({room: room, uid: uid, linkman: linkman, fromModule: this.module, fromId: this.query.id})
    },
    init () {
      this.$util.wxAccessListening()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        const data = res.data
        this.loginUser = data
        User.set(data)
        this.retailerInfo = this.loginUser.retailerinfo
        this.initData()
        this.query = this.$route.query
        if (`${this.retailerInfo.firstinfo.importproduct}` === '0' && this.query.from) {
          this.isFirst = true
        } else {
          this.isFirst = false
        }
        this.getData()
        this.createSocket()
      })
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

<style lang="less">
.notop .pagetop{display:none;}
.product .videobg{width:100%;height:100%;background-size:cover;background-position:center;position:relative;}
.product .play-icon{
  width:60px;height:60px;background: rgba(0,0,0,.4);border-radius: 50%;color:#fff;
  position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;
}
.product .play-icon .al{margin-left:4px;}
.product .videoarea{position:absolute;left:0;top:0;right:0;bottom:0;z-index:9999;background-color:#000;color:#fff;}
.product .videoarea video{position: absolute;width: 100%;height: 100%;}
.product .videoarea .close-icon{position:absolute;left:15px;top:15px;width:40px;height:40px;}
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
.product.notop .pagemiddle{top:0px;}
.product.nobottom .pagemiddle{bottom:0px;}
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
.product .pic-swiper{padding-bottom:100%;box-sizing: border-box;}
.product .pic-swiper .vux-swiper{
  position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
}
.product .vux-swiper-item {}
.product .vux-swiper-item img{}
.product .vux-swiper-desc{display:none !important;}
.product .grouptitle{
  width:100%;
  height: 45px;
  color: #fff;
  font-size: 12px;
  background-image: url(../assets/images/productbg.png);
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
.levelarea .levelitem:not(:last-child){margin-bottom:12px;}
</style>
