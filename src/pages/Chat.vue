/*
* @description: 聊天室页
* @auther: simon
* @created_date: 2018-4-23
*/
<template>
  <div id="chat-room" class="font14">
    <scroller id="chat-scoller" lock-x scrollbar-y use-pulldown :pulldown-config="{downContent: '查看历史消息', upContent: '查看历史消息'}" @on-pulldown-loading="loadingHistory" :height="viewHeight" class="chat-area bg-white scroll-container" ref="scrollContainer">
      <div class="chatlist" ref="scrollContent">
        <template v-for="(item,index) in data">
          <div v-if="index == 0" class="messages-date">{{item.dateline | dateFormat}}</div>
          <div v-else-if="index + 1 < data.length && data[index].dateline - data[index - 1].dateline > diffSeconds" class="messages-date">{{data[index].dateline | dateFormat}}</div>
          <div v-else-if="index + 1 == data.length && data[index].dateline - data[index - 1].dateline > diffSeconds" class="messages-date">{{data[index].dateline | dateFormat}}</div>
          <div :class="`chatitem ${getitemclass(item)}`">
            <router-link class="head" :to="{path: '/membersView', query: {uid: item.uid}}">
              <img :src="item.avatar">
            </router-link>
            <div class="name disusername">{{item.username}}</div>
            <div class="msg">
              <!-- <div :class="`main message-text${item.voiceClass||''}`" @click="clickMessageItem(item)"> -->
              <template v-if="item.msgtype == 'image'">
                <div class="main message-text">
                  <x-img class="wx__img-preview" :src="item.picurl" @on-success="imageLoad(item)" container="#chat-scoller"></x-img>
                </div>
              </template>
              <template v-else-if="item.msgtype == 'news'">
                <div class="main message-text">
                  <div class="scroll_item">
          					<div class="con">
          						<router-link :to="news.link" v-for="(news, index1) in item.newsdata" :key="index1">
          							<div class="pic">
          								<div class="img_background v_bottom" :style="`background-image: url(${getPhoto(news.photo)});`"></div>
          								<span class="title">{{news.title}}</span>
          							</div>
          						</router-link>
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
                  <div class="min">
                    <span class="discontent">{{item.content | secondsFormat}}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="main message-text">
                  <div v-html="filterEmot(item.content)"></div>
                </div>
              </template>
              <!-- </div> -->
            </div>
          </div>
        </template>
      </div>
    </scroller>
    <div class="bottom-area" ref="bottomArea">
      <div class="input-box no-select">
        <div class="voice-cell">
          <a class="voice-btn" @click.stop="toggleVoice" v-if="!showVoiceCom">
            <img src="../assets/images/icon-voice.png"/>
          </a>
          <a v-else class="emotion-btn" @click="toggleKeyboard">
            <img src="../assets/images/icon-keyboard.png"/>
          </a>
        </div>
        <div class="input-cell">
          <group class="textarea-box">
            <x-textarea v-model='msgcontent' ref="text" id="chat-textarea" @click.native="onTextClick" @on-focus="onFocus" @on-blur="onBlur" :max="2000" :rows="1" :autosize="true" :show-counter="false"></x-textarea>
          </group>
          <x-button class="talk-btn no-select" v-show="showVoiceCom" @touchstart.native.prevent="onTalkRecord" @touchend.native="onTalkRecordStop">{{$t('Press And Talk')}}</x-button>
        </div>
        <div class="emotion-cell">
          <a v-if="!showEmotBox" class="emotion-btn" @click="toggleEmotion">
            <img src="../assets/images/icon-face.png"/>
          </a>
          <a v-else class="emotion-btn" @click="toggleKeyboard">
            <img src="../assets/images/icon-keyboard.png"/>
          </a>
        </div>
        <div v-if="showSend" class="send-cell flex_center">
          <div class="bg-green color-white w40 align_center font13" style="line-height:35px;border-radius:5px;" @click="sendMessage">发送</div>
        </div>
        <div v-else class="feature-cell">
          <a class="feature-btn" @click.prevent.stop="toggleFeatureBoard">
            <img src="../assets/images/icon-add.png"/>
          </a>
        </div>
      </div>
      <emotion-box v-show="showEmotBox" bind-textarea="chat-textarea" :click-callback="clickEmotionCallback">
      </emotion-box>
      <form class="uploadImageForm hide" enctype="multipart/form-data" ref="uploadForm">
        <input style="opacity:0;" type="file" name="files" @change="pcUploadImg" ref="uploadInput"/>
      </form>
      <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false" v-show="showFeatureBox" class="bg-white">
        <grid-item @click.native="sendPhoto">
          <span slot="icon" class="feature-icon al al-zhaopian color-gray"></span>
          <span slot="label" class="color-gray">{{$t('Photo')}}</span>
        </grid-item>
        <grid-item @click.native="showImgTxtPopup">
          <span slot="icon" class="feature-icon al al-tuwen color-gray"></span>
          <span slot="label" class="color-gray">{{$t('Image Text')}}</span>
        </grid-item>
        <grid-item @click.native="viewUserInfo">
          <span slot="icon" class="feature-icon al al-yonghuxinxi color-gray"></span>
          <span slot="label" class="color-gray">{{$t('User Info')}}</span>
        </grid-item>
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
              <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
            </tab>
          </div>
          <div class="popup-middle font14" style="top:149px;">
            <swiper v-model="tabmodel" class="x-swiper no-indicator" @on-index-change="swiperChange">
              <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
                <div v-if="(index == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll1">
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
                          <x-img class="v_middle imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:40px;height:40px;" :offset="0" container=".scroll-container1" ></x-img>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1">{{item.title}}</div>
                        </div>
                      </div>
                    </check-icon>
                  </div>
                </div>
                <div v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll2">
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
                          <x-img class="v_middle imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:40px;height:40px;" :offset="0" container=".scroll-container2" ></x-img>
                        </div>
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1">{{item.title}}</div>
                          <div class="mt5 font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
                        </div>
                      </div>
                    </check-icon>
                  </div>
                </div>
                <div v-if="(index == 2)" class="pl10 pr10">
                </div>
              </swiper-item>
            </swiper>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closeImgTxtPopup">{{ $t('Close') }}</div>
            <div class="flex_cell flex_center h_100 bg-green color-white" @click="sendImgTxt">{{ $t('Confirm txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Scroller, Group, XTextarea, Grid, GridItem, XButton, Popup, TransferDom, Tab, TabItem, Swiper, SwiperItem, Search, XImg, CheckIcon } from 'vux'
import EmotionBox from '@/components/EmotionBox'
import ENV from 'env'
import { User } from '#/storage'
import Time from '#/time'
import Socket from '#/socket'
import Voice from '#/voice'

let room = ''
let minIdFlag = 0
let intervalId = null
export default {
  directives: {
    TransferDom
  },
  components: {
    Scroller, Group, XTextarea, Grid, GridItem, XButton, EmotionBox, Popup, Tab, TabItem, Swiper, SwiperItem, Search, XImg, CheckIcon
  },
  data () {
    return {
      // roomid: '',
      module: 'message',
      loginUser: {},
      showEmotBox: false,
      showFeatureBox: false,
      showVoiceCom: false,
      textarea: null,
      isPC: this.$util.isPC(),
      query: {},
      data: [],
      // focusInterval: null,
      viewHeight: '-52',
      msgcontent: '',
      showSend: false,
      diffSeconds: 300,
      pagestart: 0,
      limit: 5,
      msgType: 'text',
      client_list: '',
      uid_list: [],
      to_client_id: '',
      to_client_name: '',
      msgTextarea: null,
      showImgTxt: false,
      tabmodel: 0,
      tabtxts: [ '文章', '产品', '外链' ],
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
      limit1: 10,
      selectNewsData: null,
      selectProductsData: null
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
    showSend () {
      return this.showSend
    },
    showEmotBox () {
      this.setViewHeight()
    },
    showFeatureBox () {
      this.setViewHeight()
    }
  },
  methods: {
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    onTextClick () {
      this.showEmotBox = false
    },
    onFocus () {
      this.showFeatureBox = false
      intervalId = setInterval(function () {
        document.body.scrollTop = document.body.scrollHeight
      }, 200)
    },
    onBlur () {
      clearInterval(intervalId)
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
        this.showVoiceCom = true
      }
    },
    toggleEmotion () {
      if (this.showVoiceCom) {
        this.showVoiceCom = false
      }
      if (this.showFeatureBox) {
        this.showFeatureBox = false
      }
      this.showEmotBox = true
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
      } else {
        this.showFeatureBox = false
        this.$refs.text.$refs.textarea.focus()
      }
    },
    setViewHeight () {
      const self = this
      this.$nextTick(() => {
        self.viewHeight = `${-this.$refs.bottomArea.clientHeight}`
        self.setScrollToBottom()
      })
    },
    clickMessageItem (item) {
      const self = this
      if (item.msgtype === 'voice') {
        if (item.mediaLid) { // stop voice
          this.data = this.$util.changeItem(this.data, item.id, match => {
            match.voiceClass = ''
            match.voicePlaying = false
            return match
          })
          Voice.playStop(item.mediaLid)
          item.mediaLid = null
        } else { // play voice
          this.data = this.$util.changeItem(this.data, item.id, match => {
            match.voiceClass = ' playing'
            return match
          })
          Voice.play(item.mediaid,
            localId => { // donwload voice
              item.mediaLid = localId
            },
            localId => { // voice playing end
              self.data = self.$util.changeItem(self.data, item.id, match => {
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
      console.log(item.id +'>'+ minIdFlag)
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
          const data = res.data
          self.$vux.loading.hide()
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
      Voice.record(res => {
        self.sendVoice({vid: res.serverId, time: res.time})
      })
    },
    onTalkRecordStop () {
      const self = this
      Voice.recordStop(res => {
        self.sendVoice({vid: res.serverId, time: res.time})
      },
      res => {
        self.$vux.toast.text('录音时间过短', 'middle')
      })
    },
    // viewUserInfo () {
    // },
    getitemclass (item) {
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
      const minId = this.data[0].id
      // minIdFlag = minId
      this.getMessages(minId)
    },
    sendData (postdata) {
      const self = this
      if (self.query.frommodule) {
        let frommoduleid = self.query.frommoduleid ? self.query.frommoduleid : self.query.moduleid
        postdata.frommodule = self.query.frommodule
        postdata.frommoduleid = frommoduleid
      }
      self.$http.post(`${ENV.BokaApi}/api/message/send`, postdata).then(res => {
        const data = res.data
        if (data.flag === 1) {
          let retdata = data.data
          let senddata = {
            module: postdata.module,
            type: 'say',
            from_uid: self.loginUser.uid,
            to_client_id: self.query.uid,
            messageid: retdata.id,
            room_id: room,
            ...retdata
          }
          // console.log(senddata)
          Socket.send(senddata)
          self.msgTextarea.value = ''
          self.msgcontent = ''
          self.showSend = false
          self.showEmotBox = false
          self.msgTextarea.focus()
        }
      })
    },
    clickEmotionCallback () {
      const self = this
      self.msgcontent = self.msgTextarea.value
      self.setSendStatus()
    },
    sendMessage () {
      const self = this
      self.msgcontent = self.msgTextarea.value
      let postdata = {
        touid: this.query.uid,
        content: this.msgcontent,
        module: this.module,
        sendtype: 'text',
        picurl: '',
        thumb: '',
        inroom: 1,
        isNew: true
      }
      if (!self.$util.isNull(postdata.content)) {
        postdata.content = postdata.content.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r')
      }
      if (self.msgType === 'text' && self.$util.trim(postdata.content) === '') {
        return false
      }
      self.sendData(postdata)
    },
    // wsConnect () {
    //   const self = this
    //   websocket = new WebSocket(ENV.SocketApi)
    //   let smalluid = self.query.uid < self.loginUser.uid ? self.query.uid : self.loginUser.uid
    //   let biguid = self.query.uid > self.loginUser.uid ? self.query.uid : self.loginUser.uid
    //   self.roomid = `${ENV.SocketBokaApi}-message-${smalluid}-${biguid}`
    //   websocket.onopen = function () {
    //     let loginData = {
    //       type: 'login',
    //       uid: self.loginUser.uid,
    //       client_name: self.loginUser.linkman.replace(/"/g, '\\"'),
    //       room_id: self.roomid
    //     }
    //     if (self.query.frommodule) {
    //       loginData.frommodule = self.query.frommodule
    //       loginData.fromid = self.query.fromid
    //     }
    //     websocket.send(JSON.stringify(loginData))
    //   }
    //   websocket.onmessage = function (e) {
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
    //         newsdata: edata.newsdata,
    //         isNew: edata.isNew
    //       }
    //       self.data.push(saydata)
    //       if (saydata.isNew) {
    //         let scrollarea = self.$refs.scrollContainer
    //         if (scrollarea.offsetHeight + scrollarea.scrollTop + 180 > scrollarea.scrollHeight) {
    //           scrollarea.scrollTop = scrollarea.scrollHeight + 50
    //         }
    //       }
    //     }
    //   }
    //   websocket.onclose = function () {
    //     console.log('ws closed')
    //     self.wsConnect()
    //   }
    //   websocket.onerror = function () {
    //     console.log('ws error')
    //   }
    // },
    setSendStatus () {
      const self = this
      let val = self.msgTextarea.value.toString()
      if (self.$util.trim(val) === '') {
        self.showSend = false
      } else {
        self.showSend = true
      }
    },
    showImgTxtPopup () {
      const self = this
      this.showImgTxt = true
      this.showFeatureBox = false
      self.$vux.loading.show()
      self.getNewsData()
    },
    closeImgTxtPopup () {
      this.showImgTxt = false
    },
    sendImgTxt () {
      const self = this
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
      const self = this
      if (index === 0 && self.newsData.length === 0) {
        self.$vux.loading.show()
        self.getNewsData()
      } else if (index === 1 && self.productsData.length === 0) {
        self.$vux.loading.show()
        self.getProductData()
      }
    },
    handleScroll1 () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer1[0],
        callback: function () {
          if (self.newsData.length === (self.pagestart1 + 1) * self.limit1) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getNewsData()
          }
        }
      })
    },
    handleScroll2 () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer2[0],
        callback: function () {
          if (self.productsData.length === (self.pagestart2 + 1) * self.limit1) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getProductData()
          }
        }
      })
    },
    setScrollToTop () {
      this.$nextTick(() => {
        this.$refs.scrollContainer.reset({ top: 0 })
      })
    },
    setScrollToBottom () {
      this.$nextTick(() => {
        setTimeout(() => {
          const top = this.$refs.scrollContent.clientHeight - this.$refs.scrollContainer.$el.clientHeight
          this.$refs.scrollContainer.reset({ top: top })
        }, 1)
      })
    },
    getNewsData () {
      const self = this
      let params = { from: 'retailer', pagestart: self.pagestart1, limit: self.limit1 }
      let keyword = self.searchword1
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
      let keyword = self.searchword2
      let params = { pagestart: self.pagestart2, limit: self.limit1 }
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult2 = true
        params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/list/product?from=retailer`, {
        params: params
      }).then(function (res) {
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
      const module = this.query.frommodule
      const fromId = this.query.fromId
      room = `${this.module}-${sid}-${bid}`
      Socket.create()
      Socket.listening({ room: room, uid: uid, linkman: linkman, fromModule: module, fromId: fromId }, item => {
        item.dateline = new Date(item.time).getTime() / 1000
        // console.log(item.dateline)
        self.data.push(item)
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
          self.$vux.loading.hide()
          const data = res.data.data
          self.data = data.concat(self.data)
          callback && callback()
        } else {
          self.$vux.toast.text('加载失败，稍后再试', 'middle')
        }
      })
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'chat', id: this.query.uid
      })
      const self = this
      // const params = { uid: this.query.uid, pagestart: this.pagestart, limit: this.limit }
      this.getMessages(() => {
        minIdFlag = self.data[0].id
        self.setScrollToBottom()
      })
    },
    // init () {
    //   this.loginUser = User.get()
    // },
    refresh () {
      room = ''
      minIdFlag = 0
      this.data = []
      this.loginUser = User.get()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.getData()
      this.createSocket()
      // this.wsConnect()
    }
  },
  // created () {
  //   this.init()
  // },
  mounted () {
    const self = this
    this.$util.wxPreviewImage('#chat-room')
    this.setViewHeight()
    this.msgTextarea = document.querySelector('#chat-textarea textarea')
    this.msgTextarea.addEventListener('focus', function () {
      self.setSendStatus()
    })
    this.msgTextarea.addEventListener('keyup', function () {
      self.setSendStatus()
    })
    // this.$refs.scrollContainer.scrollTop = this.$refs.scrollContent.clientHeight
  },
  activated () {
    this.refresh()
  },
  beforeRouteLeave (to, from, next) {
    Socket.destory(room)
    next()
  }
}
</script>
<style lang="less">
#chat-room {
  height: 100%;
}
#chat-room .bottom-area {
  position: absolute;
  z-index: 500;
  bottom: 0;
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

// #chat-room .chat-area{
//   position:absolute;
//   left:0;
//   top:0;
//   right:0;
//   bottom:52px;
//   overflow-y:auto;
// }
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
.chatlist .chatitem .msg .discontent{text-align:left;}
.chatlist .chatitem .msg .main {
	display: inline-block;
  position: relative;
  padding: 5px;
	background:#fff;
  border: 1px solid #dedede;
  min-width:40px;
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
.chatlist .chatitem.right .msg .main{background:#00d449;color:#fff;border: 1px solid #00d449;}
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
	width: 50px;
  height:30px;
  line-height: 30px;
	position: absolute;
  top: 0;
  color: #cccccc;
}
.chatlist .chatitem.left .msg .main .min {right: -58px; top: 3px;}
.chatlist .chatitem.right .msg .main .min {left: -58px; top: 3px;}
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
