<template>
  <div class="con-payment">
    <div class="content-head">
      <div class="header">
        <div class="quan"><div class="al al-gou dgou"></div></div>
        <div class="message mt20 font14">支付成功！订单状态会通过公众号进行通知！</div>
      </div>
      <div class="select">
        <div class="ysho font13 mt20 ml20">查看订单</div>
        <div class="ysho font13 mt20 ml20" @click="userChat">卖家微信</div>
        <div class="ysho font13 mt20 ml20 bejn" @click="openChat">开启订单通知</div>
      </div>
      <div class="mceng" v-show="isShow">
        <div class="inner">
          <div class="font12 pt20 pb15 txtitle">加卖家微信有机会享受更多优惠</div>
          <div class="line"></div>
          <img class="pt15 pl5" src="http://localhost/images/maijia.png" />
          <div class="font10 btom">长按识别二维码添加好友</div>
        </div>
        <div @click="userChat1" class="al al-close closeg"></div>
      </div>
      <div class="mceng" v-show="gzhShow">
        <div class="inner">
          <div class="font12 pt20 pb15 txtitle">关注公众号接收订单发货通知</div>
          <div class="line"></div>
          <img class="pt15 pl5" src="http://localhost/images/gzh.png" />
          <div class="font10 btom">长按识别二维码关注公众号</div>
        </div>
        <div @click="userChat1" class="al al-close closeg"></div>
      </div>
    </div>
    <div class="tuihd font12">
      <div class="left-line ml20"></div>
      <div class="txtin ml20">向你推荐优惠活动</div>
      <div class="left-line ml20"></div>
    </div>
    <div class="middle">
      <div class="hdshop">
        <div class="con-img mt10 ml5"><img src="http://localhost/images/770.png" /></div>
        <div class="details mt10 ml5">
          <div class="font10">团购：nike腰包</div>
          <div class="two mt3">
            <div class="font10 tuan" style="color:#FF6B63;">2人团</div>
            <div class="font10 ml5" style="color:#C8C8C8;">已团2件</div>
          </div>
          <div class="two mt3">
            <div class="font10" style="color:#FF6B63;">￥0.10</div>
            <div class="font10 ml5" style="color:#C8C8C8;text-decoration:line-through;">￥110.00</div>
          </div>
        </div>
        <div class="btnbt font14">一键拼团</div>
      </div>
      <div class="hdshop">
        <div class="con-img mt10 ml5"><img src="http://localhost/images/770.png" /></div>
        <div class="details mt10 ml5">
          <div class="font10">团购：nike腰包</div>
          <div class="two mt3">
            <div class="font10 tuan" style="color:#FF6B63;">2人团</div>
            <div class="font10 ml5" style="color:#C8C8C8;">已团2件</div>
          </div>
          <div class="two mt3">
            <div class="font10" style="color:#FF6B63;">￥0.10</div>
            <div class="font10 ml5" style="color:#C8C8C8;text-decoration:line-through;">￥110.00</div>
          </div>
        </div>
        <div class="btnbt font14">邀请砍价</div>
      </div>
    </div>
    <div class="tuihd font12 like">
      <div class="left-line ml10"></div>
      <div class="txtin ml10">你或许还喜欢这些宝贝</div>
      <div class="left-line ml20"></div>
    </div>
    <div class="con-btom">
      <div class="left-con ml20">
        <img src="http://localhost/images/flower.png" />
        <div class="font12 ml10">10.22玫瑰花</div>
        <div class="two">
          <div class="font12 ml10 mt10" style="color:#FF6B63;">￥1,500.00</div>
          <div class="font10 mt10 txtxl" style="color:#A2A2A2;">销量:0</div>
        </div>
      </div>
      <div class="left-con ml20">
        <img src="http://localhost/images/flower.png" />
        <div class="font12 ml10">玫瑰花</div>
        <div class="two">
          <div class="font12 ml10 mt10" style="color:#FF6B63;">￥1,500.00</div>
          <div class="font10 mt10 txtxl" style="color:#A2A2A2;">销量:0</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        isShow: false,
        gzhShow: false
      }
    },
    methods: {
      userChat () {
        this.isShow = true
      },
      userChat1 () {
        this.isShow = false
        this.gzhShow = false
      },
      openChat () {
        this.gzhShow = true
      }
    }
}
</script>
<style lang="less" scoped>
  .content-head{position:relative;}
  .header{background-color:#FF6B63;width:100%;height:170px;position:absolute;}
  .header .quan{width:50px;height:50px;border-radius:50%;background-color:#fff;margin:0 auto;margin-top:40px;}
  .dgou{color:#FF6B63;line-height:50px;text-align:center;}
  .message{color:#fff;text-align:center;}
  .select{
    width:100%;height:70px;background-color:#fff;border-bottom:1px solid #e5e5e5;
    position:absolute;display:flex;flex-direction:row;margin-top:170px;
  }
  .ysho{
    width:95px;height:25px;border:1px solid #FF6B63;background-color:#fff;color:#FF6B63;
    text-align:center;line-height:25px;border-radius:20px;
  }
  .bejn{background-color:#FF6B63;color:#fff;}
  .mceng{position:fixed;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);overflow: hidden;z-index:1;}
  .inner{width:220px;height:220px;border-radius:5px;background-color:#fff;margin:0 auto;margin-top:200px;}
  .inner .line{width:215px;height:1px;background-color:#e5e5e5;margin:0 auto;}
  .inner .txtitle{text-align:center;}
  .inner img{width:100px;height:100px;margin-left:25%;}
  .inner .btom{text-align:center;color:#A7A7A7;}
  .closeg{margin-left:45%;color:#fff;}
  .tuihd{width:100%;height:50px;background-color:##F2F2F2;position:absolute;margin-top:230px;display:flex;flex-direction:row;}
  .tuihd .txtin{text-align:center;line-height:50px;color:#666666;}
  .tuihd .left-line{width:100px;height:1px;background-color:#C8C8C8;margin-top:25px;}
  .middle{width:100%;height:160px;border-bottom:1px solid #e5e5e5;margin-top:280px;position:absolute;}
  .middle .hdshop{width:100%;height:80px;border-bottom:1px solid #e5e5e5;background-color:#fff;display:flex;flex-direction:row;}
  .con-img img{width:60px;height:60px;}
  .details .two{display:flex;flex-direction:row;}
  .like{margin-top:440px;}
  .details .tuan{width:40px;height:15px;border:1px solid #FF6B63;border-radius:5px;line-height:15px;text-align:center;}
  .middle .btnbt{
    width:80px;height:25px;background-color:#FF6B63;color:#fff;text-align:center;line-height:25px;border-radius:5px;
    position:absolute;margin-top:40px;right:10px;
  }
  .con-btom{width:100%;height:260px;position:absolute;margin-top:490px;display:flex;flex-direction:row;}
  .con-btom .left-con{width:160px;height:220px;background-color:#fff;border-radius:5px;}
  .left-con img{width:160px;height:160px;border-radius:5px;}
  .con-btom .two{display:flex;flex-direction:row;}
  .con-btom .txtxl{padding-left:40px;}
</style>
