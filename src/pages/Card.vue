<style lang="less">
.card-page.havebottom{
  .card-inner{position:absolute;left:0;top:0;right:0;bottom:50px;z-index:1;}
}
.card-page{
  width:100%;height:100%;background-color:#f94929;position:relative;
  .card-inner{background-color:#f94929;overflow-y:auto;}
  .nav-bottom{
    position:absolute;left:0;bottom:0;right:0;height:50px;box-sizing: border-box;
    width:100%;display:flex;z-index:10;background-color:#f94929;
    .item{flex:1;height:100%;height:100%;color:#fff;}
    .inner{height:100%;display:flex;justify-content:center;align-items:center;}
    .item .al{font-size:20px;}
    .al.share{font-size:17px;}
  }
}
.card-result-modal{
  .inner{
    width:90%;position:relative;
    .pic-outer{
      width:100%;padding-bottom:107%;position:relative;
      .pic{
        position:absolute;left:0;top:0;right:0;bottom:0;
        img{width:100%;height:100%;}
      }
    }
  }
  .top-txt{
    position:absolute;left:0;top:22%;right:0;width:100%;height:12%;color:#7a2716;font-weight:bold;font-size:15px;
    .big{font-size:20px;color:#ff6a61;}
  }
  .con-txt{
    position:absolute;left:0;top:33%;right:0;width:100%;height:29%;color:#7a2716;font-weight:bold;font-size:15px;
    .big{font-size:40px;color:#ff6a61;}
  }
  .txt-list{
    position:absolute;left:0;bottom:10%;right:0;display:flex;
    .item{flex:1;color:#f8edad;box-sizing: border-box;}
    .item:nth-child(1){padding-right:10px;}
    .item:nth-child(2){padding-left:10px;}
  }
  .desc-txt{
    position:absolute;left:7%;top:79%;right:7%;color:#fff;
    .txt{width:75px;text-align:right;padding-right:5px;box-sizing: border-box;}
  }
  .close-area{position:absolute;left:0;bottom:-60px;right:0;height:50px;}
  .close-area .al{font-weight:bold;font-size:35px;color:#fff;}
}
.qrcode-modal{
  background-color:rgba(0,0,0,0.7) !important;color:#fff;
  .ico{text-align:right;padding:15px 40px;box-sizing: border-box;}
  .ico .al{font-size:60px;color:rgba(255,255,255,0.9);}
  .txt{font-size:16px;text-shadow: -2px 0px 1px #000;padding:10px;box-sizing: border-box;text-align:center;}
}
</style>
<template>
  <div :class="`card-page ${isQywx ? 'havebottom' : ''}`">
    <get-card
      v-if="showGetPage"
      :afterLoad.sync="afterLoad"
      :user.sync="loginUser"
      :viewData.sync="viewData"
      :shareWid.sync="shareWid"
      @after-open="afterOpen"
      @click-share="clickShare">
    </get-card>
    <user-card
      v-if="showUserPage"
      :afterLoad.sync="afterLoad"
      :user.sync="loginUser"
      :viewData.sync="viewData"
      :ordermoney.sync="ordermoney"
      :facemoney.sync="facemoney"
      :shareWid.sync="shareWid"
      @after-use="afterUse">
    </user-card>
    <view-card
      v-if="showViewPage"
      :afterLoad.sync="afterLoad"
      :user.sync="loginUser"
      :viewData.sync="viewData"
      :ordermoney.sync="ordermoney"
      :facemoney.sync="facemoney">
    </view-card>
    <div class="nav-bottom b_top_after" v-if="isQywx">
      <div class="item b_right_after" @click="toShare">
        <div class="inner">
          <div class="al al-fenxiang1 share" open-type="share"></div>
          <div class="font12 ml5">分享给客户</div>
        </div>
      </div>
      <div class="item" @click="toShareGroup">
        <div class="inner">
          <div class="al al-fenxiang1 share"></div>
          <div class="font12 ml5">分享到客户群</div>
        </div>
      </div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showShareModal" height="100%" class="share-modal">
        <div class="popup1 h_100" @click="clickShareModal">
    			<div class="ico"><i class="al al-feiji"></i></div>
    			<div class="txt">点击<span class="al al-asmkticon0165"></span>，分享给客户吧！</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showKefuModal" height="100%" class="qrcode-modal">
        <div class="popup1 h_100 flex_center">
          <div class="modal-inner border-box" style="width:80%;">
            <div class="padding20 flex_center">
              <img mode="widthFix" class="kefu-pic" :src="kefuQrcode" />
            </div>
            <div class="padding10 flex_center">
              <span class="color-gray">扫描二维码加客服微信</span>
            </div>
            <div class="close-area flex_center">
              <div @click="closeKefuEvent" class="al al-close"></div>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, Popup } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'
import GetCard from '@/components/GetCard'
import UserCard from '@/components/UserCard'
import ViewCard from '@/components/ViewCard'
import jweixin from 'jweixin'

export default {
  directives: { TransferDom },
  components: { Popup, GetCard, UserCard, ViewCard },
  data () {
    return {
      query: {},
      loginUser: {},
      wid: 0,
      viewData: {},
      ordermoney: '0.00',
      facemoney: '0.00',
      showResultModal: false,
      showShareModal: false,
      cardType: '',
      inQywx: false,
      cardObject: {
        newcustomer: '新人优惠券',
        singlecard: '专属优惠券'
      },
      shareParams: {},
      showOpen: true,
      showResult: false,
      shareWid: 0,
      afterLoad: false,
      isPC: false,
      isQywx: false,
      kefuQrcode: '',
      showKefuModal: false,
      showGetPage: false,
      showUserPage: false,
      showViewPage: false
    }
  },
  methods: {
    toShare () {
      jweixin.invoke('shareToExternalContact', {
        title: this.shareParams.title,
        desc: this.shareParams.desc,
        link: this.shareParams.link,
        imgUrl: this.shareParams.photo
      })
    },
    toShareGroup () {
      jweixin.invoke('shareToExternalChat', {
        title: this.shareParams.title,
        desc: this.shareParams.desc,
        link: this.shareParams.link,
        imgUrl: this.shareParams.photo
      })
    },
    closeKefuEvent () {
      this.showKefuModal = false
    },
    clickShare () {
      this.showShareModal = true
    },
    clickShareModal () {
      this.showShareModal = false
    },
    afterOpen (data) {
      if (data.code === 2 && data.qrcode !== '') {
        this.kefuQrcode = data.qrcode
        this.showKefuModal = true
      }
      let retdata = data.data
      if (retdata) {
        retdata.content = data.activity.content.replace(/\n/g, '<br />')
        if (retdata.startdate) retdata.startdate_str = new Time(retdata.startdate * 1000).dateFormat('yyyy-MM-dd')
        if (retdata.deadline) retdata.deadline_str = new Time(retdata.deadline * 1000).dateFormat('yyyy-MM-dd')
        if (retdata.starttime) retdata.starttime_str = new Time(retdata.starttime * 1000).dateFormat('yyyy-MM-dd')
        if (retdata.endtime) retdata.endtime_str = new Time(retdata.endtime * 1000).dateFormat('yyyy-MM-dd')
        this.viewData = retdata
      }
    },
    afterUse (data) {
      if (data.code === 0) {
        this.viewData.used = 1
      }
    },
    handleShare () {
      let shareLink = `${ENV.Host}/#/card?share_uid=${this.loginUser.uid}`
      if (this.query.id) {
        shareLink = `${shareLink}&id=${this.query.id}`
      }
      if (this.query.type) {
        shareLink = `${shareLink}&type=${this.query.type}`
      }
      if (this.query.frompage) {
        shareLink = `${shareLink}&frompage=${this.query.frompage}`
      }
      if (this.shareWid && this.shareWid !== '') {
        shareLink = `${shareLink}&wid=${this.shareWid}`
      }
      this.shareParams = {
        title: this.viewData.push_title,
        desc: this.viewData.push_desc,
        photo: this.viewData.photo,
        link: shareLink
      }
      if (this.query.share_uid) {
        this.shareParams.link = `${this.shareParams.link}&lastshareuid=${this.query.share_uid}`
        this.shareParams.lastshareuid = this.query.share_uid
      }
      if (!this.viewData.push_title || this.viewData.push_title === '') {
        this.shareParams.title = this.viewData.title
      }
      if (!this.viewData.photo || this.viewData.photo === '') {
        this.shareParams.photo = 'https://tossharingsales.boka.cn/month_202102/16137146626061.jpeg'
      }
      if (!this.viewData.push_desc || this.viewData.push_desc === '') {
        if (!this.query.id) {
          this.shareParams.desc = '送你一张优惠券'
        } else {
          if (!this.viewData.starttime || !this.viewData.endtime) {
            let deadtime = new Time(this.viewData.deadline * 1000).dateFormat('yyyy-MM-dd')
            this.shareParams.desc = `有效期至${deadtime}`
          } else {
            let shareStartTime = new Time(this.viewData.starttime * 1000).dateFormat('MM-dd')
            let shareEndTime = new Time(this.viewData.endtime * 1000).dateFormat('MM-dd')
            this.shareParams.desc = `活动日期${shareStartTime}至${shareEndTime}`
          }
        }
      }
      console.log('进入到了分享参数的配置')
      console.log(this.shareParams)
      this.$util.handleWxShare(this.shareParams)
    },
    getData () {
      let ajaxUrl = `${ENV.BokaApi}/api/content/info`
      let infoparams = {id: this.query.id, module: 'miniactivity', addviews: 1}
      if (this.query.id && this.query.frompage === 'user') {
        ajaxUrl = `${ENV.BokaApi}/api/card/info`
      } else {
        if (this.query.id) {
          infoparams.id = this.query.id
        } else if (this.query.type) {
          infoparams.type = this.query.type
          ajaxUrl = `${ENV.BokaApi}/api/miniactivity/info`
        }
      }
      if (this.query['share_uid']) {
        infoparams['share_uid'] = this.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(ajaxUrl, infoparams) // 获取文章
      .then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.code === 0) {
          let retdata = data.data
          retdata.content = retdata.content.replace(/\n/g, '<br />')
          if (retdata.startdate) retdata.startdate_str = new Time(retdata.startdate * 1000).dateFormat('yyyy-MM-dd')
          if (retdata.deadline) retdata.deadline_str = new Time(retdata.deadline * 1000).dateFormat('yyyy-MM-dd')
          if (retdata.starttime) retdata.starttime_str = new Time(retdata.starttime * 1000).dateFormat('yyyy-MM-dd')
          if (retdata.endtime) retdata.endtime_str = new Time(retdata.endtime * 1000).dateFormat('yyyy-MM-dd')
          if (retdata.startdate) {
            let now = new Date().getTime()
            if (now >= retdata.startdate * 1000) retdata.canuse = true
          } else {
            retdata.canuse = true
          }
          this.viewData = retdata
          if (this.viewData.title) {
            document.title = this.viewData.title
          }
          if (this.viewData.discounttype && this.viewData.discounttype !== '') {
            let cmoney = this.viewData.discounttype.split(',')
            this.ordermoney = `${cmoney[0]}`
            if (cmoney.length === 3 && cmoney[1] !== cmoney[2]) {
              this.facemoney = `${cmoney[1]}-${cmoney[2]}`
            } else {
              this.facemoney = `${cmoney[1]}`
            }
          } else {
            this.ordermoney = `${this.viewData.ordermoney}`
            this.facemoney = `${this.viewData.money}`
          }
          this.handleShare()
        }
        this.afterLoad = true
      })
    },
    initData () {
      this.wid = 0
      this.viewData = {}
      this.ordermoney = '0.00'
      this.facemoney = '0.00'
      this.showResultModal = false
      this.showShareModal = false
      this.cardType = ''
      this.inQywx = false
      this.shareParams = {}
      this.showOpen = true
      this.showResult = false
      this.showGetPage = false
      this.showUserPage = false
      this.showViewPage = false
    },
    handleQuery () {
      if (this.query.type) this.cardType = this.query.type
      if (this.query.share_uid || this.query.push) {
        this.showGetPage = true
      } else if (this.query.frompage === 'user' && this.query.id) {
        this.showUserPage = true
      } else {
        this.showViewPage = true
      }
      this.isPC = this.$util.isPC
      this.isQywx = this.$util.isQywx()
      if (this.isQywx) {
        this.shareWid = this.loginUser.uid
      } else {
        if (this.query.wid) {
          this.shareWid = parseInt(this.query.wid)
        } else if (this.loginUser.ownid) {
          this.shareWid = this.loginUser.ownid
        }
      }
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.initData()
      this.handleQuery()
      this.getData()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
