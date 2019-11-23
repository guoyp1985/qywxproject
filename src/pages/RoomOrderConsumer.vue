/*
* @description: 群群推订单详情页面(接单方)
* @auther: simon
* @created_date: 2019-1-6
*/
<template>
  <div id="room-order-consumer">
    <div class="order-title db-flex font14">
      <div class="flex_cell flex_left">
        <span class="font14 clamp1" style="width:220px">卖家: {{item.retailer}}</span>
      </div>
      <div class="flex_cell flex_right color-red">
        <span>{{statusName}}</span>
      </div>
    </div>
    <div class="order-desc db-flex w_100" @click="toProduct(item)">
      <div class="pic flex_left">
        <img class="v_middle imgcover" :src="item.product_photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
      </div>
      <div class="flex_cell flex_left">
        <div class="order-info w_100">
          <div class="font14 clamp1">{{item.product_title}}</div>
          <div class="font14">
            <span>售价: ￥{{item.product_price}}</span>
          </div>
          <div class="font14">
            <span>佣金: ￥{{item.product_rebate}}/件</span>
          </div>
        </div>
      </div>
      <div class="w100 flex_center">
        <div class="qbtn bg-theme color-white font12">分享到群</div>
      </div>
    </div>
    <div class="traffic-price db-flex font14">
      <div class="flex_left w100">
        <span>群名称</span>
      </div>
      <div class="flex_cell flex_right">
        <span>{{item.grouptitle}}</span>
      </div>
    </div>
    <template v-if="item.flag === 1 || item.flag === 100">
      <div class="traffic-price db-flex font14">
        <div class="flex_left w100">
          <span>点击次数</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{item.views}}次</span>
        </div>
      </div>
      <div class="traffic-price db-flex font14">
        <div class="flex_left w100">
          <span>已销售</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{item.saled}}件</span>
        </div>
      </div>
    </template>
    <template v-if="item.flag > -1">
      <div class="traffic-price db-flex font14">
        <div class="flex_left w100">
          <span>点击价格</span>
        </div>
        <div class="flex_cell flex_right">
          <span>￥{{item.viewmoney}}/人点击</span>
        </div>
      </div>
      <div class="order-id db-flex font14">
        <div class="flex_left w100">
          <span>订单编号</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{item.orderno}}</span>
        </div>
      </div>
    </template>
    <div class="create-time db-flex font14">
      <div class="flex_left w100">
        <span>创建时间</span>
      </div>
      <div class="flex_cell flex_right">
        <span>{{item.dateline | formatDate}}</span>
      </div>
    </div>
    <template v-if="item.flag === 100">
      <div class="create-time db-flex font14">
        <div class="flex_left w100">
          <span>结束时间</span>
        </div>
        <div class="flex_cell flex_right">
          <span>{{item.endtime | formatDate}}</span>
        </div>
      </div>
    </template>
    <div class="operation-area">
      <!-- <x-button v-if="item.flag === 0" mini>接收订单</x-button> -->
      <span v-if="item.flag === 1">当前总收入: <span class="color-red">￥{{item.alltotal}}</span></span>
      <span v-if="item.flag === 100">实际收入: <span class="color-red">￥{{item.alltotal}}</span></span>
      <span v-if="item.flag === -1" class="color-red">对方已取消订单</span>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
import Time from '#/time'
import ENV from 'env'
const STATUS_NAME = {
  '-1': '已取消',
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
    toProduct (item) {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&wid=${item.wid}&module=product&wechatorderid=${item.id}&iswechat=1`})
      } else {
        this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid, wechatorderid: item.id, iswechat: 1}})
      }
    },
    loadData () {
      const id = this.$route.query.id
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/groups/orderDetail`, {id: id, from: 'groupowner'})
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
#room-order-consumer .order-desc {
  .pic{
    width: 74px;
    img{width: 64px;height: 64px;}
  }
}
#room-order-consumer .operation-area {
  text-align: right;
}
</style>
