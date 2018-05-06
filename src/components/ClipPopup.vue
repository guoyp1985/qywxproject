/*
* @description: 切图窗口组件
* @auther: simon
* @created_date: 2018-5-5
*/
<template>
  <div v-transfer-dom>
    <popup v-show="show" height="100%">
      <div id="clip-view">
        <div id="photo-box" class="swapanim">
          <img draggable="false" :src="img" @load="imgLoad"/>
        </div>
      </div>
      <div class="clip-popup">
        <div class="submit-area">
          <x-button type="primary" @click.native="onSubmit">{{$t('Save')}}</x-button>
          <x-button type="default" @click.native="onCancel">{{$t('Cancel')}}</x-button>
        </div>
      </div>
    </popup>
  </div>
</template>
<i18n>
</i18n>
<script>
import { TransferDom, Popup, XButton } from 'vux'
import Clip from '#/Clip'
export default {
  name: 'ClipPopup',
  directives: {
    TransferDom
  },
  components: {
    Popup,
    XButton,
    Clip
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    img: String
  },
  data () {
    return {
      clip: null
    }
  },
  methods: {
    onSubmit () {
      this.$emit('on-submit')
      console.log(this.clip.value)
    },
    onCancel () {
      this.$emit('on-cancel')
    },
    imgLoad () {
      this.clip = Clip({
        view: '#clip-view',
        clipElement: '#photo-box',
        clipWidth: 160,
        clipHeight: 160,
        setInCenter: true,
        zoomMin: 1,
        zoomMax: 2
      })
    }
  }
}
</script>
<style>
#clip-view {
  overflow: hidden;
  position: relative;
  margin: 20px 20px 10px 20px;
  box-sizing: border-box;
}
#photo-box {
  cursor: move;
  line-height: 0;
}
#photo-box img {
  width: 100%;
}
.submit-area {
  position: absolute;
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
