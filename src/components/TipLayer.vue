<style lang="less">
.tiplayer-modal{
  .modal-inner{width:80%;background-color:transparent;max-width:430px;max-height:544px;}
  .pic-outer{
    width:100%;padding-bottom:126.5%;position:relative;max-height:100%;
    .pic{
      position:absolute;left:0;top:0;right:0;bottom:0;
      img{width:100%;height:100%;}
    }
  }
  .top-con{
    position:absolute;left:0;top:8%;right:0;width:100%;color:#fff;font-weight:bold;font-size:35px;
  }
  .middle-con{
    position:absolute;left:8%;top:28%;width:84%;height:50%;
    background-color:#fff;border-radius:5px;box-shadow: 0 0 20px #e4e8eb;
    padding:20px;box-sizing: border-box;
  }
  .bottom-con{
    position:absolute;left:8%;bottom:5%;width:84%;height:10%;color:#fff;
    box-shadow:0px 2px 3px 0px #f63f3d;
    background: linear-gradient(#f63f3d, #ff6a61);border-radius:30px;
  }
}
</style>
<template>
  <div class="auto-modal flex_center tiplayer-modal">
    <div class="modal-inner border-box">
      <div class="pic-outer">
        <div class="pic">
          <img src="https://tossharingsales.boka.cn/images/tip_bg.png" />
        </div>
      </div>
      <div class="top-con flex_center">{{title}}</div>
      <div class="middle-con flex_center">
        <div class="w_100">{{content}}</div>
      </div>
      <div class="bottom-con flex_center" v-if="buttonTxt && buttonTxt != ''" @click="clickButton">{{buttonTxt}}</div>
      <div class="close-area flex_center" @click="closeModal">
        <i class="al al-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TipLayer',
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
    }
  },
  data () {
    return {
      showModal: true
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
