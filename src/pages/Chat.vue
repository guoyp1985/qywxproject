/*
* @description: 聊天室页
* @auther: simon
* @created_date: 2018-4-23
*/
<template>
  <div id="chat-room">
    <div class="chat-area bg-white">
      <div class="chatlist">
        <div class="messages-date">03-24 13:01</div>
        <template v-for="(item,index) in data">
          <div :class="`chatitem ${ getitemclass(item) }`">
            <router-link class="head" :to="{path: '/membersView', query: {uid: item.uid}}">
              <img :src="item.avatar">
            </router-link>
            <div class="name disusername">{{ item.username }}</div>
            <div class="msg">
              <div class="main message-text">
                <template v-if="item.msgtype == 'image'">
                  <img :src="item.picurl" />
                </template>
                <template v-else-if="item.msgtype == 'news'">
                  <div class="scroll_item">
          					<div class="con">
          						<router-link :to="{path: '/news'}">
          							<div class="pic">
          								<div class="img_background v_bottom" style="background-image: url(http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg);"></div>
          								<span class="title">诚挚邀请你成为我的返点客户，为你带来更多收益！</span>
          							</div>
          						</router-link>
          					</div>
          				</div>
                </template>
                <template v-else>
                  <div v-html="item.content"></div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div slot="bottom" class="bottom-area">
      <div class="input-box">
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
            <x-textarea v-model='msgcontent' ref="text" id="chat-textarea" @click.native="onTextClick" @on-change="onChange" @on-focus="onFocus" @on-blur="onBlur" :max="2000" :rows="1" :autosize="true" :show-counter="false"></x-textarea>
          </group>
          <x-button class="talk-btn no-select" v-show="showVoiceCom">{{$t('Press And Talk')}}</x-button>
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
          <div class="bg-green color-white w40 align_center font13" style="line-height:35px;border-radius:5px;" @click="sendEvent">发送</div>
        </div>
        <div v-else class="feature-cell">
          <a class="feature-btn" @click.prevent.stop="toggleFeatureBoard">
            <img src="../assets/images/icon-add.png"/>
          </a>
        </div>
      </div>
      <emotion-box v-show="showEmotBox" bind-textarea="chat-textarea">
      </emotion-box>
      <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false" v-show="showFeatureBox">
        <grid-item @click.native="sendPhoto">
          <span slot="icon" class="feature-icon al al-zhaopian color-gray"></span>
          <span slot="label" class="color-gray">{{$t('Photo')}}</span>
          <div v-if="isPC" class="invisable-form">
            <form enctype="multipart/form-data">
              <input type="file" name="files"/>
            </form>
          </div>
        </grid-item>
        <grid-item @click.native="sendImgTxt">
          <span slot="icon" class="feature-icon al al-tuwen color-gray"></span>
          <span slot="label" class="color-gray">{{$t('Image Text')}}</span>
        </grid-item>
        <grid-item @click.native="viewUserInfo">
          <span slot="icon" class="feature-icon al al-yonghuxinxi color-gray"></span>
          <span slot="label" class="color-gray">{{$t('User Info')}}</span>
        </grid-item>
      </grid>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      intervalId: null,
      showEmotBox: false,
      showFeatureBox: false,
      showVoiceCom: false,
      textarea: null,
      isPC: this.$util.isPC(),
      query: Object,
      data: [
        {
          'id': 0,
          'uid': '51',
          'username': '系统提示',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg',
          'touid': '51',
          'content': '成交概率:80.26%<br>返点客户:贪吃小松鼠<br>最近浏览:Bose qc30<br>浏览最长:(2396秒)<br>地区:北京北京<br><font color="orange">建议交流内容:促销活动</font>',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1525423983,
          'siteid': '',
          'mediaid': '',
          'msgtype': 'text',
          'picurl': '',
          'msgid': 0,
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 0,
          'systemtip': true,
          'unreadNumber': 0
        },
        {
          'id': -1,
          'uid': '51',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg',
          'username': '',
          'touid': '51',
          'content': '成交概率:80.26%<br>返点客户:贪吃小松鼠<br>最近浏览:Bose qc30<br>浏览最长:(2396秒)<br>地区:北京北京<br><font color="orange">建议交流内容:促销活动</font>',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1525423983,
          'siteid': '',
          'mediaid': '',
          'msgtype': 'image',
          'picurl': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201802/15179669942179.jpg',
          'msgid': 0,
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 0,
          'systemtip': true,
          'unreadNumber': 0
        }, {
          'id': 607,
          'uid': 187,
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          'username': 'YOUNG',
          'touid': 51,
          'content': 'retailer_saleapply_187',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1524144452,
          'siteid': null,
          'mediaid': '',
          'msgtype': 'news',
          'picurl': '',
          'msgid': '0',
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 0,
          'type': '',
          'unreadNumber': 0
        }, {
          'id': 606,
          'uid': 51,
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg',
          'username': '贪吃小松鼠',
          'touid': 187,
          'content': '1',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1524108093,
          'siteid': null,
          'mediaid': '',
          'msgtype': 'text',
          'picurl': '',
          'msgid': '0',
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 1,
          'type': '',
          'unreadNumber': 0
        }, {
          'id': 550,
          'uid': 187,
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          'username': 'YOUNG',
          'touid': 51,
          'content': 'retailer_saleapply_187',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1523673400,
          'siteid': null,
          'mediaid': '',
          'msgtype': 'news',
          'picurl': '',
          'msgid': '0',
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 1,
          'type': '',
          'unreadNumber': 0
        }, {
          'id': 539,
          'uid': 187,
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          'username': 'YOUNG',
          'touid': 51,
          'content': 'hello',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1523517943,
          'siteid': null,
          'mediaid': '',
          'msgtype': 'text',
          'picurl': '',
          'msgid': '0',
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 0,
          'type': '',
          'unreadNumber': 0
        }, {
          'id': 538,
          'uid': 187,
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          'username': 'YOUNG',
          'touid': 51,
          'content': 'hello',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1523517913,
          'siteid': null,
          'mediaid': '',
          'msgtype': 'text',
          'picurl': '',
          'msgid': '0',
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 0,
          'type': '',
          'unreadNumber': 0
        }, {
          'id': 535,
          'uid': 51,
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg',
          'username': '贪吃小松鼠',
          'touid': 187,
          'content': '什么时候＼◎o◎／！',
          'module': 'service',
          'moduleid': 0,
          'moderate': 0,
          'dateline': 1523516162,
          'siteid': null,
          'mediaid': '',
          'msgtype': 'text',
          'picurl': '',
          'msgid': '0',
          'meetingid': 0,
          'isread': 1,
          'isactivemsg': 1,
          'type': '',
          'unreadNumber': 0
        }
      ],
      focusInterval: null,
      msgcontent: '',
      showSend: false
    }
  },
  watch: {
    showSend () {
      return this.showSend
    }
  },
  methods: {
    onTextClick () {
      this.showEmotBox = false
    },
    onFocus () {
      this.intervalId = setInterval(function () {
        document.body.scrollTop = document.body.scrollHeight
      }, 200)
    },
    onBlur () {
      clearInterval(this.intervalId)
    },
    onChange (val) {
      const self = this
      if (self.$util.isNull(val)) {
        self.showSend = false
      } else {
        self.showSend = true
      }
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
    sendPhoto () {
      if (!this.isPC) {
        // const self = this
        // this.$wechat.ready(function () {
        this.$wechat.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            const localIds = res.localIds
            alert(localIds)
          }
        })
        // })
      }
    },
    sendImgTxt () {

    },
    viewUserInfo () {

    },
    getitemclass (item) {
      const self = this
      let ret = ''
      if (item.msgtype === 'news') {
        ret = 'message-push'
      }
      if (parseInt(item.uid) === self.query.uid) {
        ret = `${ret} left`
      } else {
        ret = `${ret} right`
      }
      return ret
    },
    sendEvent () {
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.query = self.$route.query
    self.query.uid = 51
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

#chat-room .chat-area{
  position:absolute;left:0;top:0;right:0;bottom:52px;overflow-y:auto;
}

