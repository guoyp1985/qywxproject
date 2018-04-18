<template>
  <div id="order-detail">
    <sticky scroll-box="order-detail">
      <div class="order-service">
        <div class="seller-cell">
          <span class="font14">卖家: {{seller}}</span>
        </div>
        <div class="contact-cell">
          <div class="ol-contact">
            <router-link to="">
              <span class="al al-pinglun3 color-order-detail font14"></span>
              <span class="font13">{{$t('Online Contact')}}</span>
            </router-link>
          </div>
          <div class="wx-contact">
            <router-link to="">
              <span class="al al-liaotian color-order-detail font18"></span>
              <span class="font13">{{$t('Weixin Contact')}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </sticky>
    <group class="shipping-card">
      <cell class="express-info font14" :title="expressInfo" :value="$t('View Details')" is-link link="/shippingDetails"></cell>
      <cell class="font14" :title="$t('Receiver')+': '+receiver" :value="receiverPhone"></cell>
      <cell class="shipping-address font12 color-gray" :title="$t('Shipping Address')+': '+shippingAddress"></cell>
    </group>
    <order-info></order-info>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, Cell, Sticky } from 'vux'
import OrderInfo from './OrderInfo'

export default {
  components: {
    Group,
    Cell,
    Sticky,
    OrderInfo
  },
  data () {
    return {
      seller: 'unkown',
      receiver: 'unkown',
      receiverPhone: '13500000000',
      expressCompany: '未知快递',
      expressNumber: '100000000000',
      shippingAddress: '北京市市辖区'
    }
  },
  computed: {
    expressInfo () {
      return `${this.expressCompany} ${this.expressNumber}`
    }
  }
}
</script>

<style lang="less">
/* css extension */
#order-detail .order-service {
  display: flex;
  background-color: #ffffff;
  padding: 10px 2px 10px 10px;
}
#order-detail .order-service:after {
  content: ' ';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  border-bottom: 1px solid #dfdfdf;
  color: #c7c7c7;
}
#order-detail .seller-cell {
  overflow: hidden;
}
#order-detail .contact-cell {
  width : 180px;
  display: flex;
}
#order-detail .order-service,
#order-detail .ol-contact,
#order-detail .wx-contact {
  position: relative;
}
#order-detail .seller-cell,
#order-detail .ol-contact,
#order-detail .wx-contact {
  flex: 1;
}
#order-detail .ol-contact,
#order-detail .wx-contact {
  text-align: center;
}
#order-detail .seller-cell span,
#order-detail .contact-cell span {
  vertical-align: middle;
}
#order-detail .ol-contact:after {
  content: ' ';
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 1px solid #dfdfdf;
  color: #dfdfdf;
}

/* vui css hack */
#order-detail .shipping-address:before {
  height: 0;
  border-top: none;
}
#order-detail .shipping-card .weui-cell {
  padding: 8px 10px;
}
#order-detail .express-info .weui-cell__ft{
  font-size: 12px;
}
#order-detail .weui-cells {
  margin-top: 10px !important;
}
</style>
