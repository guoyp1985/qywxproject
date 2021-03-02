
<style lang="less">
.notop .pagetop{display:none;}
.qyproduct-page.notop .pagemiddle{top:0px;}
.qyproduct-page{
  .card-options{
    display: flex;flex-wrap: wrap;
    img{width:30px;height:30px;margin-right:10px;object-fit:cover;margin-top:10px;}
    .txt-item{margin-top:10px;}
    .btn{border-radius:10px;background-color:#ccc;color:#999;font-size:12px;height:22px;padding:0 10px;}
  }
  .videobg{width:100%;height:100%;background-size:cover;background-position:center;position:relative;}
  .play-icon{
    width:60px;height:60px;background: rgba(0,0,0,.4);border-radius: 50%;color:#fff;
    position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;
  }
  .play-icon .al{margin-left:4px;}
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
  .fixed-topcoll{position:absolute;right:0;top:20px;z-index:10;width:80px;height:35px;border-top-left-radius:20px;border-bottom-left-radius:20px;background-color:rgba(153,153,153,0.8);color:#fff;}
  .fixed-topcoll.start{top:60px;}
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
  .pagemiddle{top:50px;}
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
  .pic-swiper{box-sizing: border-box;width:100%;max-height:375px;}
  .pic-swiper:after{content:"";padding-top:100%;display:block;}
  .pic-swiper .vux-swiper{
    position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
  }
  .vux-swiper-item {}
  .vux-swiper-item img{}
  .vux-swiper-desc{display:none !important;}
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
  .center-cell{width:60px;}

  .pagemiddle{bottom:50px;}
  .pagebottom{height:50px;}

  .buylist{display:flex;overflow:hidden;}
  .buylist:after{
    content:'';
    display:block;
    clear:both;
  }
  .buylist .item{
    width: 48px;padding-top:10px;
    text-align: center;display:block;color:inherit;
  }
  .buylist .pic{padding-left:10px;width:38px;}
  .buylist img{width:38px;height:38px;vertical-align:middle;object-fit: cover;border-radius:50%;}
  .buylist .txt{padding-left:10px;width:38px;}
  .moreicon{width:48px;}

  .modalshow{
    position:absolute;left:0;right:0;bottom:0;top:0;z-index:1000;background-color:rgba(0,0,0,0.8);box-sizing: border-box;
    .modaInfo{
      display:flex;flex-direction:column;margin-top: 60px;
      .al{font-size:80px;margin-left:auto;margin-right: 100px;}
    }
    .btnknow{padding:3px 25px;border:1px solid #fff;color:#fff;margin: 0 auto;border-radius:20px;font-size:14px;margin-top: 20px;}
  }
  .qrcode-area{
    text-align:center;margin-top:5px;
    img{display:block;margin:0 auto;width:80%;max-width:300px !important;}
  }
}
.share-modal{
  background-color:rgba(0,0,0,0.7) !important;color:#fff;
  .ico{text-align:right;padding:15px 40px;box-sizing: border-box;}
  .ico .al{font-size:60px;color:rgba(255,255,255,0.9);}
  .txt{font-size:16px;text-shadow: -2px 0px 1px #000;padding:10px;box-sizing: border-box;text-align:center;}
}
</style>
<template>
  <div id="product-page" class="containerarea bg-white qyproduct-page notop">
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
        <div class="btn-item flex_center" @click="saveVideo('productVideo')">保存</div>
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
    		<div class="clamp2" v-if="viewData && viewData.id">
          <span class="v_middle db-in bold" @click="copyTxt" style="position:relative;">
            <span v-if="productdata.moderate != 1" class="color-gray bold">【已下架】</span>{{ productdata.title }}
            <div class="copy_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ productdata.title }}</div>
          </span>
          <span v-if="loginUser && loginUser.groupid == 1" class="v_middle db-in color-gray font12">分享次数:{{ productdata.shares }}</span>
        </div>
        <div v-if="productdata.sellingpoint && productdata.sellingpoint != ''" class="color-theme">{{productdata.sellingpoint}}</div>
        <div class="color-red">
          <span class="font18 mr3 v_middle">￥</span>
          <span class="font18 mr5 v_middle">{{ productdata.price }}</span>
          <span class="color-gray font14 line-through" v-if="productdata.oriprice && productdata.oriprice > 0">
            <span class="mr3 v_middle">￥</span>
            <span class="v_middle">{{ productdata.oriprice }}</span>
          </span>
        </div>
        <div class="flex_left mt5 color-gray" v-if="productdata.showTb || productdata.showJd">
          <span v-if="productdata.showTb">猫价: ￥{{productdata.tb_price}}</span><span v-if="productdata.showJd" class="ml10">狗价: ￥{{productdata.jd_price}}</span>
        </div>
        <div class="flex_left font12 mt5 color-gray2">
					<div v-if="productdata.postage == 0" class="flex_left">邮费: 包邮</div>
					<div v-else class="flex_left w90">邮费: ￥{{ productdata.postage }}</div>
          <div class="flex_cell flex_right">销量: {{ productdata.saled }}{{ productdata.unit }}</div>
        </div>
  		</div>
      <template v-if="productdata.options && productdata.options.length">
        <div class="bg-page" style="height:10px;"></div>
        <div class="b_top_after"></div>
        <div class="padding10 b_bottom_after" @click="buyevent">
          <div class="flex_left">
            <div class="w40 flex_left">规格</div>
            <div class="flex_cell flex_left color-gray" v-if="selectedOption && selectedOption.id">{{selectedOption.title}}</div>
            <div class="flex_cell flex_left color-gray" v-else>请选择</div>
          </div>
          <div class="card-options">
            <template v-for="(item,index) in productdata.options">
              <!-- <div v-if="item.photo !== ''">
                <img v-if="index < 5" :src="item.photo" />
              </div>
              <div v-else>
                <img v-if="index < 5" :src="notgeimg" />
              </div> -->
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
      </template>
      <div class="bg-page" style="height:10px;"></div>
      <div class="flex_center pt10 pb10 bg-page color-gray">—— 详情 ——</div>
      <div class="productcontent">
        <div v-html="productdata.content"></div>
        <img v-for="(item,index) in previewerPhotoarr" :key="index" :src="item.src" @click="showBigimg(index)" />
      </div>
      <div class="qrcode-area" v-if="afterLoad && showUser && showUser.uid">
          <img :src="showUser.qrcode" />
      </div>
    </div>
		<div class="pagebottom b_top_after">
			<div class="t-table h_100">
        <router-link class="t-cell h_100 v_middle align_center center-cell" to="/center">
          <div><i class="al al-peoplefill font18 color-red"></i></div>
          <div class="font12">个人中心</div>
        </router-link>
        <div v-if="productdata.storage <= 0" class="t-cell color-white h_100 v_middle align_center bg-gray">已售罄</div>
        <template v-else>
  				<div v-if="query && query.share_uid" class="t-cell color-white h_100 v_middle align_center bg-red2">立即购买</div>
  				<div v-else class="t-cell color-white h_100 v_middle align_center bg-red2" @click="clickShare">分享赚 {{productdata.salesrebate}}</div>
        </template>
        <!--
				<div v-else class="t-cell color-white h_100 v_middle align_center bg-red2" @click="buyevent">立即购买</div>
      -->
			</div>
		</div>
    <div v-transfer-dom>
      <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewerFlasharr" ref="previewerFlash"></previewer>
    </div>
    <div v-transfer-dom class="x-popup buy-popup-layer">
      <popup v-model="showBuy" height="100%">
        <div class="product-options-area columnarea">
          <div class="column-content" @click="closeOptions"></div>
          <div class="options-box columnarea">
            <div class="close-area flex_center color-gray" @click="closeOptions"><span class="al al-close"></span></div>
            <div class="column-content columnarea">
              <div class="part1 flex_left">
                <div class="pic flex_left" v-if="selectedOption.photo !== ''">
                  <img :src="selectedOption.photo" @click="viewBigImg(0)" />
                </div>
                <div class="pic flex_left" v-else>
                  <img :src="photoarr[0]" @click="viewBigImg(0)" />
                </div>
                <div class="flex_cell flex_left">
                  <div class="w_100">
                    <div class="color-theme"><span>￥</span><span class="bold font16">{{productdata.price}}</span></div>
                    <div class="mt10 color-gray">库存{{selectedOption.storage}}{{productdata.unit}}</div>
                    <div class="mt10" v-if="selectedOption.title">已选: {{selectedOption.title}}</div>
                    <div class="mt10" v-else>请选择 规格</div>
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
            <div class="options-bottom flex_center">
              <div class="flex_cell h_100 flex_center">
                <div v-if="query && query.share_uid" class="bg-theme color-white flex_center btn" @click="buyOption">立即购买</div>
                <div v-else class="bg-theme color-white flex_center btn" @click="clickShare">分享赚 {{productdata.salesrebate}}</div>
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewerOptionsPhoto" ref="previewerOption"></previewer>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showShareModal" height="100%" class="share-modal">
        <div class="popup1 h_100" @click="clickShareModal">
    			<div class="ico"><i class="al al-feiji"></i></div>
    			<div class="txt">点击<span class="al al-asmkticon0165"></span>，分享给客户吧！</div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Previewer, Swiper, SwiperItem, TransferDom, Popup, Marquee, MarqueeItem, XImg } from 'vux'
import Time from '#/time'
import jQuery from 'jquery'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer, Swiper, SwiperItem, Popup, Marquee, MarqueeItem, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  data () {
    return {
      module: 'product',
      query: {},
      viewData: {},
      disTimeout: true,
      productid: null,
      productdata: {},
      loginUser: {},
      isshowtop: false,
      showFlash: false,
      showdot: true,
      flashdata: [],
      photoarr: [],
      contentphotoarr: [],
      previewerPhotoarr: [],
      previewerFlasharr: [],
      ingdata: [],
      submitdata: { flag: 1, quantity: 1 },
      showVideo: true,
      playVideo: false,
      showBuy: false,
      selectedOption: {},
      selectedOptionIndex: 0,
      previewerOptionsPhoto: [],
      showUser: {},
      showShareModal: false,
      shareWid: 0,
      afterLoad: false,
      isPC: false,
      isQywx: false
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
    photoarr: function () {
      if (this.photoarr.length > 0 || !this.$util.isNull(this.productdata.video)) {
        this.showFlash = true
      }
      return this.photoarr
    },
    showFlash: function () {
      return this.showFlash
    },
    previewerOptionsPhoto () {
      console.log('监控规格图片的变化')
      return this.previewerOptionsPhoto
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
    }
  },
  methods: {
    clickShare () {
      this.showShareModal = true
    },
    clickShareModal () {
      this.showShareModal = false
    },
    initData () {
      this.disTimeout = true
      this.showVideo = true
      this.productid = null
      this.productdata = {}
      this.viewData = {}
      this.showFlash = false
      this.showdot = true
      this.flashdata = []
      this.photoarr = []
      this.contentphotoarr = []
      this.previewerPhotoarr = []
      this.previewerFlasharr = []
      this.ingdata = []
      this.submitdata = { flag: 1, quantity: 1 }
      this.playVideo = false
      this.showBuy = false
      this.selectedOption = {}
      this.selectedOptionIndex = 0
      this.previewerOptionsPhoto = []
      this.wid = 0
    },
    closeOptions () {
      this.showBuy = false
    },
    clickOptions (item, index) {
      this.selectedOption = item
      this.selectedOptionIndex = index
      this.previewerOptionsPhoto = this.$util.previewerImgdata([this.selectedOption.photo])
    },
    addShop (buytype) {
      this.$vux.loading.show()
      let postData = this.submitdata
      postData.id = this.productdata.id
      if (this.query.wechatorderid) {
        postData.wechatorderid = this.query.wechatorderid
      }
      if (this.productdata.options && this.productdata.options.length && this.selectedOption && this.selectedOption.id) {
        postData.poid = this.selectedOption.id
      }
      this.$http.post(`${ENV.BokaApi}/api/order/addShop`, postData).then((res) => {
        let data = res.data
        this.$vux.loading.hide()
        if (data.code === 0) {
          let rparams = {id: data.data}
          this.$router.push({ path: '/addOrder', query: rparams })
        } else if (data.msg) {
          this.$vux.toast.show({
            text: data.msg,
            type: 'text',
            time: this.$util.delay(data.msg)
          })
        }
      })
    },
    buyOption (buytype) {
      if (!this.selectedOption || !this.selectedOption.id) {
        this.$vux.toast.text('请选择商品规格', 'middle')
        return false
      }
      if (this.selectedOption.storage <= 0) {
        this.$vux.toast.text('该规格商品库存不足', 'middle')
        return false
      }
      this.addShop(buytype)
    },
    copyTxt () {
      const self = this
      let eleobj = jQuery('#product-page .copy_txt')[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      setTimeout(function () {
        self.$vux.toast.show({
          text: '复制成功',
          time: 1500
        })
      }, 200)
    },
    clickPlay (refname) {
      this.playVideo = true
      setTimeout(() => {
        this.$refs[refname].play()
      }, 100)
    },
    saveVideo () {
      location.replace(this.productdata.video)
    },
    stopPlay (refname) {
      this.playVideo = false
    },
    buyevent (buytype) {
      if (this.productdata.options && this.productdata.options.length) {
        if (!this.selectedOption || !this.selectedOption.id) {
          this.selectedOption = this.productdata.options[0]
          this.selectedOptionIndex = 0
          this.previewerOptionsPhoto = this.$util.previewerImgdata([this.selectedOption.photo])
        }
        this.showBuy = true
      } else {
        this.addShop(buytype)
      }
    },
    showBigimg (index) {
      if (this.$util.isPC()) {
        this.$refs.previewer.show(index)
      } else {
        if (window.WeixinJSBridge) {
          let viewarr = this.contentphotoarr.length > 0 ? this.contentphotoarr : this.photoarr
          window.WeixinJSBridge.invoke('imagePreview', {
            current: viewarr[index],
            urls: viewarr
          })
        }
      }
    },
    showBigimg1 (index) {
      if (this.$util.isPC()) {
        this.$refs.previewerFlash.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: this.photoarr[index],
          urls: this.photoarr
        })
      }
    },
    viewBigImg (index) {
      if (this.$util.isPC()) {
        this.$refs.previewerOption.show(0)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: this.selectedOption.photo,
          urls: [this.selectedOption.photo]
        })
      }
    },
    handelShare () {
      let shareLink = `${ENV.Host}/#/qiyeProduct?id=${this.productid}&share_uid=${this.loginUser.uid}`
      if (this.wid && this.wid !== '') shareLink = `${shareLink}&wid=${this.wid}`
      let shareData = {
        module: this.module,
        moduleid: this.productid,
        link: shareLink,
        successCallback: () => {
          this.showVideo = false
        }
      }
      if (this.query.share_uid) {
        shareData.link = `${shareData.link}&lastshareuid=${this.query.share_uid}`
        shareData.lastshareuid = this.query.share_uid
      }
      shareData.data = this.productdata
      this.$util.handleWxShare(shareData)
    },
    cutdown (item, interval) {
      interval = setInterval(function () {
        let h = parseInt(item.lefthour)
        let m = parseInt(item.leftminute)
        let s = parseInt(item.leftsecond)
        if (s > 0) {
          s--
          if (s < 10) {
            item.leftsecond = '0' + s
          } else {
            item.leftsecond = s
          }
        } else if (m > 0) {
          m--
          if (m < 10) {
            item.leftminute = '0' + m
          } else {
            item.leftminute = m
          }
          item.leftsecond = '59'
        } else if (h > 0) {
          h--
          if (h < 10) {
            item.lefthour = '0' + h
          } else {
            item.lefthour = h
          }
          item.leftminute = '59'
          item.leftsecond = '59'
        }
        if (h === 0 && m === 0 && s === 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    getData () {
      const self = this
      this.productid = this.query.id
      let infoparams = { id: this.productid, module: this.module, addviews: 1 }
      if (this.query.wid) {
        infoparams.wid = this.query.wid
      }
      if (this.query.share_uid) {
        infoparams.share_uid = this.query.share_uid
      }
      if (this.query.lastshareuid) {
        infoparams.lastshareuid = this.query.lastshareuid
      }
      this.$http.post(`${ENV.BokaApi}/api/content/info`, infoparams).then((res) => {
        if (res && res.status === 200) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.code === 0) {
            self.productdata = data.data
            this.viewData = data.data
            if (this.productdata.jd_price && this.productdata.jd_price !== '' && parseFloat(this.productdata.jd_price) > 0) {
              this.productdata.showJd = true
            } else {
              this.productdata.showJd = false
            }
            if (this.productdata.tb_price && this.productdata.tb_price !== '' && parseFloat(this.productdata.tb_price) > 0) {
              this.productdata.showTb = true
            } else {
              this.productdata.showTb = false
            }
            if (this.productdata.options && this.productdata.options.length) {
              this.selectedOption = {storage: this.productdata.storage, photo: this.productdata.options[0].photo}
              this.previewerOptionsPhoto = this.$util.previewerImgdata([this.productdata.options[0].photo])
            }
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
          }
        }
      })
    },
    getShowUser (uid) {
      if (!uid) return false
      this.$http.get(`${ENV.BokaApi}/api/user/show`, {
        params: {otheruid: uid}
      }).then(res => {
        const data = res.data
        if (data.code === 0) {
          let retdata = data.data
          if (retdata.identity === 2) {
            this.showUser = data.data
          }
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      this.initData()
      this.showVideo = true
      this.query = this.$route.query
      this.isPC = this.$util.isPC
      this.isQywx = this.$util.isQywx()
      this.afterLoad = true
      if (this.isQywx) {
        this.shareWid = this.loginUser.uid
        this.showUser = this.loginUser
      } else {
        if (this.query.wid) {
          this.shareWid = parseInt(this.query.wid)
          this.getShowUser(this.query.wid)
        } else if (this.loginUser.ownid) {
          this.shareWid = this.loginUser.ownid
        }
      }
      this.$vux.loading.show()
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
