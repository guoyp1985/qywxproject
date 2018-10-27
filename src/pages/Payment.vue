<template>
  <div class="containerarea con-payment payment font14">
    <div class="content-head">
      <div class="header">
        <div class="quan flex_center"><div class="al al-gou dgou"></div></div>
        <div class="color-white align_center mt20 font13">支付成功！订单状态会通过公众号进行通知！</div>
      </div>
      <div class="btnlist flex_center">
        <div class="item">查看订单</div>
        <div class="item" @click="userChat">卖家微信</div>
        <div class="item active bejn" @click="openChat">开启订单通知</div>
      </div>
    </div>
    <div class="linearea">
      <div class="line"></div>
      <div class="txt flex_center">向你推荐优惠活动</div>
    </div>
    <div class="activity-list">
      <div class="hdshop item db-flex" v-for="(item,index) in activityData" :key="index">
        <div class="pic con-img"><img src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" /></div>
        <div class="flex_cell">
          <div class="font10 clamp1">团购：nike腰包</div>
          <div class="clamp1 mt3">
            <div class="db-in font10 tuan" style="color:#FF6B63;">2人团</div>
            <div class="db-in font10 ml5" style="color:#C8C8C8;">已团2件</div>
          </div>
          <div class="clamp1 mt3">
            <div class="db-in font10" style="color:#FF6B63;">￥0.10</div>
            <div class="db-in font10 ml5" style="color:#C8C8C8;text-decoration:line-through;">￥110.00</div>
          </div>
        </div>
        <div class="btn-cell">
          <div class="btnbuy font14">一键拼团</div>
        </div>
      </div>
    </div>
    <div class="linearea">
      <div class="line"></div>
      <div class="txt flex_center" style="width:180px;">你或许还喜欢这些宝贝</div>
    </div>
    <div class="con-btom product-list">
      <div class="item" v-for="(item, index) in productData" :key="index">
        <div class="inners">
          <div class="bg">
            <img src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" />
          </div>
        </div>
        <div class="info">
          <div class="font12">10.22玫瑰花</div>
          <div class="two">
            <div class="txt1 flex_left">
              <div class="w_100 clamp1">￥1,500.00</div>
            </div>
            <div class="txt2 flex_right">
              <div class="w_100 clamp1">销量:1999</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-layer" v-show="isShow">
      <div class="bg"></div>
      <div class="inner">
        <div class="pt20 pb15 align_center b_bottom_after">加卖家微信有机会享受更多优惠</div>
        <img class="img" src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" />
        <div class="font10 btom">长按识别二维码添加好友</div>
        <div class="onclose">
          <div @click="userChat1" class="al al-close color-white align_center"></div>
        </div>
      </div>
    </div>
    <div class="pay-layer" v-show="gzhShow">
      <div class="bg"></div>
      <div class="inner">
        <div class="pt20 pb15 align_center b_bottom_after">关注公众号接收订单发货通知</div>
        <img class="img" src="https://tossqzx.boka.cn/month_201810/15397652641261.jpg" />
        <div class="font10 btom">长按识别二维码关注公众号</div>
        <div class="onclose">
          <div @click="userChat1" class="al al-close color-white align_center"></div>
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
        gzhShow: false,
        activityData: [
          {id: 1, name: '1'},
          {id: 1, name: '1'}
        ],
        productData: [
          {id: 1, name: '1'},
          {id: 1, name: '1'},
          {id: 1, name: '1'},
          {id: 1, name: '1'}
        ]
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
.payment{background-color:#f2f2f2;}
.payment .content-head{position:relative;}
.payment .header{background-color:#FF6B63;width:100%;padding:40px 20px 30px;position:relative;box-sizing: border-box;}
.payment .header .quan{width:50px;height:50px;border-radius:50%;background-color:#fff;margin:0 auto;}
.payment .dgou{color:#FF6B63;}
.payment .btnlist{width:100%;padding:20px 0;background-color:#fff;box-sizing: border-box;}
.payment .btnlist .item{
  height:25px;border:1px solid #FF6B63;background-color:#fff;color:#FF6B63;font-size:13px;
  text-align:center;line-height:25px;border-radius:20px;padding:0 10px;
}
.payment .btnlist .item.active{background-color:#FF6B63;color:#fff;}
.payment .btnlist .item:not(:last-child){margin-right:10px;}
.payment .linearea{width:100%;height:50px;background-color:#F2F2F2;position:relative;}
.payment .linearea .line{background-color:#e5e5e5;height:2px;position:absolute;left:10px;right:10px;top:50%;margin-top:-1px;}
.payment .linearea .txt{background-color:#F2F2F2;width:150px;height:100%;margin:0 auto;position:relative;z-index:2;color:#666666;font-size:13px;}
.payment .activity-list{width:100%;border-bottom:1px solid #e5e5e5;position:relative;}
.payment .activity-list .item{width:100%;background-color:#fff;display:flex;flex-direction:row;position:relative;padding:10px;box-sizing:border-box;}
.payment .activity-list .item:not(:last-child){border-bottom:1px solid #e5e5e5;}
.payment .activity-list .pic{width:70px;text-align:left}
.payment .activity-list .pic img{width:60px;height:60px;vertical-align:middle;}
.payment .activity-list .btn-cell {width:90px;text-align:right;position:relative;}
.payment .activity-list .btnbuy{
  width:80px;height:25px;background-color:#FF6B63;color:#fff;text-align:center;line-height:25px;border-radius:5px;
  position:absolute;bottom:5px;right:0px;
}
.payment .activity-list .tuan{padding:0 5px;height:15px;border:1px solid #FF6B63;border-radius:5px;line-height:15px;text-align:center;}
.payment .product-list:after{content:"";clear:both;display:block;}
.payment .product-list .item{width:50%;float:left;margin-bottom:10px;box-sizing: border-box;}
.payment .product-list .item:nth-child(odd){padding-left:10px;padding-right:5px;}
.payment .product-list .item:nth-child(even){padding-left:5px;padding-right:10px;}
.payment .product-list .inners{width:100%;padding-bottom:100%;position:relative;}
.payment .product-list .bg{position:absolute;bottom:0;top:0;left:0;right:0;}
.payment .product-list img{width:100%;height:100%;object-fit:cover;border-top-left-radius:5px;border-top-right-radius:5px;}
.payment .product-list .two{display:flex;width:100%;padding-top:5px;}
.payment .product-list .txt1{color:#FF6B63;font-size:12px;width:50%;text-align:left;}
.payment .product-list .txt2{color:#A2A2A2;font-size:10px;width:50%;text-align:right;}
.payment .product-list .info{position:relative;background-color:#fff;padding:5px;}

.payment .pay-layer{position:fixed;top:0;bottom:0;left:0;right:0;overflow: hidden;z-index:10;}
.payment .pay-layer .bg{position:absolute;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);}
.payment .pay-layer .inner{width:220px;height:240px;border-radius:5px;background-color:#fff;position:absolute;left:50%;top:50%;margin-left:-110px;margin-top:-120px;}
.payment .pay-layer .img{width:100px;height:100px;margin:20px auto;display:block;}
.payment .pay-layer .inner .btom{text-align:center;color:#A7A7A7;}
.payment .onclose{position:absolute;bottom:-50px;left:0;right:0;text-align:center;}


</style>
