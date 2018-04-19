<template>
  <div class="containerarea font14 bargainbuyview" style="overflow-y:auto;">
    <div class="topimg">
      <img src="../assets/images/bargainbuy_2.png">
    </div>
    <div class="b_header">
      <div class="inner">
        <div class="pic">
          <img :src="activityuser.avatar">
        </div>
        <div class="clamp1 font13 color-gray7 pt5 align_center mauto" style="width:168px;">{{ activityuser.linkman }}</div>
      </div>
    </div>
    <div class="boxarea">
      <div class="inner">
        <div class="innerbg">
          <router-link class="t-table" style="color:inherit;" :to="{path:'/product',query:{wid:productdata.wid,id:productdata.id}}">
            <div class="t-cell v_middle" style="width:80px;">
              <img :src="productdata.photo" style="width:70px;height:70px;">
            </div>
            <div class="t-cell">
              <div class="clamp2 font13 color-gray7">{{ productdata.title }}</div>
              <div class="clamp1 font13" style="color:#E02D24;">最低价：<span class="font16 bold">{{ productdata.minprice }}</span> 元<del class="ml10 color-gray7">原价：{{ productdata.price }} 元</del></div>
              <div class="clamp1 font13" style="color:#E02D24;">剩  余：<span class="font16 bold">{{ productdata.leftstorage }}</span> 件</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="mauto align_center" style="width: 94%;height: 5px;">
      <div class="mauto h_100" style="border-left:3px solid #FDC45D;border-right:3px solid #FDC45D;width: 45%;"></div>
    </div>
    <div class="boxarea1">
      <div class="inner">
        <div class="pricearea">
          <div class="t-table">
            <div class="t-cell align_left">原价</div>
            <div class="t-cell align_center">已砍到</div>
            <div class="t-cell align_right">最低价</div>
          </div>
          <div class="priceline">
            <div class="line linepercent" style="width:0%;"></div>
          </div>
          <div class="t-table">
            <div class="t-cell align_left">￥<span>10.00</span></div>
            <div class="t-cell align_center">￥<span>10.00</span></div>
            <div class="t-cell align_right">￥<span>1.00</span></div>
          </div>
        </div>
        <div class="btn db btninvite shareBtn">邀请好友砍价</div>
        <div class="padding10 align_center timeleftarea font13" style="color:#A87F35; ">
          <span style="margin-right:3px;">还剩</span><span class="hour">00:</span><span class="minute">00:</span><span class="second">00</span><span style="margin-left:3px;">结束，快让好友帮忙砍价吧~</span>
        </div>
      </div>
    </div>
    <div>
      <div class="boxtitle">砍价亲友团</div>
      <div class="titleline">
        <div class="inner" style="background: #C93A3A;border-radius: 100px;height: 8px;width: 100%;"></div>
      </div>
      <div class="listarea">
        <div class="scroll_list">
          <div v-if="cutdata.length == 0" class="scroll_item emptyitem" style="padding:0;">
              <div class="t-table">
                <div class="t-cell middle-cell" style="color:inherit;">还没有好友砍价</div>
              </div>
          </div>
          <div v-else v-for="(item,index) in cutdata" :key="item.id" class="scroll_item">
            <div class="t-table" style="height:60px;">
              <div class="t-cell v_middle" style="width:55px;">
                <img class="v_middle" style="width:44px;height:44px;border-radius:50%;" :src="item.avatar" />
              </div>
              <div class="t-cell v_middle" style="padding-right:25px;">
                <div class="clamp1 font13">{{ item.linkman }}</div>
              </div>
              <div class="t-cell align_right v_middle pr10" style="width:130px;">
                <div class="font13" style="color:#C93A3A">
                  <img class="v_middle" src="../assets/images/bargainbuy_3.png" style="width: 21px;height:19px;">  砍掉 <span class="font16 bold">{{ item.cutmoney }}</span> 元
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import Time from '../../libs/time'

