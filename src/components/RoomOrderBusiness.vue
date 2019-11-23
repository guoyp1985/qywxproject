/*
* @description: 群群推群订单列表组件(发单方)
* @auther: simon
* @created_date: 2019-1-8
*/
<template>
  <div class="room-order-business">
    <div class="room-order-business-info">
      <div @click="toDetail">
        <div class="db-flex">
          <div class="order-avatar flex_cell">
            <img class="v_middle imgcover" :src="item.product_photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
            <div class="order-details">
              <div class="font14 clamp1" style="width:180px">{{item.product_title}}</div>
              <div class="font14">
                <span>售价: ￥{{item.product_price}}</span>
                <span>佣金: ￥{{item.product_rebate}}/件</span>
              </div>
              <div class="font14 color-red">点击价格: ￥{{item.viewmoney}}/人点击</div>
            </div>
          </div>
        </div>
        <div class="order-status">
          <span class="font13">{{statusName}}</span>
        </div>
      </div>
    </div>
    <div v-if="item.flag === -1" class="stats-area font14">
      <div class="info-area align_right">
        <span>保证金:</span>
        <span class="color-red">￥{{item.deposit}}</span>
      </div>
      <div class="button-area">
        <x-button mini class="btn">退款</x-button>
      </div>
    </div>
    <div v-if="item.flag === 0" class="stats-area font14">
      <div class="info-area align_right">
        <span>保证金:</span>
        <span class="color-red">￥{{item.deposit}}</span>
      </div>
      <div class="button-area">
        <!-- <router-link :to="{ name: 'tPay', query: {id: item.orderid, module: 'payorders'} }"> -->
        <x-button mini type="warn" class="btn" @click.native="toPay">支付</x-button>
        <!-- </router-link> -->
      </div>
    </div>
    <div v-if="item.flag === 1" class="pre-stats-area font14">
      <div class="db-flex info-area">
        <div class="flex_cell flex_left">
          <span>当前点击支出:</span>
          <span>￥{{item.viewtotal}}</span>
        </div>
        <div class="flex_cell flex_right">
          <span>当前佣金支出:</span>
          <span>￥{{item.buytotal}}</span>
        </div>
      </div>
      <div class="info-area align_right">
        <span>当前总支出:</span>
        <span class="color-red">￥{{item.alltotal}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XButton } from 'vux'
import ENV from 'env'
const STATUS_NAME = {
  '-1': '已取消',
  '0': '待支付',
  '1': '交易中',
  '100': '已完成'
}
export default {
  name: 'RoomOrderBusiness',
  components: {
    Group, Cell, XButton
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          productName: 'unkown',
          flag: 0,
          productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          retailerTitle: 'retailerTitle',
          productPrice: 'productPrice',
          retailerPrice: 1,
          trafficCharge: 1,
          currentTrafficIncome: 0,
          currentRetailerIncome: 0,
          trafficIncome: 0,
          retailerIncome: 0
        }
      }
    }
  },
  data () {
    return {
      rangeData: 0
    }
  },
  computed: {
    statusName () {
      return STATUS_NAME[this.item.flag]
    }
  },
  methods: {
    toDetail () {
      let from = this.$route.query.from
      let params = {id: this.item.id}
      if (from) {
        params.from = from
      }
      this.$router.push({path: '/roomOrderBusiness', query: params})
    },
    toPay () {
      let from = this.$route.query.from
      if (from) {
        this.$wechat.miniProgram.navigateTo({url: `/packageB/pages/pay?id=${this.item.orderid}&module=payorders&weburl=roomOrders`})
      } else {
        let backurl = encodeURIComponent('/roomOrders')
        location.replace(`${ENV.Host}/#/pay?id=${this.item.orderid}&module=payorders&backurl=${backurl}`)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.room-order-business {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}
.room-order-business-info {
  position: relative;
  padding: 10px;
}
.room-order-business-info:after {
  content: ' ';
  position: absolute;
  height: 1px;
  left: 10px;
  right: 10px;
  bottom: 0px;
  background-color: #f0f0f0;
}
.room-order-business .weui-cells {
  margin-top: 0;
  font-size: 13px;
}
.room-order-business .order-details {
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
}
.room-order-business .order-status {
  position: absolute;
  top: 10px;
  right: 0px;
  padding: 0 6px;
  border-top: 1px solid @boka-red;
  border-left: 1px solid @boka-red;
  border-bottom: 1px solid @boka-red;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  color: @boka-red;
}
.room-order-business .order-avatar img {
  width: 64px;
  height: 64px;
}
.room-order-business .button-area {
  position: relative;
  text-align: right;
  vertical-align: middle;
  padding: 10px 0;
}
.room-order-business .btn {
  margin-top: 0;
  margin-right: 10px;
}
.room-order-business .info-area {
  padding: 10px;
}
</style>
