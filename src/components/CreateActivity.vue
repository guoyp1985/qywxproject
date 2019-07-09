<template>
  <div class="font14">
    <div class="db-flex pl12 pr12 pt10 pb10 mb5 bg-white" @click="clickadd('groupbuy')">
      <div class="flex_left" style="width:110px;">
        <img class="disphoto db middle-cell" style="width:100px;height:100px;" src="https://tossharingsales.boka.cn/images/groupbuy.jpg">
      </div>
      <div class="flex_cell flex_left">
        <div>
          <div class="clamp2 font16 color-lightgray">{{ $t('Groupbuy') }}</div>
          <div class="font14 mt5 color-gray">{{ $t('Groupbuy description') }}</div>
          <div class="mt5">
            <div class="qbtn4 font12" style="line-height:1;">{{ $t('Eazy get order') }}</div>
          </div>
        </div>
      </div>
      <div class="flex_left ml10" style="width:20px;">
        <i class="al al-mjiantou-copy font14"></i>
      </div>
    </div>
    <div class="db-flex pl12 pr12 pt10 pb10 mb5 bg-white" @click="clickadd('bargainbuy')">
      <div class="flex_left" style="width:110px;">
        <img class="disphoto db middle-cell" style="width:100px;height:100px;" src="https://tossharingsales.boka.cn/images/bargainbuy.jpg">
      </div>
      <div class="flex_cell flex_left">
        <div>
          <div class="clamp2 font16 color-lightgray">{{ $t('Bargainbuy') }}</div>
          <div class="font14 mt5 color-999">{{ $t('Bargainbuy description') }}</div>
          <div class="mt5">
            <div class="qbtn4 font12 mr5" style="line-height:1;">{{ $t('Eazy get customer') }}</div>
            <div class="qbtn4 font12" style="line-height:1;">{{ $t('Eazy get order') }}</div>
          </div>
        </div>
      </div>
      <div class="flex_left ml10" style="width:20px;">
        <i class="al al-mjiantou-copy font14"></i>
      </div>
    </div>
    <!--
    <div class="db-flex padding10 mb5 bg-white" @click="clickadd('discount')">
      <div class="flex_left" style="width:90px;">
        <img class="disphoto db middle-cell" style="width:80px;height:80px;" src="https://tossharingsales.boka.cn/images/discount.jpg">
      </div>
      <div class="flex_cell flex_left">
        <div>
          <div class="color-black">{{ $t('Discount') }}</div>
          <div class="font12 mt5 color-gray">{{ $t('Discount description') }}</div>
          <div class="mt5">
            <div class="qbtn4 font12" style="line-height:1;">{{ $t('Eazy get order') }}</div>
          </div>
        </div>
      </div>
      <div class="flex_left ml10" style="width:20px;">
        <i class="al al-mjiantou-copy font14"></i>
      </div>
    </div>
    -->
    <div v-transfer-dom class="x-popup">
      <popup v-model="showgroupbuy" height="100%">
        <div class="popup1">
          <div class="popup-top">
            <div class="t-table h_100">
              <div class="t-cell h_100 align_center v_middle w70">{{ $t('Groupbuy') }}</div>
              <div class="t-cell h_100 v_middle pr20 align_right">
                <div class="qbtn bg-orange color-white" style="line-height:20px;" @click="toCreate('groupbuy')">{{ $t('Go to create') }}</div>
              </div>
            </div>
          </div>
          <div class="popup-middle font14">
            <div class="pl15 pr15">
              <p class="mt20 title-popup">活动规则</p>
              <div class="pl10 pr10 color-999 font12 line22">团购就是团体购物，指认识或不认识的买家联合起来，以最优价格求购同一款商品。<br>买家可在活动商品主页一键开团，也可参加别人发起的团，在规定时间内，一旦团成员达到规定人数，则拼团成功，卖家即可进行发货。若在规定时间内，团成员未达到规定人数，则拼团失败，支付的金额将自动退还给买家。</div>
              <p class="title-popup">活动优势</p>
              <div class="pl10 pr10 color-999 font12 line22">团购是一个聚人气，易成交的活动方式，能够以薄利多销形式激励买家购买，通过团购也可以让买家介绍更多买家帮他成团来获得优惠，从而积累销量、聚拢人气、获得更多成交客户！</div>
              <p class="title-popup">界面效果</p>
              <img class="db mt10 w_100" style="margin-bottom: 20px;" src="https://tossharingsales.boka.cn/images/groupbuy_1.png" />
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup1">{{ $t('Close') }}</div>
            <div class="flex_cell flex_center h_100 bg-orange color-white" @click="toCreate('groupbuy')">{{ $t('Go to create') }}</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showbargainbuy" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">
            <div class="t-table h_100">
              <div class="t-cell h_100 align_center v_middle w70">{{ $t('Bargainbuy') }}</div>
              <div class="t-cell h_100 v_middle pr20 align_right">
                <div class="qbtn bg-orange color-white" style="line-height:20px;" @click="toCreate('bargainbuy')">{{ $t('Go to create') }}</div>
              </div>
            </div>
          </div>
          <div class="popup-middle font14">
            <div class="pl15 pr15">
              <p class="mt20 title-popup">活动规则</p>
              <div class="pl10 pr10 color-999 font12 line22">砍价活动每人一次参与机会，参与者可邀请好友帮忙削减商品价格，从而获得优惠，最终以活动商品的最低价购买。在规定时间内，商品价格成功砍至最低价，则砍价成功，买家购买并支付即可；若商品价格未砍至最低价，则砍价失败，无法以活动价格购买商品！</div>
              <p class="title-popup">活动优势</p>
              <div class="pl10 pr10 color-999 font12 line22">砍价是一个传播范围广、成单机会大的活动方式，买家可以在短时间内通过多位好友的帮助，以最低的价格购买商品，从而为卖家带来大量潜在客户，为以后的销售提供更多机会！</div>
              <p class="title-popup">界面效果</p>
              <img src="https://tossharingsales.boka.cn/images/bargainbuy_1.png" style="width:100%;margin-bottom: 20px;margin-top: 10px;" class="db">
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup2">{{ $t('Close') }}</div>
            <div class="flex_cell flex_center h_100 bg-orange color-white" @click="toCreate('bargainbuy')">{{ $t('Go to create') }}</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showdiscount" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">
            <div class="t-table h_100">
              <div class="t-cell h_100 align_center v_middle w70">{{ $t('Discount') }}</div>
              <div class="t-cell h_100 v_middle pr20 align_right">
                <div class="qbtn bg-orange color-white" style="line-height:20px;" @click="toCreate('discount')">{{ $t('Go to create') }}</div>
              </div>
            </div>
          </div>
          <div class="popup-middle font14">
            <div class="pl15 pr15">
              <p class="mt20 title-popup">活动规则</p>
              <div class="pl10 pr10 color-999 font12 line22">买家可在活动期间以活动价格购买商品，每人限购数量可在活动创建时进行设置，活动商品一旦抢购完毕，买家只能以原价进行购买。</div>
              <p class="title-popup">活动优势</p>
              <div class="pl10 pr10 color-999 font12 line22">限时抢购可短时间进行大量商品销售，吸引买家及时以低价格抢购心仪商品，以达到快速获客，快速成单的目的。</div>
              <p class="title-popup">界面效果</p>
              <img src="https://tossharingsales.boka.cn/images/discount_1.png" style="width:100%;margin-bottom: 20px;margin-top: 10px;" class="db">
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup3">{{ $t('Close') }}</div>
            <div class="flex_cell flex_center h_100 bg-orange color-white" @click="toCreate('discount')">{{ $t('Go to create') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Confirm, Popup, XImg } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm, Popup, XImg
  },
  props: {
    retailerInfo: {
      type: Object,
      default: {}
    },
    fid: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showgroupbuy: false,
      showbargainbuy: false,
      showdiscount: false
    }
  },
  methods: {
    clickadd (type) {
      if (type === 'groupbuy') {
        this.showgroupbuy = !this.showgroupbuy
      } else if (type === 'bargainbuy') {
        this.showbargainbuy = !this.showbargainbuy
      } else if (type === 'discount') {
        this.showdiscount = !this.showdiscount
      }
    },
    closepopup1 () {
      this.showgroupbuy = false
    },
    closepopup2 () {
      this.showbargainbuy = false
    },
    closepopup3 () {
      this.showdiscount = false
    },
    toCreate (type) {
      const self = this
      console.log(this.fid)
      if (self.retailerInfo.buyonline !== 1 && !this.fid) {
        self.$vux.alert.show({
          title: '',
          content: '线下支付模式无法创建活动，请到设置中修改支付方式再来创建！'
        })
      } else {
        this.showgroupbuy = false
        this.showbargainbuy = false
        this.showdiscount = false
        this.$emit('on-add', type)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title-popup {
  position: relative;
  width: 100px;
  background: #f3f3f3;
  padding: 3px 5px 3px 8px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 14px;
  margin-left: 10px;
}
.title-popup:after {
  content: "";
  display: block;
  position: absolute;
  width: 2px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: -6px;
  background-color: #f89100;
  height: 100%;
}
</style>
