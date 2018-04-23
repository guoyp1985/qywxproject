<template>
  <div id="chat-room">
    <view-box body-padding-bottom="0">
      <div slot="bottom" class="input-box">
        <div class="voice-cell">
          <a class="voice-btn">
            <img src="../assets/images/icon-voice.png"/>
          </a>
        </div>
        <div class="input-cell">
          <input/>
        </div>
        <div class="emotion-cell">
          <a class="emotion-btn">
            <img src="../assets/images/icon-face.png"/>
          </a>
        </div>
        <div class="feature-cell">
          <a class="feature-btn">
            <img src="../assets/images/icon-add.png"/>
          </a>
        </div>
      </div>
    </view-box>
  </div>
</template>
<script>
import { ViewBox } from 'vux'
export default {
  components: {
    ViewBox
  }
}
</script>
<style>
#chat-room .input-box {
  display: flex;
}
#chat-room .input-box .input-cell {
  flex: 1;
}
</style>
