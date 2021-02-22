<style lang="less">
.activity-page{
  height:100%;background-color:#f94929;
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
    position:absolute;left:0;top:22%;right:0;width:100%;height:12%;color:#7a2716;font-weight:bold;font-size:30rpx;
    .big{font-size:40rpx;color:#ff6a61;}
  }
  .con-txt{
    position:absolute;left:0;top:33%;right:0;width:100%;height:29%;color:#7a2716;font-weight:bold;font-size:30rpx;
    .big{font-size:80rpx;color:#ff6a61;}
  }
  .txt-list{
    position:absolute;left:0;bottom:10%;right:0;display:flex;
    .item{flex:1;color:#f8edad;box-sizing: border-box;}
    .item:nth-child(1){padding-right:20rpx;}
    .item:nth-child(2){padding-left:20rpx;}
  }
  .close-area{position:absolute;left:0;bottom:-120rpx;right:0;height:100rpx;}
  .close-area .al{font-weight:bold;font-size:70rpx;color:#fff;}
}
.share-modal{
  background-color:rgba(0,0,0,0.7) !important;color:#fff;
  .ico{text-align:right;padding:15px 40px;box-sizing: border-box;}
  .ico .al{font-size:60px;color:rgba(255,255,255,0.9);}
  .txt{font-size:16px;text-shadow: -2px 0px 1px #000;padding:10px;box-sizing: border-box;text-align:center;}
}
</style>
<template>
  <div class="activity-page">
    <template v-if="viewData && viewData.id">
      <template v-if="viewData.type == 'cardcommon'">
        <div class="row1">
          <img src="https://tossharingsales.boka.cn/minigxk/luck/bg3.png" />
        </div>
        <div class="row2">
          <img src="https://tossharingsales.boka.cn/minigxk/luck/bg2.png" />
          <div class="row2-inner">
            <div class="w_100 flex_center">
              <div class="pic-area">
                <div class="pic">
                  <img mode="widthFix" src="https://tossharingsales.boka.cn/minigxk/luck/hb1.png" />
                  <div class="txt1">
                    <div class="inner">
                      <div class="btn flex_center" @click="openEvent">開</div>
                    </div>
                  </div>
                  <div class="txt2" @click="clickShare" v-if="!query.share_uid || query.share_uid == ''">立即分享</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showResultModal" height="100%" class="card-result-modal">
        <div class="popup1 h_100 flex_center">
          <div class="inner">
            <div class="pic-outer">
              <div class="pic">
                <img src="https://tossharingsales.boka.cn/minigxk/luck/hb2.png" />
              </div>
            </div>
            <div class="top-txt flex_center">恭喜你获得<span class="big">优惠券</span></div>
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
import { Tab, TabItem, TransferDom, Popup } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'

export default {
  directives: { TransferDom },
  components: { Tab, TabItem, Popup },
  data () {
    return {
      query: {},
      loginUser: {},
      wid: 0,
      viewData: {},
      ordermoney: '0.00',
      facemoney: '0.00',
      showResultModal: false,
      showShareModal: false
    }
  },
  methods: {
    clickShare () {
      this.showShareModal = true
    },
    clickShareModal () {
      this.showShareModal = false
    },
    openEvent () {
      this.showResultModal = true
    },
    closeResultModal () {
      this.showResultModal = false
    },
    handleShare () {
      let shareStartTime = new Time(this.viewData.starttime * 1000).dateFormat('MM-dd')
      let shareEndTime = new Time(this.viewData.endtime * 1000).dateFormat('MM-dd')
      let shareLink = `${ENV.Host}/#/activity?id=${this.viewData.id}&share_uid=${this.loginUser.uid}`
      if (this.wid && this.wid !== '') shareLink = `${shareLink}&wid=${this.wid}`
      let shareParams = {
        title: this.viewData.title,
        desc: `有效期${shareStartTime}至${shareEndTime}`,
        photo: 'https://tossharingsales.boka.cn/month_202102/16137146626061.jpeg',
        link: shareLink
      }
      if (this.query.share_uid) {
        shareParams.link = `${shareParams.link}&lastshareuid=${this.query.share_uid}`
        shareParams.lastshareuid = this.query.share_uid
      }
      this.$util.handleWxShare(shareParams)
    },
    getData () {
      const infoparams = {id: this.query.id, module: 'miniactivity'}
      if (this.query['share_uid']) {
        infoparams['share_uid'] = this.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/content_n/info`, infoparams) // 获取文章
      .then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.flag) {
          let retdata = data.data
          retdata.starttime_str = new Time(retdata.starttime * 1000).dateFormat('yyyy-MM-dd hh:mm')
          retdata.endtime_str = new Time(retdata.endtime * 1000).dateFormat('yyyy-MM-dd hh:mm')
          this.viewData = retdata
          document.title = this.viewData.title
          if (this.viewData.type === 'cardcommon') {
            let cmoney = this.viewData.discounttype.split(',')
            this.ordermoney = cmoney[0]
            this.facemoney = cmoney[1]
          }
          this.handleShare()
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.loginUser.identity === 2) {
        this.wid = this.loginUser.uid
      } else if (this.loginUser.ownid) {
        this.wid = this.loginUser.ownid
      } else if (this.query.wid) {
        this.wid = this.query.wid
      }
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
