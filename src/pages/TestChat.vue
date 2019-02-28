/*
* @description: 问答式订单生成页
* @auther: gyp
* @created_date: 2019-02-26
*/
<template>
  <div id="chat-room" class="font14 order-chat-page">
    <scroller id="chat-scoller" lock-x scrollbar-y :pulldown-config="{downContent: '', upContent: ''}" @touchend.native="touchContainer" :height="viewHeight" class="chat-area bg-white scroll-container" ref="scrollContainer">
      <div class="chatlist" ref="scrollContent">
        <template v-for="(item,index) in messageList">
          <div :class="`chatitem chatitem-${item.id} ${getItemClass(item)}`">
            <router-link class="head" :to="{path: '/membersView', query: {uid: item.uid}}">
              <img :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
            </router-link>
            <div class="name disusername">{{item.username}}</div>
            <div class="msg">
              <template v-if="item.msgtype == 'image'">
                <div class="main message-text" @click="showBigimg1(item,`previewer${index}`)">
                  <img class="wx__img-preview" :src="item.picurl" @load="imageLoad(item)" container="#chat-scoller"/>
                </div>
                <template v-if="item.previewerPhoto">
                  <div v-transfer-dom>
                    <previewer :list="item.previewerPhoto" :ref="`previewer${index}`"></previewer>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="main message-text">
                  <div v-html="item.content"></div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </scroller>
    <div class="bottom-area" ref="bottomArea" :style="{'bottom': `${bottomPos}px`}">
      <div class="input-box">
        <div class="input-cell">
          <group class="textarea-box">
            <x-textarea v-model='message' ref="text" id="chat-textarea" @on-change="inputText" @on-focus="onFocus" @on-blur="onBlur" :max="2000" :rows="1" :autosize="true" :show-counter="false"></x-textarea>
          </group>
        </div>
        <div v-if="showSendBtn" class="send-cell flex_center">
          <div class="bg-green color-white w40 align_center font13" style="line-height:35px;border-radius:5px;" @click="sendMessage">发送</div>
        </div>
        <div v-else class="feature-cell">
          <div class="feature-btn">
            <img src="https://tossharingsales.boka.cn/images/icon-add.png"/>
          </div>
        </div>
      </div>
      <form class="uploadImageForm hide" enctype="multipart/form-data" ref="uploadForm">
        <input style="opacity:0;" type="file" name="files" @change="pcUploadImg" ref="uploadInput"/>
      </form>
    </div>
  </div>
</template>
<script>
import { Scroller, Group, XTextarea, Grid, GridItem, XButton, Popup, TransferDom, Tab, TabItem, Swiper, SwiperItem, Search, XImg, CheckIcon, Previewer } from 'vux'
import OpenVip from '@/components/OpenVip'
import ENV from 'env'
import {User} from '#/storage'
import Time from '#/time'
import Socket from '#/socket'
import Voice from '#/voice'
import Reg from '#/reg'

const prefix = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : ''
let minIdFlag = 0
let intervalId = null

