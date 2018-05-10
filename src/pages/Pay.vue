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
      <x-button type="primary" @click.native="pay">{{$t('Wechat Safe Payment')}}</x-button>
    </box>
  </div>
</template>

<script>
import { Box, XButton } from 'vux'
import ENV from 'env'
// import WeixinJSBridge from 'WeixinJSBridge'
// console.log(WeixinJSBridge)
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
      console.log(WeixinJSBridge)
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
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
          }
        }
      )
    },
    initPay () {
      const self = this
      const orderId = this.$route.params.id
      this.$http.get(`${ENV.BokaApi}/api/order/unify?orderid=${orderId}`)
      .then(res => {
        console.log(res.data.data)
        if (res.data.flag) {
          self.payPrice = res.data.money
          self.receivables = res.data.weixinname
          self.payParams = res.data.data
        }
      })
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.initPay()
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
