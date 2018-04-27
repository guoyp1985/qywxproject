/*
* @description: 聊天室页
* @auther: simon
* @created_date: 2018-4-23
*/
<template>
  <div id="chat-room">
    <view-box ref="chatBox" body-padding-bottom="0">
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
              <x-textarea ref="text" id="chat-textarea" @click.native="onTextClick" @on-focus="onFocus" @on-blur="onBlur" :max="2000" :rows="1" :autosize="true" :show-counter="false"></x-textarea>
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
          <div class="feature-cell">
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
    </view-box>
  </div>
</template>
<script>
import { ViewBox, Group, XTextarea, Grid, GridItem, XButton } from 'vux'
import EmotionBox from '@/components/EmotionBox'
export default {
  components: {
    ViewBox,
    Group,
    XTextarea,
    EmotionBox,
    Grid,
    GridItem,
    XButton
  },
  data () {
    return {
      intervalId: null,
      showEmotBox: false,
      showFeatureBox: false,
      showVoiceCom: false,
      textarea: null,
      isPC: this.$util.isPC()
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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
        const self = this
        // this.$wechat.ready(function () {
          self.$wechat.chooseImage({
            count: 1,
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

    }
  }
}
</script>
<style>
#chat-room {
  height: 100%
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

/* vux css hack */
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
</style>
