/*
* @description: 文章详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div class="containerarea font14 bg-white news notop nobottom">
    <template v-if="showContainer">
      <div id="article-content" class="pagemiddle">
        <div v-if="query.newadd && showsharetip" class="sharetiplayer" @click="closeSharetip">
    			<div class="ico"><i class="al al-feiji"></i></div>
    			<div class="txt">点击···，分享给好友或朋友圈吧！</div>
    			<div class="pic">
    				<img src="../assets/images/share1.jpg" />
    			</div>
    		</div>
        <title-tip scroll-box="article-content" :avatar-href="reward.headimgurl" :user-name="reward.linkman" :user-credit="reward.credit"></title-tip>
        <div class="article-view">
          <div class="article-title">
            <h2>{{article.title}}</h2>
          </div>
          <div class="article-vice-title">
            <h4>{{article.vicetitle}}</h4>
          </div>
          <div class="article-info" style="position:relative;">
            <span class="article-date color-gray">{{article.dateline | dateFormat}}</span>
            <span v-if="reward.subscribe != 1" @click="popupSubscribe" class="article-ex color-blue">{{ WeixinName }}</span>
            <router-link v-else to="/subscribeInfo" class="article-ex color-blue">{{ WeixinName }}</router-link>
            <router-link class="article-author" :to="{ name: '', params: {} }">{{article.author}}</router-link>
            <div v-if="retailerInfo.uid" class="align_right" style="position:absolute;right:0;top:50%;margin-top:-12px;">
              <router-link :to="{path: '/store', query: {wid: retailerInfo.uid}}" class="qbtn4 font12" style="padding:1px 8px;">{{ retailerInfo.title }}</router-link>
            </div>
          </div>
          <div id="editor-content" class="article-content" v-html="article.content"></div>
          <div class="operate-area">
            <x-button mini :plain="notFavorite" type="primary" @click.native="onFavorite">
              <span class="fa fa-star-o"></span>
              <span>{{notFavorite ? $t('Favorite') : $t('Has Favorite')}}</span>
            </x-button>
            <x-button v-if="retailerInfo && retailerInfo.uid" mini plain type="primary" @click.native="onAdvisory">
              <span class="fa fa-user"></span>
              <span>{{$t('Advisory')}}</span>
            </x-button>
            <x-button v-if="retailerInfo && retailerInfo.uid" mini plain type="primary" @click.native="onStore">
              <span class="fa fa-user"></span>
              <span>{{$t('Store')}}</span>
            </x-button>
          </div>
          <div class="reading-info">
            <span class="font14 color-gray">{{$t('Reading')}} {{article.views | readingCountFormat}}</span>
            <span class="font14 color-gray" @click="clickDig"><span :class="`digicon ${isdig ? 'diged' : ''}`"></span> {{article.dig}}</span>
          </div>
          <div class="qrcode-area">
            <div class="qrcode-bg">
              <div class="qrcode">
                <img src="../assets/images/fingerprint.gif"/>
                <div class="scan-area">
                  <img v-if="retailerInfo.qrcode" :src="retailerInfo.qrcode">
                  <img v-else :src="WeixinQrcode">
                </div>
              </div>
              <div v-if="retailerInfo.qrcode" class="align_center padding10 bold font16">长按二维码加{{ retailerInfo.linkman }}为好友</div>
            </div>
          </div>
        </div>
        <div class="comment-area">
          <div class="comment-op font14">
            <a @click="onCommentShow"><span class="fa fa-edit"></span> {{$t('Comment')}}</a>
          </div>
          <template v-if="article.comments">
            <divider class="font14 color-gray">{{ $t('Featured Comment') }}</divider>
          </template>
          <comment v-for="(comment, index) in comments" :item="comment" :key="index" :params="{uid: reward.uid, uploader: article.uploader}" @on-delete="onCommentDelete(comment)" @on-reply="onReplyShow">
            <reply slot="replies" v-for="(item, index) in comment.replies" :item="item" :key="index"></reply>
          </comment>
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
      <editor v-if="reward.uid == article.uploader" elem="#editor-content" :query="query" @on-save="editSave" @on-setting="editSetting" @on-delete="editDelete"></editor>
      <comment-popup :show="commentPopupShow" :title="article.title" @on-submit="commentSubmit" @on-cancel="commentPopupCancel"></comment-popup>
      <comment-popup :show="replyPopupShow" :title="$t('Reply Discussion')" @on-submit="replySubmit"  @on-cancel="replyPopupCancel"></comment-popup>
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
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XButton, Divider, TitleTip, Comment, Reply, CommentPopup, Editor, ShareSuccess, Previewer
  },
  data () {
    return {
      query: {},
      WeixinName: ENV.WeixinName,
      module: 'news',
      showContainer: false,
      showShareSuccess: false,
      showsharetip: true,
      commentPopupShow: false,
      replyPopupShow: false,
      notFavorite: true,
      reward: { headimgurl: '/src/assets/images/user.jpg', avatar: '/src/assets/images/user.jpg', linkman: '', credit: 0 },
      article: {},
      retailerInfo: {},
      comments: [],
      showSubscribe: false,
      WeixinQrcode: ENV.WeixinQrcode,
      isdig: 0,
      photoarr: [],
      previewerPhotoarr: [],
      disComments: false,
      commentsArea: null,
      isBindScroll: null,
      pagestart: 0,
      limit: 10
    }
  },
  filters: {
    dateFormat: function (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd')
    },
    readingCountFormat: function (count) {
      return count > 100000 ? '100000+' : count
    }
  },
  watch: {
    isdig: function () {
      return this.isdig
    }
  },
  methods: {
    popupSubscribe () {
      this.showSubscribe = true
    },
    closeSubscribe () {
      this.showSubscribe = false
    },
    closeSharetip () {
      this.showsharetip = false
    },
    onReplyShow () {
      this.replyPopupShow = true
    },
    onCommentShow () {
      this.commentPopupShow = true
    },
    onCommentDelete (comment) {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/comment/delete`, {id: comment.id})
      .then(res => {
        if (res.data.flag) {
          self.$util.deleteItem(self.comments, comment.id)
          self.$vux.toast.text(self.$t('Delete Success'))
        }
      })
    },
    commentPopupCancel () {
      this.commentPopupShow = false
    },
    replyPopupCancel () {
      this.replyPopupShow = false
    },
    commentSubmit (value) { // 留言提交
      const self = this
      this.commentPopupShow = false
      // let comment = {
      //   userName: 'simon',
      //   userAvatar: '/src/assets/images/user.jpg',
      //   content: value,
      //   date: new Date().getTime(),
      //   diggCount: 0
      // }
      self.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: this.article.id, module: self.module, message: value})
      .then(res => {
        self.$vux.loading.hide()
        if (res.data.flag) {
          self.comments.push(res.data.data)
        }
      })
      // this.comments.push(comment)
    },
    replySubmit (value) { // 回复提交
      this.replyPopupShow = false
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: this.article.id, module: 'comments', message: value})
      .then(res => {
        if (res.data.flag) {
          self.comments.replies.push(res.data.data)
        }
      })
    },
    scrollComments: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.commentsArea,
        callback: function () {
          if (self.comments.length === self.pagestart * self.limit) {
            self.$vux.loading.show()
            self.getCommentsList()
            self.pagestart++
          }
        }
      })
    },
    getCommentsList () {
      const self = this
      let params = { nid: self.query.id, module: self.module, pagestart: self.pagestart, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/comment/list`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.comments = self.comments.concat(retdata)
        self.disComments = true
        if (!self.isBindScroll) {
          self.commentsArea = document.querySelector('.news .pagemiddle')
          self.isBindScroll = true
          self.commentsArea.removeEventListener('scroll', self.scrollComments)
          self.commentsArea.addEventListener('scroll', self.scrollComments)
        }
      })
    },
    getData () {
      const self = this
      const id = self.query.id
      let infoparams = { id: id, module: self.module }
      if (self.query.from === 'poster') {
        infoparams.from = 'poster'
      }
      if (self.query.share_uid) {
        infoparams['share_uid'] = self.query.share_uid
      }
      self.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/moduleInfo`, infoparams) // 获取文章
      .then(res => {
        self.$vux.loading.hide()
        if (res.data.flag === 0) {
          self.$router.push('/sos')
          return false
        }
        self.showContainer = true
        if (res.data.flag) {
          self.article = res.data.data
          document.title = self.article.title
          self.reward = User.get()
          self.retailerInfo = self.article.retailerinfo
          self.$util.handleWxShare({
            data: self.article,
            module: self.module,
            moduleid: self.article.id,
            lastshareuid: self.query.share_uid,
            link: `${ENV.Host}/#/news?id=${self.article.id}?wid=${self.article.uploader}&share_uid=${self.reward.uid}`,
            successCallback: function () {
              self.showShareSuccess = true
            }
          })
          return self.$http.get(`${ENV.BokaApi}/api/user/digs/show`, {
            params: {id: id, module: self.module}
          })
        }
      }).then(function (res) {
        self.handleImg()
        if (res) {
          let data = res.data
          if (data.flag === 1) {
            self.isdig = 1
          }
          if (!self.isBindScroll) {
            self.commentsArea = document.querySelector('.news .pagemiddle')
            self.isBindScroll = true
            self.commentsArea.removeEventListener('scroll', self.scrollComments)
            self.commentsArea.addEventListener('scroll', self.scrollComments)
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
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/add`, {id: this.article.id, module: self.module})
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
      this.$router.push({path: '/chat', query: {uid: this.retailerInfo.uid}})
    },
    onStore () {
      this.$router.push({path: '/store', query: {wid: this.retailerInfo.uid}})
    },
    onShare () {
    },
    editSave () {
      const self = this
      let editorContent = document.querySelector('#editor-content')
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/editContent/news`, {
        id: self.query.id,
        content: editorContent.innerHTML
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let toasttype = data.flag !== 1 ? 'warn' : 'success'
        self.$vux.toast.show({
          text: data.error,
          type: toasttype,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.handleImg()
            }
          }
        })
      })
    },
    editSetting () {
      this.$router.push({name: 'tAddNews', params: {id: this.article.id}})
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
        module: 'news'
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
          self.photoarr.push(imgTags[i].getAttribute('src'))
          curimg.removeEventListener('click', function () {
            return self.showBigimg(i)
          })
          curimg.addEventListener('click', function () {
            return self.showBigimg(i)
          })
        }
      }
      self.previewerPhotoarr = self.$util.previewerImgdata(self.photoarr)
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
    createdFun (to, from, next) {
      const self = this
      self.showsharetip = false
      self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      self.query = to.query
      self.getData()
      if (self.query.newadd) {
        setTimeout(function () {
          self.showsharetip = false
        }, 10000)
      }
      next && next()
    }
  },
  created () {
    const self = this
    self.createdFun(self.$route)
  },
  beforeRouteUpdate (to, from, next) {
    const self = this
    self.createdFun(to, from, next)
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
  font-size: 12px !important;
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
  text-align: left;
  position: relative;
  margin: 0 auto;
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
.news .editor{}
</style>
