<template>
  <div class="containerarea bg-page font14 springcard springcard7">
    <swiper class="x-swiper no-indicator" @on-index-change="swiperChange" direction="vertical">
      <swiper-item>
        <div class="cardpage cardpage1 active">
          <div class="pageinner">
            <div class="page1_pic1">
              <img src="../assets/images/springcard/7/page1_img1.png" />
            </div>
            <div class="page1_pic2">
              <img src="../assets/images/springcard/7/page1_img2.png" />
            </div>
            <div class="toparea">
              <div class="card_head">
                <div class="avatararea">
                  <img class="avatarpic" src="https://tossharingsales.boka.cn/images/nopic.jpg" />
                </div>
                <div class="namearea">
                  <div>
                    <div><span>123</span>祝您：</div>
                  </div>
                </div>
              </div>
              <div class="page1_pic3">
                <img src="../assets/images/springcard/7/page1_img3.png" />
                <div class="page1_pic7 btnhb">
                  <img src="../assets/images/springcard/7/page3_img1.png" />
                </div>
              </div>
            </div>
            <div class="icolist">
              <div class="icoitem">
                <img src="../assets/images/springcard/7/page1_img7.png" width="50">
              </div>
              <div class="icoitem">
                <img src="../assets/images/springcard/7/page1_img7.png" width="80">
              </div>
              <div class="icoitem">
                <img src="../assets/images/springcard/7/page1_img7.png" width="30">
              </div>
              <div class="icoitem">
                <img src="../assets/images/springcard/7/page1_img7.png" width="40">
              </div>
              <div class="icoitem">
                <img src="../assets/images/springcard/7/page1_img7.png" width="60">
              </div>
              <div class="icoitem">
                <img src="../assets/images/springcard/7/page1_img7.png" width="45">
              </div>
              <div class="icoitem">
                <img src="../assets/images/springcard/7/page1_img7.png" width="50">
              </div>
            </div>
            <div class="bottomarea">
              <div class="page1_bg1"></div>
              <div class="page1_pic4">
                <div class="pic">
                  <img src="../assets/images/springcard/7/page1_img4.png" />
                </div>
              </div>
              <div class="page1_pic5">
                <img src="../assets/images/springcard/7/page1_img5.png" />
              </div>
              <div class="page1_pic6">
                <img src="../assets/images/springcard/7/page1_img6.png" />
              </div>
            </div>
            <div class="bottomarrow flex_center">
              <img src="../assets/images/springcard/7/icon_up.png" />
            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="cardpage cardpage2">
          <div class="bottom_bg"></div>
          <div class="pageinner">
            <div class="toparea2">
              <div class="avatararea">
                <img class="avatarpic disavatar" src="https://tossharingsales.boka.cn/images/nopic.jpg" onerror="javascript:this.src='$DEFAULT_AVATAR';" />
              </div>
              <div class="avatartxt">
                <span class="smalltxt"></span>45454<span class="bigtxt">祝您：</span>
              </div>
            </div>
            <div class="middlearea2">
              <div class="bg">
                <div class="txtcon">1212424</div>
              </div>
            </div>
            <div class="page2_pic1">
              <img src="../assets/images/springcard/7/page2_img1.png" />
            </div>
          </div>
          <div class="bottomarrow flex_center">
            <img src="../assets/images/springcard/7/icon_up.png" />
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="cardpage cardpage3 recordpage">
          <div class="pageinner">
            <div class="toparea3">
              <div class="txt1">看看大家手气如何</div>
            </div>
            <div class="listarea">
              <div class="template">
                <div class="scroll_item">
                  <div class="pic">
                    <img class="disavatar" src="https://tossharingsales.boka.cn/images/nopic.jpg" onerror="javascript:this.src='$DEFAULT_AVATAR';">
                  </div>
                  <div class="infocell">
                    <div class="t-table">
                      <div class="t-cell cell1">
                        <div class="txt1 clamp1 disusername"></div>
                        <div class="txt2 clamp1 disdate" formatstr="yyyy-MM-dd"></div>
                      </div>
                      <div class="t-cell cell2">
                        <div class="clamp1 dismoney txt3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list scroll_list" dolist="false" scrollarea=".listarea" ajaxurl="ajax/activity.php?action=hongbaousers&id=$id" template=".template"></div>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from 'vux'
