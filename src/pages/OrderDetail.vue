/*
* @description: 订单详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-detail">
    <sticky scroll-box="order-detail">
      <div class="order-service">
        <div class="seller-cell">
          <span class="font14">卖家: {{retailerInfo.title}}</span>
        </div>
        <div class="contact-cell">
          <div class="ol-contact">
            <router-link :to="{path: '/chat', query: {uid: retailerInfo.uploader}}">
              <span class="al al-pinglun3 color-order-detail font14"></span>
              <span class="font13">{{$t('Contact Seller')}}</span>
            </router-link>
          </div>
          <div class="wx-contact">
            <a @click="wxContact">
              <span class="al al-liaotian color-order-detail font18"></span>
              <span class="font13">{{$t('Weixin Contact')}}</span>
            </a>
          </div>
        </div>
      </div>
    </sticky>
    <group class="shipping-card">
      <cell v-if="expressNumber" class="express-info font14" :title="expressInfo" :value="$t('View Details')" is-link :link="{path: '/shippingDetails', query: {id: id}}"></cell>
      <cell class="font14" :title="`${$t('Receiver')}: ${receiver}`" :value="receiverPhone"></cell>
      <cell class="shipping-address font12 color-gray" :title="`${$t('Shipping Address')}: ${shippingAddress}`"></cell>
      <cell class="shipping-address font12 color-gray" :title="`${$t('Order Number')}: ${shippingOrderon}`"></cell>
    </group>
    <!-- <order-info :item="order" @on-eval="evaluate"></order-info> -->
    <group>
      <cell class="order-list font12" v-for="(order, index) in orders" :key="index">
        <img slot="icon" :src="order.photo"/>
        <div slot="title">
          {{order.name}}
        </div>
        <div slot="after-title" class="color-gray">
          数量: {{order.quantity}}
        </div>
        <div slot="inline-desc">
          ¥{{order.special}}
        </div>
      </cell>
    </group>
    <group>
      <cell-form-preview v-if="priceInfos.length" :list="priceInfos"></cell-form-preview>
      <cell class="font14" :value="`${$t('Actual Payment')}: ¥${special}`"></cell>
    </group>
    <div v-transfer-dom class="qrcode-dialog">
      <x-dialog v-model="wxCardShow" class="dialog-demo">
        <div class="img-box">
          <img :src="retailerInfo.qrcode" style="max-width:100%">
        </div>
        <div>
          <span>{{$t('Add To Contacts With Scan Qrcode')}}</span>
        </div>
        <div @click="wxCardShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, CellFormPreview, TransferDom } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import ENV from 'env'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Sticky, XDialog, CellFormPreview, OrderInfo
  },
  data () {
    return {
      id: 0,
      retailerInfo: Object,
      receiver: 'unkown',
      receiverPhone: '13500000000',
      expressCompany: '未知快递',
      expressNumber: '100000000000',
      shippingAddress: '北京市市辖区',
      shippingOrderon: 'unkown',
      special: 0,
      orders: [],
      priceInfos: [],
      userQrCode: '',
      wxCardShow: false
    }
  },
  computed: {
    expressInfo () {
      return `${this.expressCompany} ${this.expressNumber}`
    }
  },
  methods: {
    evaluate () {
      this.$router.push({name: 'evaluation', params: {order: this.order}})
    },
    wxContact () {
      this.wxCardShow = true
    },
    getData () {
      const self = this
      this.id = this.$route.query.id
      this.$http.get(`${ENV.BokaApi}/api/order/orderDetail?id=${this.id}`)
      .then(res => {
        let data = res.data
        if (data.flag) {
          let retdata = data.data
          self.orders = retdata.orderlist
          self.special = retdata.special
          self.retailerInfo = retdata.retailer
          self.shippingAddress = retdata.address
          self.shippingOrderon = retdata.orderno
          self.receiver = retdata.linkman
          self.receiverPhone = retdata.telephone
          self.expressCompany = retdata.delivercompanyname
          self.expressNumber = retdata.delivercode
        }
      })
    }
  },
  created () {
    console.log('this.id')
    this.getData()
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
.qrcode-dialog .img-box {
  height: 350px;
  overflow: hidden;
}
.qrcode-dialog .vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}

/* vui css hack */
#order-detail .shipping-address:before {
  height: 0;
  border-top: none;
}
#order-detail .shipping-card .weui-cell {
  padding: 5px 10px 0px 0px
}
#order-detail .shipping-card .weui-cells{
  padding:5px 0 10px 0
}
#order-detail .express-info .weui-cell__ft{
  font-size: 12px;
}
#order-detail .weui-cells {
  margin-top: 10px !important;
}
#order-detail .vux-cell-primary {
  padding-left: 10px;
}
#order-detail .vux-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
}
</style>
