<style lang="less">
.table-index-page.havebottom{
  .page-inner{bottom:50px;}
}
.table-index-page{
  width:100%;height:100%;box-sizing: border-box;background-color:#f94929;
  .page-inner{
    position:absolute;left:0;top:0;right:0;bottom:0;
    padding-bottom:20px;box-sizing: border-box;overflow-y:auto;
    background-color:#f94929;
  }
  .fix-page-bottom{
    position:absolute;left:0;bottom:0;right:0;height:50px;background-color:transparent;z-index:1;
    display:flex;
    .btn{
      width:102px;height:37px;border-radius:60px;color:#fff;
      display:flex;justify-content:center;align-items:center;font-size:18px;
    }
  }
  .top-box{
    text-align:left;padding:10px;box-sizing: border-box;position:relative;color:#fff;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
  .pic-swiper:after{content:"";padding-top:100%;display:block;}
  .pic-swiper{
    overflow:inherit;
    box-sizing: border-box;width:100%;max-height:375px;
    .img{border-radius:10px;}
    .qrcode{
      position:absolute;right:0;bottom:0;width:30%;z-index:1;
    }
    .ico{
      width:80px;height:80px;border-radius:50%;background-color:#f94929;color:#fff;
      display:flex;justify-content:center;align-items:center;
      position:absolute;left:50%;margin-left:-40px;top:50%;margin-top:-40px;
    }
    .txt{
      position:absolute;left:0;bottom:0;width:70%;padding:5px;box-sizing: border-box;font-size:14px;
      background-color:rgba(0,0,0,0.5);color:#fff;border-top-right-radius:10px;
    }
    .vux-swiper{
      position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
    }
    .vux-indicator{
      width:281px;margin-right:-140.5px;transform: translateX(0);
      bottom:-40px;
    }
    .vux-indicator > a{margin-left:0px;}
    .vux-indicator > a:not(:first-child){margin-left:6px;}
    .vux-indicator > a > .vux-icon-dot{
      width:35px;height:35px;border-radius:50%;font-style:normal;
      display:flex;justify-content: center;align-items: center;
      background-color:transparent !important;
    }
    .vux-indicator > a > .vux-icon-dot.active{background-color:transparent !important;color:#f94929;}
    /*
    .vux-indicator > a > .vux-icon-dot.active{background-color:#f94929 !important;color:#fff;}
    .vux-indicator a:nth-child(1) .vux-icon-dot:after{content: '1';}
    .vux-indicator a:nth-child(2) .vux-icon-dot:after{content: '2';}
    .vux-indicator a:nth-child(3) .vux-icon-dot:after{content: '3';}
    .vux-indicator a:nth-child(4) .vux-icon-dot:after{content: '4';}
    .vux-indicator a:nth-child(5) .vux-icon-dot:after{content: '5';}
    .vux-indicator a:nth-child(6) .vux-icon-dot:after{content: '6';}
    .vux-indicator a:nth-child(7) .vux-icon-dot:after{content: '7';}
    */
    .vux-indicator a:nth-child(1) .vux-icon-dot:after{content: '周一';font-size:12px;}
    .vux-indicator a:nth-child(2) .vux-icon-dot:after{content: '周二';font-size:12px;}
    .vux-indicator a:nth-child(3) .vux-icon-dot:after{content: '周三';font-size:12px;}
    .vux-indicator a:nth-child(4) .vux-icon-dot:after{content: '周四';font-size:12px;}
    .vux-indicator a:nth-child(5) .vux-icon-dot:after{content: '周五';font-size:12px;}
    .vux-indicator a:nth-child(6) .vux-icon-dot:after{content: '周六';font-size:12px;}
    .vux-indicator a:nth-child(7) .vux-icon-dot:after{content: '周日';font-size:12px;}
  }
  .qy-tab{
    width:100%;box-sizing: border-box;display:flex;
    .tab-item{
      flex:1;font-size:16px;
      display:flex;justify-content: center;align-items: center;
      .inner{
        width:80%;height:30px;background-color:#659af2;color:#fff;border-radius:5px;
        display:flex;justify-content: center;align-items: center;
      }
    }
  }
  .qrcode-area{
    padding:10px;box-sizing: border-box;
    .pic-outer:after{
      content:'';display:block;padding-top:100%;
    }
    .pic-outer{
      display:flex;justify-content: center;align-items: center;position:relative;
      max-height:375px;overflow:hidden;
      .pic{
        position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;
        .img{width:100%;height:100%;object-fit:cover;}
        .qrcode{
          position:absolute;right:0;bottom:0;width:30%;z-index:1;
        }
      }
      .ico{
        width:80px;height:80px;border-radius:50%;background-color:#f94929;color:#fff;
        display:flex;justify-content:center;align-items:center;
        position:absolute;left:50%;margin-left:-40px;top:50%;margin-top:-40px;
      }
      .txt{
        position:absolute;left:0;bottom:0;width:70%;padding:5px;box-sizing: border-box;font-size:14px;
        background-color:rgba(0,0,0,0.5);color:#fff;border-top-right-radius:10px;
      }
    }
  }
  .pic-list{
    width:100%;overflow-x:auto;overflow-y:hidden;
    display:flex;
    .pic-item:not(:first-child){margin-left:10px;}
    .pic-item{
      width:80px;height:80px;position:relative;
      img{width:80px;height:80px;object-fit:cover;}
      .txt{
        position:absolute;left:0;bottom:0;right:0;
        background-color:rgba(0,0,0,0.5);color:#fff;z-index:1;
        width:100%;display:flex;justify-content:center;align-items:center;
      }
    }
  }
  .btn-share{text-decoration: underline;color:#f94929;}
  .txt-list{
    padding:0 10px;box-sizing: border-box;
    .txt-item:not(:last-child):after{
      content:"";display:block;
    	background-color:#ddd;height:1px;overflow:hidden;
    	position: absolute;left: 0;right: 0;bottom:0px;
    	-webkit-transform: scaleY(0.5) translateY(0.5px);
    	transform: scaleY(0.5) translateY(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
    .txt-item{
      display:flex;padding:10px 0;position:relative;
      .cell1{flex:1;}
      .cell2{
        margin-left:5px;
        .btn{
          width:50px;height:25px;box-sizing: border-box;
          display:flex;justify-content: center;align-items: center;
        }
      }
    }
  }
  .btn-apply{
    background-color:#659af2;color:#fff;border-radius:5px;
    padding:0 10px;height:25px;
    display:flex;justify-content: center;align-items: center;
  }
  .card-area{
    position:relative;padding:10px;box-sizing: border-box;
    background-color:#eb6b5e;color:#fff;
  }
  .card-area:before{
    content:'';display:block;width:20px;height:20px;border-radius:50%;background-color:#f5f9fa;
    position:absolute;left:-10px;top:50%;margin-top:-10px;
  }
  .card-area:after{
    content:'';display:block;width:20px;height:20px;border-radius:50%;background-color:#f5f9fa;
    position:absolute;right:-10px;top:50%;margin-top:-10px;
  }
  .draw-outer:after{content:'';display:block;padding-top:100%;}
  .draw-outer{
    position:relative;width:100%;
    .draw-inner{position:absolute;left:0;top:0;right:0;bottom:0;}
  }
}
</style>
<template>
  <div :class="`table-index-page ${isWx && !isQywx ? 'havebottom' : ''}`">
    <template v-if="afterLoad">
      <div class="page-inner flex_center" v-if="isOld && disLottery">
        <div class="pl10 pr10" style="width:100%;box-sizing:border-box;">
          <div class="draw-outer">
            <div class="draw-inner">
              <LuckyWheel
                ref="LuckyWheel"
                style="width:100%;height:100%;position:absolute;left:0;top:0;right:0;bottom:0;"
                :blocks.sync="blocks"
                :prizes.sync="prizes"
                :buttons.sync="buttons"
                @start="startCallBack"
                @end="endCallBack"/>
            </div>
          </div>
          <div class="pb10 color-white" style="margin-top:40px;">
            <div>1、每个用户每天只有一次抽奖机会</div>
            <div>2、分享给好友下单增加一次抽奖机会</div>
          </div>
        </div>
      </div>
      <div class="page-inner" v-if="isNew">
        <div class="pl10 pr10 mt10">
          <div class="box-outer">
            <div class="box-title bold font18" style="color:#f94929;">新客送菜</div>
            <div class="box-title b_top_after">尊敬的新客户{{loginUser.linkman}}，您可以领取本店免费赠送您的一份新菜！长按下方二维码，并加本店员工方可领取。</div>
            <div style="padding:0 1px 40px;box-sizing:border-box;" v-if="disProduct">
              <swiper
                class="pic-swiper notitle"
                dots-position="center"
                :auto="1==1"
                :interval=6000
                :show-dots="1==1"
                :aspect-ratio="1/1"
                loop>
                <swiper-item v-for="(item,index) in productData" :key="item.id">
                  <img class="img db imgcover w_100 h_100" :src="item.photo" default-src="https://tosqy.boka.cn/images/nopic.jpg" />
                  <img v-if="qrcode && qrcode != ''" class="qrcode" :src="qrcode" />
                  <div class="ico">免费送</div>
                  <div class="txt">
                    <div class="clamp1">{{item.title}}</div>
                    <div style="color:#f94929;font-weight:bold;">￥{{item.price}}</div>
                  </div>
                </swiper-item>
              </swiper>
            </div>
          </div>
        </div>
        <div class="padding10 flex_center">
          <div style="text-decoration: underline;color: #fff;" @click="clickShare">分享给好友，一起免费吃</div>
        </div>
      </div>
    </template>
    <div class="auto-modal flex_center" v-if="isOld && showCard">
      <div class="modal-inner">
        <div class="box-outer">
          <div class="box-title bold font18 align_center" style="color:#f94929;">恭喜您中奖啦</div>
          <div class="pl10 pr10 pt20">
            <div class="card-area flex_left">
              <div class="flex_left pl10 pr10">
                <img :src="winInfo.photo" style="width:50px;height:50px;boject-fit:cover;" />
              </div>
              <div class="flex_left flex_cell ml10">
                <div class="w_100">
                  <div class="font16 bold">{{winInfo.title}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="b_top_after padding10" v-if="winInfo && winInfo.content != ''" v-html="winInfo.content"></div>
          <div class="padding10 flex_center">
            <div class="btn-share" @click="toCard">我的优惠券</div>
          </div>
        </div>
        <div class="close-area flex_center">
          <div class="al al-close" @click="closeCardModal"></div>
        </div>
      </div>
    </div>
    <div v-if="isWx && !isQywx" class="fix-page-bottom">
      <div class="flex_cell flex_center">
        <div class="btn">
          <wx-open-launch-weapp
            :username="AppGhId"
            :path.sync="weappPath"
            @launch="handleLaunchFn"
            @error="handleErrorFn"
            style="width:100%;height:35px;display:block;">
            <script type="text/wxtag-template">
              <div style="width:100px;height:35px;border-radius:60px;display:flex;justify-content:center;align-items:center;border:#ccc 1px solid;color:#fff;font-size:18px;">点餐</div>
            </script>
          </wx-open-launch-weapp>
        </div>
      </div>
      <div class="flex_cell flex_center">
        <div class="btn">
          <wx-open-launch-weapp
            :username="AppGhId"
            :path.sync="orderPath"
            @launch="handleLaunchFn"
            @error="handleErrorFn"
            style="width:100%;height:35px;display:block;">
            <script type="text/wxtag-template">
              <div style="width:100px;height:35px;border-radius:60px;display:flex;justify-content:center;align-items:center;border:#ccc 1px solid;color:#fff;font-size:18px;">结账</div>
            </script>
          </wx-open-launch-weapp>
        </div>
      </div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showShareModal" height="100%" class="share-modal">
        <div class="popup1 h_100" @click="clickShareModal">
    			<div class="ico"><i class="al al-feiji"></i></div>
    			<div class="txt">点击<span class="al al-asmkticon0165"></span>，分享给朋友吧！</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import {TransferDom, Popup, Swiper, SwiperItem} from 'vux'
import ENV from 'env'
import {User} from '#/storage'
export default {
  directives: {TransferDom},
  components: {Popup, Swiper, SwiperItem},
  data () {
    return {
      query: {},
      loginUser: {},
      afterLoad: false,
      isNew: false,
      isOld: false,
      AppGhId: ENV.AppGhId,
      showShareModal: false,
      disList: false,
      listData: [],
      disProduct: false,
      productData: [],
      isWx: false,
      isQywx: false,
      cardInfo: {},
      cardSet: {},
      qrcode: '',
      todayProduct: null,
      weappPath: ENV.MiniPage.store,
      orderPath: ENV.MiniPage.order,
      shareParams: {},
      shareWid: 0,
      storeInfo: {},
      weekObject: {0: '周一', 1: '周二', 2: '周三', 3: '周四', 4: '周五', 5: '周六', 6: '周日'},
      blocks: [{
        padding: '13px',
        background: '#d64737'
      }],
      prizes: [],
      defaultPrizes: [
        {
          background: '#f8d384',
          fonts: [{
            text: '奖品1',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        },
        {
          background: '#f9e3bb',
          fonts: [{
            text: '奖品2',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        },
        {
          background: '#f8d384',
          fonts: [{
            text: '奖品3',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        },
        {
          background: '#f9e3bb',
          fonts: [{
            text: '奖品4',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        },
        {
          background: '#f8d384',
          fonts: [{
            text: '奖品5',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        },
        {
          background: '#f9e3bb',
          fonts: [{
            text: '奖品6',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        },
        {
          background: '#f8d384',
          fonts: [{
            text: '奖品7',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        },
        {
          background: '#f9e3bb',
          fonts: [{
            text: '奖品8',
            top: '8%',
            fontSize: '12px',
            fontColor: '#d74b39'
          }],
          imgs: [{
            src: require('../assets/images/luckdraw/10.png'),
            width: '30%',
            top: '35%'
          }]
        }
      ],
      buttons: [
        {radius: '50px', background: '#d64737'},
        {radius: '45px', background: '#fff'},
        {radius: '41px', background: '#f6c66f', pointer: !0},
        {
          radius: '35px',
          background: '#ffdea0',
          imgs: [{
            src: require('../assets/images/luckdraw/1.png'), width: '65%', top: '-43%'
          }]
        }
      ],
      showCard: false,
      disLottery: false,
      lotteryData: null,
      lotterResult: false,
      winInfo: {}
    }
  },
  methods: {
    startCallBack () {
      this.$http.get(`${ENV.BokaApi}/api/tableindex/startLottery`, {
        params: {storeid: this.query.storeid}
      }).then(res => {
        let data = res.data
        if (data.code === 0) {
          this.$refs.LuckyWheel.play()
          this.lotterResult = true
          let retdata = data.wininfo
          this.winInfo = retdata
          let winIndex = 0
          for (let i = 0; i < this.lotteryData.length; i++) {
            if (this.lotteryData[i].id === retdata.id) {
              winIndex = i
              break
            }
          }
          setTimeout(() => {
            this.$refs.LuckyWheel.stop(winIndex)
          }, 1000)
        } else {
          this.lotterResult = false
          setTimeout(() => {
            this.$refs.LuckyWheel.stop(Math.random() * 8 >> 0)
            this.$vux.toast.show({
              text: data.msg,
              type: 'text',
              time: this.$util.delay(data.msg)
            })
          }, 1000)
        }
      })
    },
    endCallBack (e) {
      setTimeout(() => {
        this.showCard = true
      }, 500)
    },
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn (e) {
      console.log('fail', e.detail)
    },
    closeCardModal () {
      this.showCard = false
    },
    toCard () {
      this.$router.push('/userCard')
    },
    clickShare () {
      // this.showShareModal = true
      this.$router.push(`/storeActivity?storeid=${this.query.storeid}&tableid=${this.query.tableid}`)
    },
    clickShareModal () {
      this.showShareModal = false
    },
    handleShare () {
      let shareLink = `${ENV.Host}/#/tableIndex?storeid=${this.query.storeid}&tableid=${this.query.tableid}&share_uid=${this.loginUser.uid}`
      if (this.shareWid && this.shareWid !== '') {
        shareLink = `${shareLink}&wid=${this.shareWid}`
      }
      this.shareParams = {
        title: '新客送菜 老客有礼',
        desc: '新客送菜 老客有礼',
        photo: this.todayProduct.photo,
        link: shareLink
      }
      if (this.query.share_uid) {
        this.shareParams.link = `${this.shareParams.link}&lastshareuid=${this.query.share_uid}`
        this.shareParams.lastshareuid = this.query.share_uid
      }
      this.$util.handleWxShare(this.shareParams)
    },
    getLottery () {
      this.$http.get(`${ENV.BokaApi}/api/content/getList`, {
        params: {module: 'lottery', storeid: this.query.storeid}
      }).then(res => {
        let data = res.data
        if (data.code === 0) {
          let retdata = data.data
          this.lotteryData = retdata
          this.prizes = []
          for (let i = 0; i < retdata.length; i++) {
            let pushData = {...this.defaultPrizes[i]}
            pushData.fonts[0].text = retdata[i].title
            pushData.imgs[0].src = retdata[i].photo
            this.prizes.push(pushData)
          }
          this.disLottery = true
        }
      })
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/tableindex/index`, {
        params: {storeid: this.query.storeid, tableid: this.query.tableid}
      }).then(res => {
        let data = res.data
        if (data.code === 0) {
          let retdata = data.data
          if (retdata.prestoresetting) {
            this.listData = retdata.prestoresetting
            this.disList = true
          }
          if (retdata.sendproducts) {
            let sendproducts = retdata.sendproducts
            for (let i = 0; i < sendproducts.length; i++) {
              if (sendproducts[i].selected) {
                this.todayProduct = sendproducts[i]
                break
              }
            }
            this.productData = sendproducts
            this.disProduct = true
          }
          if (retdata.card) {
            this.cardInfo = retdata.card
          }
          if (retdata.cardsetting) {
            retdata.cardsetting.content = retdata.cardsetting.content.replace(/\n/g, '<br />')
            this.cardSet = retdata.cardsetting
          }
          if (retdata.qrcode) this.qrcode = retdata.qrcode
          if (retdata.storeinfo) this.storeInfo = retdata.storeinfo
          this.handleShare()
        }
      })
    },
    initData () {
      this.showShareModal = false
      this.afterLoad = false
      this.isNew = false
      this.isOld = false
      this.isWx = false
    },
    refresh () {
      this.query = this.$route.query
      this.weappPath = `${this.weappPath}.html?storeid=${this.query.storeid}&tableid=${this.query.tableid}`
      this.orderPath = `${this.orderPath}.html?storeid=${this.query.storeid}&tableid=${this.query.tableid}`
      console.log(this.weappPath)
      this.loginUser = User.get()
      this.initData()
      this.afterLoad = true
      this.isWx = this.$util.isWx()
      this.isQywx = this.$util.isQywx()
      this.isWx = true
      this.isQywx = false
      console.log('isWx=', this.isWx)
      console.log('isQywx=', this.isQywx)
      if (this.isQywx) {
        this.shareWid = this.loginUser.uid
      } else {
        if (this.query.wid) {
          this.shareWid = parseInt(this.query.wid)
        } else if (this.loginUser.ownid) {
          this.shareWid = this.loginUser.ownid
        }
      }
      if (!this.loginUser.identity) {
        this.isNew = true
      } else {
        this.isOld = true
        this.getLottery()
      }
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
