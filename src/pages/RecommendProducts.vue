<template>
  <div class="containerarea columnarea bg-white font14 notop nobottom rproducts">
    <tab class="w_100 v-tab">
      <tab-item v-for="(item,index) in classData" :selected="selectedIndex == index" :key="index"  @on-item-click="onItemClick">{{item.title}}</tab-item>
    </tab>
    <div class="column-content" style="overflow-y:auto;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <div v-if="disProductData" class="pb10">
        <template v-if="selectedIndex == 0">
          <div>
            <search
              class="v-search bg-white"
              v-model='searchword1'
              :auto-fixed="autofixed"
              @on-submit="onSubmit1"
              @on-change="onChange1"
              @on-cancel="onCancel1"
              ref="search">
            </search>
          </div>
          <div class="b_top_after pt10 pb10">
            <div class="flex_center">
              <div :class="`flex_cell flex_center b_right_after sort-icon ${sort == 'date' ? 'active' : ''}`" @click="sortEvent('date')">
                <div class="txt">最新上架<span :class="`al sort ${datecss}`"></span></div>
              </div>
              <div :class="`flex_cell flex_center sort-icon ${sort == 'price' ? 'active' : ''}`" @click="sortEvent('price')">
                <div class="txt">利润最高<span :class="`al sort ${pricecss}`"></span></div>
              </div>
            </div>
          </div>
          <div class="b_top_after"></div>
        </template>
        <div v-if="disProductData" class="productlist squarepic">
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
      defaultTab: [{title: '为你推荐'}, {title: '全部'}],
      autofixed: false,
      searchword1: '',
      datecss: 'down',
      pricecss: 'down',
      sort: 'date'
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      pageStart = 0
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      pageStart = 0
      self.getData1()
    },
    sortEvent (type) {
      if (type === 'date') {
        if (this.sort === 'date') {
          if (this.datecss === 'down') {
            this.datecss = 'up'
          } else {
            this.datecss = 'down'
          }
        } else {
          this.sort = 'date'
        }
      } else {
        if (this.sort === 'price') {
          if (this.pricecss === 'down') {
            this.pricecss = 'up'
          } else {
            this.pricecss = 'down'
          }
        } else {
          this.sort = 'price'
        }
      }
      this.$vux.loading.show()
      this.disProductData = false
      this.productData = []
      pageStart = 0
      this.getData1('sort')
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
    getData1 (type) {
      let params = {pagestart: pageStart, limit: limit, orderby: 'saled', from: 'origin'}
      if (self.selectedIndex > this.defaultTab.length - 1) {
        params.classid = self.classData[self.selectedIndex].id
      } else if (type === 'sort') {
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
      if (index !== self.selectedIndex) {
        self.selectedIndex = index
        pageStart = 0
        self.$vux.loading.show()
        self.disProductData = false
        self.productData = []
        self.getData1()
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (!self.classData.length) {
        self.$http.get(`${ENV.BokaApi}/api/list/productclass?ascdesc=asc`, { params: { pagestart: pageStart, limit: 500 } }).then((res) => {
          self.$vux.loading.hide()
          const data = res.data
          let retdata = data.data ? data.data : data
          retdata = this.defaultTab.concat(retdata)
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
  .sort-icon.active{color:#ff6a61;}
  .sort-icon{
    .txt{
      width:86px;text-align:left;position:relative;
      .al{position:absolute;right:0;top:50%;}
      .sort.down{margin-top:-25px;}
      .sort.up{margin-top:-22px;}
    }
    .sort.down:before {content: "\e7d4";}
    .sort.up:before {content: "\e7d5";}
  }
}
</style>
