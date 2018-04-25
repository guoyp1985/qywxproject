<template>
  <div class="containerarea paypage bg-white">
    <div class="flex_center inner">
      <div>{{ $t('RMB') }}{{ payPrice }}</div>
  	</div>
    <div class="pt10 pb10 pl5 pr5 b_bottom_after">
      <div class="t-table">
        <div class="t-cell align_left">收款方</div>
        <div class="t-cell align_right">{{receivables}}</div>
      </div>
    </div>
    <box gap="10px">
      <x-button type="primary" @click.native="pay">微信安全支付</x-button>
    </box>
  </div>
</template>

<script>
import { Box, XButton } from 'vux'
import ENV from '#/env'
export default {
  components: {
    Box,
    XButton
  },
  data () {
    return {
      payPrice: 0,
      receivables: '',
      payParams: null
    }
  },
  methods: {
    pay () {
      const params = this.payParams
      if (typeof WeixinJSBridge === 'undefined') {
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
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', params,
        function (res) {
          alert(JSON.stringify(res))
          if (res.err_msg === 'get_brand_wcpay_request:ok' ) {
          }
        }
      )
    },
    initPay () {
      const self = this
      const orderId = this.$route.params.id
      this.$http.get(`${ENV.BokaApi}/api/order/unify?orderid=${orderId}`)
      .then(res => res.json())
      .then(data => {
        self.payPrice = data.money
        self.receivables = data.weixinname
        self.payParams = data.data
      })
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.initPay()
  }
}
</script>

<style lang="less">
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
