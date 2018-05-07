/*
* @description: 文章详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="article-content">
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
        <x-button mini plain type="primary" @click.native="onStore">
          <span class="fa fa-user"></span>
          <span>{{$t('Store')}}</span>
        </x-button>
        <!-- <x-button mini plain type="primary" @click.native="onShare">
          <span class="fa fa-share"></span>
          <span>{{$t('Share')}}</span>
        </x-button> -->
      </div>
      <div class="reading-info">
        <span class="font14 color-gray">{{$t('Reading')}} {{article.views | readingCountFormat}}</span>
        <span class="font14 color-gray"><span class="digicon"></span> {{article.dig}}</span>
      </div>
      <div class="qrcode-area">
        <div class="qrcode-bg">
          <div class="qrcode">
            <img src="../assets/_images/fingerprint.gif"/>
            <div class="scan-area">
              <img :src="article.qrcode"/>
            </div>
          </div>
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
    <editor elem="#editor-content" @on-save="editSave" @on-setting="editSetting" @on-delete="editDelete"></editor>
    <comment-popup :show="commentPopupShow" :title="article.title" @on-submit="commentSubmit" @on-cancel="commentPopupCancel"></comment-popup>
    <comment-popup :show="replyPopupShow" :title="$t('Reply Discussion')" @on-submit="replySubmit"  @on-cancel="replyPopupCancel"></comment-popup>
  </div>
</template>
<script>
import { Popup, XButton, Divider } from 'vux'
import TitleTip from '@/components/TitleTip'
import Comment from '@/components/Comment'
import Reply from '@/components/Reply'
import CommentPopup from '@/components/CommentPopup'
import Editor from '@/components/Editor'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Popup,
    XButton,
    Divider,
    TitleTip,
    Comment,
    Reply,
    CommentPopup,
    Editor
  },
  data () {
    return {
      query: Object,
      showsharetip: true,
      commentPopupShow: false,
      replyPopupShow: false,
      notFavorite: true,
      reward: {},
      article: {},
      comments: []
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
      this.commentPopupShow = false
      // let comment = {
      //   userName: 'simon',
      //   userAvatar: '/src/assets/images/user.jpg',
      //   content: value,
      //   date: new Date().getTime(),
      //   diggCount: 0
      // }
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: this.article.id, module: 'news', message: value})
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
      const id = this.$route.params.id
      this.$http.post(`${ENV.BokaApi}/api/moduleInfo`, {id: id, module: 'news'}) // 获取文章
      .then(res => {
        if (res.data.flag) {
          self.article = res.data.data
          self.reward = User.get()
        }
        return self.$http.post(`${ENV.BokaApi}/api/comment/list`, {nid: id, module: 'news'}) // 获取评论
      })
      .then(res => {
        if (res.data) {
          self.comments = res.data
        }
        return self.$http.post(`${ENV.BokaApi}/api/share/news`, {id: self.article.id, title: self.article.title})
      })
      .then(res => {
        if (res.data.flag) {
          let host = self.$util.getHost()
          self.$util.wxShare({
            data: {
              module: 'news',
              moduleid: id,
              link: `${host}/#/news?id=${id}&wid=${self.article.retailerinfo.uid}&share_uid=${self.reward.uid}`,
              title: self.article.seotitle || self.article.title,
              desc: self.article.seodescription,
              photo: self.article.photo
            }
          })
        }
        return self.$http.post(`${ENV.BokaApi}/api/user/favorite/show`, {id: self.article.id, module: 'news'})
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
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/add`, {id: this.article.id, module: 'news'})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Favorite Success'))
          }
        })
      } else {
        this.notFavorite = true
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/delete`, {id: this.article.id, module: 'news'})
        .then(res => {
          if (res.data.flag) {
            self.$vux.toast.text(self.$t('Cancel Favorite'))
          }
        })
      }
    },
    onAdvisory () {

    },
    onStore () {

    },
    onShare () {

    },
    editSave () {

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
    }
  },
  created () {
    const self = this
    this.getData()
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.query = self.$route.query
    if (self.query.newadd) {
      setTimeout(function () {
        self.showsharetip = false
      }, 10000)
    }
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
  background: url(../assets/_images/qrbg.gif);
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
