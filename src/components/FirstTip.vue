<style lang="less">
.first-tip-modal{
  .modal-inner{width:80%;background-color:transparent;max-width:430px;max-height:544px;}
  .bg-pic{
    position:absolute;left:0;right:0;top:-10%;z-index:1;
    img{width:100%;}
  }
  .pic-outer{
    width:100%;padding-bottom:126.5%;position:relative;max-height:100%;
    .pic{
      position:absolute;left:0;top:0;right:0;bottom:0;
      img{width:100%;height:100%;}
    }
  }
  .top-con{
    position:absolute;left:0;top:8%;right:0;width:100%;color:#fff;font-weight:bold;font-size:35px;z-index:1;
  }
  .top-con.small{font-size:20px;}
  .middle-con{
    position:absolute;left:8%;top:28%;width:84%;height:50%;
    background-color:#fff;border-radius:5px;box-shadow: 0 0 20px #e4e8eb;
    padding:10px;box-sizing: border-box;
    .txt{letter-spacing: 1px;}
  }
  .bottom-con{
    display:block;
    position:absolute;left:8%;bottom:5%;width:84%;height:10%;z-index:1;
    .btn{
      width:100%;height:100%;
      box-shadow:0px 2px 3px 0px #f63f3d;color:#fff;
      background: linear-gradient(#f63f3d, #ff6a61);border-radius:30px;
    }
  }
}
</style>
<template>
  <div class="auto-modal flex_center first-tip-modal">
    <div class="modal-inner border-box">
      <div class="pic-outer">
        <div class="bg-pic">
          <img src="https://tossharingsales.boka.cn/minigxk/hbicon2.png" />
        </div>
        <div class="pic">
          <img src="https://tossharingsales.boka.cn/images/tip_bg.png"/>
        </div>
      </div>
      <div class="top-con flex_center small" v-if="title.length > 6">{{title}}</div>
      <div class="top-con flex_center" v-else>{{title}}</div>
      <div class="middle-con flex_center">
        <div class="w_100">
          <slot></slot>
        </div>
      </div>
      <div class="bottom-con" @click="clickButton">
        <div class="btn flex_center" form-type="submit">马上操作领奖励</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstTip',
  props: {
    title: {
      type: String,
      default: '操作领奖励'
    },
    content: {
      type: String,
      default: ''
    },
    buttonType: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeFirstTip')
    },
    clickButton () {
      this.$emit('submitFirstTip')
    }
  }
}
</script>
