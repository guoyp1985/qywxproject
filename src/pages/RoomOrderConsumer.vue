/*
* @description: 群群推订单详情页面(接单方)
* @auther: simon
* @created_date: 2019-1-6
*/
<template>
  <div id="room-order-consumer">
    <div class="order-title db-flex font14">
      <div class="flex_cell flex_left">
        <span>客户:</span>
        <span>{{customer}}</span>
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
    <template v-if="status === 1 || status === 2">
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
    <template v-if="status < 3">
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
    </template>
    <div class="create-time db-flex font14">
      <div class="flex_cell flex_left">
        <span>创建时间</span>
      </div>
      <div class="flex_cell flex_right">
        <span>{{createTime}}</span>
      </div>
    </div>
    <template v-if="status === 2">
      <div class="create-time db-flex font14">
        <div class="flex_cell flex_left">
          <span>结束时间</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{endTime}}</span>
        </div>
      </div>
    </template>
    <div class="operation-area">
      <x-button v-if="status === 0" mini>接收订单</x-button>
      <span v-if="status === 1">当前总收入: <span class="color-red">￥{{currentIncome}}</span></span>
      <span v-if="status === 2">实际收入: <span class="color-red">￥{{income}}</span></span>
      <span v-if="status === 3" class="color-red">对方已取消订单</span>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
const STATUS_NAME = ['待接收', '交易中', '已完成', '已取消']
export default {
  components: {
    XButton
  },
  data () {
    return {
      customer: 'xyz',
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
      status: 0
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
#room-order-consumer {
  background-color: #ffffff;
}
#room-order-consumer .db-flex,
.operation-area {
  padding: 10px;
}
#room-order-consumer .traffic-price,
#room-order-consumer .order-id,
#room-order-consumer .create-time {
  border-bottom: 1px solid #f0f0f0;
}
#room-order-consumer .order-desc {
  background-color: @page-bg-color;
}
#room-order-consumer .order-desc img {
  width: 64px;
  height: 64px;
}
#room-order-consumer .order-info {
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
}
#room-order-consumer .operation-area {
  text-align: right;
}
</style>
