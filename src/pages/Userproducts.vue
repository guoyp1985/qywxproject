<template>
  <div class="containerarea bg-white font14 uproducts notop">
    <div class="pagemiddle" style="bottom:53px;">
      <swiper
        v-if="addata && addata.length > 0"
        :list="addata"
        dots-position="center"
        :interval=6000
        :show-dots="isshowdot"
        :aspect-ratio="500/900"
        auto
        loop>
      </swiper>
      <template v-if="activitydata && activitydata.length > 0">
        <div class="padding5 align_center color-red bold font16 bg-white" style="line-height: 37px;"><i class="al al-tagfill font18 mr10"></i>{{ $t('Selection promotion') }}</div>
        <div class="activitylist">
          <div v-for="(item,index) in activitydata" :key="item.id" class="bg-page">
            <Groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'" style="background-color:#efeff4 !important;">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="numbers">{{ item.numbers }}</span>
              <span slot="havetuan">{{ item.havetuan }}</span>
              <span slot="groupprice">{{ item.groupprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Groupbuyitemplate>
            <Bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'" style="background-color:#efeff4 !important;">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="saveprice">{{ item.saveprice }}</span>
              <span slot="minprice">{{ item.minprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Bargainbuyitemplate>
          </div>
        </div>
        <router-link to="/saleProducts" class="padding10 flex_center color-gray">{{ $t('View more promotion') }}</router-link>
      </template>
      <div class="bg-page" style="height:12px;"></div>
      <template v-if="productdata.length > 0">
        <div class="padding5 align_center color-red bold font16 bg-white" style="line-height: 37px;"><i class="al al-goodsnewfill font18 mr10"></i>{{ $t('New products') }}</div>
        <div class="b_top_after"></div>
        <div class="productlist squarepic mb12">
          <Productitemplate :data="item" v-for="(item,index) in productdata" :key="item.id">
            <img slot="photo" :src="item.photo" />
            <span slot="title">{{ item.title }}</span>
            <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
            <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
          </Productitemplate>
        </div>
      </template>
    </div>
  </div>
</template>

<i18n>
Selection promotion:
  zh-CN: 精选促销
New products:
  zh-CN: 精选新品
Online consulting:
  zh-CN: 在线咨询
Wechat contact:
  zh-CN: 微信联系
Shop topline:
  zh-CN: 店铺头条
Another batch:
  zh-CN: 换一批
View more promotion:
  zh-CN: 查看更多促销
</i18n>

<script>
import { Swiper } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Swiper,
    Groupbuyitemplate,
    Bargainbuyitemplate,
    Productitemplate,
    Newsitemplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showdot: true,
      addata: [],
      activitydata: [],
      productdata: [],
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null
    }
  },
  computed: {
    isshowdot: function () {
      if (this.addata.length > 1) {
        this.showdot = true
      } else {
        this.showdot = false
      }
      return this.showdot
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.productdata.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('.uproducts .pagemiddle')
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
    self.$http.post(`${ENV.BokaApi}/api/common/getAd`, { useforurl: '/mobile/community.php' }).then(function (res) {
      let data = res.data
      let retdata = data.data ? data.data : data
      for (let i = 0; i < retdata.length; i++) {
        retdata[i].img = retdata[i].photo
      }
      self.addata = retdata
      let params = { params: { do: 'all', pagestart: 0, limit: 5 } }
      return self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params)
    }).then(function (res) {
      let data = res.data
      self.activitydata = data.data ? data.data : data
      self.getdata1()
    })
  }
}
</script>

<style lang="less" scoped>
.vline{position:relative;}
.vline:after {
  content: " ";
  display: block;
  position: absolute;
  width: 2px;
  top: 4px;
  bottom: 4px;
  margin: auto 0;
  left: -1px;
  background-color: #ff6600;
}
.uproducts .squarepic .desbox{
  background-color:#f6f6f6;
}

</style>
