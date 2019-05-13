/*
* @description: 文章详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div :class="`containerarea font14 bg-white news notop ${loginUser.isretailer ? '' : 'nobottom'}`">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div id="article-content" class="pagemiddle">
        <div class="article-view">
          <div class="article-title">
            <h2>{{article.title}}</h2>
            <div class="flex_right mt5 mb5" v-if="editIng && article.uploader == reward.uid">
              <router-link :to="{path:'/addFactoryNews',query:{id: query.id,fid:query.fid,callback: 'edit'}}" class="flex_center bg-theme color-white" style="border-radius:20px;height:25px;width:90px;">修改标题</router-link>
            </div>
          </div>
          <div class="article-vice-title">
            <h4>{{article.vicetitle}}</h4>
          </div>
          <div class="article-info" style="position:relative;">
            <span class="article-date color-gray">{{article.dateline | dateFormat}}</span>
            <span v-if="reward.subscribe != 1" @click="popupSubscribe" class="article-ex color-blue">{{ WeixinName }}</span>
            <router-link v-else to="/subscribeInfo" class="article-ex color-blue">{{ WeixinName }}</router-link>
            <router-link class="article-author" :to="{ name: '', params: {} }">{{article.author}}</router-link>
          </div>
          <template v-if="showArticle">
            <template v-if="article.uploader == reward.uid">
              <div id="editor-content" :class="`article-content ${article.content == '' ? 'color-gray font16' : ''}`">
                <p v-if="article.content == '' && !afterEdit">文章内容为空，点击【编辑】按钮可修改内容哦！</p>
                <div v-else v-html="article.content"></div>
              </div>
            </template>
            <template v-else>
              <div class="article-content" v-html="article.content"></div>
            </template>
          </template>
          <div class="reading-info">
            <span class="font14 color-gray">{{$t('Reading')}} {{article.views | readingCountFormat}}</span>
            <span class="font14 color-gray" @click="clickDig"><span :class="`digicon ${isdig ? 'diged' : ''}`"></span> {{article.dig}}</span>
          </div>
        </div>
      </div>
      <div v-if="loginUser.isretailer" class="pagebottom list-shadow flex_center bg-white pl12 pr12 border-box">
        <div class="align_center flex_center flex_cell">
          <div class="flex_cell flex_center btn-bottom-red" v-if="article.haveimport" >已导入</div>
          <div class="flex_cell flex_center btn-bottom-red" v-else @click="importEvent">导入到我的文章</div>
        </div>
      </div>
      <share-success
        v-show="showShareSuccess"
        v-if="article.uploader == reward.uid || query.wid == reward.uid || article.identity != 'user'"
        :data="article"
        :loginUser="reward"
        :module="module"
        :on-close="closeShareSuccess">
      </share-success>
      <editor v-if="reward.uid == article.uploader && showEditor" elem="#editor-content" module="factorynews" :loginUser="loginUser" :query="query" @on-edit="clickEdit" @on-auto-save="autoSave" @on-save="editSave" @on-setting="editSetting" @on-delete="editDelete"></editor>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showSubscribe" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">关注</div>
            <div class="popup-middle font14 flex_center">
          			<img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeSubscribe">{{ $t('Close') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
      </div>
    </template>
  </div>
</template>
<script>
import { Popup, TransferDom, XButton, Divider, Previewer } from 'vux'
import TitleTip from '@/components/TitleTip'
import Comment from '@/components/Comment'
import Reply from '@/components/Reply'
import CommentPopup from '@/components/CommentPopup'
import Editor from '@/components/Editor'
import ShareSuccess from '@/components/ShareSuccess'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import jQuery from 'jquery'
import { User } from '#/storage'
import Socket from '#/socket'

let room = ''
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XButton, Divider, TitleTip, Comment, Reply, CommentPopup, Editor, ShareSuccess, Previewer, Sos
  },
  data () {
    return {
      module: 'factorynews',
      query: {},
      loginUser: {},
      WeixinName: ENV.WeixinName,
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      showShareSuccess: false,
      reward: { headimgurl: 'https://tossharingsales.boka.cn/images/user.jpg', avatar: 'https://tossharingsales.boka.cn/images/user.jpg', linkman: '', credit: 0 },
      article: {},
      retailerInfo: {},
      showSubscribe: false,
      WeixinQrcode: ENV.WeixinQrcode,
      isdig: 0,
      photoarr: [],
      previewerPhotoarr: [],
      messages: 0,
      topcss: '',
      showEditor: false,
      showArticle: false,
      editIng: false,
      afterEdit: false
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
    access () {
      this.$util.wxAccess()
    },
    clickEdit () {
      this.editIng = true
    },
    clickInsertProduct (url) {
      this.$router.push(url)
    },
    popupSubscribe () {
      this.showSubscribe = true
    },
    closeSubscribe () {
      this.showSubscribe = false
    },
    clickProduct (event) {
      const self = this
      let node = event.target
      while (node) {
        if (node.nodeType === 1 && node.getAttribute('class').indexOf('insertproduct') > -1) {
          const linkurl = node.getAttribute('linkurl')
          if (linkurl) {
            self.$router.push(linkurl)
          }
          break
        }
        node = node.parentNode
      }
    },
    importNews () {
      const self = this
      self.$vux.confirm.show({
        content: '确定要导入到我的文章吗？',
        onConfirm: () => {
          self.$vux.loading.show()
          let params = {id: self.query.id}
          if (self.query.wid) {
            params.wid = self.query.wid
          }
          self.$http.post(`${ENV.BokaApi}/api/factory/importFactoryNews`, params).then(res => {
            let data = res.data
            self.$vux.loading.hide()
            if (data.flag) {
              self.article.haveimport = 1
            }
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
          })
        }
      })
    },
    importEvent () {
      const self = this
      if (self.loginUser.isretailer === 2) {
        self.$vux.loading.show()
        this.$http.get(`${ENV.BokaApi}/api/list/news?from=retailer`, {
          params: { pagestart: 0, limit: 5 }
        }).then(res => {
          self.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          if (retdata.length < 5) {
            self.importNews()
          } else {
            self.openVip()
          }
        })
      } else if (self.loginUser.isretailer === 1) {
        self.importNews()
      }
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipNews,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    getData () {
      const self = this
      const id = this.query.id
      const infoparams = { id: id, module: this.module, fid: self.query.fid }
      if (this.query.from === 'poster') {
        infoparams.from = 'poster'
      }
      if (this.query['share_uid']) {
        infoparams['share_uid'] = self.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/moduleInfo`, infoparams) // 获取文章
      .then(res => {
        const data = res.data
        if (!isNaN(data.flag)) {
          self.$vux.loading.hide()
          if (data.flag !== 1) {
            self.sosTitle = data.error
            self.showSos = true
            return false
          }
          if (res.data.flag) {
            self.reward = User.get()
            self.article = res.data.data
            self.showArticle = true
            self.showEditor = true
            document.title = self.article.title
            self.retailerInfo = self.article.retailerinfo
            let shareParams = {
              data: self.article,
              module: self.module,
              moduleid: self.article.id,
              link: `${ENV.Host}/#/factorynews?id=${self.article.id}&fid=${self.article.fid}&share_uid=${self.reward.uid}`,
              successCallback: function () {
                self.showShareSuccess = true
              }
            }
            if (self.query.share_uid) {
              shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
              shareParams.lastshareuid = self.query.share_uid
            }
            self.$util.handleWxShare(shareParams)
            self.showContainer = true
            if (self.article.identity !== 'retailer') {
              self.topcss = 'nobottom'
            }
            return self.$http.get(`${ENV.BokaApi}/api/user/digs/show`, {
              params: {id: id, module: self.module}
            })
          }
        }
      })
      .then(res => {
        if (res) {
          if (self.reward.uid !== self.article.uploader) {
            let items = document.querySelectorAll('.insertproduct')
            for (let i = 0; i < items.length; i++) {
              let cur = items[i]
              cur.addEventListener('click', self.clickProduct)
            }
          }
          self.handleImg()
          const data = res.data
          if (data.flag === 1) {
            self.isdig = 1
          }
          return self.$http.post(`${ENV.BokaApi}/api/user/favorite/show`, {id: self.article.id, module: self.module})
        }
      })
      .then(res => {
        if (res) {
          if (res.data.flag < 1) {
            self.notFavorite = true
          } else {
            self.notFavorite = false
          }
        }
      })
    },
    onFavorite () {
      const self = this
      if (this.notFavorite) {
        this.notFavorite = false
        let cururl = `/factorynews?id=${self.query.id}`
        if (self.query.wid) {
          cururl = `${cururl}&wid=${self.query.wid}`
        }
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/add`, {id: this.article.id, module: self.module, wid: this.article.uploader, currenturl: encodeURIComponent(cururl)})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Favorite Success'))
          }
        })
      } else {
        this.notFavorite = true
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: this.article.id, module: self.module})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Cancel Favorite'))
          }
        })
      }
    },
    onAdvisory () {
      if (this.loginUser.subscribe === 0) {
        // this.$util.wxAccess()
        const originHref = encodeURIComponent(`${ENV.Host}/#/chat?uid=${this.retailerInfo.uid}&fromModule=factorynews&fromId=${this.query.id}`)
        const callbackHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${callbackHref}&response_type=code&scope=snsapi_userinfo&state=${originHref}#wechat_redirect`)
      } else {
        this.$router.push({path: '/chat', query: {uid: this.retailerInfo.uid, fromModule: 'factorynews', fromId: this.query.id, from: this.query.from}})
      }
    },
    onStore () {
      this.$router.push({path: '/store', query: {wid: this.retailerInfo.uid}})
    },
    onShare () {
    },
    save (callback) {
      const self = this
      let editorContent = document.querySelector('#editor-content')
      self.$vux.loading.show()
      let con = editorContent.innerHTML.replace('文章内容为空，点击【编辑】按钮可修改内容哦！', '')
      self.$http.post(`${ENV.BokaApi}/api/editContent/factorynews`, {
        id: self.query.id,
        content: con
      }).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let toasttype = data.flag !== 1 ? 'warn' : 'success'
        self.$vux.toast.show({
          text: data.error,
          type: toasttype,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.afterEdit = true
              self.handleImg()
              callback && callback()
            }
          }
        })
      })
    },
    autoSave () {
      this.save()
    },
    editSave () {
      this.editIng = false
      this.save()
    },
    editSetting () {
      this.$router.push({name: 'tAddFacotryNews', params: {id: this.article.id, fid: this.article.fid}})
    },
    editDelete () {
      this.$vux.confirm.show({
        title: this.$t('Delete Article Confirm'),
        onCancel () {},
        onConfirm () {}
      })
    },
    closeShareSuccess () {
      this.showShareSuccess = false
    },
    clickDig () {
      const self = this
      let url = `${ENV.BokaApi}/api/user/digs/add`
      if (self.isdig) {
        url = `${ENV.BokaApi}/api/user/digs/delete`
      }
      self.$vux.loading.show()
      self.$http.post(url, {
        id: self.query.id,
        module: 'factorynews'
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          if (self.isdig) {
            self.isdig = 0
            self.article.dig = self.article.dig - 1
          } else {
            self.isdig = 1
            self.article.dig = self.article.dig + 1
          }
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warning',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    handleImg () {
      const self = this
      self.photoarr = []
      self.previewerPhotoarr = []
      let imgTags = document.querySelectorAll('.news .article-content img')
      if (imgTags.length > 0) {
        for (let i = 0; i < imgTags.length; i++) {
          let curimg = imgTags[i]
          if (jQuery(curimg).parents('.insertproduct').length === 0) {
            self.photoarr.push(imgTags[i].getAttribute('src'))
            curimg.removeEventListener('click', self.clickImg)
            curimg.addEventListener('click', self.clickImg)
          }
        }
      }
      self.previewerPhotoarr = self.$util.previewerImgdata(self.photoarr)
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
      const self = this
      if (!document.querySelector('.Eleditor-area')) {
        if (self.$util.isPC()) {
          self.$refs.previewer.show(index)
        } else {
          window.WeixinJSBridge.invoke('imagePreview', {
            current: self.photoarr[index],
            urls: self.photoarr
          })
        }
      }
    },
    toStore () {
      const self = this
      self.$router.push({path: '/store', query: {wid: self.retailerInfo.uid}})
    },
    createSocket () {
      const uid = this.loginUser.uid
      const linkman = this.loginUser.linkman
      // const fromId = this.query.fromId
      room = `${this.module}-${this.query.id}`
      Socket.listening({room: room, uid: uid, linkman: linkman, fromModule: this.module, fromId: this.query.id})
    },
    init () {
      this.$util.wxAccessListening()
    },
    refresh (query) {
      const self = this
      this.loginUser = User.get()
      this.showArticle = false
      this.showEditor = false
      this.editIng = false
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      if (this.query.id !== query.id) {
        self.showSos = false
        self.showContainer = false
        room = ''
        this.query = query
      }
      this.getData()
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh(this.$route.query)
  }
}
</script>
<style lang="less">
#article-content .article-view {
  padding: 10px 15px;
  background: #ffffff;
}
#article-content .article-info {
  padding: 10px 0;
}
#article-content .operate-area {
  text-align: center;
}
#article-content .operate-area span {
  vertical-align: middle;
  font-size: 12px;
  line-height: 16px;
}
#article-content .reading-info {
  padding: 20px 0;
}
#article-content .reading-info span + span {
  margin-left: 10px;
}
#article-content .article-author {
  margin-left: 6px;
  color: #1aad19;
}
#article-content .qrcode-area {
  padding: 15px;
  position: relative;
  vertical-align: middle;
  background: url(../assets/images/qrbg.gif);
}
#article-content .qrcode-bg {
  margin: 0 auto;
  box-shadow: 1px 0 5px #868181;
  background-color: #fff;
}
#article-content .qrcode {
  text-align: center;
  position: relative;
  margin: 0 auto;
  display: block;
}
#article-content .qrcode>img {
  width: 100%;
}
#article-content .scan-area {
  width: 50%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  vertical-align: middle;
}
#article-content .scan-area img {
  max-width: 100%;
  height: 100%;
  vertical-align: middle;
  display: block;
  margin:0 auto;
}
#article-content .comment-area {
  padding: 20px 15px;
}
#article-content .comment-op {
  text-align: right;
  color: #1aad19;
}
#editor-content {
  overflow: hidden;
}
#editor-content img {
  max-width: 100% !important;
}

/* vui css hack */
#article-content .weui-btn_mini {
  padding: 0 13px;
}


.news .insertproduct{
  display:block;padding:5px !important;position:relative;text-indent: 0 !important;
  color:inherit !important;border:#e3e3e3 1px solid !important;border-radius:5px !important;
}
.news .insertproduct img{vertical-align: middle !important;}
.news .insertproduct .iteminfo{
  text-align:right;position:absolute;color:#fff;padding-left:10px;padding-right:10px;
  font-size:12px;
  bottom: 15px;right: 9px;border-radius: 15px;background-image: linear-gradient(90deg, #f26f12 0%, #fa3f06 99%);
}
.news .weui-btn_mini{border: 1px solid #1aad19 !important;}
.news .weui-btn_plain-primary{border:0px;}
.news .weui-btn:after{display: none;}
.news .editor{}
</style>
