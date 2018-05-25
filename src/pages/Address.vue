/*
* @description: 地址页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-address" v-cloak>
    <view-box class="view-box" body-padding-bottom="0">
      <group v-if="!items.length">
        <cell-box><span class="font14 color-gray">{{$t('No Address')}}</span></cell-box>
      </group>
      <swipeout v-else>
        <!-- <cell  :title="`${item.linkman} ${item.telephone}`" :link="{name:'tNewAddress',params:{data:item}}" :inline-desc='item | addressFormat'></cell> -->
        <swipeout-item v-for="(item, index) in items" :key="item.id" @click.native.stop="onNav(item)" transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native.stop="onDelete(item)" type="warn">{{$t('Delete')}}</swipeout-button>
          </div>
          <div slot="content" class="flex-box vux-1px-t">
            <div class="check-cell">
              <check-icon :value.sync="item.isdefault === 1" @click.native.stop="setDefault(item)"></check-icon>
            </div>
            <div class="content-cell">
              <div class="name-cell font16">
                {{item.linkman}} {{item.telephone}}
              </div>
              <div class="addr-cell font14 color-gray">
                {{item | addressFormat}}
              </div>
            </div>
            <div class="link-cell"></div>
          </div>
        </swipeout-item>
      </swipeout>
      <box slot="bottom" class="bottom-area">
        <x-button type="primary" :link="{name:'tNewAddress'}">{{$t('New Address')}}</x-button>
      </box>
    </view-box>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, Cell, CellBox, ViewBox, CheckIcon, XSwitch, XButton, Box, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import ENV from 'env'

export default {
  components: {
    Group, Cell, CellBox, ViewBox, CheckIcon, XSwitch, XButton, Box, Swipeout, SwipeoutItem, SwipeoutButton
  },
  data () {
    return {
      doCreated: false,
      items: []
    }
  },
  // computed: {
  //   getItems () {
  //     let data = this.$route.params.data
  //     if (typeof data === 'object') {
  //       let match = false
  //       this.items = this.items.map(item => {
  //         if (item.id === data.id) {
  //           match = true
  //           return data
  //         }
  //         return item
  //       })
  //       if (!match) {
  //         this.items.push(data)
  //       }
  //     }
  //     return this.items
  //   }
  // },
  filters: {
    addressFormat: function (item) {
      return `${item.province}${item.city}${item.counties} ${item.address}`
    },
    checkedFormat: function (checked) {
    }
  },
  methods: {
    getData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/user/address/list`)
      .then(res => {
        if (res.data.length) {
          self.items = res.data
        }
      })
    },
    onDelete (item) {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/user/address/delete`, {id: item.id})
      .then(res => {
        if (res.data.flag) {
          self.$util.deleteItem(self.items, item.id)
        }
      })
    },
    onNav (item) {
      this.$router.push({name: 'tNewAddress', params: {data: item}})
    },
    setDefault (item) {
      const self = this
      for (let i of this.items) {
        i.isdefault = 0
      }
      item.isdefault = 1
      item.do = 'update'
      this.$http.post(`${ENV.BokaApi}/api/user/address/add`, item)
      .then(res => {
        self.$vux.toast.text(self.$t('Setting Default Success For Address'))
      })
    }
  },
  created () {
    const self = this
    self.doCreated = true
    this.getData()
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    // this.getWxAddress()
  },
  activated () {
    const self = this
    if (!self.doCreated && self.items.length === 0) {
      this.getData()
    }
    self.doCreated = false
  }
}
</script>

<style lang="less" scoped>
#personal-address {
  height: 100%;
}
#personal-address .top-gap {
  margin-top: 20px;
}
#personal-address .address-item {
  padding: 5px 15px;
}
#personal-address .flex-box {
  display: flex;
}
#personal-address .check-cell {
  display: flex;
  align-items: center;
}
#personal-address .content-cell {
  flex: 1;
  padding: 10px;
}
#personal-address .link-cell {
  position: relative;
  text-align: right;
  color: #999;
}
#personal-address .link-cell:after {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
  transform: matrix(.71,.71,-.71,.71,0,0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 10px;
}
#personal-address .bottom-area {
  position: absolute;
  z-index: 500;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
/* weui css hack */
</style>
