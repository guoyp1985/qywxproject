/*
* @description: 知识库详情页
* @auther: gyp
* @created_date: 2018-05-05
*/
<template>
  <div id="article-content" class="containerarea">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <title-tip scroll-box="article-content" :avatar-href="reward.headimgurl" :user-name="reward.linkman" :user-credit="reward.credit"></title-tip>
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
          <x-button mini plain type="primary" @click.native="onAdvisory">
            <span class="fa fa-user"></span>
            <span>{{$t('Advisory')}}</span>
          </x-button>
        </div>
        <div class="reading-info">
          <span class="font14 color-gray">{{$t('Reading')}} {{article.views | readingCountFormat}}</span>
          <span class="font14 color-gray"><span class="digicon"></span> {{article.dig}}</span>
        </div>
      </div>
      <div class="comment-area">
        <div class="comment-op font14">
          <a @click="onCommentShow"><span class="fa fa-edit"></span> {{$t('Comment')}}</a>
        </div>
        <template v-if="article.comments">
          <divider class="font14 color-gray">{{ $t('Featured Comment') }}</divider>
        </template>
        <comment v-if="comments.length > 0" v-for="(comment, index) in comments" :item="comment" :key="index" :params="{uid: reward.uid, uploader: article.uploader}" @on-delete="onCommentDelete(comment)" @on-reply="onReplyShow">
          <reply slot="replies" v-for="(item, index) in comment.replies" :item="item" :key="index"></reply>
        </comment>
      </div>
      <comment-popup :show="commentPopupShow" :title="article.title" @on-submit="commentSubmit" @on-cancel="commentPopupCancel"></comment-popup>
      <comment-popup :show="replyPopupShow" :title="$t('Reply Discussion')" @on-submit="replySubmit"  @on-cancel="replyPopupCancel"></comment-popup>
    </template>
  </div>
</template>
<script>
import { Popup, XButton, Divider } from 'vux'
import TitleTip from '@/components/TitleTip'
import Comment from '@/components/Comment'
import Reply from '@/components/Reply'
import CommentPopup from '@/components/CommentPopup'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Socket from '#/socket'

export default {
  components: {
    Popup, XButton, Divider, TitleTip, Comment, Reply, CommentPopup, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      showContainer: false,
      doCreated: false,
      query: {},
      loginUser: {},
      showsharetip: true,
      commentPopupShow: false,
      replyPopupShow: false,
      notFavorite: true,
      reward: {},
      article: {},
      comments: [],
      roomid: ''
      // socket: BkSocket.get()
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
      console.log(value)
      this.commentPopupShow = false
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: this.article.id, module: 'knowledge', message: value})
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
      this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, { params: { id: self.query.id, module: 'knowledge' } }) // 获取文章
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
          self.$util.wxShare({
            data: {
              title: self.article.seotitle || self.article.title,
              desc: self.article.seodescription || self.article.seotitle || self.article.title,
              link: `${ENV.Host}/#/knowledge?id=${self.article.id}&share_uid=${self.reward.uid}`,
              photo: self.article.photo.split(',')[0]
            }
          })
        }
        return self.$http.post(`${ENV.BokaApi}/api/comment/list`, {nid: id, module: 'knowledge'}) // 获取评论
      })
      .then(res => {
        if (res.data) {
          self.comments = res.data
        }
        return self.$http.post(`${ENV.BokaApi}/api/user/favorite/show`, {id: self.article.id, module: 'knowledge'})
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
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/add`, {id: this.article.id, module: 'knowledge'})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Favorite Success'))
          }
        })
      } else {
        this.notFavorite = true
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: this.article.id, module: 'knowledge'})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Cancel Favorite'))
          }
        })
      }
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
    // wsConnect () {
    //   const self = this
    //   self.roomid = `${ENV.SocketBokaApi}-knowledge-${self.query.id}`
    //   Roomid.set(self.roomid)
    //   if (!self.socket || !self.socket.url) {
    //     self.socket = new WebSocket(ENV.SocketApi)
    //     BkSocket.set(self.socket)
    //   }
    //   self.socket.onopen = function () {
    //     let loginData = {
    //       type: 'login',
    //       uid: self.loginUser.uid,
    //       client_name: self.loginUser.linkman.replace(/"/g, '\\"'),
    //       room_id: self.roomid
    //     }
    //     self.socket.send(JSON.stringify(loginData))
    //   }
    //   self.socket.onmessage = function (e) {
    //     const data = JSON.parse(e.data)
    //     if (data.type === 'login') {
    //       console.log('in login')
    //     } else if (data.type === 'logout') {
    //       console.log('in logout')
    //     } else if (data.type === 'say') {
    //       console.log('say')
    //       let edata = JSON.parse(e.data)
    //       let saycontent = edata.content
    //       if (!self.$util.isNull(saycontent)) {
    //         saycontent = saycontent.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, '\'')
    //       }
    //       let saydata = {
    //         uid: edata.from_uid,
    //         content: saycontent,
    //         dateline: edata.time,
    //         msgtype: edata.msgtype ? edata.msgtype : 'text',
    //         picurl: edata.picurl ? edata.picurl : '',
    //         thumb: edata.thumb ? edata.thumb : '',
    //         username: edata.from_client_name,
    //         id: edata.msgid,
    //         roomid: edata.room_id,
    //         avatar: edata.avatar,
    //         newsdata: edata.newsdata
    //       }
    //     }
    //   }
    //   self.socket.onclose = function () {
    //     console.log('ws closed')
    //     self.wsConnect()
    //   }
    //   self.socket.onerror = function () {
    //     console.log('ws error')
    //   }
    // },
    createSocket () {
      const uid = this.loginUser.uid
      const linkman = this.loginUser.linkman
      const room = this.query.id
      Socket.create()
      Socket.listening(room, uid, linkman)
    },
    init () {
      this.loginUser = User.get()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.getData()
      this.createSocket()
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  },
  deactivated () {
    Socket.destory()
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

/* vui css hack */
#article-content .weui-btn_mini {
  padding: 0 13px;
}
</style>
