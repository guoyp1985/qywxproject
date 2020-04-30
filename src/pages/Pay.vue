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
  </div>
</template>

<script>
import { Box, XButton } from 'vux'
import ENV from 'env'

export default {
  components: {
    Box, XButton
  },
  data () {
    return {
      query: {},
      payPrice: 0,
      receivables: '',
      payParams: null,
      disabled: false,
      wid: 0
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
            if (self.query.type === 'applyfactory') {
              self.$router.push({path: `/centerFactory`})
            } else {
              let backurl = self.query.backurl
              if (backurl) {
                self.$router.push({path: decodeURIComponent(backurl)})
              } else {
                if (self.query.module === 'payorders') {
                  self.$router.push({path: `/payment?wid=${self.wid}`})
                } else {
                  if (self.query.lasturl) {
                    self.$router.push({path: '/orderSearch'})
                  } else {
                    self.$router.push({path: `/payment?wid=${self.wid}`})
                  }
                }
              }
            }
          }
        }
      )
    },
    initPay () {
      const self = this
      const orderId = this.query.id
      let params = { orderid: orderId }
      if (this.query.module) {
        params.module = this.query.module
      }
      this.$http.get(`${ENV.BokaApi}/api/order/unify`, {
        params: params
      })
      .then(res => {
        const data = res.data
        if (data.flag) {
          self.wid = data.wid
          self.disabled = false
          self.payPrice = data.money
          self.receivables = data.weixinname
          self.payParams = data.data
        } else {
          self.disabled = true
          self.$vux.toast.text(res.data.error)
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.initPay()
    }
  },
  activated () {
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
