/*
* @description: 聊天室页
* @auther: simon
* @created_date: 2018-4-23
*/
<template>
  <div id="chat-room" class="font14">
    <template v-if="allowChat || loginUser.isretailer === 1">
      <div style="opacity:0;position:absolute;z-index:-1;" class="copy_txt">{{clickMsgItem.content}}</div>
      <div v-if="retailerInfo.uid && showTip" ref="topTipArea" class="db-flex w_100 border-box padding10 bg-white b_bottom_after font13 color-gray" style="color:inherit;">
        <div class="flex_left" style="width:70px;">
          <img class="v_middle imgcover" style="width:60px;height:60px;" :src="retailerInfo.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        </div>
        <div class="flex_cell flex_left">
          <div class="w_100">
            <div class="flex_left" @click="clickQrcode">
              <span>{{storeTitle}}</span><span class="al al-erweima1 font14 color-theme bold ml5" v-if="retailerInfo.qrcode && retailerInfo.qrcode != ''"></span>
            </div>
            <!-- <div class="flex_left" @click="clickQrcode">
              <span class="al al-erweima1 font14 color-black"></span>
            </div> -->
            <div class="clamp2 color-gray font12 mt5">全部宝贝: {{ retailerInfo.productcount }}件</div>
          </div>
        </div>
        <div class="flex_right" style="width:80px;" @click="toStore">
          <div class="qbtn4 color-orange5 font12 border-color-orange5" style="padding: 1px 8px;">进店逛逛</div>
        </div>
      </div>
      <scroller id="chat-scoller" lock-x scrollbar-y use-pulldown :pulldown-config="{downContent: '查看历史消息', upContent: '查看历史消息'}" @touchend.native="touchContainer" @on-pulldown-loading="loadingHistory" :height="viewHeight" class="chat-area bg-white scroll-container" ref="scrollContainer">
      <!-- <scroller :on-refresh="loadingHistory" :height="viewHeight" class="chat-area bg-white scroll-container" ref="scrollContainer"> -->
        <div class="chatlist" ref="scrollContent">
          <template v-for="(item,index) in messages">
            <div v-if="index == 0" class="messages-date">{{item.dateline | dateFormat}}</div>
            <div v-else-if="index + 1 < messages.length && messages[index].dateline - messages[index - 1].dateline > diffSeconds" class="messages-date">{{messages[index].dateline | dateFormat}}</div>
            <div v-else-if="index + 1 == messages.length && messages[index].dateline - messages[index - 1].dateline > diffSeconds" class="messages-date">{{messages[index].dateline | dateFormat}}</div>
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
                <template v-else-if="item.msgtype == 'news'">
                  <div class="main message-text">
                    <div class="scroll_item">
                      <div class="con">
                        <div v-for="(news, index1) in item.newsdata" :key="index1">
                          <div class="pic" @click="toNews(news)">
                            <div class="img_background v_bottom" :style="`background-image: url(${getPhoto(news.photo)});`"></div>
                            <span class="title">{{news.title}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else-if="item.msgtype == 'voice'">
                  <div :style="`width: ${40 + Math.round(5 * parseInt(item.content))}px`" :class="`main message-text${item.voiceClass||''}`" @click="clickMessageItem(item)">
                    <div class="audio_play_area">
                      <i class="icon_audio_default"></i>
                      <i class="icon_audio_playing"></i>
                    </div>
                    <div v-if="item.unread" class="new-voice-tips"></div>
                    <div class="min">
                      <span class="discontent">{{item.content | secondsFormat}}</span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="main message-text" @click="copyTxt(item)">
                    <div v-html="filterEmot(item.content)"></div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </scroller>
      <div v-show="isUserTouch && hasNewMessage" class="message-tips">你有新消息</div>
      <div class="bottom-area" ref="bottomArea" v-if="allowChat || loginUser.isretailer == 1" :style="{'bottom': `${bottomPos}px`}">
        <div class="input-box">
          <div class="voice-cell">
            <a class="voice-btn" @click.stop="toggleVoice" v-if="!showVoiceCom">
              <img src="https://tossharingsales.boka.cn/images/icon-voice.png"/>
            </a>
            <a v-else class="emotion-btn" @click="toggleKeyboard">
              <img src="https://tossharingsales.boka.cn/images/icon-keyboard.png"/>
            </a>
          </div>
          <div class="input-cell">
            <group class="textarea-box">
              <x-textarea v-model='message' ref="text" id="chat-textarea" @on-change="inputText" @touchstart.native="onTextClick" @on-focus="onFocus" @on-blur="onBlur" :max="2000" :rows="1" :autosize="true" :show-counter="false"></x-textarea>
            </group>
            <template v-if="showVoiceCom">
              <x-button class="talk-btn no-select" v-if="recordCheck" @touchstart.native.prevent="onTalkRecord" @touchend.native="onTalkRecordStop">{{$t('Press And Talk')}}</x-button>
              <x-button class="talk-btn no-select" v-else @click.native.prevent="checkRecordApi">{{$t('Check Record API')}}</x-button>
            </template>
          </div>
          <div class="emotion-cell">
            <a v-if="!showEmotBox" class="emotion-btn" @click="toggleEmotion">
              <img src="https://tossharingsales.boka.cn/images/icon-face.png"/>
            </a>
            <a v-else class="emotion-btn" @click="toggleKeyboard">
              <img src="https://tossharingsales.boka.cn/images/icon-keyboard.png"/>
            </a>
          </div>
          <div v-if="showSendBtn" class="send-cell flex_center">
            <div class="bg-green color-white w40 align_center font13" style="line-height:35px;border-radius:5px;" @click="sendMessage">发送</div>
          </div>
          <div v-else class="feature-cell">
            <a class="feature-btn" @click.prevent.stop="toggleFeatureBoard">
              <img src="https://tossharingsales.boka.cn/images/icon-add.png"/>
            </a>
          </div>
        </div>
        <emotion-box v-show="showEmotBox" bind-textarea="#chat-textarea" @input="inputEmot">
        </emotion-box>
        <form class="uploadImageForm hide" enctype="multipart/form-data" ref="uploadForm">
          <input style="opacity:0;" type="file" name="files" @change="pcUploadImg" ref="uploadInput"/>
        </form>
        <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false" v-show="showFeatureBox" class="bg-white">
          <grid-item @click.native="sendPhoto">
            <span slot="icon" class="feature-icon al al-zhaopian color-gray"></span>
            <span slot="label" class="color-gray">{{$t('Photo')}}</span>
          </grid-item>
          <grid-item @click.native="showImgTxtPopup" v-if="loginUser.isretailer">
            <span slot="icon" class="feature-icon al al-tuwen color-gray"></span>
            <span slot="label" class="color-gray">{{$t('Image Text')}}</span>
          </grid-item>
          <template v-if="showUserInfo">
            <grid-item @click.native="viewUserInfo">
              <span slot="icon" class="feature-icon al al-yonghuxinxi color-gray"></span>
              <span slot="label" class="color-gray">{{$t('User Info')}}</span>
            </grid-item>
          </template>
        </grid>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showImgTxt" height="100%">
          <div class="popup1 popup-imgTxt">
            <div class="popup-top flex_center">图文</div>
            <div class="flex_center" style="position:absolute;left:0;top:45px;right:0;height:50px;">
              <search
                class="v-search"
                v-model="searchword"
                :auto-fixed="autofixed"
                @on-submit="onSearchSubmit"
                @on-change="onSearchChange"
                @on-cancel="onSearchCancel"
                ref="search">
              </search>
            </div>
            <div class="b_top_after" style="position:absolute;left:0;top:95px;right:0;height:54px;">
              <tab v-model="tabmodel" class="v-tab">
                <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="swiperChange">{{item}}</tab-item>
              </tab>
            </div>
            <div class="popup-middle font14" style="top:149px;">
              <!-- <swiper v-model="tabmodel" class="x-swiper no-indicator" @on-index-change="swiperChange">
                <swiper-item v-for="(tabitem, index) in tabtxts" :key="index"> -->
                  <div v-show="(tabmodel == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
                    <div v-if="disNewsData" class="scroll_list">
                      <div v-if="!newsData || newsData.length === 0" class="scroll_item padding10 color-gray align_center">
                        <template v-if="searchresult1">
                          <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                        </template>
                        <template v-else>
                          <div class="flex_center" style="height:80px;">暂无文章</div>
                        </template>
                      </div>
                      <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in newsData" :key="item.id" :value.sync="item.checked" @click.native.stop="clickNews(item,index)">
                        <div class="t-table">
                          <div class="t-cell pic v_middle w50">
                            <x-img class="v_middle imgcover" :src="item.photo" default-src="https://tossharingsales.boka.cn/images/nopic.jpg" style="width:40px;height:40px;" :offset="0" container=".scroll-container1" ></x-img>
                          </div>
                          <div class="t-cell v_middle" style="color:inherit;">
                            <div class="clamp1">{{item.title}}</div>
                          </div>
                        </div>
                      </check-icon>
                    </div>
                  </div>
                  <div v-show="(tabmodel == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2')">
                    <div v-if="disProductsData" class="scroll_list">
                      <div v-if="!productsData || productsData.length === 0" class="scroll_item padding10 color-gray align_center">
                        <template v-if="searchresult2">
                          <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                        </template>
                        <template v-else>
                          <div class="flex_center" style="height:80px;">暂无商品</div>
                        </template>
                      </div>
                      <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in productsData" :key="item.id" :value.sync="item.checked" @click.native.stop="clickProduct(item,index)">
                        <div class="t-table">
                          <div class="t-cell pic v_middle w50">
                            <x-img class="v_middle imgcover" :src="item.photo" default-src="https://tossharingsales.boka.cn/images/nopic.jpg" style="width:40px;height:40px;" :offset="0" container=".scroll-container2" ></x-img>
                          </div>
                          <div class="t-cell v_middle" style="color:inherit;">
                            <div class="clamp1">{{item.title}}</div>
                            <div class="mt5 font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
                          </div>
                        </div>
                      </check-icon>
                    </div>
                  </div>
                <!-- </swiper-item>
              </swiper> -->
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closeImgTxtPopup">{{ $t('Close') }}</div>
              <div class="flex_cell flex_center h_100 bg-green color-white" @click="sendImgTxt">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <div class="auto-modal flex_center qrcode-modal" v-if="showQrcodeModal">
        <div class="modal-inner border-box" style="width:80%;">
          <div class="flex_center b_bottom_after padding10 bold font16">识别二维码加卖家微信</div>
          <div class="flex_center padding10">
            <div class="w_100">
              <img :src="retailerInfo.qrcode" style="max-width:100%;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
          </div>
          <div class="close-area flex_center" @click="closeQrcodeModal">
            <i class="al al-close"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { Scroller, Group, XTextarea, Grid, GridItem, XButton, Popup, TransferDom, Tab, TabItem, Swiper, SwiperItem, Search, XImg, CheckIcon, Previewer } from 'vux'
import EmotionBox from '@/components/EmotionBox'
import OpenVip from '@/components/OpenVip'
import ENV from 'env'
import {User} from '#/storage'
import Time from '#/time'
import Socket from '#/socket'
import Voice from '#/voice'
import Reg from '#/reg'
import jQuery from 'jquery'

const prefix = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : ''
let room = ''
let minIdFlag = 0
let intervalId = null

export default {
  directives: {
    TransferDom
  },
  components: {
    Scroller, Group, XTextarea, Grid, GridItem, XButton, EmotionBox, Popup, Tab, TabItem, Swiper, SwiperItem, Search, XImg, CheckIcon, OpenVip, Previewer
  },
  data () {
    return {
      module: 'message',
      loginUser: {},
      message: '',
      showEmotBox: false,
      showFeatureBox: false,
      showVoiceCom: false,
      showSendBtn: false,
      showImgTxt: false,
      isUserTouch: false,
      hasNewMessage: false,
      query: {},
      messages: [],
      viewHeight: `${-132}`,
      diffSeconds: 300,
      msgType: 'text',
      tabmodel: 0,
      tabtxts: [ '文章', '商品' ],
      autofixed: false,
      searchword: '',
      showSearchEmpty: false,
      searchresult1: false,
      searchresult2: false,
      newsData: [],
      disNewsData: false,
      productsData: [],
      disProductsData: false,
      pagestart1: 0,
      pagestart2: 0,
      limit1: 20,
      selectNewsData: null,
      selectProductsData: null,
      showUserInfo: false,
      fromProduct: {},
      showTip: true,
      recordCheck: false,
      allowChatModule: ['news', 'product', 'store', 'messagelist', 'retailer', 'order', 'factory'],
      allowChat: false,
      retailerInfo: {},
      bottomPos: 0,
      clickMsgItem: {},
      showQrcodeModal: false,
      storeTitle: ''
    }
  },
  filters: {
    secondsFormat (seconds) {
      return Time.seconds(seconds)
    },
    dateFormat (seconds) {
      return new Time(seconds * 1000).format2()
    }
  },
  watch: {
    showEmotBox () {
      this.setViewHeight()
    },
    showFeatureBox () {
      this.setViewHeight()
    }
  },
  methods: {
    clickQrcode () {
      if (this.retailerInfo.qrcode && this.retailerInfo.qrcode != '') {
        this.showQrcodeModal = true
      }
    },
    closeQrcodeModal () {
      this.showQrcodeModal = false
    },
    copyTxt (item) {
      console.log('拷贝方法')
      console.log(this)
      const self = this
      self.clickMsgItem = item
      const className = `#chat-room .copy_txt`
      const eleobj = jQuery(className)[0]
      console.log(eleobj)
      let range = null
      let save = function (e) {
        // e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.clipboardData.setData('text/plain', item.content)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        setTimeout(() => {
          console.log('进入到了ios设备')
          window.getSelection().removeAllRanges()
          range = document.createRange()
          range.selectNode(eleobj)
          console.log(range)
          window.getSelection().addRange(range)
          document.execCommand('copy')
          window.getSelection().removeAllRanges()
        }, 100)
      } else { // 安卓设备
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      setTimeout(function () {
        self.$vux.toast.show({
          text: '复制成功',
          time: 1500
        })
      }, 200)
    },
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
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
      // console.log(this.isUserTouch)
      this.showEmotBox = false
      this.showFeatureBox = false
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
          this.hasNewMessage = false
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
    inputEmot (value) {
      this.message = value
      this.inputText(value)
    },
    onTextClick () {
      this.showEmotBox = false
    },
    onFocus () {
      const self = this
      const globalContianer = document.getElementById('vux_view_box_body')
      this.showFeatureBox = false
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
      // setTimeout(function() {
      //   if (self.$util.isAndroid()) {
      //     globalContianer.scrollTop = globalContianer.scrollHeight
      //     const top = self.$refs.scrollContent.clientHeight - self.$refs.scrollContainer.$el.clientHeight
      //     self.$refs.scrollContainer.reset({ top: top + 52 })
      //   }
      // }, 100)
    },
    onBlur () {
      clearInterval(intervalId)
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
      }, 100)
    },
    toggleVoice () {
      if (this.showEmotBox) {
        this.showEmotBox = false
      }
      if (this.showFeatureBox) {
        this.showFeatureBox = false
      }
      if (this.showVoiceCom) {
        this.showVoiceCom = false
      } else {
        this.checkRecordApi()
        this.showVoiceCom = true
      }
      this.setScrollToBottom(false)
    },
    toggleEmotion () {
      if (this.showVoiceCom) {
        this.showVoiceCom = false
      }
      if (this.showFeatureBox) {
        this.showFeatureBox = false
      }
      this.showEmotBox = true
      this.setScrollToBottom(false)
    },
    toggleKeyboard () {
      if (this.showEmotBox) {
        this.showEmotBox = false
      }
      if (this.showFeatureBox) {
        this.showFeatureBox = false
      }
      if (this.showVoiceCom) {
        this.showVoiceCom = false
      }
      this.$refs.text.$refs.textarea.focus()
    },
    toggleFeatureBoard () {
      if (this.showVoiceCom) {
        this.showVoiceCom = false
      }
      if (this.showEmotBox) {
        this.showEmotBox = false
      }
      if (!this.showFeatureBox) {
        this.showFeatureBox = true
        this.setScrollToBottom(false)
      } else {
        this.showFeatureBox = false
        this.$refs.text.$refs.textarea.focus()
      }
    },
    setViewHeight () {
      if (this.$util.isAndroid()) return
      this.$nextTick(() => {
        let clientH = parseInt(this.$refs.bottomArea.clientHeight)
        if (this.retailerInfo.uid && this.showTip) {
          // clientH = clientH + parseInt(this.$refs.topTipArea.clientHeight)
          clientH += 80
        }
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
      // console.log(item.id +'>'+ minIdFlag)
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
        this.toggleFeatureBoard()
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
        self.toggleFeatureBoard()
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
    sendVoice (data) {
      const params = {
        touid: this.query.uid,
        content: data.time,
        module: this.module,
        sendtype: 'voice',
        mediaid: data.vid
      }
      // console.log(params)
      this.sendData(params)
    },
    onTalkRecord () {
      const self = this
      this.$vux.loading.show({text: '开始讲话'})
      Voice.record(res => {
        self.sendVoice({vid: res.serverId, time: res.time})
      })
    },
    onTalkRecordStop () {
      const self = this
      this.$vux.loading.hide()
      Voice.recordStop(
      res => {
        self.sendVoice({vid: res.serverId, time: res.time})
      },
      res => {
        self.$vux.toast.text('录音时间过短', 'middle')
      })
    },
    checkRecordApi () {
      const self = this
      Voice.recordCheck(
        res => {
          self.recordCheck = true
        },
        () => {
          self.recordCheck = false
          self.$vux.toast.text('录音设备不可用', 'middle')
        }
      )
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
    loadingHistory () {
      const self = this
      setTimeout(() => {
        const minId = this.messages[0].id
        // minIdFlag = minId
        self.getMessages(minId)
      }, 200)
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
          let sendData = {
            module: postData.module,
            type: 'say',
            from_uid: self.loginUser.uid,
            to_client_id: self.query.uid,
            messageid: data.id,
            room_id: room,
            ...data
          }
          Socket.send(sendData)
          self.message = ''
          self.isUserTouch = false
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
    viewUserInfo () {
      this.$router.push({path: 'membersView', query: {uid: this.query.uid}})
    },
    showImgTxtPopup () {
      const self = this
      this.showImgTxt = true
      this.showFeatureBox = false
      if (!self.newsData.length) {
        self.$vux.loading.show()
        self.getNewsData()
      }
    },
    clearSelectData () {
      const self = this
      if (self.selectNewsData) {
        for (let d of self.newsData) {
          if (d.id === self.selectNewsData.id) {
            delete d.checked
            self.selectNewsData = null
            break
          }
        }
      }
      if (self.selectProductsData) {
        for (let d of self.productsData) {
          if (d.id === self.selectProductsData.id) {
            delete d.checked
            self.selectProductsData = null
            break
          }
        }
      }
    },
    closeImgTxtPopup () {
      this.showImgTxt = false
      this.clearSelectData()
    },
    sendImgTxt () {
      const self = this
      if (self.tabmodel === 0) {
        if (!self.selectNewsData || !self.selectNewsData.id) {
          self.$vux.toast.show({
            text: '请选择文章',
            type: 'text'
          })
          return false
        }
      } else {
        if (!self.selectProductsData || !self.selectProductsData.id) {
          self.$vux.toast.show({
            text: '请选择商品',
            type: 'text'
          })
          return false
        }
      }
      let postdata = {
        touid: self.query.uid,
        sendtype: 'news',
        picurl: '',
        thumb: ''
      }
      if (self.tabmodel === 0) {
        postdata.content = `news_${self.selectNewsData.id}`
      } else if (self.tabmodel === 1) {
        postdata.content = `product_${self.selectProductsData.id}`
      }
      self.sendData(postdata)
      self.showImgTxt = false
      self.clearSelectData()
    },
    onSearchChange (val) {
      this.searchword = val
    },
    onSearchCancel () {
      const self = this
      self.searchword = ''
      if (self.tabmodel === 0) {
        self.$vux.loading.show()
        self.newsData = []
        self.pagestart1 = 0
        self.getNewsData()
      } else if (self.tabmodel === 1) {
        self.$vux.loading.show()
        self.productsData = []
        self.pagestart2 = 0
        self.getProductData()
      }
    },
    onSearchSubmit () {
      const self = this
      if (self.tabmodel === 0) {
        self.$vux.loading.show()
        self.newsData = []
        self.pagestart1 = 0
        self.getNewsData()
      } else if (self.tabmodel === 1) {
        self.$vux.loading.show()
        self.productsData = []
        self.pagestart2 = 0
        self.getProductData()
      }
    },
    swiperChange (index) {
      console.log(this.tabmodel)
      const self = this
      this.clearSelectData()
      if (this.tabmodel === 0) {
        if (!self.newsData.length) {
          self.$vux.loading.show()
          self.getNewsData()
        }
      } else {
        if (!self.productsData.length) {
          self.$vux.loading.show()
          self.getProductData()
        }
      }
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.tabmodel === 0) {
            if (self.newsData.length === (self.pagestart1 + 1) * self.limit1) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getNewsData()
            }
          } else {
            if (self.productsData.length === (self.pagestart2 + 1) * self.limit1) {
              self.pagestart2++
              self.$vux.loading.show()
              self.getProductData()
            }
          }
        }
      })
    },
    setScrollToTop () {
      this.$nextTick(() => {
        this.$refs.scrollContainer.reset({ top: 0 })
        // this.$refs.scrollContainer.scrollTo(0, 0, false)
      })
    },
    setScrollToBottom (isTouch) {
      this.isUserTouch = typeof isTouch !== 'undefined' ? isTouch : this.isUserTouch
      console.log(isTouch)
      console.log(this.isUserTouch)
      if (this.isUserTouch) return
      // if (this.$util.isAndroid()) {
      //   document.getElementById('chat-room').scrollTop = 1000000
      //   document.body.scrollTop = document.body.scrollHeight
      // }
      this.$nextTick(() => {
        const self = this
        if (this.$refs.scrollContent) {
          if (this.$refs.scrollContent.clientHeight < this.$refs.scrollContainer.$el.clientHeight) return
          setTimeout(() => {
            const top = self.$refs.scrollContent.clientHeight - self.$refs.scrollContainer.$el.clientHeight
            console.log(top)
            self.$refs.scrollContainer.reset({ top: top })
            // this.$refs.scrollContainer.scrollTo(0, top, false)
            // if (self.$util.isAndroid()) {
            //    document.body.scrollTop = document.body.scrollHeight
            //    document.documentElement.scrollTop = document.documentElement.scrollHeight
            // }
          }, 100)
        }
      })
    },
    getNewsData () {
      const self = this
      let params = { from: 'retailer', pagestart: self.pagestart1, limit: self.limit1 }
      let keyword = self.searchword
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/list/news`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.newsData = self.newsData.concat(retdata)
        self.disNewsData = true
      })
    },
    getProductData () {
      const self = this
      let keyword = self.searchword
      let params = { pagestart: self.pagestart2, limit: self.limit1 }
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult2 = true
        params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/getRetailerProducts`, {
        params: params
      }).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.productsData = self.productsData.concat(retdata)
        self.disProductsData = true
      })
    },
    clickNews (data, index) {
      const self = this
      if (data.checked) {
        self.selectNewsData = data
      } else {
        self.selectNewsData = null
      }
      for (let d of self.newsData) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
    },
    clickProduct (data, index) {
      const self = this
      if (data.checked) {
        self.selectProductsData = data
      } else {
        self.selectProductsData = null
      }
      for (let d of self.productsData) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
    },
    createSocket () {
      const self = this
      const uid = this.loginUser.uid
      const linkman = this.loginUser.linkman
      const sid = Math.min(this.query.uid, uid)
      const bid = Math.max(this.query.uid, uid)
      const module = this.query.fromModule
      const fromId = this.query.fromId
      room = `${this.module}-${sid}-${bid}`
      Socket.listening({ room: room, uid: uid, linkman: linkman, fromModule: module, fromId: fromId }, item => {
        item.dateline = new Date(item.time).getTime() / 1000
        // console.log(item.dateline)
        if (uid !== item.uid) {
          self.hasNewMessage = true
          setTimeout(function () {
            self.hasNewMessage = false
          }, 5000)
          if (item.msgtype === 'voice') {
            item.unread = true
          }
        }
        if (item.msgtype === 'image') {
          item.previewerPhoto = self.$util.previewerImgdata([item.picurl])
        }
        self.messages.push(item)
        self.setScrollToBottom()
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
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'chat', id: this.query.uid
      })
      .then(res => {
        return self.setContactUser()
      })
      .then(res => {
        if (res.data) {
          document.title = res.data.linkman
        }
        self.getMessages(() => {
          if (self.messages.length > 0) {
            minIdFlag = self.messages[0].id
            self.setScrollToBottom()
          }
        })
      })
    },
    getProduct () {
      const self = this
      if (self.query.fromModule === 'product' && self.query.fromId) {
        self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
          params: { id: self.query.fromId, module: self.query.fromModule }
        }).then(function (res) {
          if (res && res.status === 200) {
            const data = res.data
            const retdata = data.data
            self.fromProduct = retdata
            self.retailerInfo = retdata.retailerinfo
            // setTimeout(function () {
            //   self.showTip = false
            // }, 10000)
          }
        })
      }
    },
    _getRetailerInfo () {
      const self = this
      if ((self.query.fromModule === 'store' || self.query.fromModule === 'news') && self.query.wid) {
        self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
          params: { uid: self.query.wid }
        }).then(function (res) {
          if (res && res.status === 200) {
            const data = res.data
            self.retailerInfo = data.data
            // setTimeout(function () {
            //   self.showTip = false
            // }, 10000)
          }
        })
      }
    },
    getRetailerInfo () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
        params: { uid: self.query.uid }
      }).then((res) => {
        if (res && res.status === 200) {
          const data = res.data
          if (data.flag) {
            self.retailerInfo = data.data
            let title = self.retailerInfo.title
            if (title.length > 10) {
              title = title.substr(0, 10)
              this.storeTitle = `${title}...`
            } else {
              this.storeTitle = title
            }
            self.setViewHeight()
          }
        }
      })
    },
    toStore () {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.store}?wid=${this.retailerInfo.uid}`})
      } else {
        this.$router.push({path: '/store', query: {wid: this.retailerInfo.uid}})
      }
    },
    toNews (news) {
      console.log('in toNews')
      console.log(news)
      if (this.query.from === 'miniprogram') {
        // console.log('i am from miniprogram')
        this.$wechat.miniProgram.redirectTo({url: `/packageB/pages${news.link}`})
      } else {
        this.$router.push({path: news.link})
      }
    },
    setContactUser () {
      return this.$http.get(`${ENV.BokaApi}/api/getUser/${this.query.uid}`)
    },
    refresh () {
      const self = this
      self.retailerInfo = {}
      room = ''
      minIdFlag = 0
      this.message = ''
      this.messages = []
      this.showEmotBox = false
      this.showFeatureBox = false
      this.showVoiceCom = false
      this.showSendBtn = false
      this.viewHeight = `${-132}`
      this.isUserTouch = false
      this.hasNewMessage = false
      this.loginUser = User.get()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      for (var i = 0; i < self.allowChatModule.length; i++) {
        if (this.query.fromModule === self.allowChatModule[i]) {
          self.allowChat = true
          break
        }
      }
      if (self.allowChat || this.loginUser.isretailer === 1) {
        const usergroup = this.loginUser.usergroup
        if (usergroup && usergroup.length > 0) {
          for (let i = 0; i < usergroup.length; i++) {
            if (usergroup[i] === 3) {
              this.showUserInfo = true
              break
            }
          }
        }
        this.setViewHeight()
        this.getData()
        this.getProduct()
        this.getRetailerInfo()
        this.createSocket()
      } else if (this.loginUser.isretailer === 2) {
        self.$vux.confirm.show({
          content: ENV.vipChat,
          cancelText: ENV.giveUpVipText,
          confirmText: ENV.openVipText,
          onCancel () {
            self.$router.push('/centerSales')
          },
          onConfirm () {
            location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
          }
        })
      }
    }
  },
  // created () {
  //   this.checkRecordApi()
  // },
  mounted () {
    // console.log('mounted')
    // this.$util.wxPreviewImage('#chat-room')
    // this.$refs.scrollContainer.scrollTop = this.$refs.scrollContent.clientHeight
  },
  activated () {
    this.$util.miniPost()
    this.refresh()
  }
}
</script>
<style lang="less">
#chat-room {
  height: 100%;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#chat-room .bottom-area {
  position: absolute;
  bottom: 0px;
  z-index: 500;
  width: 100%;
  box-sizing: border-box;
}
#chat-room .input-box {
  padding: 0 8px;
  display: flex;
}
#chat-room .input-box,
#chat-room .textarea-box {
  background-color: #f0f0f0;
}
#chat-room .input-box:before {
  content: ' ';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  border-top: 1px solid #d7d7d7;
}
#chat-room .input-box .input-cell {
  flex: 1;
  margin: 8px;
  position: relative;
}
#chat-room .input-box .input-cell textarea{
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
#chat-room .input-box .voice-cell,
#chat-room .input-box .emotion-cell,
#chat-room .input-box .feature-cell,
#chat-room .input-box .add-cell {
  display: flex;
  align-items: center;
}
#chat-room .input-box .voice-btn,
#chat-room .input-box .emotion-btn,
#chat-room .input-box .keyboard-btn,
#chat-room .input-box .feature-btn {
  display: inline-block;
}
#chat-room .input-box .voice-cell img,
#chat-room .input-box .emotion-cell img,
#chat-room .input-box .feature-cell img,
#chat-room .input-box .add-cell img {
  width: 28px;
  height: 28px;
  vertical-align: middle;
}
#chat-room .input-box .emotion-cell {
  margin-right: 8px
}
#chat-room .weui-cells,
#chat-room .vux-no-group-title {
  margin-top: 0;
}
#chat-room .feature-icon {
  margin: auto;
}
#chat-room .invisable-form input {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
#chat-room .talk-btn {
  font-size: 16px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1
}
#chat-room .input-cell .weui-cells {
  margin-top: 0;
}
#chat-room .weui-cell {
  padding: 0;
}
#chat-room .weui-grid__icon {
  width: 50px;
  height: 50px;
  border: #d8d8d8 1px solid;
  border-radius: 8px;
  background-color: #fbfbfb;
  display: flex;
  align-items: center;
}
#chat-room .weui-grid:after {
  height: 0;
  border-bottom: none;
}

#chat-room .message-tips {
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

#chat-room .new-voice-tips {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  right: -15px;
  top: 13px;
}

// #chat-room .chat-area{
//   position:absolute;
//   left:0;
//   top:0;
//   right:0;
//   bottom:52px;
//   overflow-y:auto;
// }
.chat-area *{box-sizing: border-box;}
.chatlist {
  padding: 0 10px;
  line-height: 1.1;
}
// .chatlist *{
//   box-sizing: border-box;
// }
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
