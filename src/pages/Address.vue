<template>
  <div id="personal-address">
    <!-- <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title> -->
    <group v-if="!getItems.length">
      <cell-box><span class="font14 color-gray">{{$t('No Address')}}</span></cell-box>
    </group>
    <group v-else>
      <cell v-for="(item, index) in getItems" :key="index" :title="`${item.name} ${item.phone}`" :link="{path:`/address/${item.id}`,query:{data:item}}" :inline-desc='item.address | addressFormat'></cell>
    </group>
    <box gap="20px 10px">
      <x-button type="primary" :link="{path:'/address/0',query:{}}">{{$t('New Address')}}</x-button>
    </box>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, Cell, CellBox, Popup, PopupHeader, XInput, XAddress, XSwitch, XButton, Box } from 'vux'
import CTitle from '@/components/CTitle'

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
        {
          id: 1,
          name: 'huang',
          phone: '13613797907',
          address: {
            area: ['北京市', '市辖区', '丰台区'],
            details: '金家村288号院5号楼A座2206'
          },
          default: false
        }
      ]
    }
  },
  computed: {
    getItems () {
      let data = this.$route.query.data
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
    addressFormat: function (address) {
      return `${address.area.join('')}${address.details}`
    }
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
