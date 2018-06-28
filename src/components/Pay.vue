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
    loginUser: {
      type: Object,
      default: {}
    },
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
        alert(1)
        if (document.addEventListener) {
          alert(2)
          document.addEventListener('WeixinJSBridgeReady', this.wxPayApi.bind(params), false)
        } else if (document.attachEvent) {
          alert(3)
          document.attachEvent('WeixinJSBridgeReady', this.wxPayApi.bind(params))
          document.attachEvent('onWeixinJSBridgeReady', this.wxPayApi.bind(params))
        }
      } else {
        alert(4)
        this.wxPayApi(params)
      }
    },
    wxPayApi (params) {
      alert(5)
      const self = this
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', params,
        function (res) {
          alert(JSON.stringify(res))
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            self.payCallback()
          }
        }
      )
    },
    initPay () {
      const self = this
      self.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/order/unify`, {
        params: { orderid: self.loginUser.payorderid, module: self.module }
      })
      .then(res => {
        alert(JSON.stringify(res))
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
