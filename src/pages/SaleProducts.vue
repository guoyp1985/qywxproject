<template>
<div class="containerarea bg-white font14 saleproducts notop">
  <div class="pagemiddle" style="bottom:53px;">
    <div class="padding5 align_center font18 bg-white color-black" style="line-height: 38px;">
      <span>— {{ $t('Selected') }}</span><span class="color-red">{{ $t('Promotion') }}</span> —
    </div>
    <div class="activitylist scroll_list">
      <div v-if="!tabdata1 || tabdata1.length == 0" class="emptyitem flex_center">暂无促销商品</div>
      <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="bg-page">
        <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'" style="background-color:#f6f6f6 !important;">
          <img slot="photo" style="width:80px;height:80px;object-fit: cover;" :src="item.photo" />
          <span slot="title">{{item.title}}</span>
          <span slot="numbers">{{ item.numbers }}</span>
          <span slot="havetuan">{{ item.havetuan }}</span>
          <span slot="groupprice">{{item.groupprice}}</span>
          <span slot="price">{{item.price}}</span>
        </groupbuyitemplate>
        <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'" style="background-color:#f6f6f6 !important;">
          <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
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
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import ENV from 'env'
export default {
  components: {
    Groupbuyitemplate, Bargainbuyitemplate
  },
  data () {
    return {
      tabdata1: [],
      limit: 5,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null
    }
  },
  computed: {
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { do: 'all', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('.saleproducts .pagemiddle')
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleTabbar: true})
    self.$vux.loading.show()
    self.getdata1()
  }
}
</script>

<style lang="less">
</style>
