<template>
  <div class="containerarea columnarea bg-white font14 notop nobottom rproducts">
    <tab class="w_100 v-tab">
      <tab-item v-for="(item,index) in classData" :selected="selectedIndex == index" :key="index"  @on-item-click="onItemClick">{{item.title}}</tab-item>
    </tab>
    <!-- <div v-if="indexId == 0" class="w_100">
      <search
        class="v-search bg-white"
        v-model='searchword1'
        :auto-fixed="autofixed"
        @on-submit="onSubmit1"
        @on-change="onChange1"
        @on-cancel="onCancel1"
        ref="search">
      </search>
      <div class="condition font14 pl12 pr12 bg-white border-box color-lightgray">
        <div class="t-table w_100 orderbyarea">
          <div :class="`t-cell v_middle orderbyitem ${dateClass}`" @click="dateOrder">
            最新上架
            <span v-if="`${dateClass}` === 'active'" class="ico"></span>
            <span v-else class="al al-paixu font14"></span>
          </div>
          <div v-if="disAreaOrder" :class="`t-cell v_middle orderbyitem ${areaClass}`" @click="areaOrder">
            <div class="clamp1">
              <span class="v_middle">利润最高</span>
              <span class="v_middle font12" v-if="selectedArea">( {{selectedArea}} )</span>
              <span v-if="`${areaClass}` === 'active'" class="ico"></span>
              <span v-else class="al al-paixu font14"></span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="column-content" style="overflow-y:auto;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <!--
      <div class="pro_box bg-page list_shadow pl12 pr12 pb15">
        <div class="pro_list_top bg-page color-lightgray pt10 pb10 pl12 pr12"></div>
        <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white" style="margin-top: -4px;">
          <div>选择你想要产品去分销吧</div>
        </div>
      </div>
    -->
      <div v-if="disProductData" class="productlist squarepic pb10">
        <div v-if="productData.length == 0" class="emptyitem flex_center align_center w_100">该分类下暂无货源数据</div>
        <div v-else @click="toFProduct(item)" v-for="(item,index) in productData" :key="index" class="bk-productitem scroll_item font14 db ">
          <div class="inner list-shadow">
      			<div class="picarea">
      				<div class="pic">
                <img class="imgcover" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                <div class="t-icon color-theme">佣金: {{$t('RMB')}}{{item.levelagent}}</div>
              </div>
      			</div>
      			<div class="desbox" style="overflow:hidden;">
      				<div class="align_left pl5 pr5 clamp2 distitle" style="line-height:18px;height:36px;">{{ item.title }}</div>
      				<div class="clamp1">
      					<div class="flex_table padding5">
      						<span class="color-red font14 flex_cell" style="overflow: hidden;margin-right: 10px;white-space: nowrap;text-overflow: ellipsis;">{{ $t('RMB') }} <span style="margin-left:1px;">{{ item.price }}</span></span>
      						<span class="color-gray">{{ $t('Saled txt') }}:<span style="margin-left:1px;">{{ item.saled }}</span></span>
      					</div>
      				</div>
      			</div>
      		</div>
        </div>
        <div class="font12 color-gray" style="text-align: center;width: 100%;margin-top:10px;" v-if="showTips">没有更多商品啦！</div>
      </div>
    </div>
  </div>
</template>

<i18n>
Apply join:
  zh-CN: 申请加入
</i18n>

<script>
import { Tab, TabItem, Search } from 'vux'
import ENV from 'env'
import Time from '#/time'

let self = this
const limit = 30
let pageStart = 0

export default {
  components: {
    Tab, TabItem, Search
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      viewData: {},
      disProductData: false,
      productData: [],
      classData: [],
      selectedIndex: 0,
      showTips: false,
      indexId: 0,
      searchword1: '',
      autofixed: false,
      dateClass: 'active',
      areaClass: '',
      selectedArea: null,
      disAreaOrder: false
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
    removeOrderActive () {
      const self = this
      self.dateClass = self.dateClass.replace(' active', '').replace('active', '')
      self.areaClass = self.areaClass.replace(' active', '').replace('active', '')
      self.sexClass = self.sexClass.replace(' active', '').replace('active', '')
    },
    areaOrder () {
      this.showPopupArea = true
      this.removeOrderActive()
      this.areaClass = 'active'
    },
    dateOrder () {
      const self = this
      self.selectedArea = null
      self.selectedSex = null
      if (self.dateClass.indexOf('active') < 0) {
        self.removeOrderActive()
        self.dateClass = 'active'
        self.orderbyParams = { orderby: 'dateline' }
      } else {
        self.removeOrderActive()
        self.dateClass = ''
        self.orderbyParams = {}
      }
      self.pagestart1 = 0
      self.distabdata1 = false
      self.tabdata1 = []
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    toFProduct (item) {
      let params = {id: item.id}
      if (this.query.id) {
        params.fid = this.query.id
      }
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/factoryProduct', query: params})
    },
    handleScroll (refname) {
      let scrollArea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollArea,
        callback: function () {
          if (self.productData.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData1()
          } else {
            self.showTips = true
          }
        }
      })
    },
    getData1 () {
      let params = {pagestart: pageStart, limit: limit, orderby: 'saled', from: 'origin'}
      if (self.selectedIndex !== 0) {
        params.classid = self.classData[self.selectedIndex].id
      }
      self.$http.post(`${ENV.BokaApi}/api/list/factoryproduct`, params).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
        self.disProductData = true
      })
    },
    onItemClick (index) {
      console.log('in onitemclick')
      console.log(index)
      this.indexId = index
      if (index !== self.selectedIndex) {
        self.selectedIndex = index
        pageStart = 0
        self.$vux.loading.show()
        self.disProductData = false
        self.productData = []
        self.getData1()
      }
    },
    allItemClick () {
      console.log('ALL DATA')
      this.selectedIndex = -1
      pageStart = 0
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      self.getData1()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (!self.classData.length) {
        self.$http.get(`${ENV.BokaApi}/api/list/productclass?ascdesc=asc`, { params: { pagestart: pageStart, limit: 500 } }).then(function (res) {
          self.$vux.loading.hide()
          const data = res.data
          let retdata = data.data ? data.data : data
          retdata = [{title: '全部'}].concat(retdata)
          self.classData = retdata
          pageStart = 0
          self.$vux.loading.show()
          self.disProductData = false
          self.productData = []
          self.getData1()
        })
      }
    }
  },
  created () {
    self = this
  },
  activated () {
    self = this
    this.refresh()
  }
}
</script>

<style lang="less">
.rproducts{
  .pro_list_top{
    background: url(../assets/images/product_list_top.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-size: 100%;
    height: 20px;
  }
  .t-icon{position:absolute;left:0;top:10px;border-top-right-radius:20px;border-bottom-right-radius:20px;background-color:#fff;padding:5px 10px 5px 5px;font-size:12px;}
  .v-tab .vux-tab-container .vux-tab-selected{border-bottom-style:solid !important;}
  .scrollable .vux-tab-ink-bar{bottom:0 !important;}
  .rproducts .orderbyitem.active .ico:after{
    content: '▼';font-size:12px;margin-left:5px;
  }
}
</style>
