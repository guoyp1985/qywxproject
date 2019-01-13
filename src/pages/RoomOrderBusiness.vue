/*
* @description: 群群推订单详情页面(发单方)
* @auther: simon
* @created_date: 2019-1-8
*/
<template>
  <div id="room-order-business">
    <div class="order-title db-flex font14">
      <div class="flex_cell flex_left">
        <span>群名称:</span>
        <span>{{roomName}}</span>
      </div>
      <div class="flex_cell flex_right color-red">
        <span>{{statusName}}</span>
      </div>
    </div>
    <div class="order-desc db-flex">
      <div class="flex_cell">
        <img class="v_middle imgcover" :src="productAvatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
        <div class="order-info">
          <div class="font14">{{productName}}</div>
          <div class="font14">
            <span>售价: ￥{{productPrice}}</span>
          </div>
          <div class="font14">
            <span>佣金: ￥{{retailPrice}}/件</span>
          </div>
        </div>
      </div>
    </div>
    <template v-if="status === 0 || status === 1">
      <div class="traffic-price db-flex font14">
        <div class="flex_cell flex_left">
          <span>点击次数</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{trafficCounts}}次</span>
        </div>
      </div>
      <div class="traffic-price db-flex font14">
        <div class="flex_cell flex_left">
          <span>共购买</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{amount}}件</span>
        </div>
      </div>
    </template>
    <div class="traffic-price db-flex font14">
      <div class="flex_cell flex_left">
        <span>点击价格</span>
      </div>
      <div class="flex_cell flex_right">
        <span>￥{{trafficPrice}}/人点击</span>
      </div>
    </div>
    <div class="order-id db-flex font14">
      <div class="flex_cell flex_left">
        <span>订单编号</span>
      </div>
      <div class="flex_cell flex_right">
        <span>{{orderId}}</span>
      </div>
    </div>
    <div class="create-time db-flex font14">
      <div class="flex_cell flex_left">
        <span>创建时间</span>
      </div>
      <div class="flex_cell flex_right">
        <span>{{createTime}}</span>
      </div>
    </div>
    <div class="operation-area">
      <span v-if="status === 0">当前总支出: <span class="color-red">￥{{currentFee}}</span></span>
      <x-button v-if="status === 1" type="warn" mini>支付</x-button>
      <x-button v-if="status === 2" mini>退款</x-button>
      <span v-if="status === 3" class="color-red">保证金已退还至支付账户</span>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
const STATUS_NAME = ['交易中', '待支付', '待确认', '已取消', '已完成']
export default {
  components: {
    XButton
  },
  data () {
    return {
      roomName: 'abc',
      productAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
      productName: 'unkown',
      productPrice: '0.0',
      retailPrice: '0.0',
      trafficPrice: '0.0',
      trafficCounts: 100,
      amount: 20,
      currentIncome: 500,
      income: 1000,
      orderId: '00000000000001',
      createTime: '2019-1-1 0:0:1',
      endTime: '2019-1-2 0:0:1',
      status: 1
    }
  },
  computed: {
    statusName () {
      return STATUS_NAME[this.status]
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
#room-order-business {
  background-color: #ffffff;
}
#room-order-business .db-flex,
.operation-area {
  padding: 10px;
}
#room-order-business .traffic-price,
#room-order-business .order-id,
#room-order-business .create-time {
  border-bottom: 1px solid #f0f0f0;
}
#room-order-business .order-desc {
  background-color: @page-bg-color;
}
#room-order-business .order-desc img {
  width: 64px;
  height: 64px;
}
#room-order-business .order-info {
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
}
#room-order-business .operation-area {
  text-align: right;
}
</style>
