/*
* @description: 问答式订单生成页
* @auther: gyp
* @created_date: 2019-02-26
*/
<template>
  <div class="font14 containerarea order-chat-page notop">
    <scroller id="order-chat-scoller" lock-x scrollbar-y :pulldown-config="{downContent: '', upContent: ''}" @touchend.native="touchContainer" :height="viewHeight" class="chat-area bg-white" ref="scrollContainer">
      <div class="chatlist" ref="scrollContent">
        <div v-for="(item,index) in messageList" :key="index" :class="`chatitem ${getItemClass(item)}`">
          <router-link class="head" :to="{path: '/membersView', query: {uid: item.uid}}">
            <img :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
          </router-link>
          <div class="name disusername">{{item.linkman}}</div>
          <div class="msg">
            <template v-if="item.type == 'photo'">
              <div class="main message-text" @click="showBigimg(item,`previewer${index}`)">
                <img :src="item.picurl" @load="imageLoad(item)" container="#order-chat-scoller"/>
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
        <div v-if="showOrder" class="chatitem left order-item">
          <router-link class="head" :to="{path: '/membersView', query: {uid: chatUser.uid}}">
            <img :src="chatUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
          </router-link>
          <div class="name disusername">{{chatUser.linkman}}</div>
          <div class="msg">
            <div class="main message-text">
              <div class="table">
                <div class="tr" v-for="(item,index) in orderData" :key="index">
                  <div class="td flex_center" v-html="item.title"></div>
                  <div class="td flex_left">
                    <template v-if="item.type === 'photo' && item.photoarr && item.photoarr.length">
                      <template v-for="(photo,index1) in item.photoarr">
                        <img :src="photo"/>
                      </template>
                    </template>
                    <template v-else>
                      <div v-html="item.content"></div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="align_center mt10 color-theme">请核对订单信息是否有误？</div>
              <div class="mt10 db-flex">
                <div class="flex_cell flex_left">
                  <div class="color-theme font12 flex_center" style="border:#ff6a61 1px solid;width:100px;" @click="rewriteOrder">有误，重新填写</div>
                </div>
                <div class="flex_cell flex_right">
                  <div class="font12 flex_center" style="color:#00d449;border:#00d449 1px solid;width:100px;" @click="confirmOrder">正确，立即购买</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <div class="bottom-area" ref="bottomArea" :style="{'bottom': `${bottomPos}px`}">
      <div class="input-box">
        <div class="input-cell">
          <group class="textarea-box">
            <x-textarea v-model='message' ref="text" @on-change="inputText" @on-focus="onFocus" @on-blur="onBlur" :max="2000" :rows="1" :autosize="true" :show-counter="false"></x-textarea>
          </group>
        </div>
        <div v-if="askData[askIndex].msgtype != 'photo'" class="send-cell flex_center">
          <div v-if="showSendBtn" class="btn-send" @click="sendMessage">发送</div>
          <div v-else class="btn-send disabled">发送</div>
        </div>
        <div v-else class="feature-cell">
          <div class="feature-btn" @click.prevent.stop="sendPhoto">
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
import { Scroller, Group, XTextarea, Popup, TransferDom, Previewer } from 'vux'
import ENV from 'env'
import {User} from '#/storage'
import Reg from '#/reg'

const prefix = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : ''
const BokaApi = ENV.BokaApi
let intervalId = null

