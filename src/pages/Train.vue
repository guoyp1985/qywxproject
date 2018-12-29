<template>
  <div class="containerarea font14 train notop">
    <div class="w_100" style="height:375px;">
      <template>
        <div v-if="playVideo" class="videoarea">
          <video
            ref="productVideo"
            :src="productdata.video"
            controls
            autoplay="true"
            webkit-playsinline=""
            playsinline="true"
            x-webkit-airplay="true"
            raw-controls=""
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portrait">
          </video>
          <div class="close-icon flex_center" @click="stopPlay('productVideo')">关闭</div>
        </div>
        <div id="scroll-container" class="scroll-container">
          <template>
            <swiper
              class="pic-swiper notitle"
              dots-position="center"
              :interval=6000
              :aspect-ratio="1/1"
              loop>
              <swiper-item>
                <img class="db imgcover w_100 h_100" src="https://tossharingsales.boka.cn/images/nopic.jpg" />
                <template>
                  <div class="play-icon flex_center">
                    <i class="al al-bofang"></i>
                  </div>
                </template>
              </swiper-item>
            </swiper>
          </template>
        </div>
      </template>
    </div>
    <div class="t-table font16 bg-white title">
      <div class="t-cell v_middle">【视频教程↑↑↑】如何采集并编辑文章？</div>
    </div>
    <div class="font14 color-gray2 bg-white mt10 details">
      <div class="color-black font16">【采集方式介绍】</div>
      <div class="pt10">采集方式1: 关键词搜索采集</div>
      <div>当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可与卖家互加好友，线下协商解决，手续费不予退还。点击【采集】按钮即可完成采集</div>
      <div style="text-indent:2em;"> 当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可与卖家互加好友，线下协商解决，手续费不予退还。点击【采集】按钮即可完成采集</div>
      <div class="pt20">采集方式2: 链接采集</div>
      <div>当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可与卖家互加好友，线下协商解决，点击【采集】按钮即可完成采集</div>
      <div class="btnSelect">查看更多帮助 ></div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem, TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper, SwiperItem
  },
  data () {
    return {
      playVideo: false
    }
  }
}
</script>

<style lang="less">
.notop .pagetop{display:none;}
.train .videobg{width:100%;height:100%;background-size:cover;background-position:center;position:relative;}
.train .play-icon{
  width:60px;height:60px;background: rgba(0,0,0,.4);border-radius: 50%;color:#fff;
  position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;
}
.train .play-icon .al{margin-left:4px;}
.train .videoarea{position:absolute;left:0;top:0;right:0;bottom:0;z-index:9999;background-color:#000;color:#fff;}
.train .videoarea video{position: absolute;width: 100%;height: 100%;}
.train .videoarea .close-icon{position:absolute;left:50%;top:7px;width:60px;height:30px;margin-left:-30px;background-color:#232323;color:#fff;border-radius:10px;}

.train .pic-swiper{padding-bottom:100%;box-sizing: border-box;}
.train .pic-swiper .vux-swiper{
  position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
}
.train .vux-swiper-desc{display:none !important;}

.train .title{padding:10px 10px;box-sizing:border-box;}
.train .details{padding:10px 10px 20px 10px;box-sizing:border-box;line-height:25px;}
.train .btnSelect{
  width:200px;height:40px;box-sizing:border-box;background-color:#FF6B63;border-radius:20px;margin:0 auto;
  text-align:center;color:#fff;margin-top:50px;line-height:40px;
}
</style>
