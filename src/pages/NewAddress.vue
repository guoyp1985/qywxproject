/*
* @description: 地址新建页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="new-address">
    <group label-width="6em">
      <x-input :title="$t('Addressee')" required :placeholder="`${$t('Necessary')}${$t('Addressee')}`" v-model="item.linkman"></x-input>
      <x-input :title="$t('Cell Phone Number')" required :placeholder="`${$t('Necessary')}${$t('Cell Phone Number')}`" mask="999 9999 9999" :max="13" is-type="china-mobile" v-model="item.telephone"></x-input>
      <x-address :title="$t('Select Address')" raw-value v-model="item.area" :list="addressData" :placeholder="`${$t('Necessary')}${$t('Please Select Address')}`">
        <template slot="title" slot-scope="props">
          <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
            <span class="demo-icon demo-icon-big" style="font-size:20px;vertical-align:middle;"></span>
            <span style="vertical-align:middle;">{{$t('Address')}}</span>
          </span>
        </template>
      </x-address>
      <x-input :title="$t('Detailed Address')" required :placeholder="`${$t('Necessary')}${$t('Detailed Address')}`" v-model="item.address"></x-input>
      <x-switch :title="$t('Default Address')" v-model="getSwitcher"></x-switch>
    </group>
    <box gap="20px 10px">
      <x-button type="primary" @click.native="save">{{$t('Save')}}</x-button>
      <x-button type="default" link="BACK">{{$t('Cancel')}}</x-button>
    </box>
  </div>
</template>
<script>
import { Group, XInput, XAddress, XSwitch, Box, XButton, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
import ENV from 'env'
export default {
  components: {
    Group, XInput, XAddress, XSwitch, Box, XButton
  },
  data () {
    return {
      query: {},
      addressData: ChinaAddressV4Data,
      initItem: {
        linkman: '',
        telephone: '',
        area: [],
        address: ''
      },
      switcher: true,
      isSubmitIng: false
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
    getSwitcher: {
      get () {
        if (this.initItem.isdefault !== undefined) {
          return this.initItem.isdefault !== 0
        } else {
          return this.switcher
        }
      },
      set (value) {
        this.switcher = value
      }
    }
  },
  methods: {
    save () {
      if (!this.isSubmitIng) {
        this.initItem.area = value2name(this.initItem.area || [], ChinaAddressV4Data).split(' ')
        this.initItem.isdefault = this.switcher ? 1 : 0
        const self = this
        const address = {
          id: this.item.id,
          linkman: this.item.linkman,
          telephone: this.$util.trim(this.item.telephone),
          address: this.item.address,
          isdefault: this.item.isdefault,
          province: this.item.area[0],
          city: this.item.area[1],
          counties: this.item.area[2],
          do: this.item.id ? 'update' : 'add'
        }
        if (this.$util.validateQueue(
          [
            {linkman: address.linkman},
            {telephone: address.telephone, r: 'Phone'},
            {address: address.address},
            {area: this.item.area.join('')}
          ],
          model => {
            switch (model.key) {
              case 'telephone':
                self.$vux.toast.text('手机号错误', 'middle')
                break
              default:
                self.$vux.toast.text('未填必选项', 'middle')
            }
          }
        )) {
          this.isSubmitIng = true
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/user/address/add`, address)
          .then(res => {
            this.$vux.loading.hide()
            if (self.query.lasturl) {
              this.$router.push({path: self.query.lasturl})
              this.isSubmitIng = false
            } else {
              this.$router.go(-1)
              this.isSubmitIng = false
            }
          })
        }
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.isSubmitIng = false
      this.initItem = {
        linkman: '',
        telephone: '',
        area: [null],
        address: ''
      }
      this.switcher = true
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
#personal-address .top-gap {
  margin-top: 20px;
}
#personal-address .address-item {
  padding: 5px 15px;
}
/* weui css hack */
</style>