export default {
  directives: {
    TransferDom
  },
  components: {
    Scroller, Group, XTextarea, Popup, Previewer
  },
  data () {
    return {
      query: {},
      loginUser: {},
      retailerInfo: {},
      askIndex: 0,
      askData: [
        {type: 'ask', content: '请问您的收货地址是哪里？', asktype: 'address'},
        {type: 'ask', content: '请问您的手机号码是多少？', asktype: 'telephone'},
        {type: 'ask', content: '请将您要购买的商品图片发送给我', msgtype: 'photo', asktype: 'photo'},
        {type: 'ask', content: '您要购买几件？<br>想要购买的型号或颜色是什么呢？', asktype: 'options'},
        {type: 'ask', content: '好的，正在为您生成订单，如有其它备注请留言？', asktype: 'content'}
      ],
      messageList: [],
      showSendBtn: false,
      bottomPos: 0,
      isUserTouch: false,
      message: '',
      currentUser: {},
      chatUser: {},
      answerData: [],
      showOrder: false,
      orderKey: {'address': '收货地址', 'telephone': '联系电话', 'photo': '购买商品', 'options': '购买件数<br>型号/颜色', 'content': '其它备注'},
      orderData: [],
      postOrderData: {'address': '', 'telephone': '', 'photo': '', 'options': '', 'content': ''},
      viewHeight: `${-55}`
    }
  },
  methods: {
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
    imageLoad (item) {
      this.setScrollToBottom()
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
    getItemClass (item) {
      const self = this
      let ret = ''
      if (item.uid === parseInt(self.query.uid)) {
        ret = `${ret}left`
      } else {
        ret = `${ret}right`
      }
      return ret
    },
    showBigimg (item, refname) {
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
    inputText (value) {
      const self = this
      this.message = value
      if (this.$util.trim(value) === '') {
        this.showSendBtn = false
      } else {
        this.showSendBtn = true
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
    setScrollToBottom (isTouch) {
      this.isUserTouch = typeof isTouch !== 'undefined' ? isTouch : this.isUserTouch
      if (this.isUserTouch) return
      this.$nextTick(() => {
        const self = this
        if (this.$refs.scrollContent) {
          let scrollContainer = this.$refs.scrollContainer.$el ? this.$refs.scrollContainer.$el : this.$refs.scrollContainer
          if (this.$refs.scrollContent.clientHeight < scrollContainer.clientHeight) return
          setTimeout(() => {
            const top = self.$refs.scrollContent.clientHeight - scrollContainer.clientHeight
            self.$refs.scrollContainer.reset({ top: top })
          }, 100)
        }
      })
    },
    createOrder () {
      this.orderData = []
      for (let key in this.orderKey) {
        let curarr = []
        for (let i = 0; i < this.answerData.length; i++) {
          let cur = this.answerData[i]
          if (cur.status !== 0 && cur.asktype === key) {
            curarr.push(cur.content)
          }
        }
        let pushData = {title: this.orderKey[key], type: key, content: ''}
        if (curarr.length > 0) {
          pushData.content = curarr.join(',')
          if (key === 'photo') {
            pushData.photoarr = curarr
          }
        }
        this.orderData.push(pushData)
        this.postOrderData[key] = pushData.content
      }
      this.postOrderData = {linkman: this.loginUser.linkman, uid: this.loginUser.uid, wid: this.chatUser.uid, ...this.postOrderData}
      this.showOrder = true
      this.setScrollToBottom(false)
      console.log(this.postOrderData)
    },
    disNextAsk () {
      if (this.askIndex + 1 < this.askData.length) {
        this.askIndex++
        this.messageList.push({...this.chatUser, ...this.askData[this.askIndex]})
      }
      if (this.askIndex + 1 === this.askData.length) {
        setTimeout(() => {
          this.createOrder()
        }, 2000)
      }
    },
    uploadPhotoCallback (data) {
      if (data.flag === 1 && data.data) {
        let pushData = {picurl: data.data, content: data.data, type: 'photo', asktype: 'photo', ...this.currentUser}
        this.answerData.push(pushData)
        this.messageList.push(pushData)
        setTimeout(() => {
          this.disNextAsk()
        }, 500)
        this.setScrollToBottom(false)
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
            this.uploadPhotoCallback(data)
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
            self.uploadPhotoCallback(data)
          }
        })
      } else {
        this.$refs.uploadInput.click()
      }
    },
    sendMessage () {
      let postContent = this.message
      if (this.$util.trim(postContent) === '') {
        return false
      }
      let pushData = {...this.currentUser, content: postContent, asktype: this.askData[this.askIndex].asktype}
      this.answerData.push(pushData)
      this.messageList.push(pushData)
      this.message = ''
      this.showSendBtn = false
      setTimeout(() => {
        this.disNextAsk()
      }, 500)
      this.setScrollToBottom(false)
    },
    rewriteOrder () {
      this.askIndex = 0
      for (let i = 0; i < this.messageList.length; i++) {
        this.messageList[i].status = 0
      }
      this.showOrder = false
      this.answerData = []
      let msg = {...this.chatUser, ...this.askData[0]}
      this.messageList.push(msg)
    },
    confirmOrder () {
      console.log(this.answerData)
      this.$vux.loading.show()
      this.$http.post(`${BokaApi}/api/ordersoffline/add`, this.postOrderData).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              this.$router.push({path: '/simpleOrderDetail', query: {id: data.data}})
            }
          }
        })
      })
    },
    initData () {
      this.viewHeight = `${-55}`
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      this.loginUser = User.get()
      this.query = this.$route.query
      this.currentUser = {avatar: this.loginUser.avatar, uid: this.loginUser.uid, linkman: this.loginUser.linkman}
      this.$http.get(`${BokaApi}/api/retailer/info`, {
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
        this.setViewHeight()
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.order-chat-page{
  .chat-area *{box-sizing: border-box;}
  .chatlist{
    padding: 10px;line-height: 1.1;
    .chatitem {
      position: relative;padding-bottom: 20px;
      .head {
        position: absolute;top: 0;width: 36px;height: 36px;overflow: hidden;
        img {width: 100%;}
      }
      .name {margin-left:40px;margin-bottom: 3px;font-size: 12px;color: #999;transform: scale(0.9);}
      .msg {
        margin: 0 0px 0 50px;
        .main {
        	display: inline-block;position: relative;
          padding: 5px;background:#fff;border: 1px solid #dedede;
          min-width: 30px;max-width: 200px;
        	border-radius: 5px;line-height: 24px;
        	word-wrap: break-word;word-break: break-all;
          img{max-width: 150px;vertical-align: middle;}
        }
        .main:before,.main:after {
        	position: absolute;z-index: 1;top: 13px;
        	content: "";width: 0;height: 0;
        	border-top: 5px solid transparent;
        	border-bottom: 5px solid transparent;
        }
      }
    }
    .chatitem.left{
      padding-right:50px;
      .head {left: 0;}
      .msg{
        .main:before,.main:after {border-right: 5px solid #fff;left: -5px;}
        .main:after {z-index: 0;left: -6px;border-right: 5px solid #dedede;}
        .discontent{text-align:left;}
      }
    }
    .chatitem.right{
      padding-left:50px;
      .head {right: 0;}
      .name {margin-right:40px;text-align:right;}
      .msg {
        margin: 0 50px 0 0;text-align:right;
        .main{background:#00d449;color:#fff;border: 1px solid #00d449;text-align:left;}
        .main:before,.main:after {border-left: 5px solid #00d449;right:-5px;}
        .main:after {z-index: 0;right: -6px;border-left: 5px solid #00d449;}
        .discontent{text-align:right;}
      }
    }
    .chatitem.message-pic{
      .msg{
        .main{background-color:#fff;}
      }
    }
    .chatitem.left.message-pic{
      .msg{
        .main:before{border-right: 5px solid #fff;}
      }
    }
    .chatitem.right.message-pic .msg .main:before{
    	border-left: 5px solid #fff;
    }
  }
  .bottom-area {position: absolute;bottom: 0px;z-index: 500;width: 100%;box-sizing: border-box;}
  .input-box,.textarea-box {background-color: #f0f0f0;}
  .input-box:before {
    content: ' ';position: absolute;top: 0;right: 0;left: 0;
    height: 1px;border-top: 1px solid #d7d7d7;
  }
  .input-box {
    padding: 0 8px;display: flex;
    .input-cell {
      flex: 1;margin: 8px;position: relative;
      textarea{
        width: 100%;padding: 8px;min-height: 35px;max-height: 106px;box-sizing: border-box;
        border: 1px solid #d7d7d7;border-radius: 6px;background-color: #fafafa;
        caret-color: blue;font-size: 16px;box-shadow: none;line-height: 18px;
        resize: none;-webkit-appearance: none;
      }
    }
    .feature-cell,.add-cell {
      display: flex;align-items: center;
      img {width: 28px;height: 28px;vertical-align: middle;}
    }
    .weui-cell {padding: 0;}
    .weui-cells,.vux-no-group-title {margin-top: 0;}
    .btn-send{
      background-color:#00d449;color:#fff;width:40px;text-align:center;font-size:13px;line-height:35px;border-radius:5px;
    }
    .btn-send.disabled{background-color:#ccc;}
  }
  .order-item.chatitem .msg .main{min-width:220px;}
  .order-item{
    .table{
      border:#000 1px solid;
      .tr:not(:last-child){border-bottom:#ccc 1px solid;}
      .tr{
        display:flex;font-size:12px;
        .td:nth-child(1){width:80px;}
        .td:nth-child(2){flex:1;padding:10px;}
        .td:not(:last-child){border-right:#ccc 1px solid;}
      }
      img{display:block;width:50px;max-width:100%;}
    }
  }
}
</style>