.chatlist .messages-date {
    text-align: center;font-weight: 500;font-size: 11px;
    line-height: 1;margin: 10px 15px;color: #8e8e93;
}
.chatlist{width:100%;padding: 0 10px;box-sizing: border-box;}
.chatlist *{box-sizing: border-box;}
.chatlist .chatitem {position: relative;margin-bottom: 20px;}
.chatlist .chatitem.left{padding-right:50px;}
.chatlist .chatitem.right{padding-left:50px;}
.chatlist .chatitem .head {
	position: absolute;top: 0;
    	width: 40px;height: 40px;overflow: hidden;
}
.chatlist .chatitem.left .head {left: 0;}
.chatlist .chatitem.right .head {right: 0;}
.chatlist .chatitem .head img {width: 100%;}
.chatlist .chatitem .name {margin-bottom: 3px;font-size: 12px;color: #999;}
.chatlist .chatitem .name{margin-left:50px;}
.chatlist .chatitem.right .name {margin-right:50px;text-align:right;}
.chatlist .chatitem .msg {margin: 0 0px 0 50px;}
.chatlist .chatitem.right .msg {margin: 0 50px 0 0;text-align:right;}
.chatlist .chatitem .msg .discontent{text-align:left;}
.chatlist .chatitem .msg .main {
    	display: inline-block;position: relative;padding:5px;
    	background:#fff;border: 1px solid #dedede;min-width:40px;
    	border-radius: 5px;line-height: 24px;min-height:36px;
    	word-wrap: break-word;word-break: break-all;
}
.chatlist .chatitem.message-push .msg .main {width:100%;}
.chatlist .chatitem.message-voice .msg .main{}
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
	width: 50px;height:30px;line-height: 30px;
	position: absolute;top: 0;color:#000;
}
.chatlist .chatitem.left .msg .main .min {right: -58px;}
.chatlist .chatitem.right .msg .main .min {left: -58px;}
.audio_play_area {width:18px;height: 25px;float:left;}
.chatitem.right .audio_play_area{float:right;}

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
