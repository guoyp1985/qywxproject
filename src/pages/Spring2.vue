<template>
  <div data-page="springcard10" class="page no-navbar bg-white border-box springcard springcard10">
    <div class="page-content">
      <input type="hidden" id="token" value="$authtoken" />
      <input type="hidden" id="ticket" value="$ticket" />
      <input type="hidden" id="ipjudge" value="$ipjudge" />
      <input type="hidden" id="webtitle" value="$title" />
      <input type="hidden" id="share_title" value="为你剪出新春的祝福" />
      <input type="hidden" id="share_desc" value="新春祝福满天飞，贺卡红包抢不停！" />
      <input type="hidden" id="share_photo" value="$sharephoto" />
      <input type="hidden" id="share_url" value="$shareurl" />
      <input type="hidden" id="share_timeline_title" value="新春祝福满天飞，贺卡红包抢不停！" />
      <input type="hidden" id="share_type" value="" />
      <input type="hidden" id="share_dataUrl" value="" />
      <input type="hidden" id="viewport" value="springcard" />
      <input type="hidden" id="randomkey" value="$randomkey" />
      <input type="hidden" id="curticket" value="" />
      <input type="hidden" id="retailerinfouid" value="$retailerinfo[uid]" />
      <input type="hidden" id="module" value="activity"/>
      <input type="hidden" id="socket" value="-views-$user['uid']-activity-$id"/>
      <input type="hidden" id="musicfile" value="http://{$domain}/mobile/data/images/springcard/10/1.mp3" />
      <!-- <div class="audiobtn on">
              <audio></audio>
      </div> -->
      <div class="containerarea1">
        <div class="poptiplayer">
          <div class="overlay"></div>
          <div class="inner">
            <div class="innerarea">
              <div class="tipbg">
                <div class="tiptxt"></div>
                <div class="tipbtnouter">
                  <a class="hide tosubscribe external tipbtn" href="subscribe.php">去关注</a>
                </div>
              </div>
              <div style="margin-top:30px;">
                <div class="close db-in">
                  <i class="al al-close color-white font50 closelayer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cardpage cardpage1 active">
          <div class="bottom_bg"></div>
          <div class="pageinner">
            <div class="page1_pic1">
              <img src="../assets/images/springcard/10/page1_img1.png" />
            </div>
            <div class="page1_pic2">
              <img src="../assets/images/springcard/10/page1_img2.png" />
            </div>
            <div class="card_head">
              <div class="avatararea">
                <img class="avatarouter" src="../assets/images/springcard/10/avatar_outer.png" />
                <!-- <img class="avatarpic disavatar" src="$retailerinfo[avatar]" onerror="javascript:this.src='$DEFAULT_AVATAR';" /> -->
              </div>
              <div class="avatartxt">
                <div class="flex_center dislinkman" style="height:100%;"></div>
                <!--
                <div class="audiopic">
                        <img src="../assets/images/springcard/10/voice.png" />
                </div>
                -->
              </div>
            </div>
            <div class="page1_pic3">
              <img src="../assets/images/springcard/10/page1_img3.png" />
            </div>
            <div class="page1_pic4">
              <img src="../assets/images/springcard/10/page1_img4.png" />
            </div>
            <div class="toparea">
              <div class="page3_pic2 btnhb">
                      <img src="../assets/images/springcard/10/page3_img2.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="cardpage cardpage2">
          <div class="bottom_bg"></div>
          <div class="pageinner">
            <div class="page1_pic1">
              <img src="../assets/images/springcard/10/page1_img1.png" />
            </div>
            <div class="page1_pic2">
              <img src="../assets/images/springcard/10/page1_img2.png" />
            </div>
            <div class="card_head">
              <div class="avatararea">
                <img class="avatarouter" src="../assets/images/springcard/10/avatar_outer.png" />
                <!-- <img class="avatarpic disavatar" src="$retailerinfo[avatar]" onerror="javascript:this.src='$DEFAULT_AVATAR';" /> -->
              </div>
              <div class="avatartxt">
                <div class="flex_center dislinkman" style="height:100%;"></div>
                <!--
                <div class="audiopic">
                        <img src="../assets/images/springcard/10/voice.png" />
                </div>
                -->
              </div>
            </div>
            <div class="conarea">$data[wishcontent]</div>
            <div class="bottom_pic">
              <div class="page2_pic2">
                <img src="../assets/images/springcard/10/page2_img2.png" />
              </div>
              <div class="page2_pic1">
                <img src="../assets/images/springcard/10/page2_img1.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="cardpage cardpage3 recordpage">
          <div class="pageinner">
            <div class="page1_pic1">
                    <img src="../assets/images/springcard/10/page3_img1.png" />
            </div>
            <div class="page1_pic2">
                    <img src="../assets/images/springcard/10/page3_img1.png" />
            </div>
            <div class="txtline">
                    <div class="txtinner">看看大家手气如何</div>
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
                    <!--
                    <div class="txt flex_center">查看红包记录</div>
                    -->
            </div>
            <div class="bottom_pic">
              <div class="page3_pic4">
                      <img src="../assets/images/springcard/10/page3_img4.png" />
              </div>
              <div class="page3_pic5">
                      <img src="../assets/images/springcard/10/page3_img5.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="less">
  .rotate-css{
          -webkit-animation: rotate 2s linear 1;
          animation: rotate 2s linear 1;
  }
  @-webkit-keyframes rotate{
          from{-webkit-transform: rotate(0deg)}
          to{-webkit-transform: rotate(180deg)}
  }

  @-webkit-keyframes fanZ{
          from{opcity:0;
                  -webkit-transform:rotateY(270deg)
          }
          to{opcity:1;
                  -webkit-transform:rotateY(360deg)
          }
  }
  .springcard .poptiplayer{z-index:10;display:none;position:absolute;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);}
  .springcard .poptiplayer .overlay{position:absolute;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);}
  .springcard .poptiplayer .inner{
          z-index:1;position:absolute;bottom:0;top:0;left:50%;width:640px;margin-left:-320px;
          display:flex;justify-content:center; align-items: center;text-align:center;
  }
  .springcard .poptiplayer .innerarea{height:35%;width:90%;}
  .springcard .poptiplayer .tipbg{width:100%;height:100%;position:relative;font-size:1.7em;color:#fff;background:url(../assets/images/springcard/t-open.png) no-repeat center center;background-size:100%;}
  .springcard .poptiplayer .tiptxt{width: 43%;position: absolute;left: 21%;top: 57%;color:#eb1a2f;}
  .springcard .poptiplayer .tipbtnouter{width: 43%;position: absolute;left: 21%;top: 69%;}
  .springcard .poptiplayer .tipbtn{
          display:inline-block;color:#eb1a2f;border:1px solid #eb1a2f;padding:0px 8px;
          border-radius:4px;
  }
  .springcard .poptiplayer .tipbtn.hide{}
  .springcard .poptiplayer.active{
          -webkit-animation-name: bounceInDown;
          animation-name: bounceInDown;
          -webkit-animation-duration: 0s;
          animation-duration: 0s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  }
  .springcard .cardpage{
          max-width:640px;margin:0 auto;
          transform: translateY(100%);
          -webkit-transition: -webkit-transform 0.8s;
          -moz-transition: -moz-transform 0.8s;
          transition: transform 0.8s;
          width:100%;position:absolute;left:0;right:0;top:0;bottom:0;
          background-size:100%;background-repeat:no-repeat;background-position:top center;
  }
  .springcard .cardpage.active{transform: translateY(0%);z-index:5;}
  .springcard .cardpage.prev{transform: translateY(-100%);z-index:1;}
  .springcard .cardpage .bottom_bg{
          position: absolute;bottom: 0px;left:0;right:0;height:5%;z-index:1;
          background-repeat:no-repeat;background-position:bottom center;background-size:100%;
  }
  .springcard10 .cardpage1{background-image:url(../assets/images/springcard/10/bg.jpg);}
  .springcard10 .cardpage1 .bottom_bg{background-image:url(../assets/images/springcard/10/bottom_bg.png);}
  .springcard10 .cardpage2 .bottom_bg{display:none;background-image:url(../assets/images/springcard/10/bottom_bg2.png);}
  .springcard .cardpage .pageinner{width:94.5%;height:100%;margin:0 auto;position:relative;padding-top:30px;}
  .springcard10 .page1_pic1{position:absolute;left:0;top:20px;text-align:left;width:30%;}
  .springcard10 .page1_pic1 img{max-width:100%;vertical-align:middle;}
  .springcard10 .page1_pic2{position:absolute;right:0;top:20px;text-align:right;width:30%;}
  .springcard10 .page1_pic2 img{max-width:100%;vertical-align:middle;}
  .springcard10 .card_head{
          height:24%;width:100%;margin: 0 auto;
          text-align: center;position: relative;padding-top:15px;
  }
  .springcard10 .avatararea{
          width:155px;height:155px;
          position:relative;text-align:center;margin: 0 auto;border-radius:50%;z-index: 11;
  }
  .springcard10 .avatarouter{
        position: absolute;top: 0px;left: 0px;z-index: 12;
        width:100%;height:100%;
  }
  /*.springcard10 .avatarpic{  position: absolute;top:1px;left:1px;z-index: 10;width: 152px;height: 152px;border-radius: 50%;  }*/
  .springcard10 .avatarpic{width: 152px;height: 152px;border-radius: 50%;  }
  .springcard10 .avatartxt{font-size: 3em;color: #df0005;height:50px;position:relative;}
  .springcard10 .audiopic{position: absolute;right: 0;width: 45%;text-align: left;bottom: -75px;}
  .springcard10 .page1_pic3{width: 50%;height: 30%;margin: 0 auto;text-align: center;}
  .springcard10 .page1_pic3 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard10 .page1_pic4{height: 33%;position: absolute;top:54%;left: 0;right: 0;text-align:center;}
  .springcard10 .page1_pic4 img{max-width:100%;height:100%;vertical-align:middle;}
  .springcard10 .conarea{
          display:none;width: 70%;height: 45%;margin: 0 auto;text-align: left;  color: #df0005;font-size:1.7em;line-height: 1.5em;
          overflow-y: auto;-webkit-animation-delay:0.5s;
          -webkit-animation-duration:1.1s;
          -webkit-animation-iteration-count:1;
          -webkit-animation-timing-function:linear;
          -webkit-animation-name:fanZ;
  }
  .springcard10 .conarea.animated{

  }
  .springcard10 .bottom_pic{height:28%;position: absolute;bottom: 0px;left: 0;right: 0;z-index:1;}
  .springcard10 .page2_pic1{display:none;width: 48%;position: absolute;right: 0px;height: 100%;}
  .springcard10 .page2_pic1 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard10 .page2_pic2{display:none;width:20%;position: absolute;top:30%;left:0;}
  .springcard10 .page2_pic2 img{max-width:100%;max-height:100%;vertical-align:middle;}

  .springcard10 .cardpage1 .toparea{width:100%;margin:0 auto;text-align:center;position: absolute;bottom: 70px;z-index:2;}
  .springcard10 .page3_pic2{display:none;width:80%;margin:0 auto;text-align:right;}
  .springcard10 .page3_pic2 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard10 .cardpage3 .page1_pic1{width:20%;}
  .springcard10 .cardpage3 .page1_pic2{width:20%;}
  .springcard10 .cardpage3 .pageinner{padding-top:15%;}
  .springcard10 .txtline{height:100px;}
  .springcard10 .txtline .txtinner{display:none;font-size:1.7em;color:#d7000f;font-weight:bold;line-height:30px;text-align:center;}
  .springcard10 .listarea {
          width: 75%;height:55%;margin: 0 auto;border: 1px solid #edc23d;
          padding: 15px;padding-bottom: 0px;
          background-color: rgba(251, 231, 148, 0.5);
          position:relative;z-index:5;
  }
  .springcard10 .listarea .list{height:85%;overflow:auto;}
  .springcard10 .listarea .txt{height:15%;font-size:1.7em;color: #d71921;}
  .springcard10 .listarea .scroll_item{
    display:table;width:100%;table-layout:fixed;
    -webkit-animation-duration:1.1s;
    -webkit-animation-iteration-count:1;
    -webkit-animation-timing-function:linear;
    -webkit-animation-name:fanZ;
  }

  .springcard10 .listarea .scroll_item.animated{
          -webkit-animation-duration:1.1s;
          -webkit-animation-iteration-count:1;
          -webkit-animation-timing-function:linear;
          -webkit-animation-name:fanZ;
  }
  .springcard10 .listarea .scroll_item.animated:nth-child(1){-webkit-animation-delay:2s;}
  .springcard10 .listarea .scroll_item.animated:nth-child(2){-webkit-animation-delay:2.5s;}
  .springcard10 .listarea .scroll_item.animated:nth-child(3){-webkit-animation-delay:3.0s;}
  .springcard10 .listarea .scroll_item.animated:nth-child(4){-webkit-animation-delay:3.5s;}
  .springcard10 .listarea .scroll_item.animated:nth-child(5){-webkit-animation-delay:4.0s;}

  .springcard10 .listarea .pic{display:table-cell;width:75px;height:65px;text-align:left;vertical-align:middle;}
  .springcard10 .listarea .pic img{width:55px;height:55px;border-radius:50%;}
  .springcard10 .listarea .infocell{display: table-cell;vertical-align: top;border-bottom: #f4d778 1px solid;}
  .springcard10 .listarea .cell1{text-align:left;vertical-align:middle;}
  .springcard10 .listarea .cell2{width:100px;text-align:right;vertical-align:middle;padding-right:10px;}
  .springcard10 .listarea .txt1{font-weight:bold;font-size:1.7em;line-height: 1.5em;color: #d71921;}
  .springcard10 .listarea .txt2{color: #ae6721;line-height: 1.5em;font-size: 1em;}
  .springcard10 .listarea .txt3{font-size: 1.7em;color: #d71921;}

  .springcard10 .cardpage3 .bottom_pic{
          height:44%;position: absolute;bottom: 0px;left: 0;right: 0;z-index:1;
          background-repeat:no-repeat;background-position:bottom center;background-size:100%;
          background-image:url(../assets/images/springcard/10/bottom_bg3.png);
  }
  .springcard10 .page3_pic4{display:none;position: absolute;top: 40%;padding-left: 5%;z-index: 3;}
  .springcard10 .page3_pic4 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard10 .page3_pic5{position: absolute;left: 0;bottom: 0;height: 52px;width: 88px;}
  .springcard10 .page3_pic5 img{max-width:100%;max-height:100%;vertical-align:middle;}
  .springcard10 .page3_pic5.animated {
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: 1;
          -webkit-animation-timing-function: linear;
          -webkit-animation-name: feiZt;
  }
</style>
