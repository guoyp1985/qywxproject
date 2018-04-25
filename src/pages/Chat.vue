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
            <a class="voice-btn" @click.stop="toggleVoice">
              <img src="../assets/images/icon-voice.png"/>
            </a>
          </div>
          <div class="input-cell">
            <group class="textarea-box">
              <x-textarea ref="text" id="chat-textarea" @click.native="onTextClick" :max="2000" :rows="1" :autosize="true" :show-counter="false"></x-textarea>
            </group>
          </div>
          <div class="emotion-cell">
            <label class="emotion-btn" @click.prevent.stop="toggleEmotion">
              <img v-if="!showEmotBox" src="../assets/images/icon-face.png"/>
              <img v-else src="../assets/images/icon-keyboard.png"/>
            </label>
          </div>
          <div class="feature-cell">
            <a class="feature-btn" @click.prevent.stop="toggleFeatureBoard">
              <img src="../assets/images/icon-add.png"/>
            </a>
          </div>
        </div>
      </div>
    </view-box>
  </div>
</template>
<script>
import { ViewBox, Group, XTextarea } from 'vux'
import EmotionBox from '@/components/EmotionBox'
export default {
  components: {
    ViewBox,
    Group,
    XTextarea,
    EmotionBox
  },
  data () {
    return {
      intervalId: null,
      showEmotBox: false,
      textarea: null
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  },
  mounted () {
    this.textarea = this.$refs.text.$refs.textarea
    this.textarea.setFocus(true)
  },
  methods: {
    onTextClick () {
      this.showEmotBox = false
    },
    onFocus () {
      this.intervalId = setInterval(function () {
        document.body.scrollTop = document.body.scrollHeight
      }, 100)
    },
    onBlur () {
      clearInterval(this.intervalId)
    },
    toggleVoice () {

    },
    toggleEmotion () {
      if (this.showEmotBox) {
        this.showEmotBox = false
      } else {
        this.showEmotBox = true
      }
    },
    toggleKeyboard () {

    },
    toggleFeatureBoard () {

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
  padding: 8px;
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

/* vux css hack */
#chat-room .weui-cell {
  padding: 0;
}
</style>
