<style lang="less">
.activity-page{
  .box-outer{padding:20px;box-sizing:border-box;}
  .txt1{text-align:center;font-size:18px;font-weight:bold;}
  .txt2{text-align:center;margin-top:5px;}
  .btn{width:80%;max-width:300px;height:40px;line-height:40px;text-align:center;border-radius:60px;background-color:#07c160;color:#fff;margin:20px auto 10px;}
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
        <div class="box-outer">
          <div class="txt1">{{facemoney}}元优惠券</div>
          <div class="btn" @click="clickShare">立即分享</div>
          <div class="b_top_after flex_left pt10 pb10 color-gray">
            <div>有效期</div>
            <div class="flex_cell flex_right">{{viewData.starttime_str}}至{{viewData.endtime_str}}</div>
          </div>
          <div class="b_top_after flex_left pt10 pb10 color-gray">
            <div>使用门槛</div>
            <div class="flex_cell flex_right">满{{ordermoney}}元可用</div>
          </div>
          <div class="b_top_after flex_left pt10 pb10 color-gray">
            <div>使用说明</div>
            <div class="flex_cell flex_right">{{viewData.content}}</div>
          </div>
        </div>
      </template>
    </template>
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
    getData () {
      const infoparams = {id: this.query.id, module: 'miniactivity', addviews: 1}
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
          retdata.starttime_str = new Time(retdata.starttime * 1000).dateFormat('yyyy-MM-dd')
          retdata.endtime_str = new Time(retdata.endtime * 1000).dateFormat('yyyy-MM-dd')
          this.viewData = retdata
          document.title = this.viewData.title
          if (this.viewData.type === 'cardcommon') {
            let cmoney = this.viewData.discounttype.split(',')
            this.ordermoney = cmoney[0]
            this.facemoney = cmoney[1]
          }
          let shareStartTime = new Time(retdata.starttime * 1000).dateFormat('MM-dd')
          let shareEndTime = new Time(retdata.endtime * 1000).dateFormat('MM-dd')
          let shareLink = `${ENV.Host}/#/card?share_uid=${this.loginUser.uid}`
          if (this.viewData.id) shareLink = `${shareLink}&id=${this.viewData.id}`
          if (this.viewData.type) shareLink = `${shareLink}&type=${this.viewData.type}`
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
      this.inQywx = this.$util.isQywx()
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
