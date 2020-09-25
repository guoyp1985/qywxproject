<template>
  <div :class="`containerarea bg-white font14 f-product-page notop ${topcss}`">
    <template v-if="showSos">
      <sos :title="sosTitle"></sos>
    </template>
    <template v-if="showContainer">
      <div v-if="playVideo" class="videoarea">
        <div class="video-inner">
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
        </div>
        <div class="btn-area flex_center">
          <div class="btn-item flex_center" @click="saveVideo('productVideo')" v-if="!query.from">保存</div>
          <div class="btn-item flex_center" @click="stopPlay('productVideo')">关闭</div>
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
            <span class="font18 mr5 v_middle" v-if="productdata.minprice && productdata.maxprice && productdata.minprice != productdata.maxprice">{{ productdata.minprice }}-{{productdata.maxprice}}</span>
            <span class="font18 mr5 v_middle" v-else-if="productdata.minprice && productdata.minprice != ''">{{ productdata.minprice }}</span>
            <span class="font18 mr5 v_middle" v-else>{{ productdata.price }}</span>
            <span class="color-gray font14 line-through" v-if="productdata.oriprice && productdata.oriprice > 0">
              <span class="mr3 v_middle">{{ $t('RMB') }}</span>
              <span class="v_middle">{{ productdata.oriprice }}</span>
            </span>
          </div>
        </div>
        <div class="flex_left padding10 color-gray b_bottom_after" v-if="showTb && showJd">
          <span>猫价: ￥{{productdata.tb_price}}</span><span class="ml10">狗价: ￥{{productdata.jd_price}}</span>
        </div>
        <div class="bg-page" style="height:10px;"></div>
        <div class="b_top_after"></div>
        <template v-if="productdata.options && productdata.options.length">
          <div class="pl10 pr10 pb10 b_bottom_after flex_left" @click="clickOptionsArea">
            <div class="w60 flex_left bold">规格</div>
            <div class="flex_cell card-options">
              <template v-for="(item,index) in productdata.options">
                <div v-if="index < 5">
                  <img v-if="item.photo && item.photo !== ''" :src="item.photo" />
                  <img v-else :src="photoarr[0]" />
                </div>
              </template>
              <div class="flex_center txt-item">
                <div class="btn flex_center">共{{productdata.options.length}}种规格可选</div>
              </div>
            </div>
          </div>
          <div class="bg-page" style="height:10px;"></div>
        </template>
        <!-- <div class="padding10 b_bottom_after levelarea">
          <div class="levelitem">
            <div>
              <span class="bold">推荐人佣金:</span>
              <span class="bold">{{ $t('RMB') }}</span>
              <span class="bold" v-if="productdata.minsuperrebate && productdata.maxsuperrebate && productdata.minsuperrebate != productdata.maxsuperrebate">{{ productdata.minsuperrebate }}-{{productdata.maxsuperrebate}}</span>
              <span class="bold" v-else>{{ productdata.newsuperrebate }}</span>
              <i class="al al-bangzhu font16 color-theme ml10" @click="clickHelp"></i>
            </div>
          </div>
        </div> -->
        <div class="padding10 b_bottom_after levelarea">
          <div class="levelitem">
            <div>
              <span class="bold">佣金:</span>
              <span class="bold"> {{ $t('RMB') }}</span>
              <span class="bold" v-if="productdata.minsalesrebate && productdata.maxsalesrebate && productdata.minsalesrebate != productdata.maxsalesrebate">{{ productdata.minsalesrebate }}-{{productdata.maxsalesrebate}}</span>
              <span class="bold" v-else>{{ productdata.minsalesrebate }}</span>
              <i class="al al-bangzhu font16 color-theme ml10" @click="clickHelp1"></i>
            </div>
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
        <!-- <div class="padding10 b_bottom_after" @click="tofactoryDetail"> -->
        <div class="padding10 b_bottom_after">
          <div class="t-table">
    				<div class="t-cell v_middle w70" v-if="factoryinfo.photo && factoryinfo.photo != ''">
              <img class="v_middle imgcover" style="width:60px;height:60px;" :src="factoryinfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
    				<div class="t-cell v_middle">
    					<div class="distitle clamp2">{{ factoryinfo.company }}旗舰店</div>
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
      <div v-if="loginUser.fid != Fid" class="pagebottom list-shadow flex_center bg-white pl12 pr12 border-box">
        <!-- <div class="align_center flex_center flex_cell" v-if="!loginUser.retailerinfo.fid || loginUser.retailerinfo.fid == query.fid"> -->
        <div class="align_center flex_center flex_cell">
          <div class="btn-bottom-red flex_center" style="width:90%;background-color:#ccc;" v-if="productdata.havefpimport == 1">已代理</div>
          <div class="btn-bottom-red flex_center" style="width:90%;" v-else @click="importEvent">代理销售</div>
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
        <template v-if="VipFree">
          <tip-layer buttonTxt="立即申请" content="注册成为卖家后，才可代理厂家商品哦，赶快注册吧！" @clickClose="closeTip" @clickButton="toApply"></tip-layer>
        </template>
        <template v-else>
          <tip-layer buttonTxt="立即申请" content="会员卖家才可代理厂家商品，赶快入驻申请吧！" @clickClose="closeTip" @clickButton="toApply"></tip-layer>
        </template>
      </template>
    </template>
    <template v-if="showHelpModal">
      <tip-layer
        @clickClose="closeHelpModal"
        title="推荐人佣金"
        content="推荐人佣金是指销售该商品的上级推荐人所得的佣金。">
      </tip-layer>
    </template>
    <template v-if="showHelpModal1">
      <tip-layer
        @clickClose="closeHelpModal"
        title="销售佣金"
        content="销售佣金是指卖家销售厂家的商品后，卖家所得到的佣金。">
      </tip-layer>
    </template>
    <template v-if="showHb">
      <firstHb action="importproduct" @closeFirstHb="closeFirstHb"></firstHb>
    </template>
    <div v-transfer-dom class="x-popup buy-popup-layer">
      <popup v-model="showOptions" height="100%">
        <div class="product-options-area columnarea">
          <div class="column-content" @click="closeOptions"></div>
          <div class="options-box columnarea">
            <div class="close-area flex_center color-gray" @click="closeOptions"><span class="al al-close"></span></div>
            <div class="column-content columnarea">
              <div class="part1 flex_left">
                <div class="pic flex_left">
                  <img :src="selectedOption.photo" @click="viewBigImg(0)" />
                </div>
                <div class="flex_cell flex_left">
                  <div class="w_100">
                    <div class="color-theme"><span>￥</span><span class="bold font16">{{selectedOption.price}}</span></div>
                    <div class="mt10 color-gray">库存{{selectedOption.storage}}{{productdata.unit}}</div>
                    <div class="mt10" v-if="selectedOption.title">规格: {{selectedOption.title}}</div>
                    <div class="mt10" v-else>规格</div>
                  </div>
                </div>
              </div>
              <div class="part2 column-content">
                <div class="pt10">规格</div>
                <div class="options-list">
                  <div v-for="(item,index) in productdata.options" :class="`options-item ${(selectedOptionIndex == index && item.storage > 0) ? 'active' : ''} ${item.storage <= 0 ? 'disabled' : ''}`" @click="clickOptions(item,index)">
                    <div class="flex_center" v-if="item.photo && item.photo !== ''">
                      <img :src="item.photo" /><span class="ml5">{{item.title}}</span>
                    </div>
                    <div class="flex_center" v-else>
                      <img :src="photoarr[0]" /><span class="ml5">{{item.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewerOptionsPhoto" ref="previewerOption"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, Swiper, SwiperItem, TransferDom, Popup, XImg } from 'vux'
import ShareSuccess from '@/components/ShareSuccess'
import TipLayer from '@/components/TipLayer'
import Sos from '@/components/Sos'
import TitleTip from '@/components/TitleTip'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import OpenVip from '@/components/OpenVip'
import FirstHb from '@/components/FirstHb'
const jweixin = require('../../static/jweixin')

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
      module: 'fpimport',
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
      showHb: false,
      showOptions: false,
      selectedOption: {},
      selectedOptionIndex: 0,
      previewerOptionsPhoto: [],
      VipFree: false,
      showJd: false,
      showTb: false,
      Fid: 0
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
      this.isFirst = false
      this.showHb = false
      this.selectedOption = {}
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
    clickOptionsArea () {
      if (!this.selectedOption || !this.selectedOption.id) {
        this.selectedOption = this.productdata.options[0]
        this.selectedOptionIndex = 0
        this.previewerOptionsPhoto = this.$util.previewerImgdata([this.selectedOption.photo])
      }
      this.showOptions = true
    },
    closeOptions () {
      this.showOptions = false
    },
    clickOptions (item, index) {
      this.selectedOption = item
      console.log(this.selectedOption)
      this.selectedOptionIndex = index
      this.previewerOptionsPhoto = this.$util.previewerImgdata([this.selectedOption.photo])
    },
    viewBigImg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewerOption.show(0)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: this.selectedOption.photo,
          urls: [this.selectedOption.photo]
        })
      }
    },
    tofactoryDetail () {
      this.$router.push({path: '/factoryDetail', query: {fid: this.productdata.fid}})
    },
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    closeTip () {
      this.showTip = false
    },
    toApply () {
      this.showTip = false
      if (this.query.from && this.query.fromapp !== 'ddzs') {
        let webquery = encodeURIComponent(`id=${this.query.id}&from=${this.query.from}`)
        jweixin.miniProgram.redirectTo({url: `/pages/vip?weburl=factoryProduct&webquery=${webquery}`})
      } else {
        let backurl = `/factoryProduct?id=${this.query.id}`
        if (this.query.from) {
          backurl = `${backurl}&from=${this.query.from}`
        }
        if (this.query.fid) {
          backurl = `${backurl}&fid=${this.query.fid}`
        }
        if (this.query.allowfirst) {
          backurl = `${backurl}&allowfirst=${this.query.allowfirst}`
        }
        if (this.query.allowfirst) {
          backurl = `${backurl}&fromapp=${this.query.fromapp}`
        }
        backurl = encodeURIComponent(backurl)
        this.$router.push({path: '/centerSales', query: {backurl: backurl}})
      }
    },
    toStore () {
      if (this.query.from) {
        jweixin.miniProgram.navigateTo({url: `${ENV.MiniRouter.store}?wid=${this.loginUser.uid}`})
      } else {
        this.$router.push({path: '/store', query: {wid: this.loginUser.uid}})
      }
    },
    clickPlay (refname) {
      const self = this
      this.playVideo = true
      setTimeout(() => {
        self.$refs[refname].play()
      }, 100)
    },
    saveVideo () {
      location.replace(this.productdata.video)
    },
    stopPlay (refname) {
      this.playVideo = false
    },
    access () {
      if (this.loginUser.subscribe === 0) {
        this.$util.wxAccess()
      } else {
        this.$router.push({path: '/center'})
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
    ajaxImport () {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/productshelf`, {
        fid: self.loginUser.fid, module: 'factoryproduct', moduleid: self.productdata.id
      }).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let error = data.error
        if (data.flag === 1) {
          error = '代理成功'
          self.productdata.havefpimport = 1
        }
        self.$vux.toast.show({
          text: error,
          time: self.$util.delay(error)
        })
      })
    },
    importProduct () {
      const self = this
      if (self.productdata.join) {
        self.ajaxImport()
      } else {
        self.$vux.confirm.show({
          content: '确定导入商品并加盟该厂家吗？',
          onConfirm: () => {
            self.ajaxImport()
          }
        })
      }
    },
    importEvent () {
      if (this.VipFree) {
        if (!this.loginUser.isretailer || !this.loginUser.retailerinfo.moderate) {
          this.showTip = true
        } else {
          this.importProduct()
        }
      } else {
        if (!this.loginUser.isretailer || !this.retailerInfo.vipvalidate) {
          this.showTip = true
        } else {
          this.importProduct()
        }
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
      let infoparams = {id: this.productid, module: this.module, fid: self.query.fid, myfid: this.loginUser.fid}
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
            this.Fid = self.productdata.fid
            if (this.productdata.jd_price && this.productdata.jd_price !== '' && parseFloat(this.productdata.jd_price) > 0) {
              this.showJd = true
            } else {
              this.showJd = false
            }
            if (this.productdata.tb_price && this.productdata.tb_price !== '' && parseFloat(this.productdata.tb_price) > 0) {
              this.showTb = true
            } else {
              this.showTb = false
            }
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
            if (self.loginUser.fid === this.Fid) {
              self.topcss = 'nobottom'
            }
            self.feeData = self.productdata.agentfee ? self.productdata.agentfee : []
            self.levelNameData = self.productdata.levelname ? self.productdata.levelname : {}
          }
        }
      })
    },
    init () {
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        const data = res.data
        this.loginUser = data
        User.set(data)
        this.retailerInfo = this.loginUser.retailerinfo
        this.query = this.$route.query
        if (this.query.module) {
          this.module = this.query.module
        }
        if (this.query.allowfirst !== 'false') {
          if (this.retailerInfo && `${this.retailerInfo.firstinfo.importproduct}` === '0' && this.query.from) {
            this.isFirst = true
          } else {
            this.isFirst = false
          }
        }
        this.getData()
        return this.$http.post(`${ENV.BokaApi}/api/common/getSysParas`)
      }).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        if (parseFloat(retdata.retailer_apply_oneyear) === 0) {
          this.VipFree = true
        } else {
          this.VipFree = false
        }
      })
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  },
  deactivated () {
    this.showContainer = false
  }
}
</script>

<style lang="less">
.notop .pagetop{display:none;}
.f-product-page.nobottom .pagemiddle{bottom:0;}
.f-product-page{
  .options-list{
    display: flex;flex-wrap: wrap;
    .options-item:not(:last-child){margin-right:10px;}
    .options-item.active{border-color:#ff6a61;color:#ff6a61;}
    .options-item.disabled{background-color:#ccc;}
    .options-item{
      border:#ccc 1px solid;border-radius:5px;padding:5px;margin-top:10px;
      img{width:30px;height:30px;}
    }
  }
  .card-options{
    display: flex;flex-wrap: wrap;
    img{width:30px;height:30px;margin-right:10px;object-fit:cover;margin-top:10px;}
    .txt-item{margin-top:10px;}
    .btn{border-radius:10px;background-color:#ccc;color:#999;font-size:12px;height:22px;padding:0 10px;}
  }
  .videoarea{
    position:absolute;left:0;top:0;right:0;bottom:0;z-index:9999;background-color:#000;color:#fff;
    .btn-area{
      position:absolute;left:0;top:7px;right:0;height:50px;z-index:10;
      .btn-item:not(:last-child){margin-right:20px;}
      .btn-item{width:60px;height:30px;background-color:#232323;color:#fff;border-radius:10px;}
    }
    .video-inner{
      position:absolute;left:0;top:0;right:0;bottom:0;
      video{position: absolute;width: 100%;height: 100%;}
    }
  }
  .videobg{width:100%;height:100%;background-size:cover;background-position:center;position:relative;}
  .play-icon{
    width:60px;height:60px;background: rgba(0,0,0,.4);border-radius: 50%;color:#fff;
    position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;
  }
  .play-icon .al{margin-left:4px;}
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
  .buylist:after{
    content:'';
    display:block;
    clear:both;
  }
  .buylist .item{
    float: left;
    width: 50px;
    text-align: center;
    display:block;
    color:inherit;;
  }
  .productcontent{
    padding:20px 15px;
  }
  .productcontent img{
    max-width:100%;
    vertical-align: middle;
  }
  .productarea.scrollend:after {
      background-color: #f6f6f6;
  }

  .pagetop{
    box-shadow: 0px 0px 10px 3px #d0d0d0;
  }
  .product.notop .pagemiddle{top:0px;}
  .product.nobottom .pagemiddle{bottom:0px;}
  .numicon {
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
  .pic-swiper{padding-bottom:100%;box-sizing: border-box;}
  .pic-swiper .vux-swiper{
    position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
  }
  .vux-swiper-item {}
  .vux-swiper-item img{}
  .vux-swiper-desc{display:none !important;}
  .grouptitle{
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
  .grouptitle .t-table{height:100%;}
  .grouptitle .t-cell{height:100%;vertical-align:middle;}
  .grouptitle .col1{padding-left:10px;padding-right:10px;display:inline-block;}
  .grouptitle .col2{display:inline-block;margin-top:2px;}
  .grouptitle .col3{
  	display:inline-block;border-radius:10px;padding:1px 10px;text-align:center;background-color:rgba(0,0,0,0.1);
  	position:absolute;right:10px;top:50%;margin-top:-9px;
  }
  .grouptitle .col2 .colicon{display:inline-block;border-radius:10px;border:#fff 1px solid;padding:1px 10px;text-align:center;}
  .help-icon{
    color:#ff3b30;
    border:#ff3b30 1px solid;
    border-radius:50%;
    display:inline-block;
    width:13px;height:13px;
    font-size:10px;
    text-align:center;
    line-height:14px;
  }

  .btnfavorite.have .al:before{content:"\e68c";color:red;}
  .btnfavorite.none .al:before{content:"\e68b";}
  .groupbybottom .btnfavorite:after{display:block;}
  .btnfavorite.none:after{content:"收藏";}
  .btnfavorite.have:after{content:"已收藏";}

  .pagemiddle{bottom:50px;}
  .pagebottom{height:50px;}
  .levelarea .levelitem:not(:last-child){margin-bottom:12px;}
}
.options-popup-layer{
  .vux-popup-dialog{
    background:rgba(0,0,0,0.5)
  }
}
</style>
