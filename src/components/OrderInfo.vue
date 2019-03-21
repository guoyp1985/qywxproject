/*
* @description: 订单列表项组件
* @auther: simon
* @created_date: 2018-4-7
*/
<template>
  <div class="order-info">
    <router-link :to="{path:'/store',query:{wid:item.wid}}">
      <div class="store-info">
        <div class="info-cell">
          <span :class="`al ${storeType} font22`"></span>
          <span class="font14">{{item.retailertitle}}</span>
          <span class="al al-mjiantou-copy font16"></span>
        </div>
        <div class="status-cell font12 color-orange6" v-if="item.flagstr">
          <span>{{item.flagstr}}</span>
        </div>
      </div>
    </router-link>
    <router-link :to="{path:'/orderDetail',query:{id:item.id}}">
      <div class="products-info" v-if="item.orderlist.length > 1">
        <div class="product-img">
          <img v-for="(order, index) in item.orderlist" :key="index" class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
        </div>
      </div>
      <div class="product-info" v-else>
        <div class="product-img" style="position:relative;">
          <img class="v_middle imgcover" :src="item.orderlist[0].photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
          <img v-if="item.carddeduct > 0" class="yhq" src="https://tossharingsales.boka.cn/minigxk/yhq.png"/>
        </div>
        <div class="flex_cell">
          <div class="product-name font12">
            {{item.orderlist[0].name}}
          </div>
          <div class="mt5 db-flex font14">
            <div class="flex_cell flex_left color-red4">{{ $t('RMB') }} {{ item.orderlist[0].special }}</div>
            <div class="flex_cell flex_right color-999">× <span class="font12">{{ item.orderlist[0].quantity }}</span></div>
          </div>
        </div>
      </div>
    </router-link>
    <div class="pay-info flex_right">
      <div class="clamp1 w_100">
        <span class="v_middle font12">实际支付: </span><span class="v_middle font14">{{ $t('RMB') }}{{item.paymoney}}</span>
        <template v-if="!item.delivertype && item.postage && item.postage != ''">
          <span class="v_middle font12 color-gray" v-if="item.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
          <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ item.postage }} )</span>
        </template>
        <template v-if="item.carddeduct > 0">
          <span class="v_middle font12 color-gray">优惠券抵扣: {{ $t('RMB') }}{{ item.carddeduct }}</span>
        </template>
      </div>
    </div>
    <div class="operate-area" v-if="item.buttons && item.buttons.length">
      <div class="db-in" v-for="(button, index) in item.buttons" :key="index">
        <x-button mini @click.native="buttonClick(button.id)" class="font12">{{button.name}}</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XImg, XButton } from 'vux'
export default {
  name: 'OrderInfo',
  components: {
    XImg, XButton
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: '0',
          type: 1,
          name: 'unkown',
          storeId: '0',
          storeType: 1,
          storeName: 'unkown',
          status: 0,
          imgs: ['https://tossharingsales.boka.cn/images/nopic.jpg'],
          desc: undefined,
          num: 0,
          pay: 0
        }
      }
    },
    buttons: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      statusButtons: [
        {id: 1, name: '取消订单'},
        {id: 2, name: '去支付'},
        {id: 3, name: '申请退款'},
        {id: 4, name: '查看物流'},
        {id: 5, name: '申请售后'},
        {id: 6, name: '确认收货'},
        {id: 7, name: '评价'}
      ]
    }
  },
  computed: {
    storeType () {
      let icon = ''
      switch (this.item.storeType) {
        case 1:
          icon = 'al-weidian1'
          break
        default:
          icon = 'al-weidian1'
      }
      return icon
    },
    total () {
      let count = 0
      for (let o of this.item.orderlist) {
        count += o.quantity
      }
      return count
    }
  },
  methods: {
    buttonClick (type) {
      this.$emit('on-process', type, this.item, this.index)
    }
  }
}
</script>

<style lang="less">
.order-info,
.order-info .operate-area {
  position: relative;
}
.order-info {
  margin-top: 10px;
}
.order-info .operate-area:before,
.order-info:before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #f0f0f0;
}
.order-info .store-info,
.order-info .pay-info,
.order-info .operate-area {
  background-color: #ffffff;
}
.order-info .store-info,
.order-info .product-info,
.order-info .product-info .product-img{
  display: flex;
}
.order-info .yhq{position: absolute;left: 0;top: 0;width: 40px !important;height:40px !important;border:none !important;}
.order-info .store-info {
  padding: 0 10px;
}
.order-info .store-info .info-cell{
  flex: 1;
}
.order-info .store-info .info-cell span {
  vertical-align: middle;
}
.order-info .product-info,
.order-info .products-info {
  padding: 10px 15px;
  background-color: #f7f7f7;
}
.order-info .store-info .status-cell {
  text-align: center;
}
.order-info .store-info .status-cell span {
  line-height: 34px;
}
.order-info .product-info .product-img img{
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 1px solid #eeeeee;
}
.order-info .pay-info,
.order-info .operate-area {
  text-align: right;
}
.order-info .pay-info {
  padding: 5px 20px;
}
.order-info .operate-area {
  padding: 8px 10px;
}
/* vux css hack */
.order-info .weui-btn + .weui-btn {
  margin-top: 0;
}
.order-info .weui-btn {
  margin-left: 5px;
}
</style>
