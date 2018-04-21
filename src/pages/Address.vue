<template>
  <div id="personal-address">
    <!-- <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title> -->
    <group v-if="!getItems.length">
      <cell-box><span class="font14 color-gray">{{$t('No Address')}}</span></cell-box>
    </group>
    <group v-else>
      <cell v-for="(item, index) in getItems" :key="index" :title="`${item.linkman} ${item.telephone}`" :link="{name:'tNewAddress',params:{data:item}}" :inline-desc='item | addressFormat'></cell>
    </group>
    <box gap="20px 10px">
      <x-button type="primary" :link="{name:'tNewAddress'}">{{$t('New Address')}}</x-button>
    </box>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, Cell, CellBox, Popup, PopupHeader, XInput, XAddress, XSwitch, XButton, Box } from 'vux'
import CTitle from '@/components/CTitle'
import ENV from '#/env'
// import WeixinJSBridge from 'WeixinJSBridge'

export default {
  components: {
    Group,
    Cell,
    CellBox,
    Popup,
    PopupHeader,
    XInput,
    XAddress,
    XSwitch,
    XButton,
    Box,
    CTitle
  },
  data () {
    return {
      items: [
        // {
        //   linkman: 'huang',
        //   telephone: '13613797907',
        //   address: '金家村288号院5号楼A座2206',
        //   area: ['北京市', '市辖区', '丰台区'],
        //   isdefault: 0
        // }
      ]
    }
  },
  computed: {
    getItems () {
      let data = this.$route.params.data
      if (typeof data === 'object') {
        let match = false
        this.items = this.items.map(item => {
          if (item.id === data.id) {
            match = true
            return data
          }
          return item
        })
        if (!match) {
          this.items.push(data)
        }
      }
      return this.items
    }
  },
  filters: {
    addressFormat: function (item) {
      return `${item.area.join('')}${item.address}`
    }
  },
  methods: {
    getData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/user/address/list`)
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          console.log(data)
          self.getWxAddress()
        } else {
          self.getWxAddress()
        }
      })
    },
    getWxAddress () {
      const self = this
      const orginHref = encodeURIComponent(location.href)
      location.href = `${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${orginHref}&response_type=code&scope=snsapi_base&state=fromWx#wechat_redirect`
      // alert(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${location.href}&response_type=code&scope=snsapi_base&state=fromWx#wechat_redirect`)
      this.$http.get(`${ENV.BokaApi}/api/weixin/token`)
      .then(res => res.json())
      .then(data => {
        const accessToken = data.access_token
        const nonceStr = self.$util.randomStr()
        alert('ok')
        const timeStamp = self.$uitl.timeStamp()
        const url = location.href.replace(/#\//g, '')
        alert(url)
        const addrSign = self.$util.wxSign(accessToken, ENV.AppId, nonceStr, timeStamp, url)
        WeixinJSBridge.invoke('editAddress', {
          appId: ENV.AppId,
          scope: 'jsapi_address',
          signType: 'sha1',
          addrSign: addrSign,
          timeStamp: timeStamp,
          nonceStr: nonceStr
        },
        res => {
          alert(res.err_msg)
          if (res.err_msg === 'edit_address:ok') {
            const param = {
              linkman: res.userName,
              telephone: res.telNumber,
              province: res.proviceFirstStageName,
              city: res.addressCitySecondStageName,
              counties: res.addressCountiesThirdStageName,
              address: res.addressDetailInfo
            }
            alert(param)
          }
        })
      },
      error => {
        alert(JSON.stringify(error))
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less">
#personal-address .top-gap {
  margin-top: 20px;
}
#personal-address .address-item {
  padding: 5px 15px;
}
/* weui css hack */
</style>
