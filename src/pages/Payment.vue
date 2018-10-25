<template>
  <div class="con-payment payment">
    <div class="content-head">
      <div class="header">
        <div class="quan"><div class="al al-gou dgou"></div></div>
        <div class="message mt20 font14">支付成功！订单状态会通过公众号进行通知！</div>
      </div>
      <div class="select flex_center">
        <div class="ysho font13">查看订单</div>
        <div class="ysho font13 ml20" @click="userChat">卖家微信</div>
        <div class="ysho font13 ml20 bejn" @click="openChat">开启订单通知</div>
      </div>
      <div class="mceng" v-show="isShow">
        <div class="inner">
          <div class="font12 pt20 pb15 txtitle">加卖家微信有机会享受更多优惠</div>
          <div class="line"></div>
          <img class="pt15 pl5" src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" />
          <div class="font10 btom">长按识别二维码添加好友</div>
        </div>
        <div class="onclose"><div @click="userChat1" class="al al-close closeg"></div></div>
      </div>
      <div class="mceng" v-show="gzhShow">
        <div class="inner">
          <div class="font12 pt20 pb15 txtitle">关注公众号接收订单发货通知</div>
          <div class="line"></div>
          <img class="pt15 pl5" src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" />
          <div class="font10 btom">长按识别二维码关注公众号</div>
        </div>
        <div @click="userChat1" class="al al-close closeg"></div>
      </div>
    </div>
    <div class="tuihd font12">
      <div class="line-one mr10 ml10"><div class="left-line"></div></div>
      <div class="txtin mr5">向你推荐优惠活动</div>
      <div class="line-two mr10"><div class="left-line"></div></div>
    </div>
    <div class="middle">
      <div class="hdshop">
        <div class="con-img mt10 ml5"><img src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" /></div>
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
        <div class="con-img mt10 ml5"><img src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" /></div>
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
      <div class="line-one mr10 ml10"><div class="left-line"></div></div>
      <div class="txtin mr5">你或许还喜欢这些宝贝</div>
      <div class="line-two mr10"><div class="left-line"></div></div>
    </div>
    <div class="con-btom">
      <div class="item">
        <div class="inners">
          <div class="bg ml5 mr5">
            <img src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" />
            <div class="font12 ml10">10.22玫瑰花</div>
            <div class="two">
              <div class="font12 ml10 mt10" style="color:#FF6B63;">￥1,500.00</div>
              <div class="font10 mt10 txtxl" style="color:#A2A2A2;">销量:1999</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="inners">
          <div class="bg ml5 mr5">
            <img src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" />
            <div class="font12 ml10">玫瑰花</div>
            <div class="two">
              <div class="font12 ml10 mt10" style="color:#FF6B63;">￥1,500.00</div>
              <div class="font10 mt10 txtxl" style="color:#A2A2A2;">销量:100</div>
            </div>
          </div>
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
    },
    activated () {
      this.$util.miniPost()
    }
}
</script>
<style lang="less" scoped>
  .payment .content-head{position:relative;}
  .payment .header{background-color:#FF6B63;width:100%;height:170px;position:relative;padding-top:1px;}
  .payment .header .quan{width:50px;height:50px;border-radius:50%;background-color:#fff;margin:0 auto;margin-top:40px;}
  .payment .dgou{color:#FF6B63;line-height:50px;text-align:center;}
  .payment .message{color:#fff;text-align:center;}
  .payment .select{
    width:100%;height:70px;background-color:#fff;border-bottom:1px solid #e5e5e5;
    display:flex;flex-direction:row;
  }
  .payment .ysho{
    height:25px;border:1px solid #FF6B63;background-color:#fff;color:#FF6B63;
    text-align:center;line-height:25px;border-radius:20px;padding:0 10px;
  }
  .payment .bejn{background-color:#FF6B63;color:#fff;}
  .payment .mceng{position:fixed;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);overflow: hidden;z-index:1;}
  .payment .inner{width:220px;height:220px;border-radius:5px;background-color:#fff;margin:0 auto;margin-top:200px;}
  .payment .inner .line{width:215px;height:1px;background-color:#e5e5e5;margin:0 auto;}
  .payment .inner .txtitle{text-align:center;}
  .payment .inner img{width:100px;height:100px;margin-left:25%;}
  .payment .inner .btom{text-align:center;color:#A7A7A7;}
  .payment .onclose{width:100%;}
  .payment .closeg{margin-left:48%;color:#fff;}
  .payment .tuihd{width:100%;height:50px;background-color:#F2F2F2;display:flex;flex-direction:row;}
  .payment .tuihd .txtin{width:240px;text-align:center;line-height:50px;color:#666666;}
  .payment .tuihd .line-one{width:50%;margin-top:25px;}
  .payment .tuihd .line-two{width:50%;margin-top:25px;}
  .payment .tuihd .left-line{width:100%;height:1px;background-color:#C8C8C8;}
  .payment .middle{width:100%;height:160px;border-bottom:1px solid #e5e5e5;position:relative;}
  .payment .middle .hdshop{width:100%;height:80px;border-bottom:1px solid #e5e5e5;background-color:#fff;display:flex;flex-direction:row;}
  .payment .con-img img{width:60px;height:60px;}
  .payment .details .two{display:flex;flex-direction:row;}
  .payment .twos{width:50%;}
  .payment .details .tuan{width:40px;height:15px;border:1px solid #FF6B63;border-radius:5px;line-height:15px;text-align:center;}
  .payment .middle .btnbt{
    width:80px;height:25px;background-color:#FF6B63;color:#fff;text-align:center;line-height:25px;border-radius:5px;
    position:absolute;margin-top:40px;right:10px;
  }
  .payment .con-btom{width:100%;}
  .payment .con-btom:after{content:"";clear:both;display:block;}
  .payment .con-btom .item{width:50%;float:left;}
  .payment .con-btom .inners{width:100%;padding-bottom:100%;position:relative;}
  .payment .con-btom .bg{background-color:#fff;border-radius:5px;position:absolute;top:0;bottom:0;left:0;right:0;}
  .payment .con-btom img{width:100%;height:100%;border-radius:5px;object-fit:cover;}
  .payment .con-btom .two{position:relative;display:flex;flex-direction:row;}
  .payment .con-btom .txtxl{position:absolute;right:10px;}
</style>
