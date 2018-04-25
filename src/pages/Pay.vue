<template>
  <div class="containerarea paypage bg-white">
    <div class="flex_center inner">
      <div>{{ $t('RMB') }}{{ payprice }}</div>
  	</div>
    <div class="pt10 pb10 pl5 pr5 b_bottom_after">
      <div class="t-table">
        <div class="t-cell align_left">收款方</div>
        <div class="t-cell align_right">博卡授权中心</div>
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
      payprice: '1.00'
    }
  },
  methods: {
    wxPayApi (data) {
      const params = data
      alert(JSON.stringify(params))
      console.log(this.$util.timeStamp())
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: params.appid,
          timeStamp: this.$util.timeStamp(),
          nonceStr: params.nonce_str,
          package: `prepay_id=${params.prepay_id}`,
          signType: 'MD5',
          paySign: params.sign
        },
        function (res) {
          alert(JSON.stringify(res))
          if (res.err_msg === 'get_brand_wcpay_request:ok' ) {
          }
        }
      )
    },
    payLoad (data) {
      if (typeof WeixinJSBridge === 'undefined') {
        alet('here')
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.wxPayApi.bind(data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.wxPayApi.bind(data))
          document.attachEvent('onWeixinJSBridgeReady', this.wxPayApi.bind(data))
        }
      } else {
        this.wxPayApi(data)
      }
    },
    pay () {
      const self = this
      const orderId = this.$route.query.id
      this.$http.get(`${ENV.BokaApi}/api/order/unify?orderid=${orderId}`)
      .then(res => res.json())
      .then(data => {
        self.payLoad(data.data)
      })
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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
