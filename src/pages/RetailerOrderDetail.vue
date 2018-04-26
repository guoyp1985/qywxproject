<template>
  <div id="order-detail" class="`containerarea notop rorderdetail bg-page color-gray5 font14 ${bottomcss}`">
    <div class="pagemiddle">
      <div v-if="data.seller && data.seller.username">
        <div class="b_bottom_after padding10 bg-white">
          <div class="t-table">
            <div class="t-cell w100">返点客：</div>
            <div class="t-cell sellername align_right clamp1">
              <div class="clamp1">{{ data.seller.username }}</div>
            </div>
          </div>
        </div>
        <div style="height:10px;"></div>
      </div>
      <div class="bg-white b_bottom_after flex_left padding10">
        <div>买家：{{ data.username }}  累计消费：<span class="color-red">{{ $t('RMB') }}{{ data.summoney }}</span></div>
      </div>
      <div v-if="data.flag != 0" class="bg-white b_bottom_after padding10">
        <div v-if="data.delivercompany != '-1' && (data.delivercode && data.delivercode != '' && data.delivercompanyname && data.delivercompanyname != '')" class="t-table mb10">
          <div class="t-cell v_middle">{{ data.delivercompanyname }} {{ data.delivercode }}</div>
          <div class="t-cell v_middle align_right w60">
            <router-link :to="{path: '/retailerOrderDetail', query: {id: data.id}}" class="qbtn font12 color-orange">查看详情</router-link>
          </div>
        </div>
        <div class="t-table">
          <div class="t-cell v_middle">收货人:{{ data.linkman ? data.linkman : '无' }}</div>
          <div class="t-cell v_middle align_right" style="width:110px;">{{ data.telephone }}</div>
        </div>
        <div class="font12 color-gray mt5">收货地址：{{ data.address ? data.address : '无' }}</div>
      </div>
      <div class="mt10 bg-white padding10 b_bottom_after">
        <div class="t-table">
          <div class="t-cell">创建时间:{{ data.date | dateformat }}</div>
          <div class="t-cell w60 align_right color-orange">{{ data.flagstr }}</div>
        </div>
      </div>
      <div class="bg-white">
        <div class="align_right">
          <div class="scroll_list productlist color_gray appendarea" ajaxurl="" template=".template"></div>
        </div>
        <div class="align_right padding10 flex_right">
          <div>合计:{{ $t('RMB') }} <span class="font16">{{ totalPrice }}</span></div>
        </div>
      </div>
      <div class="align_right">
        <div v-if="!data.payorder && data.flag != 1" class="b_bottom_after pl10 pr10 pb10 bg-white">
          <div class="t-table">
                  <div class="t-cell v_middle align_right cancelarea">
                          <div class="color-red txtarea">交易已关闭</div>
                          <div class="btnajax btnarea hide color-blue" style="display:inline-block;" type="confirm" text="确定要关闭交易吗？关闭交易后，将自动删除该订单所产生的所有销售数据！" ajaxurl="ajax/retailer.php?module=orders&action=cancelorder&id=$id&identitytype=$identitytype">关闭交易</div>
                  </div>
                  <router-link v-if="data.flag != 0" class="t-cell w80" :to="{path: '/retailerAddorder', query: {id: data.id}}" >修改订单</router-link>
          </div>
        </div>
        <div v-if="data.nexttime" class="align_left padding10 color-gray2 font12">回访时间:{{ data.nexttime | dateformat }}</div>
      </div>
    </div>
    <div v-if="data.flag == 2" class="pagebottom flex_center font16 bg-orange5 color-white">上传物流信息</div>
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, TransferDomDirective as TransferDom } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import Time from '#/time'
import ENV from '#/env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Sticky,
    XDialog,
    OrderInfo
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      data: {},
      totalPrice: '0.00',
      bottomcss: '',
      seller: 'unkown',
      receiver: 'unkown',
      receiverPhone: '13500000000',
      expressCompany: '未知快递',
      expressNumber: '100000000000',
      shippingAddress: '北京市市辖区',
      order: {
        id: '0',
        type: 1,
        name: 'unkown',
        storeId: '0',
        storeType: 1,
        storeName: 'unkown',
        status: 0,
        imgs: ['../assets/images/nopic.jpg'],
        desc: undefined,
        num: 0,
        pay: 0
      },
      userQrCode: '',
      wxCardShow: false
    }
  },
  created: function () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    if (self.query.id) {
      self.$vux.loading.show()
      let params = { params: { id: self.query.id } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderDetail`, params).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.$vux.loading.hide()
        self.data = data.data ? data.data : data
        if (self.data.flag !== 2) {
          self.bottomcss = 'nobottom'
        }
      })
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
      console.log(false)
      this.wxCardShow = true
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
  padding: 8px 10px;
}
#order-detail .express-info .weui-cell__ft{
  font-size: 12px;
}
#order-detail .weui-cells {
  margin-top: 10px !important;
}
</style>
