<template>
  <div class="containerarea bg-page font14 bringcustomer">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index"@on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1" v-if="showSwiper">
      <!-- <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item :class="`swiperitem scroll-container${index}`" v-for="(tabitem, index) in tabtxts" :key="index"> -->
          <div v-show="selectedIndex == 0" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
            <div v-if="distabdata1" class="scroll_list">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">暂无数据</div>
              </div>
              <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="flex_left">
                  <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                  <div class="flex_cell pl10">
                    <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                    <div class="clamp1 mt5 font14 color-gray">{{item.dateline | dateformat}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="selectedIndex == 1" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
            <div v-if="distabdata2" class="scroll_list ">
              <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 color-gray align_center">
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">暂无购买客户</div>
              </div>
              <div v-else v-for="(item,index) in tabdata2" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="flex_left">
                  <img class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                  <div class="flex_cell pl10">
                    <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                    <div class="clamp1 mt5 font14 color-gray">{{item.dateline | dateformat}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!-- </swiper-item>
      </swiper> -->
    </div>
  </div>
</template>

<i18n>
Contact customer:
  zh-CN: 联系客户
Customer text:
  zh-CN: 客户
Percent:
  zh-CN: 成交概率
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

const limit = 10
let pageStart1 = 0
let pageStart2 = 0

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      tabtxts: [ '全部', '购买客户' ],
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      showSwiper: false
    }
  },
  methods: {
    initData () {
      this.showSwiper = false
      this.selectedIndex = 0
      this.distabdata1 = false
      this.distabdata2 = false
      this.tabdata1 = []
      this.tabdata2 = []
      pageStart1 = 0
      pageStart2 = 0
    },
    clickTab (index) {
      console.log('in clickTab')
      this.selectedIndex = index
      this.swiperChange()
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabdata1.length === (pageStart1 + 1) * limit) {
              pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabdata2.length === (pageStart2 + 1) * limit) {
              pageStart2++
              self.$vux.loading.show()
              self.getData2()
            }
          }
        }
      })
    },
    getData1 () {
      const self = this
      let params = { pagestart: pageStart1, limit: limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.post(`${ENV.BokaApi}/api/seller/bringCustomer`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData2 () {
      const self = this
      let params = { pagestart: pageStart2, limit: limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.post(`${ENV.BokaApi}/api/seller/buyCustomer`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    swiperChange (index) {
      console.log('in swiperChange')
      if (index !== undefined && index) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < limit) {
            pageStart1 = 0
            this.distabdata1 = false
            this.tabdata1 = []
            this.getData1()
          } else {
            this.$vux.loading.hide()
          }
          break
        case 1:
          if (this.tabdata2.length < limit) {
            pageStart2 = 0
            this.distabdata2 = false
            this.tabdata2 = []
            this.getData2()
          } else {
            this.$vux.loading.hide()
          }
          break
      }
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      this.query = this.$route.query
      this.showSwiper = true
      if (this.query.type === 'buy') {
        this.selectedIndex = 1
      } else {
        this.swiperChange()
      }
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" >
</style>
