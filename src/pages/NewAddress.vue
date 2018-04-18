<template>
  <div id="new-address">
    <group label-width="6em">
      <x-input :title="$t('Addressee')" :placeholder="$t('Necessary')+$t('Addressee')" v-model="item.name"></x-input>
      <x-input :title="$t('Cell Phone Number')" :placeholder="$t('Necessary')+$t('Cell Phone Number')" mask="999 9999 9999" :max="13" is-type="china-mobile" v-model="item.phone"></x-input>
      <x-address :title="$t('Select Address')" raw-value v-model="item.address.area" :list="addressData" :placeholder="$t('Necessary')+$t('Please Select Address')">
        <template slot="title" slot-scope="props">
          <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
            <span class="demo-icon demo-icon-big" style="font-size:20px;vertical-align:middle;"></span>
            <span style="vertical-align:middle;">{{$t('Address')}}</span>
          </span>
        </template>
      </x-address>
      <x-input :title="$t('Detailed Address')" :placeholder="$t('Necessary')+$t('Detailed Address')" v-model="item.address.details"></x-input>
      <x-switch :title="$t('Default Address')" v-model="item.default"></x-switch>
    </group>
    <box gap="20px 10px">
      <x-button type="primary" @click.native="save">{{$t('Save')}}</x-button>
      <x-button type="default" link="BACK">{{$t('Cancel')}}</x-button>
    </box>
  </div>
</template>
<script>
import { Group, XInput, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name, XSwitch, Box, XButton } from 'vux'

export default {
  components: {
    Group,
    XInput,
    XAddress,
    XSwitch,
    Box,
    XButton
  },
  data () {
    return {
      addressData: ChinaAddressV4Data,
      initItem: {
        name: '',
        phone: '',
        address: {},
        default: false
      }
    }
  },
  computed: {
    item () {
      this.initItem = { ...this.initItem, ...this.$route.query.data }
      return this.initItem
    }
  },
  methods: {
    save () {
      this.initItem.address.area = value2name(this.initItem.address.area, ChinaAddressV4Data).split(' ')
      this.$router.push({ path: '/address', query: { data: this.initItem } })
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
