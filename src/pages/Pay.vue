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
      const params = data.data
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: params.appid,     // 公众号名称，由商户传入
          timeStamp: params.mch_id,         // 时间戳，自1970年以来的秒数
          nonceStr: params.nonce_str, // 随机串
          package: `prepay_id=${params.prepay_id}`,
          signType: 'MD5',         // 微信签名方式：
          paySign: params.sign // 微信签名
        },
        function (res) {
          alert(res)
          if (res.err_msg === 'get_brand_wcpay_request:ok' ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        }
      )
    },
    payLoad () {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.wxPayApi, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.wxPayApi)
          document.attachEvent('onWeixinJSBridgeReady', this.wxPayApi)
        }
      } else {
        this.wxPayApi()
      }
    },
    pay () {
      const orderId = this.$route.query.id
      this.$http.post(`${ENV.BokaApi}/api/order/unify?orderid=${orderId}`)
      .then(res => res.json())
      .then(data => {
        this.wxPayApi(data)
      })
    }
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
