<template>
  <div class="containerarea font14 notop nobottom factory-bill-page">
    <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <div class="v-top font16 color-white flex_left">
        <div class="flex_cell flex_left">
          <div class="w_100 clamp1">厂家: {{viewData.title}}</div>
        </div>
        <div class="flex_cell flex_right">
          <div class="w_100 clamp1 align_right">应打款金额: {{salesData.needpaymoney}}</div>
        </div>
      </div>
      <div class="radiusarea mb10 pb15 bg-white list-shadow01">
        <div class="item">
          <div class="inner">
            <div class="radius font22 clamp1">{{salesData.allorders}}</div>
            <div class="title color-gray">总订单</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font22 clamp1">{{salesData.monthorders}}</div>
            <div class="title color-gray">本月订单</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font22 clamp1">{{salesData.todayorders}}</div>
            <div class="title color-gray">今日订单</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font22 clamp1">{{salesData.allordersmoney}}</div>
            <div class="title color-gray">总销售额</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font22 clamp1">{{salesData.monthordersmoney}}</div>
            <div class="title color-gray">本月销售额</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font22 clamp1">{{salesData.todayordersmoney}}</div>
            <div class="title color-gray">今日销售额</div>
          </div>
        </div>
      </div>
      <template v-if="tabsdata && tabsdata.length > 0">
        <div class="tabarea bg-white">
          <tab v-model="selectedIndex" class="v-tab">
            <tab-item v-for="(item,index) in tabsdata" :key="index" @on-item-click="swiperChange(index)">{{ item.title }}</tab-item>
          </tab>
        </div>
        <div v-show="selectedIndex == 0">
          <div v-if="disList1" class="scroll_list border-box">
            <div v-if="!tabData1 || !tabData1.length" class="emptyitem flex_center">暂无数据</div>
            <div v-else v-for="(item, index) in tabData1" :key="index" class="scroll_item mb10 font14 db list-shadow">
              <div class="bg-white padding10 b_bottom_after font12 flex_center ">
                  <div class="color-lightgray" style="width:190px;">订单号: {{item.orderno}}</div>
                  <div class="flex_cell align_right color-red4">{{item.flagstr}}</div>
              </div>
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectedIndex == 1">
          <div v-if="disList2" class="scroll_list border-box">
            <div v-if="!tabData2 || !tabData2.length" class="emptyitem flex_center">暂无数据</div>
            <div v-else v-for="(item, index) in tabData2" :key="index" class="scroll_item mb10 font14 db list-shadow">
              <div class="bg-white padding10 b_bottom_after font12 flex_center ">
                  <div class="color-lightgray" style="width:190px;">订单号: {{item.orderno}}</div>
                  <div class="flex_cell align_right color-red4">{{item.flagstr}}</div>
              </div>
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectedIndex == 2">
          <div v-if="disList3" class="scroll_list border-box">
            <div v-if="!tabData3 || !tabData3.length" class="emptyitem flex_center">暂无数据</div>
            <div v-else v-for="(item, index) in tabData3" :key="index" class="scroll_item mb10 font14 db list-shadow">
              <div class="bg-white padding10 b_bottom_after font12 flex_center ">
                  <div class="color-lightgray" style="width:190px;">订单号: {{item.orderno}}</div>
                  <div class="flex_cell align_right color-red4">{{item.flagstr}}</div>
              </div>
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectedIndex == 3">
          <div v-if="disList4" class="scroll_list border-box">
            <div v-if="!tabData4 || !tabData4.length" class="emptyitem flex_center">暂无数据</div>
            <div v-else v-for="(item, index) in tabData4" :key="index" class="scroll_item mb10 font14 db list-shadow">
              <div class="bg-white padding10 b_bottom_after font12 flex_center ">
                  <div class="color-lightgray" style="width:190px;">订单号: {{item.orderno}}</div>
                  <div class="flex_cell align_right color-red4">{{item.flagstr}}</div>
              </div>
              <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id" :order-data="item" :product="product"></Orderproductplate>
              <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
                <div class="t-table">
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XImg } from 'vux'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import Orderproductplate from '@/components/Orderproductplate'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, XImg, Sos, Subscribe, ApplyTip, Orderproductplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    staytimeFormat: function (value) {
      let ret = ''
      let stay = parseInt(value)
      if (stay < 60) {
        ret = `${stay}秒`
      } else if (stay >= 60 && stay < 3660) {
        let m = Math.floor(stay / 60)
        let s = stay % 60
        ret = `${m}分钟${s}秒`
      } else if (stay >= 3660) {
        let h = Math.floor(stay / 3660)
        let val1 = stay % 3660
        let m = Math.floor(val1 / 60)
        let s = val1 % 60
        ret = `${h}小时${m}分钟${s}秒`
      }
      return ret
    }
  },
  data () {
    return {
      showApply: false,
      showSos: false,
      sosTitle: '该信息不存在',
      showContainer: false,
      loginUser: {},
      query: {},
      module: '',
      data: {},
      arrData: [],
      selectedIndex: 0,
      statData: [],
      tabsdata: [],
      tabtop: 'auto',
      scrollData: [],
      datalist: [],
      isFirst: true,
      clickTabitem: null,
      clickTabIndex: 0,
      userData: {},
      showTip: false,
      viewData: {},
      Fid: 0,
      salesData: {},
      typeObject: {
        0: 'day',
        1: 'yesterday',
        2: 'month',
        3: ''
      },
      disList1: false,
      disList2: false,
      disList3: false,
      disList4: false,
      tabData1: [],
      tabData2: [],
      tabData3: [],
      tabData4: [],
      pageStart1: 0,
      pageStart2: 0,
      pageStart3: 0,
      pageStart4: 0
    }
  },
  watch: {
    datalist () {
      return this.datalist
    },
    // arrData () {
    //   console.log('监控到数据变化')
    //   console.log(this.arrData)
    //   return this.arrData
    // },
    arrData: {
      handler: function (newVal, oldVal) {
      },
      deep: true
    }
  },
  methods: {
    initData () {
      this.sosTitle = '该信息不存在'
      this.query = this.$route.query
      this.module = this.query.module
      this.selectedIndex = 0
      this.arrData = []
      this.statData = []
      this.tabsdata = []
      this.scrollData = []
      this.isFirst = true
    },
    toSubscribe () {
      this.$wechat.miniProgram.navigateTo({url: '/pages/subscribe'})
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabData1.length === (self.pageStart1 + 1) * limit) {
                self.pageStart1++
                self.$vux.loading.show()
                self.getData1()
              }
              break
            case 1:
              if (self.tabData2.length === (self.pageStart2 + 1) * limit) {
                self.pageStart2++
                self.$vux.loading.show()
                self.getData2()
              }
              break
            case 2:
              if (self.tabData3.length === (self.pageStart3 + 1) * limit) {
                self.pageStart3++
                self.$vux.loading.show()
                self.getData3()
              }
              break
            case 3:
              if (self.tabData4.length === (self.pageStart4 + 1) * limit) {
                self.pageStart4++
                self.$vux.loading.show()
                self.getData4()
              }
              break
          }
        }
      })
    },
    getData1 () {
      const self = this
      let params = {type: 'day', pagestart: this.pageStart1, limit: limit, fromfid: this.Fid}
      self.$http.post(`${ENV.BokaApi}/api/factory/tofactoryOrders`, params).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disList1 = true
      })
    },
    getData2 () {
      const self = this
      let params = {type: 'yesterday', pagestart: this.pageStart2, limit: limit, fromfid: this.Fid}
      self.$http.post(`${ENV.BokaApi}/api/factory/tofactoryOrders`, params).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disList2 = true
      })
    },
    getData3 () {
      const self = this
      let params = {type: 'month', pagestart: this.pageStart3, limit: limit, fromfid: this.Fid}
      self.$http.post(`${ENV.BokaApi}/api/factory/tofactoryOrders`, params).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData3 = self.tabData3.concat(retdata)
        self.disList3 = true
      })
    },
    getData4 () {
      const self = this
      let params = {type: '', pagestart: this.pageStart4, limit: limit, fromfid: this.Fid}
      self.$http.post(`${ENV.BokaApi}/api/factory/tofactoryOrders`, params).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData4 = self.tabData4.concat(retdata)
        self.disList4 = true
      })
    },
    swiperChange (index) {
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < limit) {
            this.disList1 = false
            this.pageStart1 = 0
            this.tabData1 = []
            this.$vux.loading.show()
            this.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < limit) {
            this.disList2 = false
            this.pageStart2 = 0
            this.tabData2 = []
            this.$vux.loading.show()
            this.getData2()
          }
          break
        case 2:
          if (this.tabData3.length < limit) {
            this.disList3 = false
            this.pageStart3 = 0
            this.tabData3 = []
            this.$vux.loading.show()
            this.getData3()
          }
          break
        case 3:
          if (this.tabData4.length < limit) {
            this.disList4 = false
            this.pageStart4 = 0
            this.tabData4 = []
            this.$vux.loading.show()
            this.getData4()
          }
          break
      }
    },
    toMembersView (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    toChat (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/chat', query: params})
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.fid) {
        this.Fid = this.query.fid
      } else {
        this.Fid = this.loginUser.fid
      }
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/factory/info`, {
        params: { fid: this.Fid }
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        this.viewData = retdata
        this.tabsdata = [
          {title: '今日订单'},
          {title: '昨日订单'},
          {title: '本月订单'},
          {title: '全部订单'}
        ]
        this.swiperChange()
        return this.$http.post(`${ENV.BokaApi}/api/factory/inviterSaleStat`, {
          fromfid: this.Fid, fid: this.loginUser.fid
        })
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.salesData = data.data
        }
      })
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.radiusarea:after{content:"";clear:both;display:block;}
.radiusarea .item{float:left;width:33.333333%;text-align:center;}
.radiusarea .inner{padding:20px 10px 0 10px;}
.radiusarea .radius{margin:0 auto;width:60px;height:60px;border-radius:50%;background-color:#69d6e3;color:#fff;line-height:60px;}
.radiusarea .title{margin-top:5px;line-height:25px;}
.radiusarea .item:nth-child(1) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(2) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(3) .radius{background-color:#aed370;}
.radiusarea .item:nth-child(4) .radius{background-color:#ffb22d;}
.radiusarea .item:nth-child(5) .radius{background-color:#ea8482;}
.factory-bill-page{
  .detail_card{background-color:#fff;}
  .detailInfo{
    display:flex;padding:10px;box-sizing:border-box;flex-wrap: wrap;
    .txt-item{width:50%;box-sizing:border-box;line-height:25px;}
    .txt-item:nth-child(odd){padding-right:5px;}
    .txt-item:nth-child(even){padding-left:5px;}
  }
  .qbtnInfo{width:50px;text-align:center;border-radius: 50px;}
}
</style>
