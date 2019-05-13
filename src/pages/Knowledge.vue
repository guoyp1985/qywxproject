/*
* @description: 知识库详情页
* @auther: gyp
* @created_date: 2018-05-05
*/
<template>
  <div class="containerarea font14 bg-white notop nobottom news">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div id="article-content" class="pagemiddle" ref="scrollContainer" @scroll="handleScroll">
        <title-tip scroll-box="article-content" @access="access" :user="reward" :messages="messages" :avatar-href="reward.avatar" :user-name="reward.linkman" :user-credit="reward.credit"></title-tip>
        <div class="article-view">
          <div class="article-title">
            <h2>{{article.title}}</h2>
          </div>
          <div class="article-vice-title">
            <h4>{{article.vicetitle}}</h4>
          </div>
          <div class="article-info font14">
            <span class="article-date color-gray">{{article.dateline | dateFormat}}</span>
            <span class="article-ex"></span>
            <router-link class="article-author" :to="{ name: '', params: {} }">{{article.author}}</router-link>
          </div>
          <div id="editor-content" class="article-content" v-html="article.content"></div>
          <div class="operate-area">
            <x-button mini :plain="notFavorite" type="primary" @click.native="onFavorite">
              <span class="fa fa-star-o"></span>
              <span>{{notFavorite ? $t('Favorite') : $t('Has Favorite')}}</span>
            </x-button>
          </div>
          <div class="reading-info">
            <span class="font14 color-gray">{{$t('Reading')}} {{article.views | readingCountFormat}}</span>
            <span class="font14 color-gray" @click="clickDig"><span :class="`digicon ${isdig ? 'diged' : ''}`"></span> {{article.dig}}</span>
          </div>
        </div>
        <!--
        <div class="comment-area">
          <div class="comment-op font14">
            <a @click="onCommentShow"><span class="fa fa-edit"></span> {{$t('Comment')}}</a>
          </div>
          <template v-if="article.comments">
            <divider class="font14 color-gray">{{ $t('Featured Comment') }}</divider>
          </template>
          <comment v-for="(comment, index) in comments" :item="comment" :key="index" :params="{uid: reward.uid, uploader: article.uploader, commentuid: comment.uid}" @on-delete="onCommentDelete(comment)" @on-reply="onReplyShow(comment)">
            <reply slot="replies" v-for="(item, index1) in comment.comment" :item="item" :key="index1"></reply>
          </comment>
        </div>
      -->
        <share-success
          v-show="showShareSuccess"
          v-if="article.uploader == reward.uid || query.wid == reward.uid || article.identity != 'user'"
          :data="article"
          :loginUser="reward"
          :module="module"
          :on-close="closeShareSuccess">
        </share-success>
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
    Popup, XButton, Divider, TitleTip, Comment, Reply, CommentPopup, ShareSuccess, Previewer, Sos
  },
  data () {
    return {
      module: 'knowledge',
      query: {},
      loginUser: {},
      WeixinName: ENV.WeixinName,
      showSos: false,
      sosTitle: '',
      showContainer: false,
      showShareSuccess: false,
      showsharetip: true,
      commentPopupShow: false,
      replyPopupShow: false,
      notFavorite: true,
      reward: { headimgurl: 'https://tossharingsales.boka.cn/images/user.jpg', avatar: 'https://tossharingsales.boka.cn/images/user.jpg', linkman: '', credit: 0 },
      article: {},
      comments: [],
      showSubscribe: false,
      WeixinQrcode: ENV.WeixinQrcode,
      isdig: 0,
      photoarr: [],
      previewerPhotoarr: [],
      pagestart: 0,
      limit: 20,
      replyData: null,
      messages: 0
    }
  },
  filters: {
    dateFormat: function (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    readingCountFormat: function (count) {
      return count > 100000 ? '100000+' : count
    }
  },
  methods: {
    access () {
      this.$util.wxAccess()
    },
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
    commentPopupCancel () {
      this.commentPopupShow = false
    },
    replyPopupCancel () {
      this.replyPopupShow = false
    },
    commentSubmit (value) { // 留言提交
      console.log(value)
      this.commentPopupShow = false
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: this.article.id, module: this.module, message: value})
      .then(res => {
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
    getData () {
      const self = this
      const id = self.query.id
      this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, { params: { id: self.query.id, module: this.module } }) // 获取文章
      .then(res => {
        let data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.article = res.data.data
          document.title = self.article.title
          self.$util.wxShare({
            data: {
              title: self.article.seotitle || self.article.title,
              desc: self.article.seodescription || self.article.seotitle || self.article.title,
              link: `${ENV.Host}/#/knowledge?id=${self.article.id}&share_uid=${self.reward.uid}`,
              photo: self.article.photo.split(',')[0]
            }
          })
          return self.$http.get(`${ENV.BokaApi}/api/user/digs/show`, {
            params: {id: id, module: self.module}
          })
        }
      })
      .then(res => {
        if (res) {
          self.handleImg()
          const data = res.data
          if (data.flag === 1) {
            self.isdig = 1
          }
          return self.$http.post(`${ENV.BokaApi}/api/user/favorite/show`, {id: self.article.id, module: self.module})
        }
      })
      .then(res => {
        if (res.data.flag < 1) {
          self.notFavorite = true
        } else {
          self.notFavorite = false
        }
      })
    },
    onFavorite () {
      const self = this
      if (this.notFavorite) {
        this.notFavorite = false
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/add`, {id: this.article.id, module: this.module, wid: this.article.uploader})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Favorite Success'))
          }
        })
      } else {
        this.notFavorite = true
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: this.article.id, module: this.module})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Cancel Favorite'))
          }
        })
      }
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
        module: 'knowledge'
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
    editSetting () {
      this.$router.push({name: 'tArticleInfoEdit', params: {id: this.article.id}})
    },
    editDelete () {
      this.$vux.confirm.show({
        title: this.$t('Delete Article Confirm'),
        onCancel () {},
        onConfirm () {}
      })
    },
    onCommentDelete (comment) {
      const self = this
      self.$vux.confirm.show({
        title: '确定要删除该评论吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/comment/delete`, {id: comment.id})
          .then(res => {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.$util.deleteItem(self.comments, comment.id)
                }
              }
            })
          })
        }
      })
    },
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
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
        for (let i = 0; i < retdata.length; i++) {
          if (!retdata[i].comment) {
            retdata[i].comment = []
          }
        }
        self.comments = self.comments.concat(retdata)
        // self.disComments = true
      })
    },
    closeShareSuccess () {
      this.showShareSuccess = false
    },
    handleImg () {
      const self = this
      self.photoarr = []
      self.previewerPhotoarr = []
      // let imgTags = document.querySelectorAll('.news .article-content img')
      let imgTags = self.$refs.scrollContainer.querySelectorAll('.article-content img')
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
    refresh () {
      const self = this
      this.loginUser = User.get()
      this.reward = this.loginUser
      if (this.query.id !== this.$route.query.id) {
        this.query = this.$route.query
        this.getData()
      }
      this.$http.get(`${ENV.BokaApi}/api/message/newMessages`).then(function (res) {
        let data = res.data
        self.messages = data.data
      })
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.createSocket()
    }
  },
  activated () {
    this.refresh()
  }
  // beforeRouteLeave (to, from, next) {
  //   Socket.destory(room)
  //   next()
  // }
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

/* vui css hack */
#article-content .weui-btn_mini {
  padding: 0 13px;
}
</style>