export default {
  components: {
    Swiper, SwiperItem
  },
  data () {
    return {}
  },
  methods: {
    swiperChange () {}
  }
}
</script>
<style lang="less">
  .springcard .cardpage{max-width:640px;width:100%;height:100%;}
  .springcard .cardpage.active{transform: translateY(0%);z-index:5;}
  .springcard .cardpage.prev{transform: translateY(-100%);z-index:1;}
  .springcard7 .cardpage{background:url(../assets/images/springcard/7/bg.jpg) no-repeat top center;background-size:100% 100%;}
  .springcard7 .cardpage.cardpage2{background:url(../assets/images/springcard/7/bg3.jpg) no-repeat top center;background-size:100% 100%;}
  .springcard7 .cardpage.cardpage3{background:url(../assets/images/springcard/7/bg5.jpg) no-repeat top center;background-size:100% 100%;}

  .springcard .cardpage .bottom_bg{
          position: absolute;bottom: 0px;left:0;right:0;height:5%;z-index:1;
          background-repeat:no-repeat;background-position:bottom center;background-size:100%;
  }
  .springcard.springcard7 .cardpage .pageinner{width:100%;padding-top:55%;}
  .springcard.springcard7 .toparea{height: 40%;width: 100%;}
  .springcard7 .page1_pic1{position: absolute;left: 0px;top: 0px;width: 30%;text-align:left;}
  .springcard7 .page1_pic1 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard7 .page1_pic2{position: absolute;right: 0px;top: 0px;width: 30%;text-align:right;}
  .springcard7 .page1_pic2 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard7 .card_head{
    display:none;width:100%;margin: 0 auto;text-align: center;position: relative;
    -webkit-animation-duration:0.5s;
    -webkit-animation-iteration-count:1;
    -webkit-animation-timing-function:linear;
    -webkit-animation-name:animate7;
  }
  .springcard7 .card_head .avatararea{position:absolute;left:0;right:0;top:0;width:160px;margin:0 auto;}
  .springcard7 .card_head .avatararea img{width:160px;height:160px;border-radius:50%;display:block;}
  .springcard7 .card_head .namearea{height:160px;text-align: center;color: #ffff00;font-size: 2em;padding-top:175px;}
  .springcard7 .card_head.animated{
          -webkit-animation-duration:0.5s;
          -webkit-animation-iteration-count:1;
          -webkit-animation-timing-function:linear;
          -webkit-animation-name:animate7;
  }
  @-webkit-keyframes animate7 {
          0% {
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
          }
          10%, 20% {
              -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
              transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
          }
          30%, 50%, 70%, 90% {
              -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
              transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
          }
          40%, 60%, 80% {
              -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
              transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
          }
          100% {
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
          }
  }
  .springcard7 .page1_pic3{
    position: absolute;width: 40%;right: 10%;top:25%;z-index:10;
    -webkit-animation-duration: 2s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: linear;
    -webkit-animation-name: gong;
  }
  .springcard7 .page1_pic3 img{max-width:100%;max-height:100%;}
  .springcard7 .page1_pic3.animate {
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: 1;
          -webkit-animation-timing-function: linear;
          -webkit-animation-name: gong;
  }
  @-webkit-keyframes gong {
          0% {
                  opacity: 0;
                  -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
                  transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
                  -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
                  animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
          }

          60% {
                  opacity: 1;
                  -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
                  transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
                  -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
                  animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
          }
  }
  .springcard7 .cardpage1 .bottomarea{height: 60%;width: 100%;}
  .springcard7 .page1_bg1{
          width:100%;height:100%;position: absolute;left:0;right:0;bottom:0;
          background: url(../assets/images/springcard/7/bg1.png) no-repeat;
  }
  .springcard7 .page1_bg1.animate{
    -webkit-animation-duration:1.0s;
    -webkit-animation-iteration-count:infinite;
    -webkit-animation-timing-function:linear;
    -webkit-animation-name:two;
  }
  @-webkit-keyframes two {
    from{background:url(../assets/images/springcard/7/bg1.png) no-repeat center;background-size:100%;opacity: 0.3}
    to{background:url(../assets/images/springcard/7/bg2.png) no-repeat center;background-size:100%;}
  }
  .springcard7 .page1_pic7{display:none;width:100%;text-align:center;margin-top:15px;}
  .springcard7 .page1_pic7 img{height:100%;max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard7 .page1_pic4{
    width: 100%;position: absolute;left: 0;right: 0;bottom: 10%;
    -webkit-animation-duration:1.5s;
    -webkit-animation-iteration-count:1;
    -webkit-animation-timing-function:linear;
    -webkit-animation-name:cc;
    @-webkit-keyframes cc {
            from{-webkit-transform:scale(0.3)}
            to{-webkit-transform:scale(1)}
    }
  }
  .springcard7 .page1_pic4.animated{
    -webkit-animation-duration:1.5s;
    -webkit-animation-iteration-count:1;
    -webkit-animation-timing-function:linear;
    -webkit-animation-name:cc;
  }
  .springcard7 .page1_pic4 .pic{width:70%;margin: 0 auto;text-align:center;}
  .springcard7 .page1_pic4 img{max-width:100%;max-height:100%;vertical-align:middle;}

  .springcard7 .page1_pic5{position: absolute;width:70%;left:0;bottom:0;}
  .springcard7 .page1_pic5 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard7 .page1_pic6{position: absolute;width:70%;right:0;bottom:0;}
  .springcard7 .page1_pic6 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard7 .bottomarrow{
          width: 100%;height: 90px;text-align: center;
          position: absolute;left: 0;right: 0;bottom: 0;z-index: 100;
          -webkit-animation: moveIconUp ease 1.5s both infinite;
  }
  .springcard7 .bottomarrow img{width:65px;margin:0 auto;}
  @-webkit-keyframes moveIconUp {
          0% { -webkit-transform: translateY(100%); opacity:0;}
          50% { -webkit-transform: translateY(0%); opacity:1;}
          100% { -webkit-transform: translateY(-100%); opacity:0;}
  }
  .yuan_one{}
  .springcard7 .icolist .icoitem{
    z-index:1;position:absolute;top:-100%;
    -webkit-animation-duration:1.5s;
    -webkit-animation-iteration-count:3;
    -webkit-animation-timing-function:linear;
    -webkit-animation-name:one;
    @-webkit-keyframes one {
            from{top:10%;background-size:60%;}
            to{ top:100%;background-size:100%;}
    }
  }
  .springcard7 .icolist .icoitem:nth-child(1){left:10%;}
  .springcard7 .icolist .icoitem:nth-child(2){left:30%;}
  .springcard7 .icolist .icoitem:nth-child(3){left:60%;}
  .springcard7 .icolist .icoitem:nth-child(4){left:90%;}
  .springcard7 .icolist .icoitem:nth-child(5){left:50%;}
  .springcard7 .icolist .icoitem:nth-child(6){left:40%;}
  .springcard7 .icolist .icoitem:nth-child(7){left:65%;}

  .springcard7 .icolist .icoitem:nth-child(1){-webkit-animation-delay:0.4s;}
  .springcard7 .icolist .icoitem:nth-child(2){-webkit-animation-delay:0.6s;}
  .springcard7 .icolist .icoitem:nth-child(3){-webkit-animation-delay:0.8s;}
  .springcard7 .icolist .icoitem:nth-child(4){-webkit-animation-delay:1s;}
  .springcard7 .icolist .icoitem:nth-child(5){-webkit-animation-delay:0.4s;}
  .springcard7 .icolist .icoitem:nth-child(6){-webkit-animation-delay:0.7s;}

  .springcard7 .icolist .icoitem:nth-child(1) img{width:50px;}
  .springcard7 .icolist .icoitem:nth-child(2) img{width:80px;}
  .springcard7 .icolist .icoitem:nth-child(3) img{width:30px;}
  .springcard7 .icolist .icoitem:nth-child(4) img{width:40px;}
  .springcard7 .icolist .icoitem:nth-child(5) img{width:60px;}
  .springcard7 .icolist .icoitem:nth-child(6) img{width:45px;}
  .springcard7 .icolist .icoitem:nth-child(7) img{width:65px;}

  .springcard.springcard7 .cardpage.cardpage2 .pageinner{padding-top:0px;}
  .springcard7 .toparea2{height:25%;position:absolute;left:0;right:0;top:50px;text-align:center;}
  .springcard7 .toparea2.animate{
          -webkit-animation-duration:2.0s;
          -webkit-animation-iteration-count:1;
          -webkit-animation-timing-function:linear;
          -webkit-animation-name:move;
  }
  @-webkit-keyframes move {
          from{right:-1550px;}
          to{right:0;}
  }
  .springcard7 .toparea2 .avatararea{width:150px;margin:0 auto;}
  .springcard7 .toparea2 .avatararea img{width:150px;height:150px;border-radius:50%;}
  .springcard7 .toparea2 .avatartxt{margin-top: 15px;text-align: center;color: #ffff00;font-size: 2em;line-height: 0.5em;}
  .springcard7 .middlearea2{position:absolute;left: 0;right: 0;top:40%;bottom: 20%;}
  .springcard7 .middlearea2 .bg{
          width: 80%;height: 100%;margin: 0 auto;padding: 15px;
          background: url(../assets/images/springcard/7/bg4.png) no-repeat center;
          background-size: 100% 100%;position: relative;
  }
  .springcard7 .txtcon{
          width: 100%;height: 100%;padding-top: 20px;text-align: left;overflow-y: auto;
          font-size: 2em;line-height: 1.5em;font-weight: bold;color: #f7bb37;
          -webkit-animation-duration:1.3s;
          -webkit-animation-iteration-count:1;
          -webkit-animation-timing-function:linear;
          -webkit-animation-name:txt;
          @-webkit-keyframes txt {
                  from{-webkit-transform:rotateY(180deg);  opacity: 0}
                  to{-webkit-transform:rotateY(0deg);  opacity: 9}
          }
  }
  .springcard7 .page2_pic1{position:absolute;left:0px;bottom:0px;height:20%;}
  .springcard7 .page2_pic1 img{height:100%;max-width:100%;max-height:100%;vertical-align:middle;}

  .springcard.springcard7 .cardpage.cardpage3 .pageinner{padding-top:10%;}
  .springcard7 .toparea3{width:100%;height:10%;text-align:center;}
  .springcard7 .txt1{font-weight: bold;font-size: 24px;line-height: 70px;letter-spacing: 2px;color: #d7000f;}
  .springcard7 .txt2{font-size: 14px;color: #d7000f;}
  .springcard7 .listarea{
          width:90%;margin:0 auto;height:70%;
          padding: 5px 15px 0px;background: #fddf6b;border: 1px solid #eec33e;
  }
  .springcard7 .listarea .scroll_item{
          display:table;width:100%;table-layout:fixed;
          border-radius: 10px;margin-bottom: 8px;
  }
  .springcard7 .listarea .scroll_item:nth-child{margin-bottom:0;}
  .springcard7 .listarea .pic{display:table-cell;width:75px;height:65px;text-align:left;vertical-align:middle;}
  .springcard7 .listarea .pic img{width:55px;height:55px;border-radius:50%;}
  .springcard7 .listarea .infocell{display: table-cell;vertical-align: top;}
  .springcard7 .listarea .cell1{text-align:left;vertical-align:middle;}
  .springcard7 .listarea .cell2{width:100px;text-align:right;vertical-align:middle;padding-right:10px;}
  .springcard7 .listarea .txt1{font-weight:bold;font-size:1.7em;line-height: 1.5em;color: #d71921;}
  .springcard7 .listarea .txt2{color: #ae6721;line-height: 1.5em;font-size: 1em;}
  .springcard7 .listarea .txt3{font-size: 1.7em;color: #d71921;}
</style>
