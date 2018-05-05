/*
* @description: 切图窗口组件
* @auther: simon
* @created_date: 2018-5-5
*/
<template>
  <div v-transfer-dom>
    <popup v-show="show" height="100%">
      <div id="clip-area" class="clip-frame">
        <div class="clip-area">
          <img :src="img"/>
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
    }
  },
  methods: {
    onSubmit () {
      this.$emit('on-submit')
    },
    onCancel () {
      this.$emit('on-cancel')
    }
  },
  mounted () {
    Clip({
      view: '#clip-area',
      clipElement: '#clip-area .clip-area',
      setInCenter: true,
      clipWidth: 90,
      clipHeight: 90,
      clipImgWidth: 300,
      clipImgHeight: 200
    })
  }
}
</script>
<style>
.submit-area {
  position: absolute;
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
