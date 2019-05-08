/*
* @description: 文章详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="newspage-container" class="containerarea font14 bg-white news notop nobottom">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div id="article-content" class="pagemiddle" ref="scrollContainer" @scroll="handleScroll">
        <div v-if="query.newadd && showsharetip" class="sharetiplayer" @click="closeSharetip">
    			<div class="ico"><i class="al al-feiji"></i></div>
    			<div class="txt">点击···，分享给好友或朋友圈吧！</div>
    			<div class="pic">
    				<img src="https://tossharingsales.boka.cn/images/share1.jpg" />
    			</div>
    		</div>
        <template v-if="!query.from && !query.control">
          <title-tip scroll-box="article-content" @access="access" :user="reward" :messages="messages" :avatar-href="reward.avatar" :user-name="reward.linkman" :user-credit="reward.credit"></title-tip>
        </template>
        <div class="article-view">
          <div class="article-title">
            <h2>{{article.title}}</h2>
            <div class="flex_right mt5 mb5" v-if="editIng && article.uploader == reward.uid">
              <router-link :to="{path:'/addNews',query:{id: query.id, callback: 'edit'}}" class="flex_center bg-theme color-white" style="border-radius:20px;height:25px;width:90px;">修改标题</router-link>
            </div>
          </div>
          <div class="article-vice-title">
            <h4>{{article.vicetitle}}</h4>
          </div>
          <div class="article-info" style="position:relative;">
            <span class="article-date color-gray">{{article.dateline | dateFormat}}</span>
            <template v-if="query.control != 'edit'">
              <span v-if="reward.subscribe != 1" @click="popupSubscribe" class="article-ex color-blue">{{ WeixinName }}</span>
              <router-link v-else to="/subscribeInfo" class="article-ex color-blue">{{ WeixinName }}</router-link>
            </template>
            <router-link class="article-author" :to="{ name: '', params: {} }">{{article.author}}</router-link>
            <div v-if="retailerInfo.uid && query.control != 'edit'" class="align_right" style="position:absolute;right:0;top:50%;margin-top:-12px;">
              <div @click="onStore" class="qbtn4 font12" style="padding:1px 8px;">{{ retailerInfo.title }}</div>
            </div>
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
          <template v-if="query.control != 'edit'">
            <div class="operate-area">
              <x-button mini :plain="notFavorite" type="primary" @click.native="onFavorite">
                <span class="al al-xing3 font14"></span>
                <span>{{notFavorite ? $t('Favorite') : $t('Has Favorite')}}</span>
              </x-button>
              <x-button v-if="retailerInfo && retailerInfo.uid" mini plain type="primary" @click.native="onAdvisory">
                <span class="al al-kefu1 font14"></span>
                <span>{{$t('Advisory')}}</span>
              </x-button>
              <x-button v-if="retailerInfo && retailerInfo.uid" mini plain type="primary" @click.native="onStore">
                <span class="al al-aipinpaidianpuxiangqingmaishouzhuye font17"></span>
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
                  <img src="https://tossharingsales.boka.cn/images/fingerprint.gif"/>
                  <div class="scan-area">
                    <img v-if="retailerInfo.qrcode" :src="retailerInfo.qrcode">
                    <img v-else :src="WeixinQrcode">
                  </div>
                </div>
                <div v-if="retailerInfo.qrcode" class="align_center padding10 bold font16">长按二维码加{{ retailerInfo.linkman }}为好友</div>
              </div>
            </div>
          </template>
        </div>
        <div v-if="query.control != 'edit'" class="comment-area">
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
      </div>
      <share-success
        v-show="showShareSuccess"
        v-if="article.uploader == reward.uid || query.wid == reward.uid || article.identity != 'user'"
        :data="article"
        :loginUser="reward"
        :module="module"
        :on-close="closeShareSuccess">
      </share-success>
      <editor v-if="reward.uid == article.uploader && showEditor" elem="#editor-content" :loginUser="loginUser" :query="query" @on-edit="clickEdit" @on-auto-save="autoSave" @on-save="editSave" @on-setting="editSetting" @on-delete="editDelete"></editor>
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
import Reg from '#/reg'
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
let self = {}
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XButton, Divider, TitleTip, Comment, Reply, CommentPopup, Editor, ShareSuccess, Previewer, Sos
  },
  data () {
    return {
      module: 'news',
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
      retailerInfo: {},
      comments: [],
      showSubscribe: false,
      WeixinQrcode: ENV.WeixinQrcode,
      isdig: 0,
      photoarr: [],
      previewerPhotoarr: [],
      // disComments: false,
      pagestart: 0,
      limit: 20,
      replyData: null,
      messages: 0,
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
      console.log('in in in clickInsertProduct')
      if (self.query.from === 'miniprogram') {
        const params = self.$util.query(url)
        self.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.product}?id=${params.id}&wid=${params.wid}`})
      } else {
        self.$router.push(url)
      }
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
    onReplyShow (item) {
      this.replyData = item
      this.replyPopupShow = true
    },
    onCommentShow () {
      if (this.loginUser.subscribe === 0) {
        this.$util.wxAccess()
      } else {
        this.commentPopupShow = true
      }
    },
    onCommentDelete (comment) {
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
    commentPopupCancel () {
      this.commentPopupShow = false
    },
    replyPopupCancel () {
      this.replyPopupShow = false
    },
    commentSubmit (value) { // 留言提交
      this.commentPopupShow = false
      self.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: this.article.id, module: self.module, message: value})
      .then(res => {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag) {
          let newcomment = data.data
          newcomment.comment = []
          let newarr = [ newcomment ]
          self.comments = newarr.concat(self.comments)
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    replySubmit (value) { // 回复提交
      this.replyPopupShow = false
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: self.replyData.id, module: 'comments', message: value})
      .then(res => {
        let data = res.data
        if (data.flag) {
          if (!self.replyData.comment) {
            self.replyData.comment = [ data.data ]
          } else {
            self.replyData.comment.push(data.data)
          }
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    handleScroll () {
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
    clickProduct (event) {
      console.log('进入点出商品事件')
      if (parseInt(self.reward.uid) !== parseInt(self.article.uploader)) {
        console.log('in news clickproduct')
        let node = event.target
        let linkurl = null
        while (node) {
          if (node.nodeType === 1) {
            let nodeClass = node.getAttribute('class')
            if (nodeClass && nodeClass.indexOf('insertproduct') > -1) {
              linkurl = node.getAttribute('linkurl')
              break
            }
          }
          node = node.parentNode
        }
        if (linkurl) {
          console.log(linkurl)
          if (self.query.from === 'miniprogram') {
            const params = self.$util.query(linkurl)
            self.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.product}?id=${params.id}&wid=${params.wid}`})
          } else {
            self.$router.push(linkurl)
          }
        }
      }
    },
    getData () {
      const id = this.query.id
      const infoparams = { id: id, module: this.module }
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
            self.article.content = this.article.content ? self.article.content
              .replace(/[\r\n]/g, '')
              .replace(/\s{2,}/g, '')
              .match(Reg.rSplitAllTags).map(fragment => {
                if (Reg.rTestSelfCloseTag.test(fragment)) {
                  fragment = fragment.replace(Reg.filterSpecAttr('style'), (match, p1, p2, p3, p4, p5) => {
                    return `${p1}${p5}`
                  })
                  if (!Reg.rTestSelfCloseOKTag.test(fragment)) {
                    fragment = fragment.replace(Reg.rInsertSlash, '$1/$2')
                  }
                  return fragment
                }
                return fragment
              }).join('') : ''
            self.showArticle = true
            self.showEditor = true
            document.title = self.article.title
            self.retailerInfo = self.article.retailerinfo
            let shareParams = {
              data: self.article,
              module: self.module,
              moduleid: self.article.id,
              link: `${ENV.Host}/#/news?id=${self.article.id}&wid=${self.article.uploader}&share_uid=${self.reward.uid}`,
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
            return self.$http.get(`${ENV.BokaApi}/api/user/digs/show`, {
              params: {id: id, module: self.module}
            })
          }
        }
      })
      .then(res => {
        if (res) {
          self.$util.handleFrame(jQuery('.news iframe'))
          if (self.reward.uid !== self.article.uploader) {
            let items = document.querySelectorAll('.insertproduct')
            for (let i = 0; i < items.length; i++) {
              let cur = items[i]
              cur.addEventListener('click', self.clickProduct)
            }
          }
          self.handleImg()
          if (self.query.control === 'edit') {
            jQuery('.news .edit-btn')[0].click()
          }
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
      if (this.notFavorite) {
        this.notFavorite = false
        let cururl = `/news?id=${self.query.id}`
        if (self.query.wid) {
          cururl = `${cururl}&wid=${self.query.wid}`
        }
        this.$http.post(`${ENV.BokaApi}/api/user/favorite/add`, {id: this.article.id, module: self.module, currenturl: encodeURIComponent(cururl)})
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
      if (this.loginUser.uid === this.retailerInfo.uid) {
        this.$vux.toast.text('不能和自己聊天哦', 'middle')
      } else {
        if (this.loginUser.subscribe === 0) {
          // this.$util.wxAccess()
          const originHref = encodeURIComponent(`${ENV.Host}/#/chat?uid=${this.retailerInfo.uid}&fromModule=news&fromId=${this.query.id}&wid=${this.retailerInfo.uid}`)
          const callbackHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
          location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${callbackHref}&response_type=code&scope=snsapi_userinfo&state=${originHref}#wechat_redirect`)
        } else {
          this.$router.push({path: '/chat', query: {uid: this.retailerInfo.uid, fromModule: 'news', fromId: this.query.id, wid: this.retailerInfo.uid, from: this.query.from}})
        }
      }
    },
    onStore () {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.store}?wid=${this.retailerInfo.uid}`})
      } else {
        this.$router.push({path: '/store', query: {wid: this.retailerInfo.uid}})
      }
    },
    onShare () {
    },
    save (callback) {
      let editorContent = document.querySelector('#editor-content')
      self.$vux.loading.show()
      let con = editorContent.innerHTML.replace('文章内容为空，点击【编辑】按钮可修改内容哦！', '')
      self.$http.post(`${ENV.BokaApi}/api/editContent/news`, {
        id: self.query.id,
        content: con
      }).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let toasttype = data.flag !== 1 ? 'warn' : 'success'
        self.$vux.toast.show({
          text: data.error,
          type: toasttype,
          time: self.$util.delay(data.error),
          onHide: () => {
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
      this.save(function () {
        if (self.query.minibackurl) {
          let minibackurl = decodeURIComponent(self.query.minibackurl)
          if (minibackurl.indexOf('?') > -1) {
            minibackurl = `${minibackurl}&id=${self.query.id}`
          } else {
            minibackurl = `${minibackurl}?id=${self.query.id}`
          }
          if (self.query.backtype === 'relaunch') {
            self.$wechat.miniProgram.reLaunch({url: `${minibackurl}`})
          } else if (self.query.backtype === 'redirect') {
            self.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
          } else {
            self.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
          }
        }
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
    refresh (query) {
      this.loginUser = User.get()
      this.showArticle = false
      this.showEditor = false
      this.showsharetip = false
      this.editIng = false
      if (query.edit === 'control') {
        this.editIng = true
      } else {
        this.editIng = false
      }
      if (this.query.id !== query.id) {
        room = ''
        this.comments = []
        this.pagestart = 0
        this.query = query
      }
      this.getData()
      this.loginUser = User.get()
      this.createSocket()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$http.get(`${ENV.BokaApi}/api/message/newMessages`).then(function (res) {
        let data = res.data
        self.messages = data.data
      })
      if (query.newadd) {
        setTimeout(() => {
          self.showsharetip = false
        }, 10000)
      }
    }
  },
  created () {
    self = this
    this.init()
  },
  activated () {
    self = this
    this.refresh(this.$route.query)
    this.$util.miniPost()
  }
  // beforeRouteLeave (to, from, next) {
  //   Socket.destory(room)
  //   next()
  // }
}
</script>
<style lang="less">
.Eleditor-scrollLocked .news #article-content{overflow-y:hidden;}
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
  display:block;padding:5px !important;position:relative;text-indent: 0 !important;text-align:center;
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
