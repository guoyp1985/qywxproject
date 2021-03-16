/*
* @description: 优惠券信息页，员工查看分享给客户
*/
<style lang="less">
.card-info-page{
  background-color:#f94c2a;padding-bottom:10px;box-sizing: border-box;width:100%;height:100%;
  .bg-pic{width:100%;}

  .image-outer{width:100%;margin:0 auto;}
  .image-outer .imgarea{width:100%;max-height:100%;position:relative;}
  .image-outer .imgarea:after{content:"";display:block;padding-top:76%;}
  .image-outer .imgarea .inner{position:absolute;left:0;top:0;right:0;bottom:0;display:flex !important;justify-content: center; align-items: center;}
  .image-outer .imgarea img{width:100%;height:100%;max-width:100%;max-height:100%;}

  .txt-outer{width:70%;height:50px;margin:0 auto;color:#fff;font-size:14px;}
  .txt-outer .txt{flex:1;position:relative;height:100%;}
  .txt-outer .btn-txt{width:100%;position:absolute;let:0;top:0;right:0;bottom:0;}
  .txt-outer .small-txt{width:20px;;}

  .box-area{
    width:90%;margin:0 auto 20px;box-sizing: border-box;border:3px solid #FDDD91;
    background-color:#fff;border-radius:3px;padding:4%;
  }
  .box-area .title{font-size:18px;color:#FE6C5B;text-align:center;padding-bottom:10px;}
  .image-outer.card-outer .imgarea:after{content:"";display:block;padding-top:26%;}
  .money-txt{position:absolute;left:0;top:0;right:0;bottom:0;z-index:1;display:flex;width:100%;}
  .money-txt .left_cell{width:35%;color:#FBF1B8;}
  .money-txt .big-txt{font-size:30px;}
  .money-txt .big-txt.long{font-size:20px;}
  .btn-area{
    width:100%;padding-top:35px;border-top:#dba472 2px dashed;margin-top:10px;
    .btn{
      width:75%;height:34px;box-sizing: border-box;
      display:flex;justify-content: center;align-items: center;
      border-radius:20px;text-align:center;background-color:#FE6C5B;color:#fff;font-size:12px;
    }
  }

  .btn-play{
    width:100px;margin:0 auto;color:#f8edad;text-decoration: underline;
  }

  .bg-img{
    .user-area{
      position:absolute;left:0;top:20px;right:0;
      .avatar{
        img{width:80px;height:80px;border-radius:50%;}
      }
    }
  }
  .con-area{color:#FE6C5B;width:100%;box-sizing: border-box;font-size:12px;}
  .txt-cell{width:55px;margin-right:5px;}
}
</style>
<template>
  <div class="card-info-page">
    <div class="image-outer bg-img">
      <div class="imgarea">
        <div class="inner">
          <img class="bg-pic" src="https://tossharingsales.boka.cn/minigxk/giftcard2.png" />
          <div class="user-area">
            <div class="avatar flex_center">
              <img :src="loginUser.avatar" />
            </div>
            <div class="flex_center font20 mt10 color-white bold">{{loginUser.linkman}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-area">
      <div class="title">{{loginUser.title}}</div>
      <div class="db image-outer card-outer mt15" bindsubmit="toStore" report-submit="true">
        <div class="imgarea">
          <div class="inner">
            <img class="bg-pic" src="https://tossharingsales.boka.cn/minigxk/voucher/voucher1.png" />
            <div class="money-txt">
              <div class="left_cell flex_center">
                <template v-if="facemoney > 100">
                  <div class="align_center"><span class="big-txt long">{{facemoney}}</span>元</div>
                </template>
                <template v-else>
                  <div class="align_center"><span class="big-txt">{{facemoney}}</span>元</div>
                </template>
              </div>
              <div class="right_cell flex_cell flex_center">
                <div class="w_100">
                  <div class="flex_center">订单满{{ordermoney}}元可用</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="afterLoad" class="flex_center btn-area" style="margin-bottom:20px;">
        <template v-if="inQywx">
          <div class="flex_cell flex_center">
            <div class="btn" @click="toShare">分享给客户</div>
          </div>
          <div class="flex_cell flex_center">
            <div class="btn" @click="toShareGroup">分享到客户群</div>
          </div>
        </template>
        <div class="btn" @click="clickShare" v-else>分享</div>
      </div>
      <div class="con-area">
        <div class="flex_left" v-if="!viewData.starttime || !viewData.endtime">
          <div class="txt-cell">有效期至</div>
          <div class="flex_cell">{{viewData.deadline_str}}</div>
        </div>
        <div class="flex_left" v-else>
          <div class="txt-cell">有效期</div>
          <div class="flex_cell">{{viewData.starttime_str}} 至 {{viewData.endtime_str}}</div>
        </div>
        <div class="flex_left" v-if="viewData.content && viewData.content != ''">
          <div class="txt-cell">使用说明</div>
          <div class="flex_cell">{{viewData.content}}</div>
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
      shareParams: {},
      afterLoad: false,
      inQywx: false,
      showShareModal: false
    }
  },
  methods: {
    clickShare () {
      this.showShareModal = true
    },
    clickShareModal () {
      this.showShareMenu = false
    },
    toShare () {
      wx.invoke('shareToExternalContact', {
        title: this.viewData.title,
        desc: this.viewData.summary,
        link: this.shareParams.shareLink,
        imgUrl: this.viewData.photo.split(',')[0],
        success: function (res) {
        }
      })
    },
    toShareGroup () {
      wx.invoke('shareToExternalChat', {
        title: this.viewData.title,
        desc: this.viewData.summary,
        link: this.shareParams.shareLink,
        imgUrl: this.viewData.photo.split(',')[0],
        success: function (res) {
        }
      })
    },
    toList () {
      this.$router.push({path: '/userCard'})
    },
    toUse (item) {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/card/useCard`, {
        params: {id: this.query.id}
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.msg,
          type: 'text',
          time: this.$util.delay(data.msg)
        })
        if (data.code === 0) {
          this.viewData.used = 1
        }
      })
    },
    handleShare () {
      let shareLink = `${ENV.Host}/#/card?share_uid=${this.loginUser.uid}`
      if (this.query.id) shareLink = `${shareLink}&id=${this.query.id}`
      if (this.query.type) shareLink = `${shareLink}&type=${this.query.type}`
      if (this.shareWid && this.shareWid !== '') shareLink = `${shareLink}&wid=${this.shareWid}`
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
      this.$util.handleWxShare(this.shareParams)
    },
    getData () {
      let ajaxUrl = `${ENV.BokaApi}/api/content/info`
      let infoparams = {id: this.query.id, module: 'miniactivity', addviews: 1}
      if (this.query.id) {
        infoparams.id = this.query.id
      } else if (this.query.type) {
        infoparams.type = this.query.type
        ajaxUrl = `${ENV.BokaApi}/api/miniactivity/info`
      }
      if (this.query['share_uid']) {
        infoparams['share_uid'] = this.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(ajaxUrl, infoparams)
      .then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.code === 0) {
          let retdata = data.data
          retdata.content = retdata.content.replace(/\n/g, '<br />')
          if (!retdata.starttime || !retdata.endtime) {
            retdata.deadline_str = new Time(retdata.deadline * 1000).dateFormat('yyyy-MM-dd')
          } else {
            retdata.starttime_str = new Time(retdata.starttime * 1000).dateFormat('yyyy-MM-dd')
            retdata.endtime_str = new Time(retdata.endtime * 1000).dateFormat('yyyy-MM-dd')
          }
          this.viewData = retdata
          if (this.viewData.title) {
            document.title = this.viewData.title
          }
          if (this.viewData.discounttype && this.viewData.discounttype !== '') {
            let cmoney = this.viewData.discounttype.split(',')
            this.ordermoney = cmoney[0]
            this.facemoney = cmoney[1]
          } else {
            this.ordermoney = this.viewData.ordermoney
            this.facemoney = this.viewData.money
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
      this.inQywx = this.$util.isQywx()
      this.afterLoad = true
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
