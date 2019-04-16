<style lang="less">
.tip-buttonlayer-modal{
  .modal-inner{border-radius:10px;background-color:#fff;padding:20px 10px;}
  .icon-radius{width:50px;height:50px;background-color:#FF6B63;color:#fff;border-radius:50%;}
  .btn-area{margin-top:100rpx;}
  .btn-bg{
    width:67%;margin:0 auto;height:42px;color:#fff;box-shadow:0px 2px 3px 0px #f63f3d;
    background: linear-gradient(#f63f3d, #ff6a61);border-radius:30px;
    display:flex;justify-content: center; align-items: center;
  }
}
</style>
<template>
  <div class="auto-modal flex_center tip-buttonlayer-modal">
    <div class="modal-inner border-box flex_center">
      <div class="w_100">
        <template v-if="title && title != ''">
          <div class="w_100 flex_center">
            <div class="icon-radius flex_center">
              <i class="al al-gou"></i>
            </div>
          </div>
          <div class="flex_center font18 color-red4 mt10">{{title}}</div>
        </template>
        <template v-if="buttonTxt && buttonTxt != ''">
          <div class="flex_center btn-area" v-if="buttonTxt && buttonTxt != ''" @click="clickButton">
             <div class="btn-bg">{{buttonTxt}}</div>
          </div>
        </template>
        <template v-if="buttonTxt && buttonTxt != ''">
          <div class="flex_center color-red4 mt10 font12" v-if="content && content != ''">{{content}}</div>
        </template>
        <template wx:else>
          <div class="flex_center color-red4 mt20 font14" v-if="content && content != ''">{{content}}</div>
        </template>
      </div>
      <div class="close-area flex_center" @click="closeModal">
        <div class="al al-close"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TipButtonLayer',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    buttonTxt: {
      type: String,
      default: ''
    },
    buttonType: {
      type: String,
      default: ''
    },
    tipTxt: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    closeModal () {
      this.$emit('clickClose')
    },
    clickButton () {
      this.$emit('clickButton')
    }
  }
}
</script>
