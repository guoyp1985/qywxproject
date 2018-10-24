<template>
  <div class="con-payment">
    <div class="header">
      <div class="quan"><div class="al al-gou dgou"></div></div>
      <div class="message mt20 font14">支付成功！订单状态会通过公众号进行通知！</div>
    </div>
    <div class="select">
      <div class="ysho font13 mt20 ml20">查看订单</div>
      <div class="ysho font13 mt20 ml20" @click="userChat">卖家微信</div>
      <div class="ysho font13 mt20 ml20 bejn">开启订单通知</div>
    </div>
    <div class="mceng" v-show="isShow">
      <div class="inner"><img src="http://localhost/images/myen.png" /></div>
      <div @click="userChat1" class="closeg">关闭</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      userChat () {
        this.isShow = true
      },
      userChat1 () {
        this.isShow = false
      }
    }
}
</script>
<style lang="less" scoped>
  .header{position:absolute;background-color:#FF6B63;width:100%;height:170px;}
  .quan{
    width:50px;height:50px;border-radius:50%;background-color:#fff;margin:0 auto;
    margin-top:40px;
  }
  .dgou{color:#FF6B63;line-height:50px;text-align:center;}
  .message{color:#fff;text-align:center;}
  .select{
    width:100%;height:70px;background-color:#fff;border-bottom:1px solid #e5e5e5;
    position:absolute;margin-top:170px;display:flex;flex-direction:row;
  }
  .ysho{
    width:95px;height:25px;border:1px solid #FF6B63;background-color:#fff;color:#FF6B63;
    text-align:center;line-height:25px;border-radius:20px;
  }
  .bejn{background-color:#FF6B63;color:#fff;}
  .mceng{position:fixed;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);overflow: hidden;z-index:0;}
  .inner img{width:200px;height:200px;text-align:center;margin-left:25%;margin-top:60%;}
  .closeg{margin-left:45%;}
</style>
