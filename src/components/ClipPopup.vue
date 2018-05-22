/*
* @description: 切图窗口组件
* @auther: simon
* @created_date: 2018-5-5
*/
<template>
  <div v-transfer-dom style="position:relative;z-index:510;">
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
import ENV from 'env'
export default {
  name: 'ClipPopup',
  directives: {
    TransferDom
  },
  components: {
    Popup, XButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    img: String,
    afterSubmit: Function
  },
  data () {
    return {
      clip: null
    }
  },
  methods: {
    onSubmit () {
      const self = this
      this.$emit('on-submit')
      let clipVal = self.clip.value
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/common/cutImage`, {
        srcimg: self.img,
        cut_x: clipVal.left,
        cut_y: clipVal.top,
        cut_width: clipVal.width,
        cut_height: clipVal.height
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          self.afterSubmit(data.data)
          self.$emit('on-cancel')
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    onCancel () {
      this.clip.destory()
      this.$emit('on-cancel')
    },
    imgLoad () {
      this.clip = Clip({
        view: '#clip-view',
        clipElement: '#photo-box',
        clipWidth: 160,
        clipHeight: 160,
        setInCenter: true,
        // zoomMin: 1,
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
  width: 100%
}
.submit-area {
  position: absolute;
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
</style>
