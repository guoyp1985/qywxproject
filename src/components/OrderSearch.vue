<template>
  <div id="order-search">
    <Tab>
      <tab-item selected class="" @on-item-click="onItemClick(selectedIndex)">{{ $t('All') }}</tab-item>
      <tab-item @on-item-click="onItemClick(selectedIndex)">{{ $t('To Be Delivered') }}</tab-item>
      <tab-item @on-item-click="onItemClick(selectedIndex)">{{ $t('Shipped') }}</tab-item>
      <tab-item @on-item-click="onItemClick(selectedIndex)">{{ $t('Completed') }}</tab-item>
    </Tab>
    <swiper v-model="selectedIndex" height="100px" :show-dots="false">
      <swiper-item :key="0">
        
      </swiper-item>
      <swiper-item :key="1">

      </swiper-item>
      <swiper-item :key="2">

      </swiper-item>
      <swiper-item :key="3">

      </swiper-item>
    </swiper>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
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
