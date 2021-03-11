
<style lang="less">
.qiye-news{
  .news-view {padding: 10px 15px;background: #ffffff;}
  .news-info {padding: 10px 0;}
  .reading-info {padding: 20px 0;}
  .reading-info span + span {margin-left: 10px;}
  img {max-width: 100% !important;}
}
</style>
<template>
  <div class="containerarea bg-white qiye-news">
    <div class="news-view">
      <div class="news-title">
        <h2>{{viewData.title}}</h2>
      </div>
      <div class="news-vice-title">
        <h4>{{viewData.vicetitle}}</h4>
      </div>
      <div class="news-info" style="position:relative;">
        <span style="color:#659af2;">{{sysParams.company_short}}</span>
        <span class="color-gray" :style="`${sysParams.company_short && sysParams.company_short != '' ? 'margin-left:6px;' : ''}`">{{viewData.dateline | dateFormat}}</span>
      </div>
      <template v-if="viewData && viewData.id">
        <video
          style="max-width:100%;"
          v-if="viewData.video && viewData.video != ''"
          ref="newsVideo"
          :src="viewData.video"
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
        <div v-if="viewData.c_format == 'json'" class="news-content">
          <template v-for="(item, index) in viewData.content">
            <div v-if="item.content && item.content != ''" class="padding10">{{item.content}}</div>
            <template v-for="(photo,index1) in item.photo" index="index1" item="photo">
              <div class="flex_center">
                <img :src="photo" style="max-width:100%;"/>
              </div>
            </template>
          </template>
        </div>
        <template v-else>
          <div class="news-content" v-html="viewData.content"></div>
        </template>
      </template>
      <template v-if="afterLoad && showUser && showUser.uid">
        <StaffQrcode :user.sync="showUser" :sysParams.sync="sysParams"></StaffQrcode>
      </template>
      <div class="reading-info">
        <span class="font14 color-gray">阅读 {{viewData.views | readingCountFormat}}</span>
        <span class="font14 color-gray" @click="clickDig"><span :class="`digicon ${isdig ? 'diged' : ''}`"></span> {{viewData.dig}}</span>
      </div>
      <div class="mt10 flex_center" v-if="isQywx">
        <div class="flex_center font12" style="width:100px;height:25px;background-color:#659af2;color:#fff;border-radius:60px;" @click="toShare">分享给客户</div>
        <div class="flex_center font12 ml10" style="width:100px;height:25px;background-color:#659af2;color:#fff;border-radius:60px;" @click="toShare">分享到客户群</div>
      </div>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
    </div>
  </div>
</template>
<script>
import { Popup, TransferDom, Previewer } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User, SystemParams } from '#/storage'
import StaffQrcode from '@/components/StaffQrcode'

export default {
  directives: { TransferDom },
  components: { Popup, Previewer, StaffQrcode },
  data () {
    return {
      module: 'news',
      query: {},
      loginUser: {},
      viewData: {},
      isdig: false,
      photoarr: [],
      previewerPhotoarr: [],
      showUser: {},
      ing: false,
      sysParams: {},
      shareWid: 0,
      afterLoad: false,
      isPC: false,
      isQywx: false,
      shareParams: {}
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd')
    },
    readingCountFormat (count) {
      return count > 100000 ? '100000+' : count
    }
  },
  watch: {
    isdig () {
      return this.isdig
    }
  },
  methods: {
    toShare () {
      wx.invoke('shareToExternalChat', {
        title: this.viewData.title,
        desc: this.viewData.summary,
        link: this.shareParams.shareLink,
        imgUrl: this.viewData.photo.split(',')[0],
        success: function (res) {
        }
      })
    },
    toShareGroup () {
      wx.invoke('shareToExternalContact', {
        title: this.viewData.title,
        desc: this.viewData.summary,
        link: this.shareParams.shareLink,
        imgUrl: this.viewData.photo.split(',')[0],
        success: function (res) {
        }
      })
    },
    handleImg () {
      this.photoarr = []
      this.previewerPhotoarr = []
      let imgInterval = setInterval(() => {
        if (document.querySelectorAll('.qiye-news .news-content').length) {
          clearInterval(imgInterval)
          let imgTags = document.querySelectorAll('.qiye-news .news-content img')
          if (imgTags.length) {
            for (let i = 0; i < imgTags.length; i++) {
              let curimg = imgTags[i]
              this.photoarr.push(imgTags[i].getAttribute('src'))
              curimg.removeEventListener('click', this.clickImg)
              curimg.addEventListener('click', this.clickImg)
            }
          }
          this.previewerPhotoarr = this.$util.previewerImgdata(this.photoarr)
        }
      }, 100)
    },
    clickImg (event) {
      const node = event.target
      const src = node.getAttribute('src')
      let index = 0
      for (let i = 0; i < this.photoarr.length; i++) {
        if (this.photoarr[i] === src) {
          index = i
          break
        }
      }
      this.showBigimg(index)
    },
    showBigimg (index) {
      if (this.$util.isPC()) {
        this.$refs.previewer.show(index)
      } else {
        if (window.WeixinJSBridge) {
          window.WeixinJSBridge.invoke('imagePreview', {
            current: this.photoarr[index],
            urls: this.photoarr
          })
        }
      }
    },
    clickDig () {
      if (this.ing) return false
      this.ing = true
      let postParams = {id: this.query.id, module: this.module, action: 'add'}
      if (this.isdig) {
        postParams.action = 'delete'
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/content/digs`, postParams).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.ing = false
        if (data.code === 0) {
          if (this.isdig) {
            this.isdig = 0
            this.viewData.dig = this.viewData.dig - 1
          } else {
            this.isdig = 1
            this.viewData.dig = this.viewData.dig + 1
          }
        } else {
          this.$vux.toast.show({
            text: data.msg,
            type: 'text',
            time: this.$util.delay(data.msg)
          })
        }
      })
    },
    getDig () {
      this.$http.post(`${ENV.BokaApi}/api/content/digs`, {
        id: this.query.id, module: this.module, action: 'show'
      }).then(res => {
        let data = res.data
        if (data.code === 0) {
          this.isdig = true
        }
      })
    },
    handleShare () {
      let shareLink = `${ENV.Host}/#/qiyeNews?id=${this.viewData.id}&share_uid=${this.loginUser.uid}`
      if (this.shareWid && this.shareWid !== '') shareLink = `${shareLink}&wid=${this.shareWid}`
      let shareParams = {
        data: this.viewData,
        module: this.module,
        moduleid: this.viewData.id,
        link: shareLink
      }
      if (this.query.share_uid) {
        shareParams.link = `${shareParams.link}&lastshareuid=${this.query.share_uid}`
        shareParams.lastshareuid = this.query.share_uid
      }
      this.shareParams = shareParams
      this.$util.handleWxShare(shareParams)
    },
    getData () {
      const infoparams = {id: this.query.id, module: 'news', addviews: 1}
      if (this.query['share_uid']) {
        infoparams['share_uid'] = this.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/content/info`, infoparams) // 获取文章
      .then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.code === 0) {
          const retdata = data.data
          this.loginUser = User.get()
          this.viewData = retdata
          document.title = this.viewData.title
          this.handleImg()
          this.handleShare()
          this.getDig()
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
    refresh (query) {
      this.loginUser = User.get()
      this.sysParams = SystemParams.get()
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
      this.getData()
    }
  },
  activated () {
    this.refresh(this.$route.query)
  }
}
</script>
