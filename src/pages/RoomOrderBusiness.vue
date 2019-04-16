/*
* @description: 群群推订单详情页面(发单方)
* @auther: simon
* @created_date: 2019-1-8
*/
<template>
  <div id="room-order-business">
    <div class="order-title db-flex font14">
      <div class="flex_cell flex_left">
        <span class="font14 clamp1" style="width:220px">群名称: {{item.grouptitle}}</span>
      </div>
      <div class="flex_cell flex_right color-red">
        <span>{{statusName}}</span>
      </div>
    </div>
    <div class="order-desc db-flex" @click="toProduct">
      <div class="flex_cell">
        <img class="v_middle imgcover" :src="item.product_photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
        <div class="order-info">
          <div class="font14 clamp1" style="width:220px">{{item.product_title}}</div>
          <div class="font14">
            <span>售价: ￥{{item.product_price}}</span>
          </div>
          <div class="font14">
            <span>佣金: ￥{{item.product_rebate}}/件</span>
          </div>
        </div>
      </div>
    </div>
    <template v-if="item.flag === 1 || item.flag === 100">
      <div class="traffic-price db-flex font14">
        <div class="flex_cell flex_left">
          <span>点击次数</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{item.views}}次</span>
        </div>
      </div>
      <div class="traffic-price db-flex font14">
        <div class="flex_cell flex_left">
          <span>已销售</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{item.saled}}件</span>
        </div>
      </div>
    </template>
    <div class="traffic-price db-flex font14">
      <div class="flex_cell flex_left">
        <span>点击价格</span>
      </div>
      <div class="flex_cell flex_right">
        <span>￥{{item.viewmoney}}/人点击</span>
      </div>
    </div>
    <div class="order-id db-flex font14">
      <div class="flex_cell flex_left">
        <span>订单编号</span>
      </div>
      <div class="flex_cell flex_right">
        <span>{{item.orderno}}</span>
      </div>
    </div>
    <div class="create-time db-flex font14">
      <div class="flex_cell flex_left">
        <span>创建时间</span>
      </div>
      <div class="flex_cell flex_right">
        <span>{{item.dateline | formatDate}}</span>
      </div>
    </div>
    <div class="operation-area">
      <span v-if="item.flag === 1 || item.flag === 100">当前总支出: <span class="color-red">￥{{item.alltotal}}</span></span>
      <div v-if="item.flag === 0" @click="toPay">
        <x-button type="warn" mini>支付</x-button>
      </div>
      <!-- <x-button v-if="item.flag === 2" mini>退款</x-button> -->
      <span v-if="item.flag === -1" class="color-red">保证金已退还至支付账户</span>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
import Time from '#/time'
import ENV from 'env'
const STATUS_NAME = {
  '-1': '已取消',
  '0': '待支付',
  '1': '交易中',
  '100': '已完成'
}
export default {
  components: {
    XButton
  },
  data () {
    return {
      query: {},
      item: {}
    }
  },
  filters: {
    formatDate (seconds) {
      return new Time(seconds * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  computed: {
    statusName () {
      return STATUS_NAME[this.item.flag]
    }
  },
  methods: {
    toProduct () {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${this.item.pid}&wid=${this.item.wid}`})
      } else {
        this.$router.push({path: '/product', query: {id: this.item.pid, wid: this.item.wid}})
      }
    },
    toPay () {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `/packageB/pages/pay?id=${this.item.orderid}&module=payorders&weburl=roomOrders`})
      } else {
        let backurl = encodeURIComponent(`/roomOrders`)
        location.replace(`${ENV.Host}/#/pay?id=${this.item.orderid}&module=payorders&backurl=${backurl}`)
      }
    },
    loadData () {
      const id = this.$route.query.id
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/groups/orderDetail`, {id: id, from: 'sellers'})
      .then(res => {
        this.$vux.loading.hide()
        if (res.data.flag === 1) {
          const data = res.data.data
          this.item = data
        }
      })
    }
  },
  activated () {
    this.query = this.$route.query
    this.loadData()
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
