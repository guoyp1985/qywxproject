<template>
  <div class="containerarea bg-page font14 springcard springcard11">
    <swiper class="x-swiper no-indicator" @on-index-change="swiperChange" direction="vertical">
      <swiper-item>
        <div class="cardpage cardpage1 active">
          <div class="pageinner">
            <div class="card_head">
              <div class="avatararea">
                <div class="avatarouter">
                  <img class="avatarpic disavatar" src="https://tossharingsales.boka.cn/images/nopic.jpg" onerror="javascript:this.src='$DEFAULT_AVATAR';" />
                </div>
              </div>
              <div class="avatartxt">
                <div class="avatarname flex_center dislinkman" style="height:100%;">$retailerinfo[linkman]</div>
              </div>
              <!--
              <div class="audiopic">
                      <img src="data/images/springcard/10/voice.png" />
              </div>
              -->
            </div>
            <div class="toparea flex_center">
              <div class="page3_pic2 btnhb">
                <img src="../assets/images/springcard/10/page3_img2.png" />
              </div>
            </div>
            <div class="card_middle">
              <div class="page1_pic1">
                <img src="../assets/images/springcard/11/page1_img1.png" />
              </div>
              <div class="page1_pic2">
                <img src="../assets/images/springcard/11/page1_img2.png" />
              </div>
              <div class="page1_pic3">
                <img src="../assets/images/springcard/11/page1_img3.png" />
              </div>
            </div>
            <div class="page1_pic4">
              <img src="../assets/images/springcard/11/page1_img4.png" />
            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="cardpage cardpage2">
          <div class="pageinner">
            <div class="card_head">
              <div class="avatararea">
                <div class="avatarouter">
                  <img class="avatarpic disavatar" src="https://tossharingsales.boka.cn/images/nopic.jpg" onerror="javascript:this.src='$DEFAULT_AVATAR';" />
                </div>
              </div>
              <div class="avatartxt">
                <div class="avatarname flex_center" style="height:100%;"><span class="dislinkman">$retailerinfo[linkman]</span>祝您:</div>
              </div>
            </div>
            <div class="card_content">
              <div class="conarea">$data[wishcontent]</div>
            </div>
            <div class="card_middle">
              <div class="page1_pic1">
                <img src="../assets/images/springcard/11/page1_img1.png" />
              </div>
              <div class="page1_pic2">
                <img src="../assets/images/springcard/11/page1_img2.png" />
              </div>
              <div class="page1_pic3">
                <img src="../assets/images/springcard/11/page1_img3.png" />
              </div>
            </div>
            <div class="page1_pic4">
              <img src="../assets/images/springcard/11/page1_img4.png" />
            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="cardpage cardpage3 recordpage">
          <div class="pageinner">
            <div class="txtline">
              <div class="txtinner animated zoomInDown">看看大家手气如何</div>
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
            <!-- <div class="listtxt">查看红包记录</div> -->
            <div class="card_middle">
              <div class="page1_pic1">
                <img src="../assets/images/springcard/11/page1_img1.png" />
              </div>
              <div class="page1_pic2">
                <img src="../assets/images/springcard/11/page1_img2.png" />
              </div>
              <div class="page1_pic3">
                <img src="../assets/images/springcard/11/page1_img3.png" />
              </div>
            </div>
            <div class="page1_pic4">
              <img src="../assets/images/springcard/11/page3_img4.png" />
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
  .springcard11 .cardpage{background:url(../assets/images/springcard/11/bg.jpg) no-repeat top center;background-size:100% 100%;}
  .springcard .cardpage .bottom_bg{
    position: absolute;bottom: 0px;left:0;right:0;height:5%;z-index:1;
    background-repeat:no-repeat;background-position:bottom center;background-size:100%;
  }
  .springcard.springcard11 .cardpage .pageinner{width:100%;padding-top:40px;}
  .springcard11 .cardpage1 .card_head{height:50%;width:100%;margin: 0 auto;text-align: center;position: relative;}
  .springcard11 .cardpage2 .card_head{
    height:25%;width:100%;margin: 0 auto;
    text-align: center;position: relative;
  }
  .springcard11 .cardpage2 .card_content{
    height:36%;width:100%;margin: 0 auto;text-align: center;position: relative;overflow-y: auto;
  }
  .springcard11 .avatararea{
    width:158px;height:158px;overflow:hidden;
    position:relative;text-align:center;margin: 0 auto;border-radius:50%;z-index: 11;
    -webkit-animation-duration: 4s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-delay: 0.7s;
    -webkit-animation-timing-function: ease;
    -webkit-animation-name: fanZright;
    @-webkit-keyframes fanZright{
      from{opcity:0;
        width:100%;
        -webkit-transform:rotateY(0deg)
      }
      to{opcity:1;
        width:100%;
        -webkit-transform:rotateY(360deg)
      }
    }
  }
  .springcard11 .avatarouter.animated {
    -webkit-animation-duration: 4s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-delay: 0.7s;
    -webkit-animation-timing-function: ease;
    -webkit-animation-name: fanZright;
  }
  @-webkit-keyframes fanZright{
    from{opcity:0;
      width:100%;
      -webkit-transform:rotateY(0deg)
    }
    to{opcity:1;
      width:100%;
      -webkit-transform:rotateY(360deg)
    }
  }
  .springcard11 .avatarouter{
    position: absolute;top: 0px;left: 0px;z-index: 12;
    width:100%;height:100%;border:#fff 4px solid;border-radius:50%;text-align:center;
  }
  .springcard11 .avatarpic{width:150px;height:150px;border-radius: 50%;}
  .springcard11 .avatartxt{font-size:1.5em;color:#fef4e8;text-align:center;line-height:70px;}
  .springcard11 .audiopic{width:100%;text-align:center;}
  .springcard11 .card_middle{position:relative;height:25%;}
  .springcard11 .page1_pic1{width:20%;position: absolute;right: 28%;text-align: right;top: 100px;}
  .springcard11 .page1_pic1 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard11 .page1_pic2{width:13%;position: absolute;right:10%;text-align: right;top:150px;}
  .springcard11 .page1_pic2 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard11 .page1_pic3{width:60%;position:absolute;top:150px;left:40px;}
  .springcard11 .page1_pic3 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard11 .page1_pic4{width:100%;height:7%;text-align:center;position:absolute;bottom:0;}
  .springcard11 .page1_pic4 img{max-width:100%;max-height:100%;vertical-align:middle;}

  .springcard11 .cardpage1 .toparea{width:100%;height:15%;margin:0 auto;text-align:center;}
  .springcard11 .page3_pic2{display:none;width:40%;margin:0 auto;text-align:center;}
  .springcard11 .page3_pic2 img{max-width:100%;max-height:100%;vertical-align:middle;}

  .springcard11 .cardpage.cardpage2{background-image:url(../assets/images/springcard/11/bg2.jpg);}
  .springcard11 .cardpage.cardpage3{background-image:url(../assets/images/springcard/11/bg2.jpg);}
  .springcard11 .cardpage2 .avatartxt{color: #fff;}
  .springcard11 .cardpage2 .conarea {color: #fff;font-size: 20px;line-height: 1.2em;text-align: left;padding: 0px 50px;}

  .springcard.springcard11 .cardpage.cardpage3 .pageinner {padding-top:0px;}
  .springcard11 .cardpage3 .card_middle{position:absolute;width:100%;top:280px;}
  .springcard11 .txtline{height:120px;}
  .springcard11 .txtline .txtinner{display:block;font-size:1.7em;color:#d7000f;font-weight:bold;line-height:120px;text-align:center;}
  .springcard11 .listarea{width: 85%;height:46%;margin: 0 auto;position: relative;overflow:hidden;z-index:5;}
  .springcard11 .listarea .list{height:100%;overflow-y:auto;}
  .springcard11 .listtxt{
          width:85%;margin:0 auto;line-height: 75px;font-size: 2em;color: #fff;text-align: left;font-weight: bold;
          positin:relative;z-index:5;
  }
  .springcard11 .listarea .scroll_item{
          display:table;width:100%;table-layout:fixed;
          border-radius: 10px;margin-bottom: 8px;
          background-color: rgba(255, 255, 255, 0.5);
  }
  .springcard11 .listarea .scroll_item:nth-child{margin-bottom:0;}
  .springcard11 .listarea .pic{display:table-cell;width:75px;height:65px;text-align:left;vertical-align:middle;}
  .springcard11 .listarea .pic img{width:55px;height:55px;border-radius:50%;display: block;margin: 0 auto;}
  .springcard11 .listarea .infocell{display: table-cell;vertical-align: middle;}
  .springcard11 .listarea .cell1{text-align:left;vertical-align:middle;}
  .springcard11 .listarea .cell2{width:100px;text-align:right;vertical-align:middle;padding-right:10px;}
  .springcard11 .listarea .txt1{font-weight:bold;font-size:1.7em;line-height: 1.5em;color: #d71921;}
  .springcard11 .listarea .txt2{color: #ae6721;line-height: 1.5em;font-size: 1em;}
  .springcard11 .listarea .txt3{font-size: 1.7em;color: #d71921;}
</style>
