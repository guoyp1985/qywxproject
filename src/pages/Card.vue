<style lang="less">
.card-page{
  height:100%;background-color:#f94929;overflow-y:auto;
  .bg-image1{width:100%;}
  .row1{
    width:100%;
    img{width:100%;display:block;}
  }
  .row2{
    width:100%;position:relative;
    img{width:100%;display:block;}
    .row2-inner{position:absolute;left:0;top:0;right:0;bottom:0;}
  }
  .pic-area{
    width:53%;
    .pic{
      width:100%;position:relative;
      img{width:100%;}
      .txt1{
        width:34%;max-height:100%;position:absolute;left:33%;top:34%;
        .inner{width:100%;max-height:100%;position:relative;}
        .inner:after{padding-top:100%;content:"";display:block;}
        .btn{position:absolute;left:0;top:0;right:0;bottom:0;font-size:25px;color:#f95a51;}
        .btn.disable{color:#999;}
      }
      .txt2{position:absolute;left:0;bottom:15%;right:0;text-align:center;color:#F9EA72;font-size:15px;letter-spacing:1px;}
    }
  }
  .txt-area{
    padding:20px;box-sizing: border-box;color:#fff;
    .txt{width:75px;text-align:right;padding-right:5px;box-sizing: border-box;}
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
.share-modal{
  background-color:rgba(0,0,0,0.7) !important;color:#fff;
  .ico{text-align:right;padding:15px 40px;box-sizing: border-box;}
  .ico .al{font-size:60px;color:rgba(255,255,255,0.9);}
  .txt{font-size:16px;text-shadow: -2px 0px 1px #000;padding:10px;box-sizing: border-box;text-align:center;}
}
.qrcode-modal{
  background-color:rgba(0,0,0,0.7) !important;color:#fff;
  .ico{text-align:right;padding:15px 40px;box-sizing: border-box;}
  .ico .al{font-size:60px;color:rgba(255,255,255,0.9);}
  .txt{font-size:16px;text-shadow: -2px 0px 1px #000;padding:10px;box-sizing: border-box;text-align:center;}
}
</style>
<template>
  <div class="card-page">
    <div class="row1">
      <img src="https://tossharingsales.boka.cn/minigxk/luck/bg3.png" />
    </div>
    <div class="row2">
      <img src="https://tossharingsales.boka.cn/minigxk/luck/bg2.png" />
      <div v-if="showOpen" class="row2-inner">
        <div class="w_100 flex_center">
          <div class="pic-area">
            <div class="pic">
              <img src="https://tossharingsales.boka.cn/minigxk/luck/hb1.png" />
              <div class="txt1">
                <div class="inner">
                  <div class="btn flex_center" @click="openEvent">開</div>
                </div>
              </div>
              <div class="txt2" @click="clickShare">立即分享</div>
            </div>
          </div>
        </div>
        <div v-if="viewData && viewData.id" class="txt-area">
          <div class="db-flex">
            <div class="txt">使用说明: </div>
            <div class="flex_cell" v-html="viewData.content"></div>
          </div>
          <div class="flex_left" v-if="viewData.starttime">
            <div class="txt">有效期: </div>
            <div class="flex_cell">{{viewData.starttime_str}} 至 {{viewData.endtime_str}}</div>
          </div>
          <div class="flex_left" v-else="viewData.deadline">
            <div class="txt">有效期至: </div>
            <div class="flex_cell">{{viewData.deadline_str}}</div>
          </div>
        </div>
      </div>
      <div v-if="showResult" class="row2-inner">
        <div class="w_100 flex_center card-result-modal pb20">
          <div class="inner">
            <div class="pic-outer">
              <div class="pic">
                <img src="https://tossharingsales.boka.cn/minigxk/luck/hb2.png" />
              </div>
              <div class="top-txt flex_center">恭喜你获得<span class="big">{{cardObject[cardType] ? cardObject[cardType] : '优惠券'}}</span></div>
              <div class="con-txt flex_center">
                <div class="w_100 align_center">
                  <div class="big">￥{{facemoney}}</div>
                  <div>满{{ordermoney}}可用</div>
                </div>
              </div>
              <div class="desc-txt">
                <div class="db-flex">
                  <div class="txt">使用说明: </div>
                  <div class="flex_cell" v-html="viewData.content">{{viewData.deadline_str}}</div>
                </div>
                <div class="flex_left">
                  <div class="txt">有效期至: </div>
                  <div class="flex_cell">{{viewData.deadline_str}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div v-transfer-dom class="x-popup">
      <popup v-model="showResultModal" height="100%" class="card-result-modal">
        <div class="popup1 h_100 flex_center">
          <div class="inner">
            <div class="pic-outer">
              <div class="pic">
                <img src="https://tossharingsales.boka.cn/minigxk/luck/hb2.png" />
              </div>
            </div>
            <div class="top-txt flex_center">恭喜你获得<span class="big">{{cardObject[cardType] ? cardObject[cardType] : '优惠券'}}</span></div>
            <div class="con-txt flex_center">
              <div class="w_100 align_center">
                <div class="big">￥{{facemoney}}</div>
                <div>满{{ordermoney}}可用</div>
              </div>
            </div>
            <div class="close-area flex_center">
              <div class="al al-close" @click="closeResultModal"></div>
            </div>
          </div>
        </div>
      </popup>
    </div>
  -->
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

export default {
  directives: { TransferDom },
  components: { Popup },
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
        newcustomer: '新人优惠券'
      },
      shareParams: {},
      showOpen: true,
      showResult: false,
      shareWid: 0,
      afterLoad: false,
      isPC: false,
      isQywx: false,
      kefuQrcode: '',
      showKefuModal: false
    }
  },
  methods: {
    closeKefuEvent () {
      this.showKefuModal = false
    },
    clickShare () {
      this.showShareModal = true
    },
    clickShareModal () {
      this.showShareModal = false
    },
    openEvent () {
      this.$vux.loading.show()
      let params = {type: this.query.type, wid: this.shareWid}
      if (this.query.id) params.id = this.query.id
      this.$http.post(`${ENV.BokaApi}/api/card/getCard`, params).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.code !== 0) {
          this.$vux.toast.show({
            text: data.msg,
            type: 'text',
            time: this.$util.delay(data.msg)
          })
        }
        if (data.code === 2 && data.qrcode !== '') {
          this.kefuQrcode = data.qrcode
          this.showKefuModal = true
        }
        let retdata = data.activity
        if (retdata) {
          retdata.deadline_str = new Time(retdata.deadline * 1000).dateFormat('yyyy-MM-dd')
          retdata.content = retdata.content.replace(/\n/g, '<br />')
          let discounttype = retdata.discounttype.split(',')
          this.ordermoney = discounttype[0]
          this.facemoney = discounttype[1]
          this.showOpen = false
          this.showResult = true
          this.viewData = retdata
        }
      }, res => {
        this.$vux.loading.hide()
      })
    },
    closeResultModal () {
      this.showResultModal = false
    },
    handleShare () {
      let shareLink = `${ENV.Host}/#/card?share_uid=${this.loginUser.uid}`
      if (this.query.id) shareLink = `${shareLink}&id=${this.query.id}`
      if (this.query.type) shareLink = `${shareLink}&type=${this.query.type}`
      if (this.shareWid && this.shareWid !== '') shareLink = `${shareLink}&wid=${this.shareWid}`
      this.shareParams = {
        title: '优惠券',
        desc: '送你一张优惠券',
        photo: 'https://tossharingsales.boka.cn/month_202102/16137146626061.jpeg',
        link: shareLink
      }
      if (this.query.share_uid) {
        this.shareParams.link = `${this.shareParams.link}&lastshareuid=${this.query.share_uid}`
        this.shareParams.lastshareuid = this.query.share_uid
      }
    },
    getData () {
      let infoparams = {id: this.query.id, module: 'miniactivity', addviews: 1}
      if (this.query['share_uid']) {
        infoparams['share_uid'] = this.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/content/info`, infoparams) // 获取文章
      .then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.code === 0) {
          let retdata = data.data
          retdata.content = retdata.content.replace(/\n/g, '<br />')
          if (retdata.starttime) {
            retdata.starttime_str = new Time(retdata.starttime * 1000).dateFormat('yyyy-MM-dd')
            retdata.endtime_str = new Time(retdata.endtime * 1000).dateFormat('yyyy-MM-dd')
          } else if (retdata.deadline) {
            retdata.deadline_str = new Time(retdata.deadline * 1000).dateFormat('yyyy-MM-dd')
          }
          this.viewData = retdata
          document.title = this.viewData.title
          if (this.viewData.type === 'cardcommon') {
            let cmoney = this.viewData.discounttype.split(',')
            this.ordermoney = cmoney[0]
            this.facemoney = cmoney[1]
          }
          this.shareParams.title = this.viewData.title
          let shareStartTime = new Time(this.viewData.starttime * 1000).dateFormat('MM-dd')
          let shareEndTime = new Time(this.viewData.endtime * 1000).dateFormat('MM-dd')
          this.shareParams.desc = `有效期${shareStartTime}至${shareEndTime}`
          this.$util.handleWxShare(this.shareParams)
        }
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
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.initData()
      if (this.query.type) this.cardType = this.query.type

      this.isPC = this.$util.isPC
      this.isQywx = this.$util.isQywx()
      this.afterLoad = true
      if (this.isQywx) {
        this.shareWid = this.loginUser.uid
      } else {
        if (this.query.wid) {
          this.shareWid = parseInt(this.query.wid)
        } else if (this.loginUser.ownid) {
          this.shareWid = this.loginUser.ownid
        }
      }
      this.handleShare()
      if (!this.query.id) {
        if (this.query.type && this.cardObject[this.query.type]) {
          this.shareParams.title = this.cardObject[this.query.type]
        }
        this.$util.handleWxShare(this.shareParams)
      } else {
        this.getData()
      }
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
