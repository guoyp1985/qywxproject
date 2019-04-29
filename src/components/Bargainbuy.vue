<template>
  <div class="containerarea font14 bargainbuy notop nobottom">
    <div class="pagemiddle scroll-container">
      <div class="topimg">
        <img src="https://tossharingsales.boka.cn/images/bargainbuy_bg.png" />
      </div>
      <div class="boxarea productarea">
        <router-link class="t-table" :to="{path:'/product',query:{wid:product.wid,id:product.id}}" style="color:inherit;">
            <div class="t-cell pic v_middle">
              <img class="imgcover" :src="product.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
            <div class="t-cell pl10 v_middle">
              <div class="clamp2 title font13 color-gray7">{{ product.title }}</div>
              <div class="clamp1 font13 mt3 color-red3">最低价：<span class="disminprice font16 bold">{{ data.minprice }}</span> 元<del class="ml10 color-gray7">原价：{{ product.price }} 元</del></div>
              <div class="clamp1 font13 color-red3">剩余：<span class="font16 bold">{{ data.leftstorage }}</span> 件</div>
            </div>
            <div class="t-cell v_middle align_center" style="width:40px;">
              <i class="al al-mjiantou-copy color-gray font20"></i>
            </div>
        </router-link>
      </div>
      <div class="mauto align_center" style="width: 94%;height: 5px;">
        <div class="mauto" style="border-left:3px solid #FDC45D;border-right:3px solid #FDC45D;width: 45%;height: 100%;"></div>
      </div>
      <div class="mauto mb10 border-box" style="width: 94%;background-color: #FDC45D;border-radius: 13px;padding:11px 15px 8px 15px;">
        <div class="mt12 align_center" style="color: #C93A3A;">当前有 <span class="font18 bold">{{ data.currentnumbers }}</span> 人正在砍价中...</div>
        <div v-if="data.isfinished" class="btn">活动已结束</div>
        <div v-else class="btn" @click="joinin">我要参与</div>
        <div class=" font12 pt10 pl15 pr15 pb10 color-gray7">
          <div>活动规则：</div>
          <div>1. 每人一次砍价机会；</div>
          <div>2. 活动商品只可购买一次；</div>
          <div>3. 商品最终购买金额以实际所砍金额为准；</div>
          <div>4. 砍价活动结束后，商品即恢复原价；</div>
          <div>5. 该活动不可与其他活动优惠同时使用；</div>
          <div>6. 参与活动的有效砍价时间为{{ data.finishtime }}小时；</div>
          <div>7. 活动截止时间: {{ data.endtime | dateformat }}</div>
          <div>（商品若提前售完，活动将提前截止）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  name: 'Bargainbuy',
  props: {
    data: Object,
    product: Object,
    user: {
      type: Object,
      default: { 'avatar': 'https://tossharingsales.boka.cn/images/user.jpg' }
    },
    onJoin: Function
  },
  components: {
    XImg
  },
  data () {
    return {
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    joinin () {
      const self = this
      if (self.user.subscribe === 0) {
        this.$util.wxAccess()
      } else {
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/activity/createBargain`, { id: self.data.id }).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error),
            onHide: function () {
              if (data.flag === 1) {
                self.onJoin && self.onJoin(data.data)
              }
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less">
.bargainbuy {
    background-image: linear-gradient(-180deg, #f32a3d 0%, #FF8048 100%);
}
.bargainbuy .topimg img {
    width: 100%;
    vertical-align: middle;
}
.bargainbuy .boxarea {
  box-sizing: border-box;
  width: 94%;
  margin: 0 auto;
  background-color: #eee;
  padding: 5px;
  border-radius: 50px;
  border: 6px solid #fff;
}
.bargainbuy .productarea .pic{width:80px;text-align:left;}
.bargainbuy .productarea .pic img{
  width:70px;height:70px;border-radius:50%;
  vertical-align:middle;
}
.bargainbuy .btn{
  width: 90%;
  background-image: linear-gradient(90deg, #EC3F57 0%, #FF8147 99%);
  box-shadow: 0 5px 8px 0 #C13123;
  border-radius: 100px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: white;
  font-size: 18px;
  margin: 16px auto 10px auto;
  cursor: pointer;
  letter-spacing: 2px;
}
</style>
