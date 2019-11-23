<template>
  <div class="containerarea con-payment payment font14" ref="scrollContainer" @scroll="handleScroll">
    <div class="content-head">
      <div class="header">
        <div class="quan flex_center"><div class="al al-gou dgou"></div></div>
        <div class="color-white align_center mt20 font13">支付成功！订单状态会通过公众号进行通知！</div>
      </div>
      <div class="btnlist flex_center">
        <router-link to="/orderSearch" class="item">查看订单</router-link>
        <div class="item" @click="viewQrcode" v-if="retailerInfo.qrcode && retailerInfo.qrcode != ''">卖家微信</div>
        <div class="item active" v-if="loginUser.subscribe != 1" @click="viewMpQrcode">开启订单通知</div>
        <router-link to="/center" class="item" v-else>个人中心</router-link>
      </div>
    </div>
    <template v-if="activityData.length">
      <div class="linearea">
        <div class="line"></div>
        <div class="txt flex_center">向你推荐优惠活动</div>
      </div>
      <div class="activity-list">
        <template v-for="(item,index) in activityData">
          <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'">
            <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            <span slot="title">{{ item.title }}</span>
            <span slot="numbers">{{ item.numbers }}</span>
            <span slot="havetuan">{{ item.havetuan }}</span>
            <span slot="groupprice">{{ item.groupprice }}</span>
            <span slot="price">{{ item.price }}</span>
          </groupbuyitemplate>
          <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'">
            <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            <span slot="title">{{ item.title }}</span>
            <span slot="saveprice">{{ item.saveprice }}</span>
            <span slot="minprice">{{ item.minprice }}</span>
            <span slot="price">{{ item.price }}</span>
          </bargainbuyitemplate>
        </template>
      </div>
    </template>
    <template v-if="productData.length">
      <div class="linearea">
        <div class="line"></div>
        <div class="txt flex_center" style="width:180px;">你或许还喜欢这些宝贝</div>
      </div>
      <div class="squarepic">
        <productitemplate :data="item" v-for="(item,index) in productData" :key="item.id">
          <img slot="photo" class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
          <span slot="title">{{ item.title }}</span>
          <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
          <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
        </productitemplate>
      </div>
    </template>
    <div class="pay-layer" v-show="showQrcode">
      <div class="bg"></div>
      <div class="layer-inner">
        <div class="inner-outer">
          <div class="inner">
            <div class="pagetop flex_center b_bottom_after">加卖家微信有机会享受更多优惠</div>
            <div class="pagemiddle flex_center">
              <img class="img" :src="retailerInfo.qrcode" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
            <div class="pagebottom flex_center">长按识别二维码添加好友</div>
            <div class="onclose">
              <div @click="closeQrcode" class="al al-close color-white align_center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-layer" v-show="showMpQrcode">
      <div class="bg"></div>
      <div class="layer-inner">
        <div class="inner-outer">
          <div class="inner">
            <div class="pagetop flex_center b_bottom_after">关注公众号接收订单发货通知</div>
            <div class="pagemiddle flex_center">
              <img class="img" :src="WeixinQrcode" />
            </div>
            <div class="pagebottom flex_center">长按识别二维码关注公众号</div>
            <div class="onclose">
              <div @click="closeMpQrcode" class="al al-close color-white align_center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import { User } from '#/storage'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
let self = {}
let pageStart = 0
const limit = 10
export default {
  components: {
    Groupbuyitemplate, Bargainbuyitemplate, Productitemplate
  },
  data () {
    return {
      query: {},
      loginUser: {},
      retailerInfo: {},
      isShow: false,
      gzhShow: false,
      activityData: [],
      productData: [],
      showQrcode: false,
      showMpQrcode: false,
      WeixinQrcode: ENV.WeixinQrcode
    }
  },
  methods: {
    viewQrcode () {
      self.showQrcode = true
    },
    closeQrcode () {
      self.showQrcode = false
    },
    viewMpQrcode () {
      self.showMpQrcode = true
    },
    closeMpQrcode () {
      self.showMpQrcode = false
    },
    handleScroll () {
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.productData.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getProduct()
          }
        }
      })
    },
    getProduct () {
      self.$http.get(`${ENV.BokaApi}/api/retailer/getRetailerProducts`, {
        params: {wid: self.wid, pagestart: pageStart, limit: limit}
      }).then(res => {
        self.$vux.loading.hide()
        self.isGetProduct = true
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
      })
    },
    refresh () {
      self.query = self.$route.query
      self.wid = self.query.wid
      if (self.query.wid) {
        self.wid = self.query.wid
      } else {
        self.wid = self.loginUser.uid
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
        params: {uid: self.wid}
      }).then(res => {
        const data = res.data
        self.retailerInfo = data.data
        if (!self.activityData.length) {
          return self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, {
            params: {do: 'store', wid: self.wid, pagestart: 0, limit: 20}
          })
        }
      }).then(res => {
        if (res) {
          const data = res.data
          self.activityData = data.data ? data.data : data
          if (!self.productData.length) {
            self.getProduct()
          }
        }
      })
    }
  },
  created () {
    self = this
    self.loginUser = User.get()
  },
  activated () {
    self = this
    self.refresh()
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
  text-align:center;line-height:25px;border-radius:20px;padding:0 10px;display:inline-block;
}
.payment .btnlist .item.active{background-color:#FF6B63;color:#fff;}
.payment .btnlist .item:not(:last-child){margin-right:10px;}
.payment .linearea{width:100%;height:50px;background-color:#F2F2F2;position:relative;}
.payment .linearea .line{background-color:#e5e5e5;height:2px;position:absolute;left:10px;right:10px;top:50%;margin-top:-1px;}
.payment .linearea .txt{background-color:#F2F2F2;width:150px;height:100%;margin:0 auto;position:relative;z-index:1;color:#666666;font-size:13px;}

.payment .pay-layer{position:fixed;top:0;bottom:0;left:0;right:0;overflow: hidden;z-index:10;display:flex;justify-content: center; align-items: center;}
.payment .pay-layer .bg{position:absolute;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);}
.payment .pay-layer .layer-inner{width:80%;}
.payment .pay-layer .inner-outer{width:100%;padding-bottom:100%;position:relative;box-sizing: border-box;}
.payment .pay-layer .inner{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:5px;background-color:#fff;}
.payment .pay-layer .img{object-fit:cover;max-width:90%;max-height:90%;}
.payment .pay-layer .pagebottom{color:#A7A7A7;}
.payment .onclose{position:absolute;bottom:-50px;left:0;right:0;text-align:center;}


</style>
