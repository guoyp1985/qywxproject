/*
* @description: 群群推群订单列表组件(发单方)
* @auther: simon
* @created_date: 2019-1-8
*/
<template>
  <div class="room-order-business">
    <div class="room-order-business-info">
      <router-link :to="{ name: 'tRoomOrderBusiness', params: {id: item.id} }">
        <div class="db-flex">
          <div class="order-avatar flex_cell">
            <img class="v_middle imgcover" :src="item.productAvatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
            <div class="order-details">
              <div class="font14">{{item.productName}}</div>
              <div class="font14">
                <span>售价: ￥{{item.productPrice}}</span>
                <span>佣金: ￥{{item.retailerPrice}}/件</span>
              </div>
              <div class="font14 color-red">点击价格: ￥{{item.retailerTitle}}/人点击</div>
            </div>
          </div>
        </div>
        <div class="order-status">
          <span class="font13">{{statusName}}</span>
        </div>
      </router-link>
    </div>
    <div v-if="item.status === 0" class="pre-stats-area font14">
      <div class="db-flex info-area">
        <div class="flex_cell flex_left">
          <span>当前点击支出:</span>
          <span>{{item.currentTrafficFee}}</span>
        </div>
        <div class="flex_cell flex_right">
          <span>当前佣金支出:</span>
          <span>{{item.currentRetailFee}}</span>
        </div>
      </div>
      <div class="info-area align_right">
        <span>当前总支出:</span>
        <span class="color-red">￥{{item.currentFee}}</span>
      </div>
    </div>
    <div v-if="item.status === 1" class="stats-area flex-db font14">
      <div class="info-area align_right">
        <span>保证金:</span>
        <span class="color-red">￥{{item.bond}}</span>
      </div>
      <div class="button-area">
        <x-button mini type="warn" class="btn">支付</x-button>
      </div>
    </div>
    <div v-if="item.status === 2" class="stats-area flex-db font14">
      <div class="info-area align_right">
        <span>保证金:</span>
        <span class="color-red">￥{{item.bond}}</span>
      </div>
      <div class="button-area">
        <x-button mini class="btn">退款</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XButton } from 'vux'
const STATUS_NAME = ['交易中', '待支付', '待确认', '已取消', '已完成']
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
          status: 0,
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
      return STATUS_NAME[this.item.status]
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
  padding: 5px 10px;
}
.room-order-business .info-area:first-child {
  border-top: 1px solid #f0f0f0;
}
</style>
