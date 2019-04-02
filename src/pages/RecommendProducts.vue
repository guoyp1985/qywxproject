<template>
  <div class="containerarea columnarea bg-white font14 notop nobottom rproducts">
    <tab class="w_100 v-tab">
      <tab-item selected @on-item-click="allItemClick">全部</tab-item>
      <tab-item v-for="(item,index) in classData" :selected="selectedIndex == index" :key="index"  @on-item-click="onItemClick">{{item.title}}</tab-item>
    </tab>
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
import { Tab, TabItem } from 'vux'
import ENV from 'env'
import Time from '#/time'

let self = this
const limit = 30
let pageStart = 0

export default {
  components: {
    Tab, TabItem
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
      showTips: false
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
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
      // self.$http.post(`${ENV.BokaApi}/api/retailer/recommendByFids`, {
      self.$http.post(`${ENV.BokaApi}/api/list/factoryproduct?orderby=saled`, {
        pagestart: pageStart, limit: limit, classid: self.classData[self.selectedIndex].id
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
        self.disProductData = true
      })
    },
    getAll () {
      self.$http.post(`${ENV.BokaApi}/api/list/factoryproduct?orderby=saled`, {
        pagestart: pageStart, limit: limit
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
        self.disProductData = true
      })
    },
    onItemClick (index) {
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
      pageStart = 0
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      self.getAll()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (!self.classData.length) {
        self.$http.get(`${ENV.BokaApi}/api/list/productclass?ascdesc=asc`, { params: { pagestart: pageStart, limit: limit } }).then(function (res) {
          self.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
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
}
</style>