export default {
  components: {
  },
  data () {
    return {
      activityuser: {
        uid: 187,
        avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
        linkman: 'YOUNG'
      },
      productdata: {
        id: 124,
        wid: 187,
        title: '苹果手机',
        photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg',
        minprice: '10.00',
        price: '8,000.00',
        special: '8,000.00',
        shares: 7,
        saled: 1000,
        postage: '0.00',
        moderate: 1,
        buyonline: 0,
        storage: 10,
        leftstorage: 3,
        currentnumbers: 0,
        endtime: 1522221270,
        content: '维生素<img src="http://ossgxs.boka.cn/month_201803/15223015586456.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016278181.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016299171.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016329830.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016952520.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016975422.jpg">'
      },
      cutdata: [
        { avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg', linkman: 'YOUNG', cutmoney: '0.01' }
      ]
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  methods: {
    joinin () {
      this.$router.push('/retailerShop')
    }
  }
}
</script>

<style lang="less">
.bargainbuyview {
    background-image: linear-gradient(-180deg, #f32a3d 0%, #FF8048 100%);
}
.bargainbuyview .topimg img {
    width: 100%;
    vertical-align: middle;
}
.bargainbuyview .b_header{
  position:absolute;
  height:90px;
  top:30px;
  width:100%;
}
.bargainbuyview .b_header .inner {
    width: 168px;
    height: 168px;
    box-sizing:border-box;
    padding-top:8px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    background: #FDC45D;
    margin:0 auto;
}
.bargainbuyview .b_header .pic{width:60px;margin:0 auto;}
.bargainbuyview .b_header .pic img{width:60px;height:60px;border-radius:50%;vertical-align:middle;}
.bargainbuyview .boxarea {
  width: 94%;
  box-sizing:border-box;
  position:relative;
  margin:45px auto 0;
  background: #FDC45D;
  border-radius: 13px;
  padding: 16px 12px 16px 12px;
}
.bargainbuyview .boxarea .inner {
    border-radius: 8px;
    background: white;
    margin-top: 5px;
    padding: 7px 6px 7px 6px;
    position: relative;
    cursor: pointer;
}
.bargainbuyview .boxarea .innerbg {
    border-radius: 7px;
    background: #F7F7F7;
    padding: 6px;
}
.bargainbuyview .boxarea .pic{width:80px;}
.bargainbuyview .boxarea .pic img{width:70px;height:70px;vertical-align:middle;}

.bargainbuyview .boxarea1{width:94%;margin:0 auto;}
.bargainbuyview .boxarea1 .inner{
  background-color: #FDC45D;border-radius: 13px;padding:11px 15px 8px 15px;
}
.bargainbuyview .boxarea1 .pricearea{
  width: 90%;
  margin: 20px auto 0;
  color: #C93A3A;
}
.bargainbuyview .priceline {
  margin: 12px auto;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 10px;
  border-radius: 5px;
}
.bargainbuyview .line {
  width: 0%;
  height: 100%;
  background-image: linear-gradient(0deg, #EC3F57 0%, #FF8147 99%);
  border-radius: 5px;
}
.bargainbuyview .btn{
  width: 90%;
  background-image: linear-gradient(90deg, #EC3F57 0%, #FF8147 99%);
  box-shadow: 0 5px 8px 0 #C13123;
  border-radius: 100px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: white;
  font-size: 14px;
  margin: 16px auto 10px auto;
  cursor: pointer;
}
.bargainbuyview .boxtitle {
    background: #C93A3A;
    border-radius: 6px 6px 0 0;
    width: 160px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    color: #FFE0A0;
    text-align: center;
    margin: 20px auto 0px auto;
}
.bargainbuyview .titleline{
  width: 94%;padding-left: 24px;padding-right: 24px;margin:0 auto;
  box-sizing: border-box;
}
.bargainbuyview .titleline .inner{
  background: #C93A3A;border-radius: 100px;height: 8px;width: 100%;
}
.bargainbuyview .listarea{
  background: #F8F8F8; border-radius: 24px;padding: 1px 12px 1px 12px;margin: -5px 5px 5px 5px;
  box-sizing: border-box;
}
.bargainbuyview .scroll_list{margin:20px auto;}
.bargainbuyview .listarea .scroll_item {
    border-radius: 6px;
    padding-left: 10px;
    height: 60px;
    margin-top: 10px;
    background-color: #E0E0E0;
}
</style>
