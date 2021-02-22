
<style lang="less">
.qiye-news{
  .news-view {padding: 10px 15px;background: #ffffff;}
  .news-info {padding: 10px 0;}
  .reading-info {padding: 20px 0;}
  .reading-info span + span {margin-left: 10px;}
  .news-author {margin-left: 6px;color: #1aad19;}
  img {max-width: 100% !important;}
  .qrcode-area{
    text-align:center;margin-top:5px;
    img{display:block;margin:0 auto;width:80%;max-width:300px !important;}
    .txt{color: #659af2;}
  }
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
        <span class="color-gray">{{viewData.dateline | dateFormat}}</span>
        <span class="news-author">{{viewData.author}}</span>
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
      <div class="qrcode-area" v-if="showUser && showUser.uid">
          <img :src="showUser.qrcode" />
      </div>
      <!-- <div class="reading-info">
        <span class="font14 color-gray">阅读 {{viewData.views | readingCountFormat}}</span>
        <span class="font14 color-gray" @click="clickDig"><span :class="`digicon ${isdig ? 'diged' : ''}`"></span> {{viewData.dig}}</span>
      </div> -->
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
// import jQuery from 'jquery'
import { User } from '#/storage'
const jweixin = require('../../static/jweixin')
const jwxwork = require('../../static/jwxwork-1.0.0')

export default {
  directives: { TransferDom },
  components: { Popup, Previewer },
  data () {
    return {
      module: 'news',
      query: {},
      loginUser: {},
      viewData: {},
      isdig: 0,
      photoarr: [],
      previewerPhotoarr: [],
      showUser: {}
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
      let url = `${ENV.BokaApi}/api/user/digs/add`
      if (this.isdig) {
        url = `${ENV.BokaApi}/api/user/digs/delete`
      }
      this.$vux.loading.show()
      this.$http.post(url, {
        id: this.query.id,
        module: 'news'
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        if (data.flag === 1) {
          if (this.isdig) {
            this.isdig = 0
            this.viewData.dig = this.viewData.dig - 1
          } else {
            this.isdig = 1
            this.viewData.dig = this.viewData.dig + 1
          }
        } else {
          this.$vux.toast.show({
            text: data.error,
            type: 'warning',
            time: this.$util.delay(data.error)
          })
        }
      })
    },
    handleShare () {
      let shareLink = `${ENV.Host}/#/qiyeNews?id=${this.viewData.id}&share_uid=${this.loginUser.uid}`
      if (this.wid && this.wid !== '') shareLink = `${shareLink}&wid=${this.wid}`
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
        if (data.flag) {
          const retdata = data.data
          this.loginUser = User.get()
          this.viewData = retdata
          document.title = this.viewData.title
          this.handleImg()
          this.handleShare()
        }
      })
    },
    getShowUser (uid) {
      if (!uid) return false
      this.$http.get(`${ENV.BokaApi}/api/user/show`, {
        params: {otheruid: uid}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          let retdata = data.data
          if (retdata.identity === 2) {
            this.showUser = data.data
          }
        }
      })
    },
    refresh (query) {
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.loginUser.identity !== 2) {
        let wid = this.loginUser.ownid
        if (!wid && this.query.wid) {
          wid = parseInt(this.query.wid)
        }
        this.getShowUser(wid)
      }
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
  activated () {
    this.refresh(this.$route.query)
  }
}
</script>
