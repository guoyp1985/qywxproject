/*
* @description: 我的优惠券列表
* @auther: gyp
* @created_date: 2018-10-22
*/
<template>
  <div class="containerarea bg-page font14 cardlist">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <tab v-model="selectedIndex" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
        <template v-if="distabdata1">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="w_100 h_100 flex_center color-gray">你还没有未使用的优惠券</div>
          <div v-else class="lists">
            <div v-for="(item,index1) in tabdata1" :key="index1" :class="`scroll_item ${item.validate ? '' : 'grayitem'}`">
              <div class="flex_cell txt-cell" style="overflow:visible">
                <div class="font20 mb5 clamp1 txt">满{{item.ordermoney}}减{{item.money}}</div>
                <div class="font12 mb5 clamp1">限【{{item.retailer}}】店铺使用</div>
                <div class="font12">自{{item.dateline_str}}起7日有效</div>
                <div class="ball ball-up"></div>
                <div class="ball ball-down"></div>
              </div>
              <div class="btn-cell flex_center" v-if="item.validate">
                <router-link v-if="item.productcount > 0" class="rbtn color-theme" :to="{path: '/store',query: {wid:item.wid}}">进店使用</router-link>
                <router-link v-else class="rbtn color-theme" :to="{path:'/chat',query:{uid:item.wid,from:query.from}}">联系卖家</router-link>
              </div>
              <div class="btn-cell flex_center" v-else>
                <div class="al al-yiguoqi4"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
        <template v-if="distabdata2">
          <div v-if="!tabdata2 || tabdata2.length === 0" class="w_100 h_100 flex_center color-gray">你还没有已使用的优惠券</div>
          <div v-else class="lists">
            <div v-for="(item,index1) in tabdata2" :key="index1" :class="`scroll_item ${item.validate ? '' : 'grayitem'}`">
              <div class="flex_cell txt-cell" style="overflow:visible">
                <div class="font20 mb5 clamp1 txt">满{{item.ordermoney}}减{{item.money}}</div>
                <div class="font12 mb5 clamp1">限【{{item.retailer}}】店铺使用</div>
                <div class="font12">自{{item.dateline_str}}起7日有效</div>
                <div class="ball ball-up"></div>
                <div class="ball ball-down"></div>
              </div>
              <div class="btn-cell flex_center" v-if="item.validate">
                <router-link v-if="item.productcount > 0" class="rbtn color-theme" :to="{path: '/store',query: {wid:item.wid}}">进店使用</router-link>
                <router-link v-else class="rbtn color-theme" :to="{path:'/chat',query:{uid:item.wid,from:query.from}}">联系卖家</router-link>
              </div>
              <div class="btn-cell flex_center" v-else>
                <div class="al al-yishiyong11"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<i18n>
Add order1:
  zh-CN: 返点客
My orders:
  zh-CN: 我的订单
</i18n>
<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg } from 'vux'
import Orderitemplate from '@/components/Orderitemplate'
import Orderproductplate from '@/components/Orderproductplate'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
let self = {}
const limit = 10
let pageStart1 = 0
let pageStart2 = 0
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, Orderitemplate, Orderproductplate, XImg, Subscribe, ApplyTip
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      tabtxts: ['未使用', '已使用'],
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      showpopup: false,
      deliveritem: null,
      deliverindex: 0,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' }
    }
  },
  methods: {
    handleScroll (refname, index) {
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (pageStart1 + 1) * limit) {
                pageStart1++
                self.getData1()
              }
              break
            case 1:
              if (self.tabdata2.length === (pageStart2 + 1) * limit) {
                pageStart2++
                self.getData2()
              }
              break
          }
        }
      })
    },
    clickTab (index) {
      this.swiperChange()
    },
    getData1 () {
      this.$vux.loading.show()
      const params = {from: 'user', used: 0, pagestart: pageStart1, limit: limit}
      self.$http.post(`${ENV.BokaApi}/api/card/cardList`, params).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = {from: 'user', used: 1, pagestart: pageStart2, limit: limit}
      self.$http.post(`${ENV.BokaApi}/api/card/cardList`, params).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < limit) {
            pageStart1 = 0
            self.distabdata1 = false
            this.tabdata1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < limit) {
            pageStart2 = 0
            self.distabdata2 = false
            this.tabdata2 = []
            self.getData2()
          }
          break
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      this.query = this.$route.query
      this.swiperChange()
    }
  },
  activated () {
    self = this
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.cardlist .lists{padding:0px 20px;}
.cardlist .nodata{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display:flex !important;justify-content: center; align-items: center;
    color:#666666;
    padding:10px;
}
.cardlist .scroll_item{
  width: 100%;position:relative;background-color: #eb6b5e;color:#fff;
  display: flex;justify-content: center;align-items: center;
  margin-top:20px;
}
.cardlist .scroll_item.grayitem{background-color: #999;}
.cardlist .scroll_item .txt{color:#fff;}
.cardlist .scroll_item.grayitem .txt{color:orange;}
.cardlist .txt-cell{position:relative;padding-top:15px;padding-bottom:15px;padding-left:10px;box-sizing: border-box;}
.cardlist .txt-cell:after{
  content:"";display:block;
  border-right:#fff 1px dashed;
	position: absolute;right: 0;top: 0;bottom:0px;
	-webkit-transform: scaleX(0.5) translateX(0.5px);
	transform: scaleX(0.5) translateX(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.cardlist .scroll_item .ball{
  position: absolute;
  right: -14px;
  width: 30px;
  height: 30px;
  background-color: #f5f9fa;
  border-radius: 50%;
}
.cardlist .scroll_item .ball-up{top: -15px;}
.cardlist .scroll_item .ball-down{bottom: -15px;}
.cardlist .scroll_item .pic{width:50px;}
.cardlist .scroll_item .pic image{width:40px;height:40px;border-radius:50%;}
.cardlist .btn-cell{width:90px;padding-top:15px;padding-bottom:15px;box-sizing: border-box;}
.cardlist .btn-cell .al{font-size:40px;}
.cardlist .btn-cell .icon-chat{margin-top:4px;}
.cardlist .rbtn{display:inline-block;padding:5px;border-radius:5px;background-color: #fff;}
.cardlist .scroll_item .rtxt{flex:1;text-align:right;color:#ff6a61;}
</style>
