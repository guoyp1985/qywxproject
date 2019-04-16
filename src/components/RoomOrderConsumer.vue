/*
* @description: 群群推群订单列表组件(接单方)
* @auther: simon
* @created_date: 2019-1-4
*/
<template>
  <div class="room-order-consumer">
    <div class="room-order-consumer-info">
      <div @click="toDetail">
        <div class="db-flex">
          <div class="order-avatar flex_cell">
            <img class="v_middle imgcover" :src="item.product_photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
            <div class="order-details">
              <div class="font16 clamp1" style="width:180px">{{item.product_title}}</div>
              <!-- <div class="font14 clamp1" style="width:180px">店主: {{item.retailer}}</div> -->
              <div class="font14">
                <span>售价: <span class="color-red">￥{{item.product_price}}</span></span>
                <span>佣金: <span class="color-red">￥{{item.product_rebate}}/件</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="order-status">
          <span class="font13">{{statusName}}</span>
        </div>
      </div>
    </div>
    <div v-if="item.flag === -2" class="pre-stats-area font14">
      <group class="font14">
        <cell title="预计点击收入" :value="preTrafficIncome"></cell>
        <cell title="预计佣金收入" :value="preRetailIncome"></cell>
        <cell title="据人数推算总额" primary="content">
          <range v-model="rangeData" :min="1" :max="500"></range>
        </cell>
      </group>
      <div class="button-area">
        <x-button mini class="btn">拒绝</x-button>
        <x-button mini type="warn" class="btn">接收</x-button>
      </div>
    </div>
    <div v-if="item.flag === 1" class="stats-area db-flex font14">
      <div class="flex_cell">
        <div>
          <span>当前点击收入:</span>
          <span>￥{{item.viewtotal}}</span>
        </div>
      </div>
      <div class="flex_cell">
        <div>
          <span>当前佣金收入:</span>
          <span>￥{{item.buytotal}}</span>
        </div>
      </div>
    </div>
    <div v-if="item.flag === 100" class="stats-area db-flex font14">
      <div class="flex_cell">
        <div>
          <span>订单点击收入:</span>
          <span><span class="color-red">￥{{item.viewtotal}}</span></span>
        </div>
      </div>
      <div class="flex_cell">
        <div>
          <span>订单佣金收入:</span>
          <span><span class="color-red">￥{{item.buytotal}}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Range, XButton } from 'vux'
const STATUS_NAME = {
  '-1': '已取消',
  '1': '交易中',
  '100': '已完成'
}
export default {
  name: 'RoomOrderConsumer',
  components: {
    Group, Cell, Range, XButton
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          productName: 'unkown',
          status: 0,
          productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          retailerTitle: 'retailerTitle',
          productPrice: 'productPrice',
          retailPrice: 1,
          trafficCharge: 1,
          currentTrafficIncome: 0,
          currentRetailIncome: 0,
          trafficIncome: 0,
          retailIncome: 0
        }
      }
    }
  },
  data () {
    return {
      rangeData: 1
    }
  },
  computed: {
    statusName () {
      return STATUS_NAME[this.item.flag]
    },
    preTrafficIncome () {
      return `${this.item.trafficCharge} x ${this.rangeData} = ${this.item.trafficCharge * this.rangeData}元`
    },
    preRetailIncome () {
      return `${this.item.retailPrice} x ${this.rangeData} = ${this.item.retailPrice * this.rangeData}元`
    }
  },
  methods: {
    toDetail () {
      let params = {id: this.item.id}
      if (this.$route.query.from) {
        params.from = this.$route.query.from
      }
      this.$router.push({path: '/roomOrderConsumer', query: params})
    }
  }
}
</script>
<style lang="less">
.room-order-consumer .weui-cells {
  font-size: 14px;
}
.room-order-consumer {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}
.room-order-consumer-info {
  position: relative;
  padding: 10px;
}
.room-order-consumer-info:after {
  content: ' ';
  position: absolute;
  height: 1px;
  left: 10px;
  right: 10px;
  bottom: 0px;
  background-color: #f0f0f0;
}
.room-order-consumer .weui-cells {
  margin-top: 0;
  font-size: 13px;
}
.room-order-consumer .order-details {
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
}
.room-order-consumer .order-status {
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
.room-order-consumer .stats-area {
  padding: 10px;
}
.room-order-consumer .order-avatar img {
  width: 64px;
  height: 64px;
}
.room-order-consumer .button-area {
  position: relative;
  text-align: right;
  vertical-align: middle;
  padding: 10px 0;
}
.room-order-consumer .btn {
  margin-top: 0;
  margin-right: 10px;
}
</style>
