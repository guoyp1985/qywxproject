<template>
  <div class="containerarea paypage bg-white">
    <div class="flex_center inner">
      <div>{{ $t('RMB') }}{{ payPrice }}</div>
  	</div>
    <div class="pt10 pb10 pl5 pr5 b_bottom_after">
      <div class="t-table">
        <div class="t-cell align_left">{{$t('Receivables')}}</div>
        <div class="t-cell align_right">{{receivables}}</div>
      </div>
    </div>
    <box gap="10px">
      <x-button type="primary" :disabled="disabled" @click.native="pay">{{$t('Wechat Safe Payment')}}</x-button>
    </box>
    <div class="color-red padding10 align_center">您已提交过入驻申请，请支付费用完成入驻！</div>
  </div>
</template>

<script>
import { Box, XButton } from 'vux'
import ENV from 'env'
export default {
  name: 'Pay',
  props: {
    module: {
      type: String,
      default: 'orders'
    },
    orderId: Number,
    payCallback: Function
  },
  components: {
    Box, XButton
  },
  data () {
    return {
      payPrice: 0,
      receivables: '',
      payParams: null,
      disabled: false
    }
  },
  methods: {
    pay () {
      const params = this.payParams
      if (typeof window.WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.wxPayApi.bind(params), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.wxPayApi.bind(params))
          document.attachEvent('onWeixinJSBridgeReady', this.wxPayApi.bind(params))
        }
      } else {
        this.wxPayApi(params)
      }
    },
    wxPayApi (params) {
      const self = this
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', params,
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            self.payCallback()
          }
        }
      )
    },
    initPay () {
      const self = this
      const orderId = self.orderId
      self.$vux.loading.show()
      let params = { orderid: orderId, module: self.module }
      this.$http.get(`${ENV.BokaApi}/api/order/unify`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        if (res.data.flag) {
          self.disabled = false
          self.payPrice = res.data.money
          self.receivables = res.data.weixinname
          self.payParams = res.data.data
        } else {
          self.disabled = true
          self.$vux.toast.text(res.data.error)
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initPay()
    }
  },
  created () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.paypage .inner{
  height:180px;font-size:35px;font-weight:bold;
  border-bottom:@list-border-color 1px solid;
}
.paypage .btn{
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  padding-top:10px;
  padding-bottom:10px;
}
</style>
