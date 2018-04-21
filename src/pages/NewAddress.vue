<template>
  <div id="new-address">
    <group label-width="6em">
      <x-input :title="$t('Addressee')" :placeholder="`${$t('Necessary')}${$t('Addressee')}`" v-model="item.linkman"></x-input>
      <x-input :title="$t('Cell Phone Number')" :placeholder="`${$t('Necessary')}${$t('Cell Phone Number')}`" mask="999 9999 9999" :max="13" is-type="china-mobile" v-model="item.telephone"></x-input>
      <x-address :title="$t('Select Address')" raw-value v-model="item.area" :list="addressData" :placeholder="`${$t('Necessary')}${$t('Please Select Address')}`">
        <template slot="title" slot-scope="props">
          <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
            <span class="demo-icon demo-icon-big" style="font-size:20px;vertical-align:middle;"></span>
            <span style="vertical-align:middle;">{{$t('Address')}}</span>
          </span>
        </template>
      </x-address>
      <x-input :title="$t('Detailed Address')" :placeholder="`${$t('Necessary')}${$t('Detailed Address')}`" v-model="item.address"></x-input>
      <x-switch :title="$t('Default Address')" v-model="getSwitcher"></x-switch>
    </group>
    <box gap="20px 10px">
      <x-button type="primary" @click.native="save">{{$t('Save')}}</x-button>
      <x-button type="default" link="BACK">{{$t('Cancel')}}</x-button>
    </box>
  </div>
</template>
<script>
import { Group, XInput, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name, XSwitch, Box, XButton } from 'vux'
import ENV from '#/env'
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
        id: 0,
        linkman: '',
        telephone: '',
        address: '',
        isdefault: 0,
        area: []
      },
      switcher: false
    }
  },
  computed: {
    item () {
      const routeData = this.$route.params.data
      if (routeData) {
        this.initItem = { ...this.initItem, ...routeData, area: [routeData.province, routeData.city, routeData.counties] }
      }
      return this.initItem
    },
    getSwitcher : {
      get () {
        return this.initItem.isdefault !== 0
      },
      set (value) {
        this.switcher = value
      }
    }
  },
  methods: {
    save () {
      this.initItem.area = value2name(this.initItem.area, ChinaAddressV4Data).split(' ')
      console.log(this.switcher)
      this.initItem.isdefault = this.switcher ? 1 : 0
      console.log(this.initItem.isdefault)
      const address = {
        id: this.initItem.id,
        linkman: this.initItem.linkman,
        telephone: this.initItem.telephone,
        address: this.initItem.address,
        isdefault: this.initItem.isdefault,
        province: this.initItem.area[0],
        city: this.initItem.area[1],
        counties: this.initItem.area[2],
        do: this.initItem.id ? 'update' : 'add'
      }
      this.$http.post(`${ENV.BokaApi}/api/user/address/add`, address)
      .then(res => res.json)
      .then(data => {
        this.$router.go(-1)
        // this.$router.push({ name: 'tAddress',
        //   params: {
        //     data: address
        //   }
        // })
      })
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
