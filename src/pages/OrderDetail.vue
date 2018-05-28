/*
* @description: 订单详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-detail" class="containerarea font14 bg-page">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
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
        <cell v-if="expressNumber" class="express-info font14 pb5" :title="expressInfo" :value="$t('View Details')" is-link :link="{path: '/shippingDetails', query: {id: id}}"></cell>
        <cell class="font14" :title="`${$t('Receiver')}: ${receiver}`" :value="receiverPhone"></cell>
        <cell class="shipping-address font12 color-gray" :title="`${$t('Shipping Address')}: ${shippingAddress}`"></cell>
        <cell class="shipping-address font12 color-gray" :title="`${$t('Order Number')}: ${shippingOrderon}`"></cell>
      </group>
      <group>
        <cell class="order-list font12" v-for="(order, index) in orders" :key="index" :link="`/product?id=${order.pid}&wid=${order.wid}`">
          <x-img slot="icon" class="imgcover" :src="order.photo" default-src="../src/assets/images/nopic.jpg" container="#vux_view_box_body"></x-img>
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
      <group>
        <div class="padding10 font12 color-gray">创建时间: {{ data.dateline | dateformat }}</div>
        <div class="pl10 pr10 pb10 font12 color-gray" v-if="data.flag == 3">发货时间: {{ data.delivertime | dateformat }}</div>
      </group>
      <div class="padding10 align_right">
        <x-button v-if="data.flag == 1" mini @click.native="cancel" class="font12">取消订单</x-button>
        <x-button v-if="data.flag == 1 && data.payorder == ''" :link="{path: '/pay', query: {id: data.id}}" mini class="font12">去支付</x-button>
        <x-button v-if="data.flag == 2" mini @click.native="refund" class="font12">申请退款</x-button>
        <x-button v-if="data.flag == 3" mini @click.native="confirm" class="font12">确认收货</x-button>
        <x-button v-if="data.flag == 4" mini @click.native="evaluate" class="font12">评价</x-button>
      </div>
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
    </template>
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, CellFormPreview, TransferDom, XImg, XButton } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Sticky, XDialog, CellFormPreview, OrderInfo, XImg, XButton, Sos
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '该订单不存在',
      showContainer: false,
      id: 0,
      data: {},
      retailerInfo: {},
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
      this.$router.push({path: '/evaluation', query: {id: this.data.id}})
    },
    wxContact () {
      this.wxCardShow = true
    },
    confirm (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您是否确认收货？',
        content: '请确认货物已收到',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/order/receive`, {id: self.data.id})
          .then(res => {
            let data = res.data
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.getData()
                }
              }
            })
          })
        }
      })
    },
    cancel (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您确认取消订单？',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/order/cancel`, {id: self.data.id})
          .then(res => {
            let data = res.data
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.getData()
                }
              }
            })
          })
        }
      })
    },
    refund () {
      const self = this
      this.$vux.confirm.show({
        title: '您是否要申请退款？',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/order/refund`, {id: self.data.id})
          .then(res => {
            let data = res.data
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.getData()
                }
              }
            })
          })
        }
      })
    },
    getData () {
      const self = this
      this.id = this.$route.query.id
      this.$http.get(`${ENV.BokaApi}/api/order/orderDetail?id=${this.id}`)
      .then(res => {
        const data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          let retdata = data.data
          if (retdata.length === 0) {
            self.showSos = true
            self.showContainer = false
          } else {
            self.showSos = false
            self.showContainer = true
            const retdata = data.data
            self.data = retdata
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
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.getData()
    }
  },
  activated () {
    this.refresh()
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
