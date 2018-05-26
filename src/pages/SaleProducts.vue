<template>
<div class="containerarea bg-white font14 saleproducts notop">
  <div class="pagemiddle scroll-container" style="bottom:53px;" ref="scrollContainer" @scroll="handleScroll">
    <div class="padding5 align_center font18 bg-white color-black" style="line-height: 38px;">
      <span>— {{ $t('Selected') }}</span><span class="color-red">{{ $t('Promotion') }}</span> —
    </div>
    <div v-if="disData" class="activitylist scroll_list">
      <div v-if="!tabdata1 || tabdata1.length == 0" class="emptyitem flex_center">暂无促销商品</div>
      <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="bg-page">
        <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'" style="background-color:#f6f6f6 !important;">
          <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container"></x-img>
          <span slot="title">{{item.title}}</span>
          <span slot="numbers">{{ item.numbers }}</span>
          <span slot="havetuan">{{ item.havetuan }}</span>
          <span slot="groupprice">{{item.groupprice}}</span>
          <span slot="price">{{item.price}}</span>
        </groupbuyitemplate>
        <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'" style="background-color:#f6f6f6 !important;">
          <x-img slot="photo" class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:80px;height:80px;" :offset="0" container=".scroll-container"></x-img>
          <span slot="title">{{item.title}}</span>
          <span slot="saveprice">{{ item.saveprice }}</span>
          <span slot="minprice">{{item.minprice}}</span>
          <span slot="price">{{item.price}}</span>
        </bargainbuyitemplate>
      </div>
    </div>
  </div>
</div>
</template>

<i18n>
Selected:
  zh-CN: 精选
Promotion:
  zh-CN: 促销
</i18n>

<script>
import { XImg } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import ENV from 'env'
export default {
  components: {
    Groupbuyitemplate, Bargainbuyitemplate, XImg
  },
  data () {
    return {
      doCreated: false,
      tabdata1: [],
      disData: false,
      limit: 20,
      pagestart1: 0
    }
  },
  computed: {
  },
  methods: {
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.getData()
          }
        }
      })
    },
    getData () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { do: 'all', pagestart: self.pagestart1, limit: self.limit } }
      this.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.disData = true
      })
    },
    init () {
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: true})
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
</style>