export default {
  directives: {
    TransferDom
  },
  components: {
    Scroller, Group, XTextarea, Grid, GridItem, XButton, Popup, Tab, TabItem, Swiper, SwiperItem, Search, XImg, CheckIcon, OpenVip, Previewer
  },
  data () {
    return {
      query: {},
      loginUser: {},
      retailerInfo: {},
      messages: [],
      messageList: [],
      module: 'message',
      message: '',
      showSendBtn: true,
      isUserTouch: false,
      viewHeight: `${-55}`,
      msgType: 'text',
      bottomPos: 0,
      askIndex: 0,
      askData: [
        {type: 'ask', content: '请问您的收货地址是哪里？', asktype: 'address'},
        {type: 'ask', content: '请问您的手机号码是多少？', asktype: 'telephone'},
        {type: 'ask', content: '请将您要购买的商品图片发送给我', msgtype: 'photo', asktype: 'photo'},
        {type: 'ask', content: '您要购买几件？<br>想要购买的型号或颜色是什么呢？', asktype: 'options'},
        {type: 'ask', content: '好的，正在为您生成订单，如有其它备注请留言？', asktype: 'content'}
      ],
      currentUser: {},
      chatUser: {},
      answerData: [],
      showOrder: false,
      orderKey: {'address': '收货地址', 'telephone': '联系电话', 'photo': '购买商品', 'options': '购买件数<br>型号/颜色', 'content': '其它备注'},
      orderData: [],
      postOrderData: {'address': '', 'telephone': '', 'photo': '', 'options': '', 'content': ''}
    }
  },
  filters: {
    dateFormat (seconds) {
      return new Time(seconds * 1000).format2()
    }
  },
  watch: {
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    showBigimg1 (item, refname) {
      const self = this
      let src = item.picurl
      if (self.$util.isPC()) {
        if (item.previewerPhoto) {
          let view = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
          view.show(0)
        }
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: src,
          urls: [src]
        })
      }
    },
    touchContainer () {
      this.isUserTouch = this.isUserScroll()
    },
    isUserScroll () {
      console.log('in scroller')
      const transform = this.$refs.scrollContainer.$el.children[0].style[`${prefix}Transform`]
      const matches = transform.match(Reg.rTranslateY)
      if (matches && matches[1]) {
        const tTop = parseInt(matches[1])
        const dTop = this.$refs.scrollContainer.$el.clientHeight - this.$refs.scrollContent.clientHeight
        console.log(`${tTop} ${dTop}`)
        if (tTop === dTop) {
          return false
        }
      }
      return true
    },
    inputText (value) {
      const self = this
      this.showSendBtn = true
      if (this.$util.trim(value) === '') {
        this.showSendBtn = false
      }
      let text = self.$refs.text[0] ? self.$refs.text[0] : self.$refs.text
      text.updateAutosize()
      setTimeout(function () {
        let text = self.$refs.text[0] ? self.$refs.text[0] : self.$refs.text
        text.updateAutosize()
      }, 50)
    },
    onFocus () {
      const self = this
      const globalContianer = document.getElementById('vux_view_box_body')
      intervalId = setInterval(function () {
        document.body.scrollTop = document.body.scrollHeight
        if (self.$util.isAndroid()) {
          globalContianer.scrollTop = globalContianer.scrollHeight
          const top = self.$refs.scrollContent.clientHeight - self.$refs.scrollContainer.$el.clientHeight
          const clientH = parseInt(self.$refs.bottomArea.clientHeight)
          self.$refs.scrollContainer.reset({ top: top + clientH })
        }
      }, 100)
      let text = this.$refs.text[0] ? this.$refs.text[0] : this.$refs.text
      text.updateAutosize()
      this.setScrollToBottom(false)
    },
    onBlur () {
      clearInterval(intervalId)
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
      }, 100)
    },
    setViewHeight () {
      if (this.$util.isAndroid()) return
      this.$nextTick(() => {
        let clientH = parseInt(this.$refs.bottomArea.clientHeight)
        this.viewHeight = `${-clientH}`
        console.log(this.viewHeight)
        this.setScrollToBottom()
      })
    },
    clickMessageItem (item) {
      const self = this
      if (item.msgtype === 'voice') {
        if (item.mediaLid) { // stop voice
          this.messages = this.$util.changeItem(this.messages, item.id, match => {
            match.voiceClass = ''
            match.voicePlaying = false
            return match
          })
          Voice.playStop(item.mediaLid)
          item.mediaLid = null
        } else { // play voice
          this.messages = this.$util.changeItem(this.messages, item.id, match => {
            match.voiceClass = ' playing'
            match.unread = false
            return match
          })
          Voice.play(item.mediaid,
            localId => { // donwload voice
              item.mediaLid = localId
            },
            localId => { // voice playing end
              self.messages = self.$util.changeItem(self.messages, item.id, match => {
                match.voiceClass = ''
                item.mediaLid = null
                return match
              })
            }
          )
        }
      }
    },
    imageLoad (item) {
      if (item.id > minIdFlag) {
        this.setScrollToBottom()
      } else {
        this.setScrollToTop()
      }
    },
    pcUploadImg (event) {
      const uploadFiles = event.target.files
      if (uploadFiles.length > 0) {
        let formData = new FormData(this.$refs.uploadForm)
        const self = this
        this.$vux.loading.show()
        this.$http.post(`${ENV.BokaApi}/api/upload/files`, formData)
        .then(res => {
          self.$vux.loading.hide()
          if (res) {
            const data = res.data
            if (data.flag === 1 && data.data) {
              self.sendData({
                touid: self.query.uid,
                content: '',
                module: self.module,
                sendtype: 'image',
                picurl: data.data,
                thumb: ''
              })
            }
          } else {
            self.$vux.toast.show({
              text: '请求超时，请刷新重试'
            })
          }
        })
      }
    },
    sendPhoto () {
      const self = this
      if (window.WeixinJSBridge) {
        self.$util.wxUploadImage({
          maxnum: 1,
          handleCallback: function (data) {
            if (data.flag === 1 && data.data) {
              self.sendData({
                touid: self.query.uid,
                content: '',
                module: this.module,
                sendtype: 'image',
                picurl: data.data,
                thumb: ''
              })
            }
          }
        })
      } else {
        this.$refs.uploadInput.click()
      }
    },
    getItemClass (item) {
      const self = this
      let ret = ''
      if (item.msgtype === 'news') {
        ret = 'message-push '
      }
      if (item.uid === parseInt(self.query.uid)) {
        ret = `${ret}left`
      } else {
        ret = `${ret}right`
      }
      return ret
    },
    sendData (postData) {
      const self = this
      let ajaxUrl = `${ENV.BokaApi}/api/message/send`
      if (this.query.fromModule) {
        postData.frommodule = this.query.fromModule
        postData.frommoduleid = this.query.fromId
      }
      if (this.query.type === 'kfaccount') {
        ajaxUrl = `${ENV.BokaApi}/api/message/sendkfmessage`
        postData.miniconfig = this.query.miniconfig
      }
      this.$http.post(ajaxUrl, postData)
      .then(res => {
        if (res.data.flag === 1) {
          const data = res.data.data
        }
      })
    },
    sendMessage () {
      let postData = {
        touid: this.query.uid,
        content: this.message,
        module: this.module,
        sendtype: 'text',
        picurl: '',
        thumb: '',
        inroom: 1,
        isNew: true
      }
      if (!this.$util.isNull(postData.content)) {
        postData.content = postData.content.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r')
      }
      if (this.msgType === 'text' && this.$util.trim(postData.content) === '') {
        return false
      }
      this.sendData(postData)
    },
    setScrollToTop () {
      this.$nextTick(() => {
        this.$refs.scrollContainer.reset({ top: 0 })
      })
    },
    setScrollToBottom (isTouch) {
      this.isUserTouch = typeof isTouch !== 'undefined' ? isTouch : this.isUserTouch
      console.log(isTouch)
      console.log(this.isUserTouch)
      if (this.isUserTouch) return
      this.$nextTick(() => {
        const self = this
        if (this.$refs.scrollContent) {
          if (this.$refs.scrollContent.clientHeight < this.$refs.scrollContainer.$el.clientHeight) return
          setTimeout(() => {
            const top = self.$refs.scrollContent.clientHeight - self.$refs.scrollContainer.$el.clientHeight
            console.log(top)
            self.$refs.scrollContainer.reset({ top: top })
          }, 100)
        }
      })
    },
    getMessages (minId, callback) {
      let params = { uid: this.query.uid }
      if (typeof minId === 'function') {
        callback = minId
      } else {
        params.lastid = minId
      }
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/message/chatList`, params)
      .then(res => {
        if (res.data.flag) {
          const data = res.data.data
          if (self.messages.length && !data.length) {
            self.$vux.toast.text('没有更多记录', 'middle')
          }
          self.$vux.loading.hide()
          for (let i = 0; i < data.length; i++) {
            if (data[i].msgtype === 'image') {
              data[i].previewerPhoto = self.$util.previewerImgdata([data[i].picurl])
            }
          }
          self.messages = data.concat(self.messages)
          callback && callback()
        } else {
          self.$vux.toast.text('加载失败，稍后再试', 'middle')
        }
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      minIdFlag = 0
      this.message = ''
      this.messages = []
      this.showSendBtn = false
      this.viewHeight = `${-55}`
      this.isUserTouch = false
      this.loginUser = User.get()
      this.setViewHeight()
      this.currentUser = {avatar: this.loginUser.avatar, uid: this.loginUser.uid, linkman: this.loginUser.linkman}
      this.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
        params: {uid: this.query.uid}
      }).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        if (data.flag) {
          this.retailerInfo = retdata
          document.title = this.retailerInfo.linkman
          this.chatUser = {avatar: this.retailerInfo.avatar, uid: this.retailerInfo.uid, linkman: this.retailerInfo.linkman}
          let msg = {...this.chatUser, ...this.askData[0]}
          this.messageList.push(msg)
        }
      })
    }
  },
  activated () {
    this.$util.miniPost()
    this.refresh()
  }
}
</script>
<style lang="less">
.order-chat-page{
  height: 100%;
  .bottom-area {
    position: absolute;
    bottom: 0px;
    z-index: 500;
    width: 100%;
    box-sizing: border-box;
  }
  .input-box {padding: 0 8px;display: flex;}
  .input-box,.textarea-box {background-color: #f0f0f0;}
  .input-box:before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    border-top: 1px solid #d7d7d7;
  }
  .input-box .input-cell {
    flex: 1;
    margin: 8px;
    position: relative;
  }
  .input-box .input-cell textarea{
    width: 100%;
    min-height: 35px;
    max-height: 106px;;
    border: 1px solid #d7d7d7;
    border-radius: 6px;
    padding: 8px;
    box-sizing: border-box;
    background-color: #fafafa;
    caret-color: blue;
    font-size: 16px;
    box-shadow: none;
    line-height: 18px;
    resize: none;
    -webkit-appearance: none;
  }
  .input-box .voice-cell,
  .input-box .emotion-cell,
  .input-box .feature-cell,
  .input-box .add-cell {
    display: flex;
    align-items: center;
  }
  .input-box .voice-btn,
  .input-box .emotion-btn,
  .input-box .keyboard-btn,
  .input-box .feature-btn {
    display: inline-block;
  }
  .input-box .voice-cell img,
  .input-box .emotion-cell img,
  .input-box .feature-cell img,
  .input-box .add-cell img {
    width: 28px;
    height: 28px;
    vertical-align: middle;
  }
  .input-box .emotion-cell {
    margin-right: 8px
  }
  .weui-cells,.vux-no-group-title {margin-top: 0;}
  .feature-icon {margin: auto;}
  .invisable-form input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .talk-btn {
    font-size: 16px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1
  }
  .input-cell .weui-cells {margin-top: 0;}
  .weui-cell {padding: 0;}
  .weui-grid__icon {
    width: 50px;
    height: 50px;
    border: #d8d8d8 1px solid;
    border-radius: 8px;
    background-color: #fbfbfb;
    display: flex;
    align-items: center;
  }
  .weui-grid:after {height: 0;border-bottom: none;}
  .message-tips {
    position: absolute;
    bottom: 62px;
    right: 0;
    left: 0;
    margin: 0 auto;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    width: 80px;
    padding: 4px 2px;
    border-radius: 4px;
    font-size: 12px;
  }
  .new-voice-tips {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    right: -15px;
    top: 13px;
  }
}

.chat-area *{box-sizing: border-box;}
.chatlist {
  padding: 0 10px;
  line-height: 1.1;
}
.chatlist .messages-date {
  text-align: center;
  font-weight: 500;
  font-size: 11px;
  padding: 10px 0;
  color: #8e8e93;
}
.chatlist .chatitem {position: relative;padding-bottom: 20px;}
.chatlist .chatitem.left{padding-right:50px;}
.chatlist .chatitem.right{padding-left:50px;}
.chatlist .chatitem .head {
	position: absolute;
  top: 0;
  width: 36px;
  height: 36px;
  overflow: hidden;
}
.chatlist .chatitem.left .head {left: 0;}
.chatlist .chatitem.right .head {right: 0;}
.chatlist .chatitem .head img {width: 100%;}
.chatlist .chatitem .name {margin-bottom: 3px;font-size: 12px;color: #999;transform: scale(0.9);}
.chatlist .chatitem .name{margin-left:40px;}
.chatlist .chatitem.right .name {margin-right:40px;text-align:right;}
.chatlist .chatitem .msg {margin: 0 0px 0 50px;}
.chatlist .chatitem.right .msg {margin: 0 50px 0 0;text-align:right;}
.chatlist .chatitem.left .msg .discontent{text-align:left;}
.chatlist .chatitem.right .msg .discontent{text-align:right;}
.chatlist .chatitem .msg .main {
	display: inline-block;
  position: relative;
  padding: 5px;
	background:#fff;
  border: 1px solid #dedede;
  min-width: 30px;
  max-width: 200px;
	border-radius: 5px;
  line-height: 24px;
  // min-height:36px;
	word-wrap: break-word;
  word-break: break-all;
}
.chatlist .chatitem.message-push .msg .main {width:100%;}
.chatlist .chatitem.message-voice .msg img{width:24px;height:24px;}
.chatlist .chatitem.message-voice .msg .media_voice.left{float:left;}
.chatlist .chatitem.message-voice .msg .media_voice.right{float:right;}
.chatlist .chatitem.right .msg .main{background:#00d449;color:#fff;border: 1px solid #00d449;text-align:left;}
.chatlist .chatitem.hongbao.right .msg .main,
.chatlist .chatitem.hongbao.left .msg .main{background:#fa9e3b;color:#fff;border: 1px solid #fa9e3b;}
.chatlist .chatitem.right.message-push .msg .main{
	background:#fff;color:inherit;border: 1px solid #dedede;
}
.chatlist .chatitem.message-pic .msg .main{background-color:#fff;}
.chatlist .chatitem .msg .main img,
.chatlist .chatitem .msg .main video {max-width:150px;vertical-align: middle;}
.chatlist .chatitem.left .msg .main:before,
.chatlist .chatitem.left .msg .main:after {
	position: absolute;z-index: 1;top: 13px;left: -5px;
	content: "";width: 0;height: 0;
	border-top: 5px solid transparent;
	border-right: 5px solid #fff;
	border-bottom: 5px solid transparent;
}
.chatlist .chatitem.left.message-pic .msg .main:before{
	border-right: 5px solid #fff;
}
.chatlist .chatitem.left .msg .main:after {
	z-index: 0;left: -6px;border-right: 5px solid #dedede;
}
.chatlist .chatitem.right .msg .main:before,
.chatlist .chatitem.right .msg .main:after {
	position: absolute;z-index: 1;top: 13px;right: -5px;
	content: "";width: 0;height: 0;
	border-top: 5px solid transparent;
	border-left: 5px solid #00d449;
	border-bottom: 5px solid transparent;
}
.chatlist .chatitem.right.message-pic .msg .main:before{
	border-left: 5px solid #fff;
}
.chatlist .chatitem.right.message-push .msg .main:after{
	border-left: 5px solid #dedede;
}
.chatlist .chatitem.right.message-push .msg .main:before{
	border-left: 5px solid #fff;
}
.chatlist .chatitem.right .msg .main:after {
	z-index: 0;right: -6px;border-left: 5px solid #00d449;
}

.chatlist .chatitem.left.hongbao .msg .main:before,
.chatlist .chatitem.left.hongbao .msg .main:after {
	z-index: 0;left: -6px;border-right: 5px solid #fa9e3b;
}
.chatlist .chatitem.hongbao.right .msg .main:before,
.chatlist .chatitem.hongbao.right .msg .main:after {
	position: absolute;z-index: 1;top: 13px;right: -5px;
	content: "";width: 0;height: 0;
	border-top: 5px solid transparent;
	border-left: 5px solid #fa9e3b;
	border-bottom: 5px solid transparent;
}
.chatlist .chatitem .msg .main .min{
	font-family: "microsoft yahei", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
	width: 30px;
  height:30px;
  line-height: 30px;
	position: absolute;
  top: 0;
  color: #cccccc;
  text-align: center;
}
.chatlist .chatitem.left .msg .main .min {right: -40px; top: 3px;}
.chatlist .chatitem.right .msg .main .min {left: -40px; top: 3px;}
.audio_play_area {float:left;}
.chatitem.right .audio_play_area{float:right;}
.audio_play_area:after{content:"";clear:both;display:block;}
.audio_play_area .icon_audio_default,
.audio_play_area .icon_audio_playing{
	width: 18px;
  height: 25px;
  transform: scale(0.7);
  vertical-align: middle;
  display: inline-block;
	background-size: 54px 25px;
	background-repeat: no-repeat;
	background-image: url(../assets/images/iconloop.png);
  float: left;
}
.audio_play_area .icon_audio_default {background-position: -36px center;}
.audio_play_area .icon_audio_playing {
	-webkit-animation: audio_playing 1s infinite;
	background-position: 0px center;
	display: none;
}
.chatitem.right .audio_play_area .icon_audio_default,
.chatitem.right .audio_play_area .icon_audio_playing{
	background-image:url(../assets/images/iconloop_r.png);
}
.chatitem.right .audio_play_area .icon_audio_default {background-position: 0px center;}
.chatitem.right .audio_play_area .icon_audio_playing {
	-webkit-animation: audio_playing1 1s infinite;
	background-position: -36px center;
}
.playing .audio_play_area .icon_audio_default {display: none;}
.playing .audio_play_area .icon_audio_playing {display: inline-block; }
@-webkit-keyframes audio_playing {
	30% {background-position: 0px center;}
	31% {background-position: -18px center;}
	61% {background-position: -18px center;}
	61.5% {background-position: -36px center;}
	100% {background-position: -36px center;}
}
@-webkit-keyframes audio_playing1 {
	30% {background-position: -36px center;}
	31% {background-position: -18px center;}
	61% {background-position: -18px center;}
	61.5% {background-position: 0px center;}
	100% {background-position: 0px center;}
}

.message-text .scroll_item{box-sizing: border-box;padding: 10px 0;}
.message-text .scroll_item:not(:last-child){border-bottom: #ccc 1px solid;}
.message-text .scroll_item .con{width:100%}
.message-text .scroll_item .con_tnt{text-align:left;padding:10px 0 0;line-height:20px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;white-space:normal!important;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.message-text .scroll_item .con .pic{width:100%;height:130px;overflow:hidden;position:relative}
.message-text .scroll_item .con .title{position:absolute;left:0;right:0;bottom:0;padding:5px 3px;text-align:left;color:#fff;background-color:rgba(0,0,0,.7);font-size:16px;line-height:24px;max-height:58px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;white-space:normal!important;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.message-text .scroll_item .con1{width:100%}
.message-text .scroll_item .con1 a{width:100%;display:table;table-layout:fixed}
.message-text .scroll_item .con1 .title{text-align:left;padding-right:10px;vertical-align:top;color:#000;}
.message-text .scroll_item .con1 .pic_r{width:44px;display:table-cell;vertical-align:top}
.message-text .scroll_item .con1 .pic{width:44px;height:44px;overflow:hidden;}
.message-text .scroll_item .con .img_background{width: 100%;height: 180px;}
.message-text .scroll_item .con1 .img_background{width: 100%;height: 44px;}
.message-text .scroll_item .img_background{display: block;background: top center no-repeat;background-size: cover;}
.message-text video{max-width:100%;}

</style>
