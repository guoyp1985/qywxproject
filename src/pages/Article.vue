/*
* @description: 文章详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="article-content">
    <title-tip scroll-box="article-content" :avatar-href="reward.headimgurl" :user-name="reward.linkman" :user-credit="reward.credit"></title-tip>
    <view-box>
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
        <div class="article-content" v-html="article.content"></div>
        <div class="operate-area">
          <x-button mini plain type="primary" @click.native="onFavorite">
            <span class="fa fa-star-o"></span>
            <span>{{$t('Favorite')}}</span>
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
        <comment v-for="(comment, index) in article.comments" :item="comment" :key="index" @on-reply="onReplyShow">
          <reply slot="replies" v-for="(item, index) in comment.replies" :item="item" :key="index"></reply>
        </comment>
      </div>
    </view-box>
    <comment-popup :show="commentPopupShow" :title="article.title" @on-submit="commentSubmit" @on-cancel="commentPopupCancel"></comment-popup>
    <comment-popup :show="replyPopupShow" :title="$t('Reply Discussion')" @on-submit="replySubmit"  @on-cancel="replyPopupCancel"></comment-popup>
  </div>
</template>
<script>
import { ViewBox, Popup, XButton, Divider } from 'vux'
import TitleTip from '@/components/TitleTip'
import Comment from '@/components/Comment'
import Reply from '@/components/Reply'
import CommentPopup from '@/components/CommentPopup'
import Time from '#/time'
import ENV from '#/env'

export default {
  components: {
    ViewBox,
    Popup,
    XButton,
    Divider,
    TitleTip,
    Comment,
    Reply,
    CommentPopup
  },
  data () {
    return {
      commentPopupShow: false,
      replyPopupShow: false,
      reward: {},
      article: {}
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
    commentSubmit (value) {
      this.commentPopupShow = false
      let comment = {
        userName: 'simon',
        userAvatar: '../assets/_images/nopic.jpg',
        content: value,
        date: new Date().getTime(),
        diggCount: 0
      }
      this.article.comments.push(comment)
    },
    replySubmit () {

    },
    getData () {
      const self = this
      const id = this.$route.params.id
      this.$http.post(`${ENV.BokaApi}/api/moduleInfo`, {id: id, module: 'news'})
      .then(res => res.json())
      .then(data => {
        self.article = data.data
        return self.$http.get(`${ENV.BokaApi}/api/getUser/${self.article.uploader}`)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        self.reward = data
      })
    },
    onFavorite () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/user/favorite/add`, {id: this.article.id, module: 'news'})
      .then(res => res.json())
      .then(data => {
        self.$vux.toast.text(self.$t('Favorite Success'))
      })
    },
    onAdvisory () {

    },
    onStore () {

    },
    onShare () {

    }
  },
  created () {
    this.getData()
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
