/*
* @description: 厂家货源
* @auther: gyp
* @created_date: 2019-09-06
*/
<template>
  <div class="containerarea bg-page font14 factory-source-page">
    <div class="s-topbanner s-topbanner1" style="height:99px;">
      <div class="row">
        <search
          class="v-search bg-white"
          v-model='searchword1'
          :auto-fixed="autofixed"
          @on-submit="onSubmit1"
          @on-change="onChange1"
          @on-cancel="onCancel1"
          ref="search">
        </search>
        <tab v-model="selectedIndex" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1" style="top:99px;">
      <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
        <template v-if="distabdata1">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="w_100 h_100 flex_center color-gray">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index1) in tabdata1" :key="index1" class="scroll_item" @click="toUpProduct(item)">
              <div class="scroll_inner">
                <div class="info-row flex_left">
                  <div class="pic flex_left">
                    <img :src="item.factoryinfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
                  <div class="flex_cell flex_left">
                    <div class="w_100">
                      <div>{{item.factoryinfo.title}}</div>
                    </div>
                  </div>
                </div>
                <div class="pic-row flex_left">
                  <div class="pic-list flex_cell flex_left" style="overflow:hidden;">
                    <template v-for="(product,pindex) in item.factoryproduct">
                      <img class="pic-img" :src="product.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </template>
                  </div>
                  <div class="more-txt flex_center w100">
                    <div class="w_100">
                      <div class="align_center font12">查看更多商品></div>
                      <div class="align_center font12">共{{item.factoryproduct.length}}款</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
        <template v-if="distabdata2">
          <div v-if="!tabdata2 || tabdata2.length === 0" class="w_100 h_100 flex_center color-gray">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index1) in tabdata2" :key="index1" class="scroll_item" @click="toUpProduct(item)">
              <div class="scroll_inner">
                <div class="info-row flex_left">
                  <div class="pic flex_left">
                    <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
                  <div class="flex_cell flex_left">
                    <div class="w_100">
                      <div>{{item.title}}</div>
                    </div>
                  </div>
                  <div class="flex_right" style="width:90px;">
                    <div class="rbtn flex_center">挑选商品</div>
                  </div>
                </div>
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
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg, Search } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
let self = {}
const limit = 10
let pageStart1 = 0
let pageStart2 = 0
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, XImg, Search
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
      tabtxts: ['寻找货源', '我已加盟'],
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      showpopup: false,
      deliveritem: null,
      deliverindex: 0,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' },
      autofixed: false,
      searchword1: '',
      Fid: 0
    }
  },
  methods: {
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      this.searchword1 = ''
    },
    onSubmit1 () {
      this.swiperChange()
    },
    toUpProduct (item) {
      console.log('in')
      console.log(item)
      this.$router.push({path: '/factorySource', query: {fid: item.factoryinfo.id}})
    },
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
      const params = {pagestart: pageStart1, limit: limit}
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/fpimportList`, {
        params: params
      }).then(function (res) {
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
      const params = {pagestart: pageStart2, limit: limit}
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/list?pagestart=0&limit=10`, {
        params: params
      }).then(function (res) {
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
      if (this.query.fid) {
        this.Fid = this.query.fid
      } else {
        this.Fid = this.loginUser.fid
      }
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
.factory-source-page{
  .scroll_list{
    .scroll_item:not(:last-child){margin-bottom:12px;}
    .scroll_item{
      border:#ccc 0.5px solid;background-color:#fff;padding:10px;box-sizing: border-box;
      .scroll_inner{
        .info-row{
          .pic{
            width:70px;
            img{width:60px;height:60px;object-fit:cover;}
          }
        }
        .pic-row{
          background-color:#ccc;padding:5px;box-sizing: border-box;
          .pic-img{width:50px;height:50px;object-fit:cover;}
        }
        .rbtn{
          width:80px;height:25px;border:#ea3a3a 1px solid;color:#ea3a3a;border-radius:30px;font-size:12px;
        }
      }
    }
  }
}
</style>
